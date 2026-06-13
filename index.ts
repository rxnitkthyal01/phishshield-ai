import { calculateFinalRisk } from '../engines/scoringEngine';
import { createWarningBanner } from './ui';
import { createCriticalBlockOverlay } from './blockOverlay';

console.log('PhishShield AI Content Script Active');

const performSecurityAudit = async () => {
  const report = calculateFinalRisk(window.location.href, document.forms);
  
  // If local risk is extreme, block immediately
  if (report.totalScore >= 90) {
    createCriticalBlockOverlay('Highly suspicious URL and form structure detected locally.');
    return;
  }

  // If local risk is medium or high, trigger Deep AI analysis
  if (report.totalScore >= 30) {
    const context = {
      url: window.location.href,
      page_title: document.title,
      meta_tags: {
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        og_title: document.querySelector('meta[property="og:title"]')?.getAttribute('content')
      },
      brand_claims: Array.from(document.querySelectorAll('h1, h2')).map(el => el.textContent?.trim()).filter(Boolean).slice(0, 5)
    };

    chrome.runtime.sendMessage({ type: 'DEEP_ANALYSIS', data: context }, (response) => {
      if (response) {
        if (response.risk_score >= 85) {
          createCriticalBlockOverlay(response.justification);
        } else if (response.risk_score >= 50) {
          createWarningBanner([response.justification]);
        }
      }
    });
  }
};

// Run on load and whenever DOM changes
performSecurityAudit();

const observer = new MutationObserver(() => {
  performSecurityAudit();
});

observer.observe(document.body, { childList: true, subtree: true });
