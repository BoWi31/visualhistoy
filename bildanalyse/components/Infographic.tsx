
import React from 'react';

// Wir definieren das Interface so, dass alle Props optional sind. 
// Das verhindert Abstürze, wenn die Komponente ohne Daten aufgerufen wird.
export interface AnalysisStep {
  number: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  hints: string[];
  sentenceStarters: string[];
  contextText?: string;
}

interface InfographicProps {
  ampelChoice?: 'red' | 'yellow' | 'green' | null;
  steps?: AnalysisStep[];
  title?: string;
  artist?: string;
  year?: string;
  imageUrl?: string;
  feedback?: { red: string; yellow: string; green: string };
}

export const Infographic: React.FC<InfographicProps> = ({ 
  ampelChoice = null, 
  steps = [], 
  title = "Unbekanntes Werk", 
  artist = "Unbekannter Künstler", 
  year = "o.D.", 
  imageUrl = "", 
  feedback = { red: "Kritisch", yellow: "Neutral", green: "Glaubwürdig" } 
}) => {
  // Kontext säubern (Entfernen der [[...|...]] Syntax für den Druck)
  const rawContext = steps && steps[2]?.contextText ? steps[2].contextText : "";
  const cleanContext = rawContext.replace(/\[\[(.*?)\|(.*?)\]\]/g, '$1');

  return (
    <div className="bg-white p-12 max-w-[210mm] mx-auto min-h-[297mm] flex flex-col gap-8 text-slate-900 font-sans print:m-0 print:p-12 shadow-none border-none">
      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-slate-900 pb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-1">Analyse-Protokoll</h1>
          <p className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em]">Visual History • Bildungsressource</p>
        </div>
        <div className="text-right text-[10px] font-black uppercase text-slate-400 space-y-2">
          <p className="border-b border-slate-200 pb-1">Name: _______________________________</p>
          <p className="border-b border-slate-200 pb-1">Datum: {new Date().toLocaleDateString('de-DE')}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* Bild & Basis-Infos */}
        <div className="col-span-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-2/3 border-[6px] border-slate-900 p-1.5 shadow-[12px_12px_0px_rgba(0,0,0,0.05)] bg-white">
            {imageUrl ? (
              <img src={imageUrl} alt={title} className="w-full h-auto object-contain" />
            ) : (
              <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-300 font-bold uppercase italic text-xs">Kein Bild geladen</div>
            )}
          </div>
          <div className="w-full md:w-1/3 space-y-6">
            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
              <h2 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4 border-b border-slate-200 pb-2">Basis-Informationen</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">Titel des Werks</p>
                  <p className="text-lg font-black leading-tight text-slate-900">{title}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">Künstler / Maler</p>
                  <p className="text-sm font-bold text-slate-700">{artist}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">Entstehungsjahr</p>
                  <p className="text-sm font-bold text-slate-700">{year}</p>
                </div>
              </div>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 h-32 flex items-start justify-center text-center">
               <p className="text-[10px] font-black text-slate-300 uppercase italic">Persönliche Notizen zur Bildwirkung...</p>
            </div>
          </div>
        </div>

        {/* Historischer Kontext */}
        <div className="col-span-12">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                  <span className="text-2xl">⏳</span> Historischer Kontext
                </h3>
                <p className="text-sm md:text-base leading-relaxed font-medium italic opacity-95">
                  {cleanContext || "Hier wurde kein Kontext-Text für die Analyse hinterlegt."}
                </p>
             </div>
          </div>
        </div>

        {/* Ergebnis */}
        <div className="col-span-12">
          <div className="bg-white border-4 border-slate-900 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center shadow-[12px_12px_0px_rgba(79,70,229,0.1)]">
             <div className="flex flex-col gap-4 items-center flex-shrink-0 bg-slate-900 p-6 rounded-3xl">
                <div className={`w-12 h-12 rounded-full border-4 border-white/20 ${ampelChoice === 'red' ? 'bg-red-500' : 'bg-white/10 opacity-20'}`}></div>
                <div className={`w-12 h-12 rounded-full border-4 border-white/20 ${ampelChoice === 'yellow' ? 'bg-yellow-400' : 'bg-white/10 opacity-20'}`}></div>
                <div className={`w-12 h-12 rounded-full border-4 border-white/20 ${ampelChoice === 'green' ? 'bg-green-500' : 'bg-white/10 opacity-20'}`}></div>
             </div>
             <div className="flex-grow">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mb-3">Ergebnis der Quellenkritik:</h4>
                <p className="text-lg font-black text-slate-900 mb-2 leading-snug">
                  {ampelChoice === 'red' ? 'Kritisch - Inszenierung' : ampelChoice === 'yellow' ? 'Teilweise glaubwürdig' : ampelChoice === 'green' ? 'Glaubwürdige Darstellung' : 'Noch keine Bewertung erfolgt'}
                </p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-sm font-medium text-slate-600 leading-relaxed">
                   {ampelChoice ? (feedback as any)[ampelChoice] : "Führen Sie die 5 Schritte der Analyse durch, um hier eine automatisierte Bewertung zu erhalten."}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-10 border-t border-slate-100 flex justify-between items-center opacity-30">
        <div className="flex items-center gap-2">
           <div className="bg-slate-900 w-6 h-6 rounded flex items-center justify-center text-[10px] text-white font-black">VH</div>
           <p className="text-[10px] font-black uppercase tracking-[0.3em]">Digitale Bildanalyse • Protokoll</p>
        </div>
        <p className="text-[10px] font-black italic">Protokoll-Seite 1 / 1</p>
      </div>
    </div>
  );
};
