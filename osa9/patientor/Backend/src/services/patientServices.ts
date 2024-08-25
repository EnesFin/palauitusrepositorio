import { Patient, patientWithoutSsn, NewPatient, NewEntryType } from '../types/patient';
import patientsData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { toNewEntry } from '../utils';

const patients: Patient[] = patientsData;

export const getPatients = (): Array<Patient> => {
  return patients;
};

export const getPatientsWithId = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

export const getPatientsWihoutSsn = (): Array<patientWithoutSsn> => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

export const createNewEntry = (entry: NewEntryType) => {
  const id = uuid();
  const newEntry = {
    id: id,
    ...toNewEntry(entry),
  };
  return newEntry;
};

export const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};
