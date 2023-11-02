"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getEntries = () => {
    return patients;
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (patientEntry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, patientEntry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const findById = (id) => {
    const patient = patients.find(p => p.id === id);
    return patient;
};
const addEntry = (newEntry, id) => {
    const patient = patients.find(p => p.id === id);
    const newEntryWithId = Object.assign({ id: (0, uuid_1.v1)() }, newEntry);
    if (patient) {
        const newPatientEntry = Object.assign(Object.assign({}, patient), { entries: patient === null || patient === void 0 ? void 0 : patient.entries.concat(newEntryWithId) });
        patients.splice(patients.findIndex(patient => patient.id.toString() === id.toString()), 1);
        patients.push(newPatientEntry);
        return newEntryWithId;
    }
    else {
        throw new Error('Incorrect or missing data for Health Check Entry main');
    }
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
    addEntry
};
