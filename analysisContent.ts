
import { AnalysisStep } from './bildanalyse/freiheitfuehrtvolk';

/**
 * Registry für Bildanalysen, die keine eigene .ts Datei haben.
 * Da aktuell nur Napoleon und Freiheit aktiv sind, bleibt dieses Objekt leer.
 * Dies verhindert auch Build-Fehler durch fälschlicherweise eingefügten JSX-Code.
 */
export const CONTENT_REGISTRY: Record<string, { 
  steps: AnalysisStep[], 
  ampelFeedback: any, 
  digitalCheck?: string, 
  comparison?: string 
}> = {};
