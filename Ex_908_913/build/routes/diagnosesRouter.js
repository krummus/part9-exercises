"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("../diagnoses"));
const diagnosesRouter = express_1.default.Router();
diagnosesRouter.get('/', (_req, res) => {
    res.send(diagnoses_1.default.getEntries());
});
diagnosesRouter.post('/', (_req, res) => {
    res.send('Saving a diagnoses!');
});
exports.default = diagnosesRouter;
