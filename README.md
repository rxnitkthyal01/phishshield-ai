# 🛡️ PhishShield AI

> AI-Powered Browser Extension for Real-Time Phishing Detection, Brand Impersonation Analysis, and Credential Theft Prevention.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green.svg)
![AI Powered](https://img.shields.io/badge/AI-Powered-orange.svg)
![Security](https://img.shields.io/badge/Cybersecurity-Tool-red.svg)

---

## Overview

PhishShield AI is an intelligent browser security platform designed to detect phishing websites, fake login pages, typosquatting domains, credential harvesting attempts, and brand impersonation attacks before users submit sensitive information.

Unlike traditional blacklist-based solutions, PhishShield AI combines:

* AI-powered content analysis
* Domain intelligence
* SSL/TLS verification
* Login form inspection
* Threat intelligence feeds
* Brand impersonation detection
* Real-time risk scoring

to provide proactive protection against modern phishing attacks.

---

## Key Features

### AI-Powered Website Analysis

* Detects phishing pages using Gemini AI
* Analyzes page titles, forms, metadata, and visible content
* Identifies suspicious language and social engineering patterns

### Brand Impersonation Detection

Detects fake pages pretending to be:

* Google
* Microsoft
* Amazon
* Facebook
* Apple
* PayPal
* GitHub
* Discord
* Banking Portals

---

### Typosquatting Detection

Examples:

```text
gooogle.com
g00gle.com
micros0ft-login.com
amaz0n-security.net
```

Uses:

* Fuzzy matching
* Levenshtein distance
* Brand similarity analysis

---

### Login Form Security Analysis

Detects:

* Fake login forms
* Hidden credential collection
* Suspicious form actions
* Password harvesting attempts

---

### SSL/TLS Verification

Checks:

* HTTPS availability
* Certificate validity
* Expiration dates
* Security status

---

### Threat Intelligence Integration

Optional integrations:

* VirusTotal
* Google Safe Browsing
* OpenPhish
* PhishTank
* AbuseIPDB

---

### Risk Scoring Engine

Each website receives a security score.

| Score  | Risk Level  |
| ------ | ----------- |
| 0–25   | Safe        |
| 26–50  | Low Risk    |
| 51–70  | Medium Risk |
| 71–85  | High Risk   |
| 86–100 | Critical    |

---

### Real-Time Browser Protection

Before credentials are submitted:

* Analyze website
* Evaluate threat score
* Display warning banner
* Block dangerous submissions (Critical mode)

---

## Architecture

```text
Browser Extension
       │
       ▼
 Content Script
       │
       ▼
 Background Service Worker
       │
       ▼
 Security Engine
       │
 ┌─────┼─────┐
 ▼     ▼     ▼
URL  Forms  SSL
Scan Scan  Check
 │     │     │
 └─────┼─────┘
       ▼
 AI Analysis API
       ▼
 Gemini AI
       ▼
 Risk Score Engine
       ▼
 User Dashboard
```

---

## Project Structure

```text
phishshield-ai/
│
├── apps/
│   └── extension/
│       ├── src/
│       ├── public/
│       ├── popup/
│       ├── content/
│       ├── background/
│       └── dist/
│
├── backend/
│   ├── ai/
│   ├── threat_intel/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── main.py
│
├── docs/
│
├── screenshots/
│
├── requirements.txt
├── package.json
├── README.md
└── .env.example
```

---

# Installation Guide

## Step 1 — Move Project Files

Move the project folder from:

```text
C:\Users\ACER\.gemini\tmp\system32\phishshield-ai
```

to a permanent location such as:

```text
D:\Projects\phishshield-ai
```

---

# Backend Setup

## Install Dependencies

Open a terminal inside the backend directory.

```bash
pip install -r requirements.txt
```

---

## Configure Environment Variables

Create a `.env` file.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
VIRUSTOTAL_API_KEY=your_virustotal_key
```

### API Keys

Gemini API:

https://aistudio.google.com/

VirusTotal:

https://www.virustotal.com/

---

## Start Backend Server

```bash
python main.py
```

Expected output:

```text
Server running on:
http://localhost:8000
```

---

# Browser Extension Setup

Navigate to:

```bash
apps/extension
```

Install dependencies:

```bash
npm install
```

Build extension:

```bash
npm run build
```

This generates:

```text
dist/
```

---

# Load Extension

Chrome:

```text
chrome://extensions
```

Edge:

```text
edge://extensions
```

### Enable Developer Mode

1. Open Extensions page
2. Enable Developer Mode
3. Click "Load unpacked"
4. Select:

```text
apps/extension/dist
```

---

# Testing

## Safe Website

Visit:

```text
https://google.com
```

Expected:

```text
Threat Level: Safe
```

---

## Suspicious Website

Example:

```text
https://g00gle-login-example.com
```

Expected:

```text
⚠ Warning Detected
Brand Impersonation Suspected
Threat Level: High
```

---

# Dashboard Features

The extension dashboard provides:

* Website Trust Score
* SSL Status
* Domain Intelligence
* AI Findings
* Threat Breakdown
* Risk Explanations
* Security Recommendations

---

# Future Roadmap

### v2

* Screenshot similarity analysis
* Visual phishing detection
* CLIP-based logo recognition
* Domain age intelligence

### v3

* Local LLM support
* Offline phishing analysis
* Enterprise dashboard

### v4

* Crowd-sourced phishing database
* Community threat reporting
* Browser synchronization

---

# Security Notice

PhishShield AI is designed to assist users in identifying suspicious websites but should not be considered a replacement for enterprise security controls.

Always:

* Verify URLs carefully
* Use MFA
* Avoid entering credentials on untrusted websites
* Keep browsers updated

---

# Contributing

Contributions are welcome.

```bash
git clone https://github.com/yourusername/phishshield-ai.git
```

Create a branch:

```bash
git checkout -b feature/new-feature
```

Submit a Pull Request.

---

# License

MIT License

Copyright (c) 2025 PhishShield AI

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to use, modify, and distribute the software.

---

# Author

PhishShield AI Team

Built to make the web safer through AI-powered phishing detection.
