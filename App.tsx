import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ConfigData, PageEntry } from './types';
import * as FreiheitData from './bildanalyse/freiheitfuehrtvolk';
import * as NapoleonData from './bildanalyse/napoleon';
import { CONTENT_REGISTRY } from './analysisContent';
import { Infographic } from './bildanalyse/components/Infographic';

// Standard-Daten mit absoluten Pfaden (beginnend mit /)
const DEFAULT_PAGES: PageEntry[] = [
  {
    "id": "napoleon-1801",
    "title": "Napoleon überquert die Alpen",
    "subtitle": "Jacques-Louis David • 1801",
    "description": "Napoleon überquert die Alpen",
    "path": "bildanalyse/napoleon",
    "imageUrl": "/assets/images/napoleon-1801.jpg",
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
    "imageUrl": "/assets/images/freiheit-1830.jpg",
    "year": 1830,
    "tags": ["REVOLUTION", "19. JHD.", "FRANKREICH"],
    "focusTag": "SYMBOLBILD",
    "difficulty": 2,
    "shortText": "Das berühmte Gemälde zur Julirevolution. Wer ist die Frau in der Mitte?"
  }
];

// --- Zeitstrahl Komponente ---
const Timeline: React.FC<{ pages: PageEntry[], onNavigate: (path: string) => void }> = ({ pages, onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const getPos = (year: number) => {
    const minYear = 1750; 
    if (year < 1850) return 15 + ((year - 1750) / 100) * 20; 
    if (year < 1945) return 35 + ((year - 1850) / 95) * 35; 
    return 70 + ((year - 1945) / (currentYear - 1945)) * 20; 
  };

  const ticks = [ { y: 1750, l: "1750" }, { y: 1800, l: "1800" }, { y: 1850, l: "1850" }, { y: 1945, l: "1945" }, { y: 1989, l: "1989" }, { y: currentYear, l: "Heute" } ];
  const sortedPages = [...pages].sort((a, b) => a.year - b.year);

  return (
    <div className="w-full mb-32 mt-10 no-print">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-600 mb-2">Chronologische Übersicht</h2>
          <p className="text-slate-500 text-lg font-medium italic">Wähle ein Ereignis auf dem Zeitstrahl.</p>
        </div>
        <div className="relative h-24 flex items-center">
          <div className="absolute w-full h-1.5 bg-gradient-to-r from-slate-200 via-indigo-200 to-indigo-500 rounded-full"></div>
          {ticks.map(tick => (
            <div key={tick.y} className="absolute flex flex-col items-center" style={{ left: `${getPos(tick.y)}%` }}>
              <div className="w-1 h-3 bg-slate-300 mb-2 rounded-full"></div>
              <span className="text-[9px] font-black text-slate-400 uppercase absolute top-4 whitespace-nowrap">{tick.l}</span>
            </div>
          ))}
          {sortedPages.map((page, idx) => {
            const pos = getPos(page.year);
            const isTop = idx % 2 === 0;
            return (
              <div key={page.id} className="absolute group z-20 cursor-pointer" style={{ left: `${pos}%` }} onClick={() => onNavigate(page.path)}>
                <div className={`flex flex-col items-center absolute left-1/2 -translate-x-1/2 ${isTop ? 'bottom-4' : 'top-4'}`}>
                  {isTop && (
                    <div className="mb-4 transform transition-all group-hover:-translate-y-2 group-hover:scale-110">
                      <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-xl border border-slate-200 overflow-hidden group-hover:ring-8 ring-indigo-500/10">
                        <img src={page.imageUrl} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0" alt={page.title} />
                      </div>
                    </div>
                  )}
                  <div className="w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-lg group-hover:scale-150 transition-transform"></div>
                  {!isTop && (
                    <div className="mt-4 transform transition-all group-hover:translate-y-2 group-hover:scale-110">
                      <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-xl border border-slate-200 overflow-hidden group-hover:ring-8 ring-indigo-500/10">
                        <img src={page.imageUrl} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0" alt={page.title} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Hilfs-Komponente für interaktiven Text ---
const InteractiveText: React.FC<{ text: string, className?: string }> = ({ text, className = "text-slate-200 text-lg font-medium leading-relaxed italic" }) => {
  const [explanation, setExplanation] = useState<{ word: string, text: string } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const parts = text.split(/(\[\[.*?\]\])/g);

  return (
    <div className="relative inline">
      <p className={`${className} text-left`}>
        {parts.map((part, index) => {
          if (part.startsWith('[[') && part.endsWith(']]')) {
            const inner = part.slice(2, -2);
            const [word, info] = inner.includes('|') ? inner.split('|') : [inner, "Keine weitere Info"];
            return (
              <span 
                key={index} 
                ref={triggerRef}
                onClick={(e) => { e.stopPropagation(); setExplanation(explanation?.word === word ? null : { word, text: info }); }} 
                className="text-blue-400 underline decoration-dotted cursor-help font-black px-1 bg-blue-400/10 rounded hover:bg-blue-400/20"
              >
                {word}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </p>
      {explanation && (
        <div 
          className="absolute z-[200] bg-yellow-50 text-slate-900 p-4 rounded-xl shadow-2xl border-2 border-yellow-300 w-64 md:w-80 text-sm animate-in zoom-in-95 duration-200"
          style={{ top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="flex justify-between items-center mb-2 border-b border-yellow-200 pb-1">
             <span className="text-[10px] font-black uppercase text-yellow-600 tracking-widest">Worterklärung</span>
             <button onClick={() => setExplanation(null)} className="text-slate-400">✕</button>
          </div>
          <p className="font-bold leading-snug italic">{explanation.text}</p>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-50 border-t-2 border-l-2 border-yellow-300 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

const BildanalyseApp: React.FC<{ onBack: () => void, page: PageEntry, allPages: PageEntry[] }> = ({ onBack, page, allPages }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [ampelChoice, setAmpelChoice] = useState<null | 'red' | 'yellow' | 'green'>(null);
  const [showHints, setShowHints] = useState(false);
  const [showWritingHelp, setShowWritingHelp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isNapoleon = page.path.includes('napoleon');
  const isFreiheit = page.path.includes('freiheit');
  
  let steps = [];
  let ampelFeedback = {};

  if (isNapoleon) {
    steps = NapoleonData.NAPOLEON_STEPS;
    ampelFeedback = NapoleonData.AMPEL_FEEDBACK;
  } else if (isFreiheit) {
    steps = FreiheitData.STEPS;
    ampelFeedback = FreiheitData.AMPEL_FEEDBACK;
  } else {
    const data = CONTENT_REGISTRY[page.id];
    steps = data?.steps || [];
    ampelFeedback = data?.ampelFeedback || {};
  }

  const currentStep = steps[activeStep] || steps[0];
  if (!currentStep) return <div className="p-10 text-center">Fehler beim Laden der Analyseschritte.</div>;

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 overflow-x-hidden selection:bg-indigo-100">
      <nav className="no-print bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
          <div className="bg-slate-900 text-white p-2.5 rounded-lg group-hover:bg-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <div className="text-left leading-none">
            <h1 className="font-black text-[10px] uppercase text-slate-400">Galerie</h1>
            <p className="text-xs font-black uppercase mt-0.5">Bildanalyse</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
          {steps.map((step, idx) => (
            <button key={step.number} onClick={() => { setActiveStep(idx); window.scrollTo({top:0}); }} className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${activeStep === idx ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400'}`}>
              <span>{step.icon}</span>
            </button>
          ))}
        </div>
        <button onClick={handlePrint} className="text-slate-400 hover:text-indigo-600 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </button>
      </nav>

      <div className="no-print bg-[#FFD700] px-6 py-3 flex items-center justify-center text-center z-40 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">WICHTIG: BITTE SCHREIBE DEINE ERGEBNISSE UND GEDANKEN IN DEIN HEFT ODER AUF EIN BLATT PAPIER!</p>
      </div>

      <main className="no-print flex-grow container mx-auto px-4 py-8 md:py-12 max-w-4xl flex flex-col gap-10">
        <div className="bg-[#0F172A] rounded-[2.5rem] overflow-hidden shadow-2xl relative min-h-[340px] flex flex-col items-center justify-center p-8 transition-all duration-500 border-b-8 border-slate-950">
             {!currentStep.contextText ? (
               <div className="flex flex-col items-center text-center w-full">
                  <span className="bg-indigo-600 text-[10px] font-black tracking-widest uppercase px-5 py-2 rounded-full text-white mb-8">SCHRITT {currentStep.number} VON 5</span>
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 cursor-pointer hover:scale-105 transition-transform" onClick={() => setIsModalOpen(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 leading-none">{currentStep.title}</h2>
                  <p className="text-indigo-400 font-black text-sm uppercase">{currentStep.subtitle}</p>
               </div>
             ) : (
               <div className="w-full flex flex-col gap-6">
                 <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div className="text-left">
                      <span className="bg-amber-500 text-[9px] font-black uppercase px-4 py-1.5 rounded-full text-white mb-3 inline-block">HISTORISCHER KONTEXT</span>
                      <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase leading-none">{currentStep.title}</h2>
                    </div>
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl">{currentStep.icon}</div>
                 </div>
                 <div className="bg-slate-50/5 p-6 rounded-3xl border border-white/10 relative overflow-visible">
                    <InteractiveText text={currentStep.contextText} />
                 </div>
               </div>
             )}
             <div className="absolute inset-0 z-[-1] opacity-30 pointer-events-none">
               <img src={page.imageUrl} className="w-full h-full object-cover blur-3xl scale-110" alt="" />
             </div>
        </div>

        <div className="text-center px-4"><p className="text-2xl md:text-4xl font-black text-slate-800 leading-tight tracking-tight">{currentStep.description}</p></div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12">
          <div className="space-y-10">
            {currentStep.points.map((point, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-indigo-600 font-black text-sm flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">{i + 1}</span>
                <div className="pt-1 overflow-visible relative">
                   <InteractiveText text={point} className="text-xl md:text-2xl font-black text-slate-800 leading-tight" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button onClick={() => setShowHints(!showHints)} className="bg-[#0F172A] text-white rounded-[1.5rem] p-7 flex items-center justify-between transition-all border-b-8 border-slate-950 shadow-xl">
            <div className="flex items-center gap-5"><span className="text-3xl">🔍</span><span className="font-black uppercase text-sm md:text-lg">Detektiv-Lupe</span></div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-transform ${showHints ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showHints && (
            <div className="bg-amber-50 rounded-[1.5rem] p-6 border-4 border-amber-200/50 space-y-3 animate-in fade-in zoom-in-95">
              {currentStep.hints.map((h, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl font-black text-slate-700 flex items-center gap-4 shadow-sm border border-amber-100 italic">
                  <span className="text-amber-500">★</span> {h}
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setShowWritingHelp(!showWritingHelp)} className="bg-indigo-600 text-white rounded-[1.5rem] p-7 flex items-center justify-between transition-all border-b-8 border-indigo-900 shadow-xl">
            <div className="flex items-center gap-5"><span className="text-3xl">💡</span><span className="font-black uppercase text-sm md:text-lg">Schreib-Hilfe</span></div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-transform ${showWritingHelp ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showWritingHelp && (
            <div className="bg-indigo-50 rounded-[1.5rem] p-6 border-4 border-indigo-200/50 space-y-3 animate-in fade-in zoom-in-95">
              {currentStep.sentenceStarters.map((s, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl font-black text-indigo-900/70 italic shadow-sm border border-indigo-100">„{s}“</div>
              ))}
            </div>
          )}
        </div>

        {activeStep === 4 && (
          <div className="flex flex-col gap-10">
            <div className="bg-[#0F172A] rounded-[2.5rem] p-10 text-center border-b-8 border-slate-950 shadow-2xl">
               <h4 className="text-white font-black uppercase text-xs tracking-widest mb-10 opacity-60 italic">Glaubwürdigkeits-Check: Zeigt das Bild die Wahrheit?</h4>
               <div className="flex justify-center gap-8">
                  {['red', 'yellow', 'green'].map(color => (
                    <div key={color} className="relative group">
                       <button onClick={() => setAmpelChoice(color as any)} className={`w-20 h-20 rounded-full border-[6px] transition-all ${color === 'red' ? 'bg-red-600' : color === 'yellow' ? 'bg-yellow-400' : 'bg-green-500'} ${ampelChoice === color ? 'border-white scale-110 shadow-[0_0_30px_rgba(255,255,255,0.5)]' : 'border-black/30 opacity-40 grayscale'}`} />
                    </div>
                  ))}
               </div>
               {ampelChoice && <div className="mt-12 p-8 bg-slate-900/50 rounded-3xl font-bold text-slate-200 italic border border-white/10 animate-in fade-in zoom-in-95">{(ampelFeedback as any)[ampelChoice]}</div>}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-10 pb-20">
          <button disabled={activeStep === 0} onClick={() => { setActiveStep(prev => prev - 1); window.scrollTo({top: 0}); }} className="flex items-center gap-4 py-5 px-10 rounded-[1.5rem] font-black uppercase text-xs text-slate-400 border-2 border-slate-200 bg-white hover:bg-slate-50 transition-all disabled:opacity-0">Zurück</button>
          <button onClick={() => { if (activeStep < 4) { setActiveStep(prev => prev + 1); window.scrollTo({top: 0}); } else { handlePrint(); } }} className="flex items-center gap-4 py-6 px-14 rounded-[1.5rem] font-black uppercase text-xs text-white bg-indigo-600 shadow-2xl border-b-8 border-indigo-900 hover:bg-indigo-700 transition-all">
            {activeStep < 4 ? 'Weiter' : 'Analyse abschließen & Drucken'}
          </button>
        </div>
      </main>

      {isModalOpen && <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4 cursor-pointer animate-in fade-in" onClick={() => setIsModalOpen(false)}><img src={page.imageUrl} className="max-w-full max-h-[90vh] object-contain shadow-2xl" alt="" /></div>}

      <div className="hidden print:block absolute inset-0 bg-white">
        <Infographic ampelChoice={ampelChoice} steps={steps} title={page.title} artist={isNapoleon ? "J.-L. David" : isFreiheit ? "E. Delacroix" : "Unbekannt"} year={page.year.toString()} imageUrl={page.imageUrl} feedback={ampelFeedback as any} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [config, setConfig] = useState<ConfigData | null>({
    title: "Visual History",
    subtitle: "Digitale Bildanalyse für den Geschichtsunterricht an der BoWi",
    pages: DEFAULT_PAGES
  });
  const [activeView, setActiveView] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleHashChange = () => setActiveView(window.location.hash.replace('#', '') || null);
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    fetch('./pages.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setConfig(data); })
      .catch(() => {});

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string | null) => window.location.hash = path || '';
  const activePage = config?.pages.find(p => p.path === activeView);
  
  const displayedPages = useMemo(() => {
    if (!config) return [];
    let pages = [...config.pages].sort((a, b) => a.year - b.year);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pages = pages.filter(p => p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    }
    return pages;
  }, [config, searchQuery]);

  if (activeView && activePage) return <BildanalyseApp page={activePage} onBack={() => navigateTo(null)} allPages={config?.pages || []} />;
  
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-slate-900 selection:text-white font-sans overflow-x-hidden">
      <header className="pt-24 pb-16 px-6 text-center no-print">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-2 uppercase tracking-tighter italic leading-none">{config?.title || "Visual History"}</h1>
          <p className="text-sm font-black text-indigo-600 uppercase tracking-[0.2em] mb-6">Digitale Bildanalyse</p>
          <div className="w-24 h-2 bg-slate-900 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-slate-400 font-bold uppercase tracking-[0.4em]">{config?.subtitle}</p>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-12 no-print">
        {config && <Timeline pages={config.pages} onNavigate={navigateTo} />}
        
        <div className="mb-12 no-print flex flex-col items-center gap-8">
          <div className="relative w-full max-w-lg group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <span className="text-xl">🔎</span>
            </div>
            <input 
              type="text" 
              placeholder="Suche nach Thema oder Epoche..." 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {displayedPages.map((page) => (
            <div key={page.id} onClick={() => navigateTo(page.path)} className="group cursor-pointer flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-700">
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 border-2 border-slate-100 rounded-2xl p-3 bg-white shadow-md transition-all group-hover:shadow-2xl group-hover:border-indigo-100 group-hover:-translate-y-2">
                <img src={page.imageUrl} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-105 rounded-xl" alt={page.title} />
              </div>
              <div className="text-left px-2">
                <div className="flex gap-2 mb-3">
                  <span className="text-[9px] font-black text-slate-400 bg-slate-50 uppercase tracking-widest border border-slate-200 px-2 py-0.5 rounded-md">{page.year}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight group-hover:text-indigo-600 transition-colors">{page.title}</h3>
                <p className="text-slate-400 text-sm mt-2 font-medium italic leading-relaxed">{page.shortText}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="py-24 border-t border-slate-50 text-center text-slate-300 no-print">
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">&copy; {new Date().getFullYear()} • VISUAL HISTORY • DIGITAL ART ANALYSIS</p>
      </footer>
    </div>
  );
};

export default App;
