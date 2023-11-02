"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const patientsRouter = express_1.default.Router();
patientsRouter.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNonSensitiveEntries());
});
patientsRouter.get('/:id', (req, res) => {
    try {
        const patient = patientsService_1.default.findById(String(req.params.id));
        res.json(patient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong!';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
patientsRouter.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(req.body);
        const addedEntry = patientsService_1.default.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
patientsRouter.post('/:id/entries', (req, res) => {
    console.log(req.body);
    try {
        const currPatId = (req.params.id).toString();
        const newEntry = (0, utils_1.parseEntriesNoId)(req.body);
        patientsService_1.default.addEntry(newEntry, currPatId);
        console.log(newEntry);
        res.json(newEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = patientsRouter;
