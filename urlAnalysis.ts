/**
 * Calculates the Levenshtein distance between two strings.
 * Used for detecting typosquatting (e.g., gooogle.com vs google.com)
 */
export const getLevenshteinDistance = (s1: string, s2: string): number => {
  const m = s1.length;
  const n = s2.length;
  const d: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      const substitutionCost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + substitutionCost // substitution
      );
    }
  }

  return d[m][n];
};

/**
 * Calculates Shannon Entropy of a string.
 * High entropy often indicates randomly generated (DGA) or suspicious domains.
 */
export const getShannonEntropy = (str: string): number => {
  const frequencies: Record<string, number> = {};
  for (const char of str) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }

  let entropy = 0;
  const len = str.length;
  for (const char in frequencies) {
    const p = frequencies[char] / len;
    entropy -= p * Math.log2(p);
  }

  return entropy;
};

/**
 * Checks if a domain looks like a homograph attack (punycode).
 */
export const isHomograph = (domain: string): boolean => {
  return domain.startsWith('xn--');
};

/**
 * Extracts the main domain from a hostname.
 */
export const extractMainDomain = (hostname: string): string => {
  const parts = hostname.split('.');
  if (parts.length <= 2) return hostname;
  return parts.slice(-2).join('.');
};
