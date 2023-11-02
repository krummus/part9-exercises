import express from 'express';
import diagnoses from '../diagnoses';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.send(diagnoses.getEntries());
});

diagnosesRouter.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default diagnosesRouter;