# healthcare-onboarding-2.0
Emme Health-Plan Onboarding — Starter Scaffold

What it is: A working (not just mockup) multi-step onboarding wizard for the Track 2 challenge — manual entry path, document upload path, auto-save, plain-language help text, a summary screen, and JSON export. Backend is FastAPI, frontend is a single-file React app (no build tools needed).

File layout:

emme-onboarding/
├── backend/
│   ├── main.py            ← FastAPI app: sessions, autosave, upload/extract, submit
│   └── requirements.txt
└── frontend/
    └── index.html          ← the entire wizard UI, runs straight in a browser

How to run it — 2 terminals:

Terminal 1 — backend:

bash
cd emme-onboarding/backend
pip install -r requirements.txt --break-system-packages
uvicorn main:app --reload --port 8000

Confirm it's up: visit http://localhost:8000/health → should show {"status":"healthy"}

Terminal 2 — frontend:

bash
cd emme-onboarding/frontend
python3 -m http.server 5500

Open http://localhost:5500 in your browser (or your phone, same wifi, using your computer's local IP instead of localhost).

What to try:

Click through the manual screens
On the "documents" step, upload any file — it currently returns realistic sample plan data so the autofill demo works even before a real extraction model is wired in
Reach the end to see the "here's what we know" summary + raw JSON export
Refresh mid-flow — it resumes automatically
