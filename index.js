import express from 'express';
import indexRouter from './routes/index.js';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3500

app.use(cors());
app.use(express.json());
app.use('/api', indexRouter);

// Serve static files **first**
app.use(express.static(path.join(__dirname, 'dist')));

// For any other requests, send back React's index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// app.listen(PORT, ()=> console.log(`server is listening on http://localhost:${PORT}`));

export default app; // Export the app for use in other modules
