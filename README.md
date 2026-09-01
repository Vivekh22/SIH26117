# Secure AI Workbench

I've attached a screenshot of the Home/Dashboard page for our SIH 2026

project: "teamMESSIER-87 — AI Workbench" (Sovereign On-Premise Agentic AI

Workbench, SIH26117). Use this screenshot as the EXACT design reference —

match its layout, spacing, colors, typography, iconography, and component

style precisely. Then build out the rest of the application using this

same design system.

============================================================

TECH STACK

============================================================

React + TypeScript, Tailwind CSS, shadcn/ui, Lucide icons, Recharts for

charts. Desktop-first (1440x900 / 1920x1080). Mock data + a mock API

service layer (src/services/mockApi.ts) structured so it can later be

swapped for real FastAPI endpoints.

============================================================

DESIGN SYSTEM (extracted from the attached screenshot — replicate exactly)

============================================================

Background: white / off-white workspace, white cards with subtle light-gray

borders, moderate rounded corners (not pill-shaped).

Primary accent: forest/emerald green — used for the logo mark, active nav

state, primary buttons, checkmarks, status dots, and progress rings.

Text: near-black for headings, medium gray for secondary/meta text.

Sidebar: white background (not dark), active item highlighted with a light

green tint background and green icon/text.

Status colors: green = secure/active/operational/completed, gray = idle,

(reserve amber/red for warnings and blocked states elsewhere in the app).

Cards: white background, thin border, consistent internal padding, small

label + larger value pattern for metrics (see the 5-stat row in the

screenshot), "View all →" link pattern in card headers.

Charts: minimal line charts with flat/near-zero baselines styled like the

"Live Network Traffic" and "Network Activity" panels — light grid, small

axis labels, green/blue legend dots for Inbound/Outbound.

Icons: Lucide icons throughout, used small and functional (not decorative).

Top bar: logo + product name/subtitle on the left, system status pill,

theme toggle, notification bell with badge, user avatar with dropdown on

the right.

Footer strip: small centered meta text — "teamMESSIER-87 · Built for SIH

2026 · On-Premise · Air-Gapped · Zero Data Egress".

============================================================

APP SHELL

============================================================

Left sidebar (white, matching screenshot): logo mark ("teamMESSIER-87" /

"AI WORKBENCH" subtitle) at top. Nav items in this exact order: Home,

Workbench, Documents, Knowledge Base, Agents, Model Router, Tools &

Sandbox, Audit Logs, Security — then a divider — Settings, Help & Support.

Below the nav, an "AIR-GAPPED MODE" status card (green shield icon, "No

external connections", "100% local · Zero data egress", "View Security

Details →" link) exactly as shown. At the very bottom, the user profile

block ("TE" avatar, "Test Engineer", "Team Member", dropdown chevron).

Top bar on every page: breadcrumb/page title on the left where relevant,

"SYSTEM STATUS ● SECURE & OPERATIONAL" pill, theme toggle, notification

bell with count badge, user avatar dropdown — all matching the screenshot.

============================================================

PAGE 1 — HOME (already designed — replicate exactly from the screenshot)

============================================================

Hero card: "Welcome back," / "teamMESSIER-87" (large, green) / "Sovereign

On-Premise Agentic AI Workbench" subtitle / description line / [Go to

Workbench →] button / drag-and-drop upload dropzone (PDF, DOCX, XLSX, PNG

up to 50MB) / decorative shield+lock graphic with radiating rings on the

right.

Adjacent "Live Network Traffic (External)" panel: "Network Blocked" pill,

large "0 KB/s", flat line chart, "All outbound connections blocked" /

"Air-gapped & Verified" footer.

5-stat metric row: Documents (128), AI Agents (6), Models Available (4),

Active Model (Qwen3-8B), Secure (100%) — icon + value + label per card.

4-column panel row: Recent Documents (file list with type/size/time),

Active Agents (name/description/status pill), Model Router Status

(model/task-type/status), System Health (checklist + circular "100%

Healthy" progress ring).

Bottom 4-column row: Network Activity (real-time chart), Recent Task

Progress (checklist workflow: Ingest Document → Plan & Analyze → Route to

Model → Execute & Verify, each with timestamp), Latest Output (file card

with preview snippet, Download button, confidence score, source citation),

Evidence & Traceability (Source Documents / Verification Steps / Model

Used / No External Calls, each with icon and short detail).

============================================================

REMAINING PAGES (build in the same visual language as Home)

============================================================

WORKBENCH — the main task-execution screen. Header "Secure AI Workbench"

with AIR-GAPPED / LOCAL INFERENCE / 0 DATA EGRESS status chips (styled like

the Home hero). Three-column layout: Input (file upload + text query),

Task (large textarea + [Run Secure Workflow] button), Execution (animated

7-step pipeline: Understand → Plan → Route → Retrieve → Execute → Verify →

Deliver). After running, show a result panel: "Verified Analysis" with

Evidence Verified badge, summary bullets, "Sources" citations list

(clickable to a document preview), a Confidence score labeled "Prototype

confidence indicator", and Export/Run Again actions.

DOCUMENTS — "Confidential Documents" header, [Upload Document] button,

type filters (All/PDF/Images/DOCX/XLSX/Scanned), table with Document/Type/

Pages/Status/Indexed/Date columns, "All documents remain inside the

organization" label, document preview modal.

KNOWLEDGE BASE — "Knowledge Base" header, metric row (Documents indexed,

Chunks, Embeddings, Vector DB: ChromaDB, Status: Healthy), a real connected

pipeline diagram (Document → Text Extraction → Chunking → Embedding →

Vector Database → Semantic Retrieval → LLM Context), a semantic search box

with example similarity-scored results, and filters (document/department/

date/type).

AGENTS — "Agent Workflows" header, a connected-node workflow diagram

(User Request → Understand → Plan → Retrieve → Execute Tool → Verify →

Deliver), agent cards matching the Home "Active Agents" style but expanded

with capabilities list, status, tool count, knowledge sources, last run —

plus a [Create Agent] button.

MODEL ROUTER — "Intelligent Model Router" header, a Task → Classifier →

Best Local Model → Execution diagram, model cards (Qwen3-8B, Qwen3-VL-7B,

Qwen3-Coder-7B, DeepSeek-R1-Distill-7B, etc. — matching the "Model Router

Status" list style from Home but expanded with VRAM/quantization/latency/

current load), and a routing example showing sample tasks mapping to

models with visual highlighting.

TOOLS & SANDBOX — "Secure Tool Execution" header, tool cards (Python

Calculator, Document Search, OCR, Report Generator, Excel Analyzer, File

Converter) each showing Available status and "Network: BLOCKED", and a

sandbox execution panel showing an animated pipeline (Python Sandbox →

Read File → Calculate → Generate Result → Destroy Sandbox) with a

prominent "NETWORK ACCESS BLOCKED" badge. Frontend simulation only — never

execute real code.

AUDIT LOGS — "Audit & Traceability" header, a log table (Timestamp, User,

Action, Model, Document, Result, Status) matching the "Recent Task

Progress" visual style, with any blocked/external-request events visually

distinct (red-tinted row), filters (user/model/action/status/date), and a

click-to-expand workflow trace view.

SECURITY — "System Security" header, metric cards matching the Home stat

row style (Data Egress: 0 bytes, Network: Air-Gapped, Local Models: count,

Audit Logging: Enabled, Sandbox: Isolated, RAG: Enabled), and a labeled

architecture diagram inside an "ORGANIZATION PREMISES" boundary box

(Documents → Processing → RAG/Vector DB → Agent Orchestrator → Model

Router → Reasoning/Vision/Coding models → Tool Sandbox → Verification →

Output + Audit Log) with "PUBLIC CLOUD / EXTERNAL AI" shown outside the

boundary and a blocked connector between them.

============================================================

INTERACTIONS

============================================================

1. Uploading a document animates status: Uploading → Processing → OCR →

   Indexed, and updates the Documents count on Home/Knowledge Base.

2. [Run Secure Workflow] animates the 7-step pipeline in sequence, then

   reveals the result panel.

3. Selecting a sample task on Model Router visually highlights the routed

   model card.

4. Completing a Workbench run appends a new row to Audit Logs.

5. Running a tool in Tools & Sandbox animates the simulated pipeline.

6. Clicking a citation/source opens the document preview panel.

7. All sidebar navigation works and preserves state across pages.

============================================================

DONE WHEN

============================================================

Every page looks like it belongs to the same product as the attached Home

screenshot — same green accent, same card style, same typography, same

icon language — and within 10 seconds of opening the app it reads as: "a

secure, local, agentic AI workbench for confidential industrial documents,

fully operational and air-gapped."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2ffcdad3-e11c-46e5-a8a0-ef7d94fc698d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
