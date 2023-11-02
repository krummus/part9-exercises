"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing social security number: ' + ssn);
    }
    return ssn;
};
//const isGender = (str: string): str is Gender => {
//    return ['male', 'female', 'other'].includes(str);
//};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing weather: ' + occupation);
    }
    return occupation;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Inccorect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.default = toNewPatientEntry;
