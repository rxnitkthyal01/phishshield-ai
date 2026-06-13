import { getLevenshteinDistance, getShannonEntropy, extractMainDomain, isHomograph } from '../utils/urlAnalysis';
import { TOP_BRANDS } from '../constants/brands';

export interface URLRiskResult {
  score: number;
  reasons: string[];
}

export const analyzeURLRisk = (url: string): URLRiskResult => {
  let score = 0;
  const reasons: string[] = [];
  
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const mainDomain = extractMainDomain(hostname);

    // 1. Homograph Detection
    if (isHomograph(hostname)) {
      score += 40;
      reasons.push('Punycode/Homograph domain detected');
    }

    // 2. Entropy Analysis (Suspicious randomness)
    const entropy = getShannonEntropy(hostname);
    if (entropy > 4.5) {
      score += 20;
      reasons.push('High domain entropy (looks randomized)');
    }

    // 3. Typosquatting Detection
    for (const brand of TOP_BRANDS) {
      const brandDomain = extractMainDomain(brand);
      
      // Skip if it's the actual brand
      if (mainDomain === brandDomain) continue;

      const distance = getLevenshteinDistance(mainDomain, brandDomain);
      
      // If distance is very small (1 or 2), it's likely a typo
      if (distance > 0 && distance <= 2) {
        score += 50;
        reasons.push(`Likely typosquatting attempt of "${brandDomain}"`);
        break; // Stop at first brand match
      }
    }

    // 4. Excessive Subdomains
    const subdomainCount = hostname.split('.').length - 2;
    if (subdomainCount > 3) {
      score += 15;
      reasons.push('Excessive subdomains detected');
    }

    // 5. Suspicious TLDs (Simplified list)
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top'];
    if (suspiciousTLDs.some(tld => hostname.endsWith(tld))) {
      score += 10;
      reasons.push('Uses a high-risk Top-Level Domain (TLD)');
    }

  } catch (e) {
    // Invalid URL
    return { score: 100, reasons: ['Invalid or malicious URL format'] };
  }

  return { 
    score: Math.min(score, 100), 
    reasons 
  };
};
