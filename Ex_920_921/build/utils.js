"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = exports.parseEntriesNoId = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isNumber = (text) => {
    return typeof text === 'number' || text instanceof Number;
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
/////////////////////////////// Entry Array Parsing
const parseId = (id) => {
    if (!id || !isString(id)) {
        throw new Error('Incorrect or missing weather: ' + id);
    }
    return id;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing weather: ' + date);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing weather: ' + specialist);
    }
    return specialist;
};
const isHospital = (param) => {
    if (param !== 'Hospital') {
        throw new Error('Incorrect or missing weather: ' + param);
    }
    return param;
};
const isOccupationalHealthcare = (param) => {
    if (param !== 'OccupationalHealthcare') {
        throw new Error('Incorrect or missing weather: ' + param);
    }
    return param;
};
const isHealthCheckEntry = (param) => {
    if (param !== 'HealthCheck') {
        throw new Error('Incorrect or missing HealthCheckEntry: ' + param);
    }
    return param;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const parseDiagnosisCodes = (diagnosesCodes) => {
    if (!diagnosesCodes || !(diagnosesCodes instanceof Array)) {
        throw new Error('Incorrect or missing diagnosesCodes: ' + diagnosesCodes);
    }
    if (diagnosesCodes.length === 0) {
        return [];
    }
    else {
        const parsedDiagnosisCodes = diagnosesCodes.map(code => {
            if (!isString(code)) {
                throw new Error('Incorrect or missing code: ' + code);
            }
            return (code);
        });
        return parsedDiagnosisCodes;
    }
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employerName: ' + employerName);
    }
    return employerName;
};
const isCriteria = (criteria) => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing criteria: ' + criteria);
    }
    return criteria;
};
const parseDischarge = (discharge) => {
    if (!discharge || typeof discharge !== 'object') {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    if ('date' in discharge && 'criteria' in discharge) {
        const objToReturn = {
            date: parseDate(discharge.date),
            criteria: isCriteria(discharge.criteria)
        };
        return objToReturn;
    }
    throw new Error('Incorrect or missing discharge: ' + discharge);
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || typeof sickLeave !== 'object') {
        throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
    }
    if ('startDate' in sickLeave && 'endDate' in sickLeave) {
        const objToReturn = {
            startDate: parseDate(sickLeave.startDate),
            endDate: isCriteria(sickLeave.endDate)
        };
        return objToReturn;
    }
    throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseEntryType = (item) => {
    if (!item) {
        throw new Error('Incorrect or missing Entry Type: ' + item);
    }
    return item;
};
const parseEntries = (obj) => {
    if (!obj || !(obj instanceof Array)) {
        throw new Error('Inccorect or missing data');
    }
    if (obj.length === 0) {
        return [];
    }
    const parsedEntries = obj.map(entry => {
        if (!entry || typeof entry !== 'object') {
            throw new Error('Inccorect or missing data');
        }
        if ('type' in entry) {
            switch (entry.type) {
                case 'Hospital':
                    if ('id' in entry && 'date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'discharge' in entry) {
                        const currEntry = {
                            id: parseId(entry.id),
                            date: parseDate(entry.date),
                            type: isHospital(entry.type),
                            specialist: parseSpecialist(entry.specialist),
                            description: parseDescription(entry.description),
                            discharge: parseDischarge(entry.discharge),
                        };
                        if ('diagnosisCodes' in entry) {
                            const currEntryDiag = Object.assign(Object.assign({}, currEntry), { diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes) });
                            return parseEntryType(currEntryDiag);
                        }
                        return parseEntryType(currEntry);
                    }
                    console.log(entry);
                    throw new Error('Incorrect or missing data for Hospital Entry: ' + entry);
                case 'OccupationalHealthcare':
                    if ('id' in entry && 'date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'employerName' in entry) {
                        const currEntry = {
                            id: parseId(entry.id),
                            date: parseDate(entry.date),
                            type: isOccupationalHealthcare(entry.type),
                            specialist: parseSpecialist(entry.specialist),
                            description: parseDescription(entry.description),
                            employerName: parseEmployerName(entry.employerName)
                        };
                        if ('sickLeave' in entry && 'diagnosisCodes' in entry) {
                            const currEntrySLDC = Object.assign(Object.assign({}, currEntry), { diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes), sickLeave: parseSickLeave(entry.sickLeave) });
                            return parseEntryType(currEntrySLDC);
                        }
                        else if ('diagnosisCodes' in entry) {
                            const currEntryDC = Object.assign(Object.assign({}, currEntry), { diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes) });
                            return parseEntryType(currEntryDC);
                        }
                        else if ('sickLeave' in entry) {
                            const currEntrySL = Object.assign(Object.assign({}, currEntry), { sickLeave: parseSickLeave(entry.sickLeave) });
                            return parseEntryType(currEntrySL);
                        }
                        return parseEntryType(currEntry);
                    }
                    console.log(entry);
                    throw new Error('Incorrect or missing data for Occupational Healthcare Entry: ' + entry);
                case 'HealthCheck':
                    if ('id' in entry && 'date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'healthCheckRating' in entry) {
                        const currEntry = {
                            id: parseId(entry.id),
                            date: parseDate(entry.date),
                            type: isHealthCheckEntry(entry.type),
                            specialist: parseSpecialist(entry.specialist),
                            description: parseDescription(entry.description),
                            healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
                        };
                        if ('diagnosisCodes' in entry) {
                            const currEntryDiag = Object.assign(Object.assign({}, currEntry), { diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes) });
                            return parseEntryType(currEntryDiag);
                        }
                        return parseEntryType(currEntry);
                    }
                    console.log(entry);
                    throw new Error('Incorrect or missing data for Health Check Entry main: ' + entry);
                default:
                    console.log(entry);
                    throw new Error('Incorrect or missing data for Entry End: ' + entry);
            }
        }
        throw new Error('Incorrect or missing data for Entry: ' + entry);
    });
    return parsedEntries;
};
//////////////////////////////////////////////////////////////////////////
const parseEntryTypeNoId = (item) => {
    if (!item) {
        throw new Error('Incorrect or missing Entry Type: ' + item);
    }
    return item;
};
const parseEntriesNoId = (entry) => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Inccorect or missing data');
    }
    if ('type' in entry) {
        switch (entry.type) {
            case 'Hospital':
                if ('date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'discharge' in entry) {
                    const currEntry = {
                        date: parseDate(entry.date),
                        type: isHospital(entry.type),
                        specialist: parseSpecialist(entry.specialist),
                        description: parseDescription(entry.description),
                        discharge: parseDischarge(entry.discharge),
                    };
                    if ('diagnosisCodes' in entry) {
                        const currEntryDiag = Object.assign(Object.assign({}, currEntry), { diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes) });
                        return parseEntryTypeNoId(currEntryDiag);
                    }
                    return parseEntryTypeNoId(currEntry);
                }
                console.log(entry);
                throw new Error('Incorrect or missing data for Hospital Entry: ' + entry);
            case 'OccupationalHealthcare':
                if ('date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'employerName' in entry) {
                    const currEntry = {
                        date: parseDate(entry.date),
                        type: isOccupationalHealthcare(entry.type),
                        specialist: parseSpecialist(entry.specialist),
                        description: parseDescription(entry.description),
                        employerName: parseEmployerName(entry.employerName)
                    };
                    if ('sickLeave' in entry && 'diagnosisCodes' in entry) {
                        const currEntrySLDC = Object.assign(Object.assign({}, currEntry), { diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes), sickLeave: parseSickLeave(entry.sickLeave) });
                        return parseEntryTypeNoId(currEntrySLDC);
                    }
                    else if ('diagnosisCodes' in entry) {
                        const currEntryDC = Object.assign(Object.assign({}, currEntry), { diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes) });
                        return parseEntryTypeNoId(currEntryDC);
                    }
                    else if ('sickLeave' in entry) {
                        const currEntrySL = Object.assign(Object.assign({}, currEntry), { sickLeave: parseSickLeave(entry.sickLeave) });
                        return parseEntryTypeNoId(currEntrySL);
                    }
                    return parseEntryTypeNoId(currEntry);
                }
                console.log(entry);
                throw new Error('Incorrect or missing data for Occupational Healthcare Entry: ' + entry);
            case 'HealthCheck':
                if ('date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'healthCheckRating' in entry) {
                    const currEntry = {
                        date: parseDate(entry.date),
                        type: isHealthCheckEntry(entry.type),
                        specialist: parseSpecialist(entry.specialist),
                        description: parseDescription(entry.description),
                        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
                    };
                    if ('diagnosisCodes' in entry) {
                        const currEntryDiag = Object.assign(Object.assign({}, currEntry), { diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes) });
                        return parseEntryTypeNoId(currEntryDiag);
                    }
                    return parseEntryTypeNoId(currEntry);
                }
                console.log(entry);
                throw new Error('Incorrect or missing data for Health Check Entry main: ' + entry);
            default:
                console.log(entry);
                throw new Error('Incorrect or missing data for Entry End: ' + entry);
        }
    }
    throw new Error('Incorrect or missing data for Entry: ' + entry);
};
exports.parseEntriesNoId = parseEntriesNoId;
//////////////////////////////////////////////////////////////////////////
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Inccorect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries)
        };
        return newPatientEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewPatientEntry = toNewPatientEntry;
