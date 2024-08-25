import { Diagnose } from '../types/diagnose';
import diagnoseData from '../data/diagnoses';

export const getDiagnoses = (): Array<Diagnose> => {
  return diagnoseData;
};
