/**
 * Mock API service layer.
 * Every function returns a Promise so it can later be swapped for real
 * FastAPI endpoints (e.g. fetch(`${API_BASE}/documents`)).
 */

const delay = <T>(data: T, ms = 260): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export type DocStatus = "indexed" | "processing" | "ocr" | "uploading" | "queued";
export type DocType = "PDF" | "DOCX" | "XLSX" | "PNG" | "SCANNED";

export interface DocumentRecord {
  id: string;
  name: string;
  type: DocType;
  size: string;
  pages: number;
  status: DocStatus;
  indexed: boolean;
  uploadedAt: string;
  department: string;
  preview: string;
}

export interface AgentRecord {
  id: string;
  name: string;
  description: string;
  status: "active" | "idle";
  capabilities: string[];
  tools: number;
  knowledgeSources: string[];
  lastRun: string;
}

export interface ModelRecord {
  id: string;
  name: string;
  task: string;
  status: "active" | "idle";
  usedNow?: boolean;
  vram: string;
  quantization: string;
  latency: string;
  load: number;
  context: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  model: string;
  document: string;
  result: string;
  status: "success" | "blocked" | "warning";
  trace: { step: string; detail: string; ms: number }[];
}

export interface ToolRecord {
  id: string;
  name: string;
  description: string;
  icon: string;
  runs: number;
}

export const documentsSeed: DocumentRecord[] = [
  {
    id: "d1",
    name: "Maintenance_Manual_P-204.pdf",
    type: "PDF",
    size: "4.2 MB",
    pages: 212,
    status: "indexed",
    indexed: true,
    uploadedAt: "2h ago",
    department: "Maintenance",
    preview:
      "Section 12.4 — Pressure Safety Valve (PSV) testing shall be carried out as per MRPL standard P-204. Set pressure tolerance ±3%, seat tightness verified per API 527.",
  },
  {
    id: "d2",
    name: "Refinery_Operations_Guide.docx",
    type: "DOCX",
    size: "2.1 MB",
    pages: 96,
    status: "indexed",
    indexed: true,
    uploadedAt: "5h ago",
    department: "Operations",
    preview:
      "Crude distillation unit start-up sequence, furnace ramp rates and interlock verification procedures for Unit-3.",
  },
  {
    id: "d3",
    name: "Safety_Protocol_2024.pdf",
    type: "PDF",
    size: "1.8 MB",
    pages: 48,
    status: "indexed",
    indexed: true,
    uploadedAt: "1d ago",
    department: "HSE",
    preview:
      "Hot work permit requirements, confined space entry checklist and emergency isolation responsibilities.",
  },
  {
    id: "d4",
    name: "Process_Flow_Diagram.png",
    type: "PNG",
    size: "3.7 MB",
    pages: 1,
    status: "indexed",
    indexed: true,
    uploadedAt: "2d ago",
    department: "Engineering",
    preview: "P&ID extract — Unit 3 overhead condenser loop with PSV-204 tie-in.",
  },
  {
    id: "d5",
    name: "Vendor_Inspection_Report.xlsx",
    type: "XLSX",
    size: "0.9 MB",
    pages: 14,
    status: "indexed",
    indexed: true,
    uploadedAt: "3d ago",
    department: "Quality",
    preview: "Dimensional inspection results and NDT summary for spool pieces batch B-118.",
  },
  {
    id: "d6",
    name: "Scanned_Logbook_Unit3.pdf",
    type: "SCANNED",
    size: "6.4 MB",
    pages: 120,
    status: "indexed",
    indexed: true,
    uploadedAt: "4d ago",
    department: "Operations",
    preview: "OCR extracted shift logbook entries for Unit-3, March cycle.",
  },
];

export const agentsSeed: AgentRecord[] = [
  {
    id: "a1",
    name: "Document Analyst",
    description: "Analyzing documents and extracting insights",
    status: "active",
    capabilities: ["Semantic retrieval", "Table extraction", "Cross-document compare"],
    tools: 4,
    knowledgeSources: ["Maintenance", "Operations"],
    lastRun: "2m ago",
  },
  {
    id: "a2",
    name: "Maintenance Advisor",
    description: "Providing maintenance recommendations",
    status: "active",
    capabilities: ["Failure mode lookup", "Schedule planning", "Spare part mapping"],
    tools: 3,
    knowledgeSources: ["Maintenance", "Engineering"],
    lastRun: "12m ago",
  },
  {
    id: "a3",
    name: "Safety Monitor",
    description: "Monitoring safety protocols and compliance",
    status: "active",
    capabilities: ["Protocol validation", "Permit checks", "Deviation flags"],
    tools: 2,
    knowledgeSources: ["HSE"],
    lastRun: "26m ago",
  },
  {
    id: "a4",
    name: "Code Assistant",
    description: "Helping with code analysis & generation",
    status: "idle",
    capabilities: ["Script generation", "Log parsing", "Sandbox execution"],
    tools: 5,
    knowledgeSources: ["Engineering"],
    lastRun: "3h ago",
  },
  {
    id: "a5",
    name: "Report Composer",
    description: "Drafting verified reports from evidence",
    status: "idle",
    capabilities: ["Template fill", "Citation binding", "Export DOCX"],
    tools: 3,
    knowledgeSources: ["Quality", "Operations"],
    lastRun: "5h ago",
  },
  {
    id: "a6",
    name: "Vision Inspector",
    description: "Reading diagrams, scans and handwritten logs",
    status: "idle",
    capabilities: ["OCR", "Diagram parsing", "Layout understanding"],
    tools: 2,
    knowledgeSources: ["Engineering", "Operations"],
    lastRun: "1d ago",
  },
];

export const modelsSeed: ModelRecord[] = [
  {
    id: "m1",
    name: "Qwen3-8B",
    task: "Reasoning & General QA",
    status: "active",
    usedNow: true,
    vram: "9.4 GB",
    quantization: "Q5_K_M",
    latency: "142 ms/tok",
    load: 38,
    context: "32K",
  },
  {
    id: "m2",
    name: "Qwen3-VL-7B",
    task: "Vision & Document Understanding",
    status: "idle",
    vram: "8.1 GB",
    quantization: "Q4_K_M",
    latency: "210 ms/tok",
    load: 0,
    context: "16K",
  },
  {
    id: "m3",
    name: "Qwen3-Coder-7B",
    task: "Code Generation & Analysis",
    status: "idle",
    vram: "7.6 GB",
    quantization: "Q4_K_M",
    latency: "165 ms/tok",
    load: 0,
    context: "32K",
  },
  {
    id: "m4",
    name: "DeepSeek-R1-Distill-7B",
    task: "Complex Reasoning / Fallback",
    status: "idle",
    vram: "8.8 GB",
    quantization: "Q5_K_M",
    latency: "198 ms/tok",
    load: 0,
    context: "64K",
  },
];

export const auditSeed: AuditRecord[] = [
  {
    id: "l1",
    timestamp: "2026-09-01 10:58:14",
    user: "Test Engineer",
    action: "Workflow executed",
    model: "Qwen3-8B",
    document: "Maintenance_Manual_P-204.pdf",
    result: "Approval note generated · confidence 92%",
    status: "success",
    trace: [
      { step: "Understand", detail: "Parsed intent: PSV testing approval", ms: 180 },
      { step: "Plan", detail: "3-step retrieval plan created", ms: 240 },
      { step: "Route", detail: "Routed to Qwen3-8B (reasoning)", ms: 40 },
      { step: "Retrieve", detail: "12 chunks from local vector DB", ms: 310 },
      { step: "Execute", detail: "Draft composed with citations", ms: 2140 },
      { step: "Verify", detail: "4 verification checks passed", ms: 420 },
      { step: "Deliver", detail: "Output written to local storage", ms: 90 },
    ],
  },
  {
    id: "l2",
    timestamp: "2026-09-01 10:41:02",
    user: "System",
    action: "External request blocked",
    model: "—",
    document: "—",
    result: "Outbound call to api.openai.com denied by egress policy",
    status: "blocked",
    trace: [
      { step: "Detect", detail: "Egress attempt on port 443", ms: 2 },
      { step: "Block", detail: "Denied by air-gap firewall rule EG-01", ms: 1 },
      { step: "Log", detail: "Immutable audit entry written", ms: 6 },
    ],
  },
  {
    id: "l3",
    timestamp: "2026-09-01 09:22:47",
    user: "Test Engineer",
    action: "Document indexed",
    model: "bge-local-embed",
    document: "Scanned_Logbook_Unit3.pdf",
    result: "1,284 chunks embedded",
    status: "success",
    trace: [
      { step: "Extract", detail: "OCR on 120 pages", ms: 8400 },
      { step: "Chunk", detail: "1,284 chunks @ 512 tokens", ms: 620 },
      { step: "Embed", detail: "Stored in ChromaDB collection", ms: 3100 },
    ],
  },
  {
    id: "l4",
    timestamp: "2026-09-01 08:15:33",
    user: "Test Engineer",
    action: "Tool executed (sandbox)",
    model: "Qwen3-Coder-7B",
    document: "Vendor_Inspection_Report.xlsx",
    result: "Python calculation completed · sandbox destroyed",
    status: "success",
    trace: [
      { step: "Sandbox", detail: "Isolated container spawned, network off", ms: 320 },
      { step: "Execute", detail: "Statistical summary computed", ms: 740 },
      { step: "Destroy", detail: "Container removed, no residue", ms: 110 },
    ],
  },
  {
    id: "l5",
    timestamp: "2026-08-31 18:04:09",
    user: "Admin",
    action: "Model loaded",
    model: "Qwen3-VL-7B",
    document: "—",
    result: "Weights loaded from local store",
    status: "warning",
    trace: [{ step: "Load", detail: "VRAM headroom 12% — advisory", ms: 5200 }],
  },
];

export const toolsSeed: ToolRecord[] = [
  {
    id: "t1",
    name: "Python Calculator",
    description: "Deterministic numeric evaluation inside an isolated container",
    icon: "calculator",
    runs: 412,
  },
  {
    id: "t2",
    name: "Document Search",
    description: "Semantic + keyword search across the local vector database",
    icon: "search",
    runs: 1893,
  },
  {
    id: "t3",
    name: "OCR",
    description: "Text extraction from scans, photos and engineering drawings",
    icon: "scan",
    runs: 268,
  },
  {
    id: "t4",
    name: "Report Generator",
    description: "Composes DOCX/PDF reports with bound citations",
    icon: "file-text",
    runs: 97,
  },
  {
    id: "t5",
    name: "Excel Analyzer",
    description: "Tabular parsing, pivots and anomaly detection on XLSX",
    icon: "table",
    runs: 154,
  },
  {
    id: "t6",
    name: "File Converter",
    description: "Local format conversion between PDF, DOCX, XLSX and images",
    icon: "repeat",
    runs: 331,
  },
];

export const trafficSeries = Array.from({ length: 13 }, (_, i) => ({
  t: i === 12 ? "Now" : `-${(12 - i) * 5}s`,
  inbound: 0,
  outbound: 0,
}));

export const searchResultsSeed = [
  {
    id: "s1",
    doc: "Maintenance_Manual_P-204.pdf",
    page: 12,
    score: 0.94,
    snippet:
      "PSV testing shall be carried out as per MRPL standard P-204 with set pressure tolerance of ±3%.",
  },
  {
    id: "s2",
    doc: "Safety_Protocol_2024.pdf",
    page: 8,
    score: 0.88,
    snippet:
      "Isolation of the relief line requires a valid hot work permit and two-person verification.",
  },
  {
    id: "s3",
    doc: "Refinery_Operations_Guide.docx",
    page: 41,
    score: 0.81,
    snippet:
      "During start-up, overhead pressure must be stabilised before relief device re-instatement.",
  },
  {
    id: "s4",
    doc: "Scanned_Logbook_Unit3.pdf",
    page: 77,
    score: 0.74,
    snippet: "Shift note: PSV-204 popped at 18.4 barg, reset verified by inspector.",
  },
];

export const api = {
  getDocuments: () => delay(documentsSeed),
  getAgents: () => delay(agentsSeed),
  getModels: () => delay(modelsSeed),
  getAuditLogs: () => delay(auditSeed),
  getTools: () => delay(toolsSeed),
  search: (_q: string) => delay(searchResultsSeed, 420),
  runWorkflow: (_task: string) => delay({ ok: true }, 600),
};
