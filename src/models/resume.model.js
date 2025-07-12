import mongoose from "mongoose";
const { Schema } = mongoose;

const ExperienceSchema = new Schema({
  id: Number,
  company: String,
  position: String,
  startDate: String,
  endDate: String,
  current: Boolean,
  responsibilities: String,
});

const EducationSchema = new Schema({
  id: Number,
  institution: String,
  degree: String,
  startDate: String,
  endDate: String,
  description: String,
  gpa: String,
  location: String,
  current: Boolean,
});

const ProjectSchema = new Schema({
  id: Number,
  name: String,
  technologies: String,
  url: String,
  github: String,
  description: String,
  startDate: String,
  endDate: String,
  status: String,
  highlights: [String],
});

const AchievementSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  date: String,
  category: String,
  organization: String,
  url: String,
  importance: String,
});

const ExtraCurricularSchema = new Schema({
  id: Number,
  title: String,
  organization: String,
  startDate: String,
  endDate: String,
  description: String,
});

const ResumeSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    personalInfo: {
      fullName: String,
      jobTitle: String,
      email: String,
      phone: String,
      location: String,
      linkedIn: String,
      github: String,
      summary: String,
      photo: { type: String, default: "" },
    },
    experience: [ExperienceSchema],
    education: [EducationSchema],
    skills: {
      technical: [String],
      programming: [String],
      tools: [String],
      soft: [String],
      languages: [String],
    },
    projects: [ProjectSchema],
    achievements: [AchievementSchema],
    extracurricular: [ExtraCurricularSchema],
  },
  { timestamps: true }
); 

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
