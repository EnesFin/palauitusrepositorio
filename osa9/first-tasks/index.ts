import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());



app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;

    const bmi = calculateBmi(Number(height), Number(weight));
  
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      res.status(400).send({ error: "malformatted parameters" });
    }
    res.send({ height, weight, bmi });
    }
);

app.post('/exercises', (req, res) => {
  interface Request {
    daily_exercises: Array<number>
    target: number
  }

  const body = req.body as Request;
  if (!body || !body.daily_exercises || !body.target) {
    return res.status(400).json({error: 'parameters missing'});
  }
  if (!Array.isArray(body.daily_exercises)) {
    return res.status(400).json({error: 'malformed parameters'});
  }

  const daily_exercises = body.daily_exercises.map(x => Number(x));
  body.target = Number(body.target);

  if (isNaN(body.target) || daily_exercises.some(x => isNaN(x))) {
    return res.status(400).json({error: 'malformed parameters'});
  }
  const result = calculateExercises(daily_exercises, body.target);
  return res.json(result);
});

app.use((_req, res) => res.status(404).end());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});