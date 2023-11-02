import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaryEntries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => {
      return response.data
    })
};

export const createDiaryEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => {
      return response.data})
};

const toBeExported = { getAllDiaryEntries, createDiaryEntry };

export default toBeExported;