import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { STEPS, INSTRUCTION_HINT, AMPEL_FEEDBACK } from './freiheitfuehrtvolk';
import { Infographic } from './components/Infographic';

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showWritingHelp, setShowWritingHelp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ampelChoice, setAmpelChoice] = useState<null | 'red' | 'yellow' | 'green'>(null);

  const paintingUrl = "assets/images/freiheit-1830.jpg";
  const currentStep = STEPS[activeStep];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 overflow-x-hidden selection:bg-blue-200">
      {/* Header Navigation */}
      <nav className="no-print bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-lg">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
             </svg>
          </div>
          <div className="text-left leading-none">
            <h1 className="font-black text-xs uppercase tracking-tight text-slate-900">Bildanalyse</h1>
            <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mt-0.5">Geschichte 7</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {STEPS.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => { setActiveStep(idx); setShowHints(false); setShowWritingHelp(false); setAmpelChoice(null); }}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
                activeStep === idx 
                ? 'bg-white text-slate-900 shadow-lg border border-slate-200 ring-2 ring-indigo-500/20' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className={activeStep === idx ? "scale-110" : ""}>{step.icon}</span>
            </button>
          ))}
        </div>

        <button onClick={handlePrint} className="bg-slate-900 hover:bg-black text-white p-3 rounded-xl transition-all shadow-md">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
           </svg>
        </button>
      </nav>

      {/* Gelbes Banner (WICHTIG) */}
      <div className="no-print bg-[#FFD700] border-b border-black/10 px-6 py-4 flex items-center justify-center gap-3 shadow-sm z-40">
        <span className="text-2xl">📝</span>
        <p className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-widest text-center">
          {INSTRUCTION_HINT}
        </p>
      </div>

      <main className="no-print flex-grow container mx-auto px-4 py-8 md:py-12 max-w-4xl flex flex-col gap-10">
        
        {/* Zentrales Schwarzes Modul */}
        <div className="bg-[#0F172A] rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[340px]">
             <span className="bg-blue-600/90 text-[10px] font-black tracking-widest uppercase px-5 py-2 rounded-full text-white mb-8 border border-blue-400/20">
               SCHRITT {currentStep.number} VON 5
             </span>
             
             {/* Zentrales Icon */}
             <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-800/50 rounded-full flex items-center justify-center mb-8 border border-white/10 group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>

             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
               {currentStep.title}
             </h2>
             <p className="text-blue-400 font-black text-sm md:text-xl italic uppercase tracking-tight">
               {currentStep.subtitle}
             </p>
          </div>
          
          {/* Hintergrund-Bild */}
          <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none">
             <img src={paintingUrl} className="w-full h-full object-cover blur-2xl" alt="" />
          </div>
        </div>

        {/* Beschreibungstext */}
        <div className="text-center px-4">
           <p className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
             {currentStep.description}
           </p>
        </div>

        {/* Fragen-Liste */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8 md:p-12">
          <div className="space-y-8">
            {currentStep.points.map((point, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-blue-600 font-black text-sm md:text-lg shadow-sm flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-xl md:text-2xl font-black text-slate-800 leading-tight pt-1 md:pt-2">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => setShowHints(!showHints)}
            className="bg-[#0F172A] hover:bg-slate-800 text-white rounded-[1.5rem] p-7 md:p-8 flex items-center justify-between transition-all group active:scale-95 border-b-8 border-slate-900 shadow-xl"
          >
            <div className="flex items-center gap-5">
              <span className="text-3xl">🔍</span>
              <span className="font-black uppercase tracking-[0.2em] text-sm md:text-lg">Detektiv-Lupe</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-transform ${showHints ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showHints && (
            <div className="bg-amber-50 rounded-[1.5rem] p-6 border-4 border-amber-200/50 space-y-3 animate-in slide-in-from-top-4 duration-300">
              {currentStep.hints.map((h, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl font-black text-slate-700 flex items-center gap-4 shadow-sm border border-amber-100 italic">
                  <span className="text-amber-500">★</span> {h}
                </div>
              ))}
            </div>
          )}

          <button 
            onClick={() => setShowWritingHelp(!showWritingHelp)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] p-7 md:p-8 flex items-center justify-between transition-all active:scale-95 border-b-8 border-indigo-900 shadow-xl"
          >
            <div className="flex items-center gap-5">
              <span className="text-3xl">💡</span>
              <span className="font-black uppercase tracking-[0.2em] text-sm md:text-lg">Schreib-Hilfe</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-transform ${showWritingHelp ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showWritingHelp && (
            <div className="bg-indigo-50 rounded-[1.5rem] p-6 border-4 border-indigo-200/50 space-y-3 animate-in slide-in-from-top-4 duration-300">
              {currentStep.sentenceStarters.map((s, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl font-black text-indigo-900/70 italic shadow-sm border border-indigo-100">
                   „{s}“
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ampel */}
        {activeStep === 4 && (
          <div className="bg-[#0F172A] rounded-[2.5rem] p-10 text-center border-b-8 border-slate-900 shadow-2xl">
             <h4 className="text-white font-black uppercase text-xs tracking-widest mb-10 opacity-60 italic">Wie sicher fühlst du dich heute?</h4>
             <div className="flex justify-center gap-10">
                {['red', 'yellow', 'green'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAmpelChoice(color as any)}
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-[6px] transition-all active:scale-75 ${
                      color === 'red' ? 'bg-red-600' : color === 'yellow' ? 'bg-yellow-400' : 'bg-green-500'
                    } ${ampelChoice === color ? 'border-white scale-125 shadow-[0_0_30px_white]' : 'border-black/30 opacity-30 grayscale'}`}
                  />
                ))}
             </div>
             {ampelChoice && (
               <div className="mt-12 p-6 bg-slate-800 rounded-2xl font-bold text-slate-300 italic animate-in zoom-in-95 duration-300">
                 {AMPEL_FEEDBACK[ampelChoice as keyof typeof AMPEL_FEEDBACK]}
               </div>
             )}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-10 pb-20">
          <button 
            disabled={activeStep === 0}
            onClick={() => { setActiveStep(prev => prev - 1); setShowHints(false); setShowWritingHelp(false); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            className="flex items-center gap-4 py-5 px-10 rounded-[1.5rem] font-black uppercase tracking-widest text-xs md:text-sm text-slate-400 border-2 border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-0 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>

          <button 
            onClick={() => { 
              if (activeStep < 4) {
                setActiveStep(prev => prev + 1); 
                setShowHints(false); 
                setShowWritingHelp(false); 
                window.scrollTo({top: 0, behavior: 'smooth'});
              } else {
                handlePrint();
              }
            }}
            className="flex items-center gap-4 py-6 px-14 rounded-[1.5rem] font-black uppercase tracking-widest text-xs md:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xl active:scale-95 border-b-8 border-indigo-900 transition-all"
          >
            {activeStep < 4 ? 'Weiter' : 'Fertig & Drucken'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)}>
           <img src={paintingUrl} className="max-w-full max-h-full object-contain shadow-2xl" alt="Gemälde" />
        </div>
      )}

      {/* Print View */}
      <div className="hidden print:block absolute inset-0 bg-white">
        <Infographic 
          ampelChoice={ampelChoice} 
          steps={STEPS} 
          title="Die Freiheit führt das Volk" 
          artist="Eugène Delacroix" 
          year="1830" 
          imageUrl={paintingUrl} 
          feedback={AMPEL_FEEDBACK} 
        />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);