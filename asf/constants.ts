
import { ASFSession } from './types';

export const BEEP_SOUND_URL = "https://actions.google.com/sounds/v1/alarms/beep_short.ogg";

export const STUDENTS_SPRACHJONGLEURE = ["Max (5.1)", "Lina (5a)", "Tom (6.1)"];
export const STUDENTS_ASF1 = ["Sara (7.1)", "Ben (7.1)", "Jonas (7.2)"];
export const STUDENTS_ASF2 = ["Emma (5a)", "Noah (6.1)"];

export const SCHEDULE: ASFSession[] = [
  {
    id: "1",
    day: 1, // Montag
    startTime: "13:30",
    endTime: "14:15",
    label: "Sprachjongleure",
    teacher: "Frau Müller",
    room: "101",
    students: STUDENTS_SPRACHJONGLEURE
  },
  {
    id: "2",
    day: 1,
    startTime: "14:30",
    endTime: "15:15",
    label: "ASF 1",
    teacher: "Herr Schmidt",
    room: "102",
    students: STUDENTS_ASF1
  }
];
