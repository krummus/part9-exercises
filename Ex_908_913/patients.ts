import patients from './data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from './types';
import {v1 as uuidv1} from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  
    const newPatientEntry = {
        id: uuidv1(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};