import { Visibility, Weather, NewDiaryEntry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseWeather = (weather: unknown): Weather => {
    if(!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather option');
    }
    return weather;
};

const isWeather = (param: string): param is Weather => {
    return ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'].includes(param);
};

const isVisibility = (param: string): param is Visibility => {
    return ['great', 'good', 'ok', 'poor'].includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
    if(!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility');
    }
    return visibility;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing date: ' + comment);
    }
    return comment;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Inccorect or missing data');
    }

    if ('date' in object && 'weather' in object && 'visibility' in object && 'comment' in object) {
        const newEntry: NewDiaryEntry = {
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            comment: parseComment(object.comment)
        };
    
        return newEntry;

    }else if ('date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry: NewDiaryEntry = {
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility)
        };

        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

export default toNewDiaryEntry;