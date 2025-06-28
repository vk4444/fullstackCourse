import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { isNumber } from './utils';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    try {
        if(!isNumber(req.query.height) || !isNumber(req.query.weight)) {
            throw new Error();
        }
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);

        res.send({
            weight,
            height,
            bmi: calculateBmi(height, weight)
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.send({error: 'malformatted parameters'});
        }
    }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // Validate the data here
  if (
    !daily_exercises ||
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((entry: unknown) => isNumber(entry)) ||
    !isNumber(target)
  ) {
    res.send({
      error: 'malformatted parameters'
    });
    return;
  }

  const dailyExercisesNumbers: number[] = daily_exercises.map((entry: unknown) => Number(entry));
  const targetNumber: number = Number(target);
  const result = calculateExercises(
    dailyExercisesNumbers, targetNumber
  );

  res.send(result);
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});