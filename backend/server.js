import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = 5000;

// 🚀 Fix for large payloads (Base64 image data)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());

connectDB();

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});