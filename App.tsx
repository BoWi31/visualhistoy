import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PageEntry } from './types';
import * as FreiheitData from './bildanalyse/freiheitfuehrtvolk';
import * as NapoleonData from './bildanalyse/napoleon';
import { CONTENT_REGISTRY } from './analysisContent';
import { Infographic } from './bildanalyse/components/Infographic';

// Hardcoded Daten für maximale Zuverlässigkeit
const PAGES_DATA: PageEntry[] = [
  {
    "id": "napoleon-1801",
    "title": "Napoleon überquert die Alpen",
    "subtitle": "Jacques-Louis David • 1801",
    "description": "Napoleon überquert die Alpen",
    "path": "bildanalyse/napoleon",
    "imageUrl": "./assets/images/napoleon-1801.jpg",
    "year": 1801,
    "tags": ["NEUZEIT", "FRANKREICH", "MACHTBILD"],
    "focusTag": "MACHTBILD",
    "difficulty": 1,
    "shortText": "Napoleon als strahlender Held auf einem Pferd – Inszenierung oder Wahrheit?"
  },
  {
    "id": "freiheit-1830",
    "title": "Die Freiheit führt das Volk",
    "subtitle": "Eugène Delacroix • 1830",
    "description": "Die Freiheit führt das Volk",
    "path": "bildanalyse/freiheit",
    "imageUrl": "./assets/images/freiheit-1830.jpg",
    "year": 1830,
    "tags": ["REVOLUTION", "19. JHD.", "FRANKREICH"],
    "focusTag": "SYMBOLBILD",
    "difficulty": 2,
    "shortText": "Das berühmte Gemälde zur Julirevolution. Wer ist die Frau in der Mitte?"
  }
];

const Timeline: React.FC<{ pages: PageEntry[], onNavigate: (path: string) => void }> = ({ pages, onNavigate }) => {
  const getPos = (year: number) => {
    const min = 1750, max = 2025;
    return 10 + ((year - min) / (max - min)) * 80;
  };

  return (
    <div className="w-full mb-32 mt-10 no-print">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-600 mb-8">Zeitstrahl</h2>
        <div className="relative h-1.5 bg-slate-200 rounded-full flex items-center">
          {pages.map((page, idx) => (
            <div 
              key={page.id} 
              className="absolute cursor-pointer group" 
              style={{ left: `${getPos(page.year)}%` }}
              onClick={() => onNavigate(page.path)}
            >
              <div className={`flex flex-col items-center absolute left-1/2 -translate-x-1/2 ${idx % 2 === 0 ? 'bottom-4' : 'top-4'}`}>
                <div className="w-12 h-12 bg-white p-1 rounded-lg shadow-md border border-slate-200 overflow-hidden group-hover:scale-125 transition-transform">
                  <img src={page.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="w-3 h-3 bg-indigo-600 rounded-full border-2 border-white mt-1"></div>
                <span className="text-[10px] font-bold text-slate-400 mt-1">{page.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InteractiveText: React.FC<{ text: string, className?: string }> = ({ text, className = "text-slate-200 text-lg italic" }) => {
  const [expl, setExpl] = useState<{ w: string, t: string } | null>(null);
  const parts = text.split(/(\[\[.*?\]\])/g);
  return (
    <div className="relative">
      <p className={className}>
        {parts.map((p, i) => {
          if (p.startsWith('[[') && p.endsWith(']]')) {
            const [w, t] = p.slice(2, -2).split('|');
            return <span key={i} onClick={() => setExpl(expl?.w === w ? null : { w, t })} className="text-blue-400 underline cursor-help px-1">{w}</span>;
          }
          return <span key={i}>{p}</span>;
        })}
      </p>
      {expl && <div className="absolute top-full mt-2 bg-yellow-50 p-4 rounded-xl shadow-xl border border-yellow-200 text-slate-800 text-sm z-50 w-64"><b>{expl.w}:</b> {expl.t}</div>}
    </div>
  );
};

const BildanalyseApp: React.FC<{ onBack: () => void, page: PageEntry }> = ({ onBack, page }) => {
  const [step, setStep] = useState(0);
  const [ampel, setAmpel] = useState<null | string>(null);
  const isNap = page.path.includes('napoleon');
  const steps = isNap ? NapoleonData.NAPOLEON_STEPS : FreiheitData.STEPS;
  const feedback = isNap ? NapoleonData.AMPEL_FEEDBACK : FreiheitData.AMPEL_FEEDBACK;
  const curr = steps[step];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="no-print bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50">
        <button onClick={onBack} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold uppercase text-xs">← Zurück</button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <button key={i} onClick={() => setStep(i)} className={`w-8 h-8 rounded-lg font-bold ${step === i ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{i + 1}</button>
          ))}
        </div>
        <button onClick={() => window.print()} className="p-2 text-slate-400">🖨️</button>
      </nav>

      <main className="no-print flex-grow max-w-3xl mx-auto w-full p-6 space-y-8">
        <div className="bg-slate-900 rounded-[2rem] p-8 text-center relative overflow-hidden">
          <img src={page.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl" alt="" />
          <div className="relative z-10">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Schritt {step + 1}</span>
            <h2 className="text-3xl font-black text-white uppercase mt-2">{curr.title}</h2>
            {curr.contextText && <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10"><InteractiveText text={curr.contextText} /></div>}
          </div>
        </div>

        <div className="text-xl font-bold text-slate-800 text-center">{curr.description}</div>

        <div className="space-y-4">
          {curr.points.map((p, i) => (
            <div key={i} className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <span className="bg-white border w-8 h-8 rounded-lg flex items-center justify-center font-bold text-indigo-600 flex-shrink-0">{i + 1}</span>
              <InteractiveText text={p} className="text-lg font-bold text-slate-700" />
            </div>
          ))}
        </div>

        {step === 4 && (
          <div className="bg-slate-900 p-8 rounded-[2rem] text-center">
            <h3 className="text-white font-bold uppercase text-xs mb-6 opacity-50">Glaubwürdigkeits-Check</h3>
            <div className="flex justify-center gap-6">
              {['red', 'yellow', 'green'].map(c => (
                <button key={c} onClick={() => setAmpel(c)} className={`w-16 h-16 rounded-full border-4 ${c==='red'?'bg-red-600':c==='yellow'?'bg-yellow-400':'bg-green-500'} ${ampel===c?'border-white scale-110 shadow-lg':'border-transparent opacity-30'}`} />
              ))}
            </div>
            {ampel && <div className="mt-6 text-slate-300 italic font-medium">{(feedback as any)[ampel]}</div>}
          </div>
        )}
      </main>

      <div className="hidden print:block"><Infographic ampelChoice={ampel as any} steps={steps} title={page.title} artist={isNap ? "David" : "Delacroix"} year={page.year.toString()} imageUrl={page.imageUrl} feedback={feedback as any} /></div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<string | null>(null);
  
  useEffect(() => {
    const h = () => setView(window.location.hash.replace('#', '') || null);
    window.addEventListener('hashchange', h);
    h();
    return () => window.removeEventListener('hashchange', h);
  }, []);

  const active = PAGES_DATA.find(p => p.path === view);

  if (view && active) return <BildanalyseApp page={active} onBack={() => window.location.hash = ''} />;

  return (
    <div className="min-h-screen bg-white">
      <header className="py-20 px-6 text-center">
        <h1 className="text-7xl font-black italic uppercase tracking-tighter">Visual History</h1>
        <p className="text-indigo-600 font-bold uppercase tracking-widest mt-2">Digitale Bildanalyse • BoWi</p>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Timeline pages={PAGES_DATA} onNavigate={(p) => window.location.hash = p} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          {PAGES_DATA.map(p => (
            <div key={p.id} onClick={() => window.location.hash = p.path} className="group cursor-pointer">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border-2 border-slate-100 p-2 bg-white shadow-sm group-hover:shadow-2xl transition-all">
                <img src={p.imageUrl} className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
              </div>
              <div className="mt-6">
                <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded uppercase">{p.year}</span>
                <h3 className="text-3xl font-black uppercase mt-2 group-hover:text-indigo-600">{p.title}</h3>
                <p className="text-slate-400 mt-2 italic">{p.shortText}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
