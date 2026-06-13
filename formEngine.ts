export interface FormAnalysisResult {
  isSensitive: boolean;
  score: number;
  reasons: string[];
}

export const analyzeForm = (form: HTMLFormElement): FormAnalysisResult => {
  const reasons: string[] = [];
  let score = 0;

  const inputs = form.querySelectorAll('input');
  const passwordFields = form.querySelectorAll('input[type="password"]');
  const textFields = form.querySelectorAll('input[type="text"], input[type="email"]');
  
  // 1. Check for password fields
  if (passwordFields.length > 0) {
    score += 40;
    reasons.push('Contains password input fields');
  }

  // 2. Check for suspicious keywords in inputs (MFA, OTP, SSN)
  const suspiciousKeywords = ['otp', 'mfa', 'code', 'token', 'ssn', 'social security'];
  inputs.forEach(input => {
    const name = (input.getAttribute('name') || '').toLowerCase();
    const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
    if (suspiciousKeywords.some(kw => name.includes(kw) || placeholder.includes(kw))) {
      score += 30;
      reasons.push(`Suspicious field detected: ${kw}`);
    }
  });

  // 3. Analyze form action (submission endpoint)
  const action = form.getAttribute('action') || '';
  if (action) {
    try {
      const actionUrl = new URL(action, window.location.href);
      const currentHost = window.location.hostname;
      
      // Cross-domain form submission is common in phishing
      if (actionUrl.hostname !== currentHost && !actionUrl.hostname.includes(currentHost.split('.').slice(-2).join('.'))) {
        score += 50;
        reasons.push(`Form submits to an external domain: ${actionUrl.hostname}`);
      }
    } catch (e) {
      score += 20;
      reasons.push('Form has an invalid or suspicious action URL');
    }
  } else {
    // Phishing kits often use JS handlers instead of traditional 'action'
    score += 10;
    reasons.push('Form uses JavaScript-only submission (no action attribute)');
  }

  return {
    isSensitive: score >= 40,
    score: Math.min(score, 100),
    reasons
  };
};
