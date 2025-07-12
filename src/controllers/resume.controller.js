import Resume from "../models/resume.model.js";
import { generatePdfFromHTML } from "../services/pdf.service.js";
import { getGeminiSuggestions } from "../services/ai.service.js";

// Get the resume for the authenticated user
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) {
      return res.status(404).json({ message: "No resume found." });
    }
    res.status(200).json({ resume });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching resume", error: error.message });
  }
};

// Create or update a resume
export const saveResume = async (req, res) => {
  try {
    const resumeData = req.body;
    const filter = { userId: 'default-user'};

    const updatedResume = await Resume.findOneAndUpdate(
      filter,
      { ...resumeData, userId: 'default-user' },
      { new: true, upsert: true, runValidators: true }
    );

    res
      .status(200)
      .json(updatedResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving resume", error: error.message });
  }
};

export const exportResume = async (req, res) => {
  try {
    let htmlContent;
    if (req.body && typeof req.body === "object" && req.body.html) {
      htmlContent = req.body.html;
    }
    else if (req.body && typeof req.body === "string") {
      try {
        const parsedBody = JSON.parse(req.body);
        htmlContent = parsedBody.html;
      } catch (e) {
        console.error("Failed to parse request body as JSON string:", e);
        return res
          .status(400)
          .json({ message: "Invalid JSON format in request body." });
      }
    }
    if (!htmlContent) {
      console.error(
        "Validation failed: HTML content is missing from the request body."
      );
      return res
        .status(400)
        .json({ message: "HTML content is required for PDF export." });
    }
    const pdfBuffer = await generatePdfFromHTML(htmlContent);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error during PDF export process:", error.message);
    res
      .status(500)
      .json({ message: "Error exporting resume to PDF", error: error.message });
  }
};

export const getAiSuggestions = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res
        .status(400)
        .json({ message: "A prompt is required for AI suggestions." });
    }

    const suggestions = await getGeminiSuggestions(prompt);
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("Error in getAiSuggestions controller:", error);
    res
      .status(500)
      .json({
        message: "An internal error occurred while getting AI suggestions.",
        error: error.message,
      });
  }
};
