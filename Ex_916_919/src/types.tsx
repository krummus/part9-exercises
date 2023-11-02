export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
};

export interface DiaryEntriesForProps {
    entries: DiaryEntry[];
};

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface NotificationProp {
    message: string;
}