import { Diagnose } from './types/diagnose';
import {
  Gender,
  NewPatient,
  NewEntry,
  NewEntryType,
  Discharge,
  HealthCheckRating,
  SickLeave,
} from './types/patient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGender(gender: any): gender is Gender {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
}

function isString(str: unknown): str is string {
  return typeof str === 'string' || str instanceof String;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function parseName(name: unknown): string {
  if (!isString(name)) {
    throw new Error(`incorrect or missing name: '${name}'`);
  }
  return name;
}

function parseDateOfBirth(dateOfBirth: unknown): string {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`incorrect or missing date: '${dateOfBirth}'`);
  }
  return dateOfBirth;
}

function parseSSN(ssn: unknown): string {
  if (!isString(ssn)) {
    throw new Error(`incorrect or missing ssn: '${ssn}'`);
  }
  return ssn;
}

function parseGender(gender: unknown): Gender {
  if (!isGender(gender)) {
    throw new Error(`incorrect or missing gender: '${gender}'`);
  }
  return gender;
}

function parseOccupation(occupation: unknown): string {
  if (!occupation || !isString(occupation)) {
    throw new Error(`incorrect or missing occupation: '${occupation}'`);
  }
  return occupation;
}

function parseEntryType(entryType: unknown): 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' {
  switch (entryType) {
    case 'Hospital':
      return entryType;
    case 'HealthCheck':
      return entryType;
    case 'OccupationalHealthcare':
      return entryType;
    default:
      throw new Error('incorrect or missing entry type');
  }
}

function parseDescription(description: unknown): string {
  if (!description || !isString(description)) {
    throw new Error('incorrect or missing description');
  }
  return description;
}

function parseDate(date: unknown): string {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('incorrect or missing date');
  }
  return date;
}

function parseSpecialist(specialist: unknown): string {
  if (!specialist || !isString(specialist)) {
    throw new Error('incorrect or missing specialist');
  }
  return specialist;
}

function parseDiagnosisCodes(x: unknown): Array<Diagnose['code']> {
  if (!x || typeof x !== 'object' || !('diagnosisCodes' in x)) {
    return [] as Array<Diagnose['code']>;
  }
  return x.diagnosisCodes as Array<Diagnose['code']>;
}

function parseHealthCheckRating(healthCheck: unknown): HealthCheckRating {
  if (healthCheck == null || !Number.isInteger(healthCheck)) {
    throw new Error('incorrect or missing health check rating');
  }

  switch (healthCheck) {
    case 0:
      return HealthCheckRating.Healthy;
    case 1:
      return HealthCheckRating.LowRisk;
    case 2:
      return HealthCheckRating.HighRisk;
    case 3:
      return HealthCheckRating.CriticalRisk;
    default:
      throw new Error('incorrect or missing health check rating');
  }
}

function parseCriteria(criteria: unknown): string {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }
  return criteria;
}

function parseDischarge(discharge: unknown): Discharge {
  if (
    !discharge ||
    typeof discharge !== 'object' ||
    !('date' in discharge) ||
    !('criteria' in discharge)
  ) {
    throw new Error('incorrect or missing discharge');
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
}

function parseEmployerName(employersName: unknown): string {
  if (!employersName || !isString(employersName)) {
    throw new Error('incorrect or missing employer name');
  }
  return employersName;
}

function parseSickLeave(sickLeave: unknown): SickLeave {
  if (
    !sickLeave ||
    typeof sickLeave !== 'object' ||
    !('startDate' in sickLeave) ||
    !('endDate' in sickLeave)
  ) {
    throw new Error('incorrect or missing sick leave');
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
}

export function toNewEntry(object: NewEntryType): NewEntry {
  const shared = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    type: parseEntryType(object.type),
  };

  switch (object.type) {
    case 'HealthCheck':
      return {
        ...shared,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case 'Hospital':
      return {
        ...shared,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      };
    case 'OccupationalHealthcare':
      return {
        ...shared,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
        sickLeave: object.sickLeave == null ? undefined : parseSickLeave(object.sickLeave),
      };
    default:
      return assertNever(object.type);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };
};
function assertNever(type: unknown): NewEntry {
  throw new Error('Function not implemented. ' + type);
}
