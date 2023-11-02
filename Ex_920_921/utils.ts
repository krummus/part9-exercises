
import { NewPatientEntry, Gender, Entry, SickLeave, Discharge, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, 
    Diagnosis, HealthCheckEntry, HospitalEntryForm, OccupationalHealthcareEntryForm, HealthCheckEntryForm, EntryFormValues } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing social security number: ' + ssn);
    }
    return ssn;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing weather: ' + occupation);
    }
    return occupation;
};

/////////////////////////////// Entry Array Parsing

const parseId = (id: unknown): string => {
    if (!id || !isString(id)) {
        throw new Error('Incorrect or missing weather: ' + id);
    }
    return id;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing weather: ' + date);
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing weather: ' + specialist);
    }
    return specialist;
};

const isHospital = (param: unknown): 'Hospital' => {
    if(param !== 'Hospital') {
        throw new Error('Incorrect or missing weather: ' + param);
    }
    return param;
};

const isOccupationalHealthcare = (param: unknown): 'OccupationalHealthcare' => {
    if(param !== 'OccupationalHealthcare') {
        throw new Error('Incorrect or missing weather: ' + param);
    }
    return param;
};

const isHealthCheckEntry = (param: unknown): 'HealthCheck' => {
    if(param !== 'HealthCheck') {
        throw new Error('Incorrect or missing HealthCheckEntry: ' + param);
    }
    return param;
};

const parseDescription = (description: unknown): string => {
    if(!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};

const parseDiagnosisCodes = (diagnosesCodes: unknown): Array<Diagnosis['code']> => {
    if(!diagnosesCodes || !(diagnosesCodes instanceof Array)) {
        throw new Error('Incorrect or missing diagnosesCodes: ' + diagnosesCodes);
    }
    if(diagnosesCodes.length === 0) {
        return [];
    }else{
        const parsedDiagnosisCodes = diagnosesCodes.map(code => {
            if (!isString(code)) {
                throw new Error('Incorrect or missing code: ' + code);
            }
            return(code);
        });
        return parsedDiagnosisCodes;
    }
};

const parseEmployerName = (employerName: unknown): string => {
    if(!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employerName: ' + employerName);
    }
    return employerName;
};

const isCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing criteria: ' + criteria);
    }
    return criteria;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if(!discharge || typeof discharge !== 'object') {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    if('date' in discharge && 'criteria' in discharge) {
        const objToReturn: Discharge = {
            date: parseDate(discharge.date),
            criteria: isCriteria(discharge.criteria)
        };
        return objToReturn;
    }
    throw new Error('Incorrect or missing discharge: ' + discharge);
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if(!sickLeave || typeof sickLeave !== 'object') {
        throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
    }
    if('startDate' in sickLeave && 'endDate' in sickLeave) {
        const objToReturn: SickLeave = {
            startDate: parseDate(sickLeave.startDate),
            endDate: isCriteria(sickLeave.endDate)
        };
        return objToReturn;
    }
    throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if(!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

const parseEntryType = (item: HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry) : Entry => {
    if(!item) {
        throw new Error('Incorrect or missing Entry Type: ' + item);
    }
    return item;
};

const parseEntries = (obj: unknown): Entry [] | []=> {
    if(!obj || !(obj instanceof Array)) {
        throw new Error('Inccorect or missing data');
    }
    if(obj.length===0) {
        return [];
    }
    const parsedEntries = obj.map(entry => {
        if (!entry || typeof entry !== 'object') {
            throw new Error('Inccorect or missing data');
        }
        if ('type' in entry) {
            switch(entry.type) {
                case 'Hospital':
                    if ('id' in entry && 'date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'discharge' in entry) {
                        const currEntry: HospitalEntry = {
                            id: parseId(entry.id),
                            date: parseDate(entry.date),
                            type: isHospital(entry.type),
                            specialist: parseSpecialist(entry.specialist),
                            description: parseDescription(entry.description),
                            discharge: parseDischarge(entry.discharge),
                        };
                        if ('diagnosisCodes' in entry) {
                            const currEntryDiag: HospitalEntry = {
                                ...currEntry,
                                diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
                            };
                            return parseEntryType(currEntryDiag);
                        }
                        return parseEntryType(currEntry);
                    }
                    console.log(entry);
                    throw new Error('Incorrect or missing data for Hospital Entry: ' + entry);
                case 'OccupationalHealthcare':
                    if ('id' in entry && 'date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'employerName' in entry) {
                        const currEntry: OccupationalHealthcareEntry = {
                            id: parseId(entry.id),
                            date: parseDate(entry.date),
                            type: isOccupationalHealthcare(entry.type),
                            specialist: parseSpecialist(entry.specialist),
                            description: parseDescription(entry.description),
                            employerName: parseEmployerName(entry.employerName)
                        };
                        if ('sickLeave' in entry && 'diagnosisCodes' in entry) {
                            const currEntrySLDC: OccupationalHealthcareEntry = {
                                ...currEntry,
                                diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
                                sickLeave: parseSickLeave(entry.sickLeave)
                            };
                            return parseEntryType(currEntrySLDC);
                        } else if ('diagnosisCodes' in entry) {
                            const currEntryDC: OccupationalHealthcareEntry = {
                                ...currEntry,
                                diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
                            };
                            return parseEntryType(currEntryDC);
                        } else if ('sickLeave' in entry) {
                            const currEntrySL: OccupationalHealthcareEntry = {
                                ...currEntry,
                                sickLeave: parseSickLeave(entry.sickLeave)
                            };
                            return parseEntryType(currEntrySL);
                        }
                        return parseEntryType(currEntry);
                    }
                    console.log(entry);
                    throw new Error('Incorrect or missing data for Occupational Healthcare Entry: ' + entry);
                case 'HealthCheck':
                    if ('id' in entry && 'date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'healthCheckRating' in entry) {
                        const currEntry: HealthCheckEntry = {
                            id: parseId(entry.id),
                            date: parseDate(entry.date),
                            type: isHealthCheckEntry(entry.type),
                            specialist: parseSpecialist(entry.specialist),
                            description: parseDescription(entry.description),
                            healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
                        };
                        if ('diagnosisCodes' in entry) {
                            const currEntryDiag: HealthCheckEntry = {
                                ...currEntry,
                                diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
                            };

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
const parseEntryTypeNoId = (item: HospitalEntryForm | OccupationalHealthcareEntryForm | HealthCheckEntryForm ) : EntryFormValues => {
    if(!item) {
        throw new Error('Incorrect or missing Entry Type: ' + item);
    }
    return item;
};

export const parseEntriesNoId = (entry: unknown): EntryFormValues => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Inccorect or missing data');
    }
    if ('type' in entry) {
        switch(entry.type) {
            case 'Hospital':
                if ('date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'discharge' in entry) {
                    const currEntry: HospitalEntryForm = {
                        date: parseDate(entry.date),
                        type: isHospital(entry.type),
                        specialist: parseSpecialist(entry.specialist),
                        description: parseDescription(entry.description),
                        discharge: parseDischarge(entry.discharge),
                    };
                    if ('diagnosisCodes' in entry) {
                        const currEntryDiag: HospitalEntryForm = {
                            ...currEntry,
                            diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
                        };
                        return parseEntryTypeNoId(currEntryDiag);
                    }
                    return parseEntryTypeNoId(currEntry);
                }
                console.log(entry);
                throw new Error('Incorrect or missing data for Hospital Entry: ' + entry);
            case 'OccupationalHealthcare':
                if ('date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'employerName' in entry) {
                    const currEntry: OccupationalHealthcareEntryForm = {
                        date: parseDate(entry.date),
                        type: isOccupationalHealthcare(entry.type),
                        specialist: parseSpecialist(entry.specialist),
                        description: parseDescription(entry.description),
                        employerName: parseEmployerName(entry.employerName)
                    };
                    if ('sickLeave' in entry && 'diagnosisCodes' in entry) {
                        const currEntrySLDC: OccupationalHealthcareEntryForm = {
                            ...currEntry,
                            diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
                            sickLeave: parseSickLeave(entry.sickLeave)
                        };
                        return parseEntryTypeNoId(currEntrySLDC);
                    } else if ('diagnosisCodes' in entry) {
                        const currEntryDC: OccupationalHealthcareEntryForm = {
                            ...currEntry,
                            diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
                        };
                        return parseEntryTypeNoId(currEntryDC);
                    } else if ('sickLeave' in entry) {
                        const currEntrySL: OccupationalHealthcareEntryForm = {
                            ...currEntry,
                            sickLeave: parseSickLeave(entry.sickLeave)
                        };
                        return parseEntryTypeNoId(currEntrySL);
                    }
                    return parseEntryTypeNoId(currEntry);
                }
                console.log(entry);
                throw new Error('Incorrect or missing data for Occupational Healthcare Entry: ' + entry);
            case 'HealthCheck':
                if ('date' in entry && 'type' in entry && 'specialist' in entry && 'description' in entry && 'healthCheckRating' in entry) {
                    const currEntry: HealthCheckEntryForm = {
                        date: parseDate(entry.date),
                        type: isHealthCheckEntry(entry.type),
                        specialist: parseSpecialist(entry.specialist),
                        description: parseDescription(entry.description),
                        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
                    };
                    if ('diagnosisCodes' in entry) {
                        const currEntryDiag: HealthCheckEntryForm = {
                            ...currEntry,
                            diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
                        };

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



//////////////////////////////////////////////////////////////////////////

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Inccorect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        
        const newPatientEntry: NewPatientEntry = {
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
