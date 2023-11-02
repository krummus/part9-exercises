export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export type Discharge = {
    date: string;
    criteria: string;
};

export type SickLeave = {
    startDate: string;
    endDate: string;
};

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry{
    type: 'Hospital';
    discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type HealthCheckEntryForm = UnionOmit<HealthCheckEntry, 'id'>;
export type OccupationalHealthcareEntryForm = UnionOmit<OccupationalHealthcareEntry, 'id'>;
export type HospitalEntryForm = UnionOmit<HospitalEntry, 'id'>;

export type EntryFormValues =
| HospitalEntryForm
| OccupationalHealthcareEntryForm
| HealthCheckEntryForm;

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
};

export type NewPatientEntry = Omit<Patient, 'id' >;

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries' >;

