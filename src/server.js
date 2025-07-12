import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { connectDB } from './db.js';
import resumeRoutes from './api/resume.routes.js'

const app = express();
connectDB();

app.use(cors({ origin: config.cors.clientUrl }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/resume', resumeRoutes);

app.get('/', (req, res) => {
    res.send('Smart Resume Builder API is running!');
})

app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
});