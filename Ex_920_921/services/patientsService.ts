import patientData from '../data/patients';
import {v1 as uuidv1} from 'uuid';

import { NonSensitivePatientEntry, Patient, NewPatientEntry, Entry, EntryFormValues} from '../types';

const patients: Patient [] = patientData;

const getEntries = (): Patient[] => {
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
  
const addPatient = ( patientEntry: NewPatientEntry ): Patient => {

    const newPatientEntry = {
        id: uuidv1(),
        ...patientEntry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addEntry = (newEntry: EntryFormValues, id: string): Entry => {
    const patient = patients.find(p => p.id === id);
    const newEntryWithId:Entry = {
        id: uuidv1(),
        ...newEntry
    };
    if(patient) {
        const newPatientEntry:Patient = {
                ...patient, 
                entries: patient?.entries.concat(newEntryWithId)
                
        };
        patients.splice(patients.findIndex(patient => patient.id.toString() === id.toString()),1);
        patients.push(newPatientEntry);
        return newEntryWithId;
    }else{
        throw new Error('Incorrect or missing data for Health Check Entry main');
    }
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
    addEntry
};