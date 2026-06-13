import { analyzeURLRisk, URLRiskResult } from './urlEngine';
import { analyzeForm, FormAnalysisResult } from './formEngine';
import { analyzeSSL, SSLResult } from './sslEngine';

export interface FinalRiskReport {
  totalScore: number;
  threatLevel: 'Safe' | 'Low' | 'Medium' | 'High' | 'Critical';
  breakdown: {
    url: URLRiskResult;
    form: FormAnalysisResult;
    ssl: SSLResult;
  };
}

export const calculateFinalRisk = (url: string, forms: HTMLCollectionOf<HTMLFormElement>): FinalRiskReport => {
  const urlResult = analyzeURLRisk(url);
  const sslResult = analyzeSSL();
  
  let maxFormScore = 0;
  let formReasons: string[] = [];
  Array.from(forms).forEach(form => {
    const res = analyzeForm(form);
    if (res.score > maxFormScore) {
      maxFormScore = res.score;
      formReasons = res.reasons;
    }
  });

  const formResult: FormAnalysisResult = {
    isSensitive: maxFormScore > 0,
    score: maxFormScore,
    reasons: formReasons
  };

  // Weighted Scoring
  // URL: 40%, Form: 40%, SSL: 20%
  const totalScore = Math.min(
    Math.round((urlResult.score * 0.4) + (formResult.score * 0.4) + (sslResult.score * 0.2)),
    100
  );

  let threatLevel: FinalRiskReport['threatLevel'] = 'Safe';
  if (totalScore >= 85) threatLevel = 'Critical';
  else if (totalScore >= 70) threatLevel = 'High';
  else if (totalScore >= 40) threatLevel = 'Medium';
  else if (totalScore >= 20) threatLevel = 'Low';

  return {
    totalScore,
    threatLevel,
    breakdown: {
      url: urlResult,
      form: formResult,
      ssl: sslResult
    }
  };
};
