
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { SCHEDULE, BEEP_SOUND_URL, STUDENTS_SPRACHJONGLEURE, STUDENTS_ASF1, STUDENTS_ASF2 } from './constants';
import { ASFSession, StatusType, SessionStatus } from './types';

const App: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const [status, setStatus] = useState<SessionStatus>({ type: StatusType.NONE, currentSessions: [] });
  const [isUpcomingExpanded, setIsUpcomingExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'none' | 'sprachjongleure' | 'all' | 'courses' | 'done'>('none');
  const [selectedDoneSession, setSelectedDoneSession] = useState<ASFSession | null>(null);
  const beepPlayedRef = useRef<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateStatus = useCallback(() => {
    const currentDay = now.getDay();
    const currentTimeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false });
    const todaysSessions = SCHEDULE.filter(s => s.day === currentDay);
    const activeSessions = todaysSessions.filter(s => currentTimeStr >= s.startTime && currentTimeStr <= s.endTime);
    const upcomingToday = todaysSessions
      .filter(s => s.startTime > currentTimeStr)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    const next = upcomingToday[0] || undefined;
    let minsToStart: number | undefined;

    if (next) {
      const [h, m] = next.startTime.split(':').map(Number);
      const nextDate = new Date(now);
      nextDate.setHours(h, m, 0, 0);
      const diffMs = nextDate.getTime() - now.getTime();
      minsToStart = Math.ceil(diffMs / 60000);

      if (minsToStart === 5 && beepPlayedRef.current !== next.id) {
        new Audio(BEEP_SOUND_URL).play().catch(() => {});
        beepPlayedRef.current = next.id;
      }
    }

    if (activeSessions.length > 0) {
      setStatus({ type: StatusType.ACTIVE, currentSessions: activeSessions, nextSession: next, minutesToStart: minsToStart });
    } else if (next) {
      setStatus({ type: StatusType.UPCOMING, currentSessions: [], nextSession: next, minutesToStart: minsToStart });
    } else {
      setStatus({ type: StatusType.NONE, currentSessions: [] });
      beepPlayedRef.current = null;
    }
  }, [now]);

  useEffect(() => {
    calculateStatus();
    const interval = setInterval(calculateStatus, 30000);
    return () => clearInterval(interval);
  }, [calculateStatus]);

  const formatDate = (date: Date) => new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: '2-digit', month: 'long' }).format(date);
  const getDayName = (day: number) => ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][day];

  const getStatusStyles = () => {
    switch (status.type) {
      case StatusType.ACTIVE: return "from-rose-600 to-red-500 text-white shadow-red-200";
      case StatusType.UPCOMING: return "from-amber-400 to-orange-500 text-white shadow-amber-100";
      default: return "from-emerald-600 to-teal-500 text-white shadow-emerald-100";
    }
  };

  const renderStudentList = (students: string[], theme: string) => {
    const classRegex = /\((.*?)\)/;
    const sortedStudents = [...students].sort((a, b) => {
      const classA = a.match(classRegex)?.[1] || '';
      const classB = b.match(classRegex)?.[1] || '';
      return classA.localeCompare(classB) || a.localeCompare(b);
    });

    return (
      <ul className="grid grid-cols-1 gap-1.5">
        {sortedStudents.map((student, idx) => (
          <li key={idx} className="flex items-center gap-2.5 px-3 py-2 rounded-lg border shadow-sm text-sm font-bold bg-white text-slate-800">
            <span className={`w-2 h-2 rounded-full ${theme === 'red' ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`}></span>
            {student}
          </li>
        ))}
      </ul>
    );
  };

  const groupedSchedule = useMemo(() => [1, 2, 3, 4, 5].map(day => ({
    day, name: getDayName(day), sessions: SCHEDULE.filter(s => s.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime))
  })).filter(g => g.sessions.length > 0), []);

  const completedToday = useMemo(() => {
    const currentDay = now.getDay();
    const currentTimeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false });
    return SCHEDULE.filter(s => s.day === currentDay && s.endTime < currentTimeStr).sort((a, b) => b.endTime.localeCompare(a.endTime));
  }, [now]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 overflow-x-hidden">
      <header className={`sticky top-0 z-20 bg-gradient-to-r ${getStatusStyles()} py-3 px-4 shadow-lg text-center`}>
        <h1 className="text-xl font-black uppercase tracking-tight">
          {status.type === StatusType.ACTIVE ? "Anschlussförderung aktiv ❌" : status.type === StatusType.UPCOMING ? "Gleich Anschlussförderung ⚠️" : "Keine Anschlussförderung ✅"}
        </h1>
      </header>

      <main className="max-w-xl mx-auto mt-4 px-4 space-y-4">
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center gap-3">
          <p className="text-base font-extrabold text-slate-700">{formatDate(now)}</p>
          <p className="text-5xl font-black text-slate-900 mono tabular-nums">
            {now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </section>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setActiveTab(activeTab === 'sprachjongleure' ? 'none' : 'sprachjongleure')} className={`p-3 rounded-2xl border ${activeTab === 'sprachjongleure' ? 'bg-orange-50 border-orange-200' : 'bg-white text-slate-500'}`}>🎨 Sprachjongleure</button>
          <button onClick={() => setActiveTab(activeTab === 'all' ? 'none' : 'all')} className={`p-3 rounded-2xl border ${activeTab === 'all' ? 'bg-indigo-50 border-indigo-200' : 'bg-white text-slate-500'}`}>📅 Wochenplan</button>
          <button onClick={() => setActiveTab(activeTab === 'courses' ? 'none' : 'courses')} className={`p-3 rounded-2xl border ${activeTab === 'courses' ? 'bg-teal-50 border-teal-200' : 'bg-white text-slate-500'}`}>👥 Kursgruppen</button>
          <button onClick={() => setActiveTab(activeTab === 'done' ? 'none' : 'done')} className={`p-3 rounded-2xl border ${activeTab === 'done' ? 'bg-slate-100 border-slate-300' : 'bg-white text-slate-500'}`}>✅ Erledigt ({completedToday.length})</button>
        </div>

        {activeTab === 'all' && (
          <div className="bg-white rounded-2xl p-4 shadow-md border border-indigo-100 space-y-4 animate-in zoom-in-95">
            {groupedSchedule.map(g => (
              <div key={g.day}>
                <p className="text-[10px] font-black uppercase text-slate-400 text-center mb-2">{g.name}</p>
                {g.sessions.map(s => (
                  <div key={s.id} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg mb-1 border border-slate-100 text-xs">
                    <span className="font-black">{s.label} • {s.teacher}</span>
                    <span className="font-bold text-indigo-600">{s.startTime} - {s.endTime}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {status.type === StatusType.ACTIVE && status.currentSessions.map(s => (
          <section key={s.id} className="bg-white rounded-2xl shadow-xl border-t-4 border-red-500 p-5 space-y-4">
            <h3 className="text-2xl font-black text-slate-800">Raum {s.room} - {s.label}</h3>
            {renderStudentList(s.students, 'red')}
          </section>
        ))}
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
