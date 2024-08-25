import express from 'express';
import { NewEntryType, NewPatient } from '../types/patient';
import {
  getPatientsWihoutSsn,
  addPatient,
  getPatientsWithId,
  createNewEntry,
} from '../services/patientServices';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(getPatientsWihoutSsn());
});

patientRouter.get('/:id', (req, res) => {
  const patient = getPatientsWithId(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post('/:id/entries', (req, res) => {
  const patient = getPatientsWithId(req.params.id);

  if (!patient) {
    return res.status(404).json({ error: 'patient not found' });
  }
  try {
    const entryToAdd = createNewEntry(req.body as NewEntryType);
    patient.entries = patient.entries.concat(entryToAdd);
    console.log(entryToAdd);
    return res.status(201).json(patient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'server could not process the request' });
    }
  }
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatient = req.body as NewPatient;
    const addedPatient = addPatient(newPatient);
    return res.status(201).json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'server could not process the request' });
    }
  }
});

export default patientRouter;
