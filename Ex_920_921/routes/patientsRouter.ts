import express from 'express';
import patientsService from '../services/patientsService';
import { EntryFormValues, NewPatientEntry } from '../types';
import { parseEntriesNoId, toNewPatientEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientsRouter.get('/:id', (req, res) => {
  try {
    const patient = patientsService.findById(String(req.params.id));
    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong!';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
}); 

patientsRouter.post('/', (req, res) => {
  try {
    const newPatientEntry:NewPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.post('/:id/entries', (req, res) => {
  console.log(req.body);
  try {
    const currPatId: string = (req.params.id).toString();
    const newEntry: EntryFormValues = parseEntriesNoId(req.body);
    patientsService.addEntry(newEntry, currPatId);
    console.log(newEntry);
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;