export const createCriticalBlockOverlay = (justification: string) => {
  const overlay = document.createElement('div');
  overlay.id = 'phishshield-critical-block';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #7f1d1d;
    color: white;
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    padding: 40px;
    text-align: center;
  `;

  overlay.innerHTML = `
    <div style="max-width: 600px;">
      <div style="font-size: 80px; margin-bottom: 20px;">🛑</div>
      <h1 style="font-size: 32px; font-weight: 800; margin-bottom: 16px;">Security Threat Blocked</h1>
      <p style="font-size: 18px; line-height: 1.6; margin-bottom: 32px; opacity: 0.9;">
        PhishShield AI has blocked this page because it was identified as a <strong>malicious phishing site</strong> attempting to steal your credentials.
      </p>
      <div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 8px; margin-bottom: 40px; text-align: left;">
        <strong style="display: block; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">AI Detection Insight:</strong>
        <p style="font-size: 15px; margin: 0;">${justification}</p>
      </div>
      <div style="display: flex; gap: 16px; justify-content: center;">
        <button id="phishshield-back" style="background: white; color: #7f1d1d; border: none; padding: 12px 24px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 16px;">Get Me Out of Here</button>
        <button id="phishshield-proceed" style="background: transparent; color: white; border: 1px solid white; padding: 12px 24px; border-radius: 6px; font-weight: 500; cursor: pointer; font-size: 14px; opacity: 0.7;">I trust this site (Dangerous)</button>
      </div>
    </div>
  `;

  document.documentElement.appendChild(overlay);

  document.getElementById('phishshield-back')?.addEventListener('click', () => {
    window.history.back();
    if (window.history.length <= 1) window.close();
  });

  document.getElementById('phishshield-proceed')?.addEventListener('click', () => {
    if (confirm('PhishShield AI strongly recommends NOT visiting this site. Credentials entered here will likely be stolen. Are you sure?')) {
      overlay.remove();
    }
  });
};
