import express from 'express';
import cors from 'cors';
const app = express();
import diaryRouter from './routes/diaries';

// Allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5173'  // Your React dev server URL
}))

app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});