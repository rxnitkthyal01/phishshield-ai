export const createWarningBanner = (reasons: string[]) => {
  const banner = document.createElement('div');
  banner.id = 'phishshield-warning-banner';
  banner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fee2e2;
    border-bottom: 2px solid #ef4444;
    color: #991b1b;
    padding: 12px 24px;
    z-index: 2147483647;
    font-family: sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  `;

  banner.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 24px;">⚠️</span>
      <div>
        <strong style="display: block;">PhishShield AI: Suspicious Page Detected</strong>
        <span style="font-size: 12px;">${reasons.join(' • ')}</span>
      </div>
    </div>
    <button id="phishshield-ignore" style="background: #ef4444; color: white; border: none; padding: 6px 12px; rounded: 4px; cursor: pointer; font-weight: 600;">Ignore</button>
  `;

  document.body.prepend(banner);

  document.getElementById('phishshield-ignore')?.addEventListener('click', () => {
    banner.remove();
  });
};
