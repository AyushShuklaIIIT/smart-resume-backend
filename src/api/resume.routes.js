import express from 'express';
import { getResume, saveResume, exportResume, getAiSuggestions } from '../controllers/resume.controller.js';

const router = express.Router();

router.get('/', getResume);
router.post('/', saveResume);
router.post('/export', exportResume);
router.post('/suggestions', getAiSuggestions);

export default router;