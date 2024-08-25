import express from 'express';
import { getDiagnoses } from '../services/diagnoseServices';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  res.send(getDiagnoses());
});

diagnoseRouter.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default diagnoseRouter;
