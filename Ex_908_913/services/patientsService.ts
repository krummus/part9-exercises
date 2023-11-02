import patientData from '../data/patients';
import {v1 as uuidv1} from 'uuid';

import { 
  NonSensitivePatientEntry, PatientEntry, NewPatientEntry
 } from '../types';

const patients: PatientEntry [] = patientData;

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