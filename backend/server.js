import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';

// App config
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API endpoints
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('API is working!');
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
