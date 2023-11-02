import express from 'express';
import qs from 'qs';
import { calculateBmi } from './calculateBmi'; 
const app = express();
app.set('query parser', (str: string) => qs.parse(str))

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if(isNaN(height) || isNaN(weight)) {
      throw new Error('malformatted parameters');
    }
    res.send({
      weight:weight,
      height:height,
      bmi:calculateBmi(weight, height)
    })
  }catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.send({error:errorMessage})
    console.log(errorMessage);
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});