
export enum StatusType {
  NONE = 'none',
  ACTIVE = 'active',
  UPCOMING = 'upcoming'
}

export interface ASFSession {
  id: string;
  day: number;
  startTime: string;
  endTime: string;
  label: string;
  teacher: string;
  room: string;
  students: string[];
}

export interface SessionStatus {
  type: StatusType;
  currentSessions: ASFSession[];
  nextSession?: ASFSession;
  minutesToStart?: number;
}
