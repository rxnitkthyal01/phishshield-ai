# PhishShield AI - Architecture & Deployment Guide

## 1. System Architecture

PhishShield AI is an enterprise-grade cybersecurity platform that uses a **Hybrid-Defense Model**.

### A. Browser Extension (The Sentinel) - Manifest V3
- **Layer 1: URL Intelligence:** Local analysis of domain entropy, homographs, and typosquatting (Levenshtein Distance).
- **Layer 2: Form Security:** Real-time DOM monitoring for sensitive inputs and suspicious submission endpoints.
- **Layer 3: SSL Integrity:** Protocol and certificate status verification.
- **Layer 4: Real-time UI:** Direct injection of warning banners and critical block overlays into the user's browsing context.

### B. FastAPI Backend (The Brain) - Python
- **AI Service:** Orchestrates brand impersonation analysis using **Google Gemini 1.5 Flash**.
- **Intelligence Service:** Aggregates global threat data from **VirusTotal** and PhishTank.
- **Unified API:** A central point for the extension to request "Deep Analysis" when local heuristics detect risk.

### C. Communication Flow
1. **Visit:** User visits a URL.
2. **Local Scan:** Extension runs Layer 1-3 (0ms latency).
3. **Threshold Trigger:** If Risk > 30, Extension sends page context (metadata, brand claims) to Backend.
4. **AI Analysis:** Backend invokes Gemini to evaluate brand impersonation.
5. **Scoring:** Signals are fused into a 0-100 score.
6. **Enforcement:** Extension displays warning or blocks the page.

---

## 2. Deployment Guide

### Backend (FastAPI)
1. **Navigate:** `cd backend`
2. **Environment:** Create a `.env` file based on `setup_env.py`:
   ```env
   GEMINI_API_KEY=your_google_ai_key
   VIRUSTOTAL_API_KEY=your_vt_key
   ```
3. **Dependencies:** `pip install -r requirements.txt`
4. **Run:** `python main.py` (Default: http://localhost:8000)

### Extension (Chrome/Edge)
1. **Navigate:** `cd apps/extension`
2. **Install:** `npm install`
3. **Build:** `npm run build`
4. **Load:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer Mode**.
   - Click **Load unpacked** and select the `apps/extension/dist` folder.

---

## 3. Future Roadmap
- **Visual Similarity Engine:** Implement screenshot-based analysis on the backend.
- **OAuth Abuse Detection:** Monitor for malicious "Sign in with..." popups.
- **Enterprise Dashboard:** Full history and analytics for security teams.
