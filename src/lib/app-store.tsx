import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  agentsSeed,
  auditSeed,
  documentsSeed,
  modelsSeed,
  type AuditRecord,
  type DocumentRecord,
  type DocStatus,
  type DocType,
} from "@/services/mockApi";

interface AppState {
  documents: DocumentRecord[];
  auditLogs: AuditRecord[];
  agents: typeof agentsSeed;
  models: typeof modelsSeed;
  documentCount: number;
  chunkCount: number;
  notifications: number;
  previewDoc: DocumentRecord | null;
  openPreview: (nameOrDoc: string | DocumentRecord) => void;
  closePreview: () => void;
  uploadDocument: (file: { name: string; size: number }) => void;
  addAuditLog: (log: Omit<AuditRecord, "id" | "timestamp">) => void;
}

const AppContext = createContext<AppState | null>(null);

const typeFromName = (name: string): DocType => {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "docx" || ext === "doc") return "DOCX";
  if (ext === "xlsx" || ext === "xls" || ext === "csv") return "XLSX";
  if (ext === "png" || ext === "jpg" || ext === "jpeg") return "PNG";
  return "PDF";
};

const now = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(
    d.getMinutes(),
  )}:${p(d.getSeconds())}`;
};

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<DocumentRecord[]>(documentsSeed);
  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>(auditSeed);
  const [previewDoc, setPreviewDoc] = useState<DocumentRecord | null>(null);
  const [baseCount] = useState(128);

  const addAuditLog = useCallback((log: Omit<AuditRecord, "id" | "timestamp">) => {
    setAuditLogs((prev) => [
      { ...log, id: `l${Math.random().toString(36).slice(2, 8)}`, timestamp: now() },
      ...prev,
    ]);
  }, []);

  const uploadDocument = useCallback(
    (file: { name: string; size: number }) => {
      const id = `u${Math.random().toString(36).slice(2, 8)}`;
      const type = typeFromName(file.name);
      const doc: DocumentRecord = {
        id,
        name: file.name,
        type,
        size: `${Math.max(0.1, file.size / 1024 / 1024).toFixed(1)} MB`,
        pages: Math.max(1, Math.round(file.size / 90000)),
        status: "uploading",
        indexed: false,
        uploadedAt: "just now",
        department: "Unassigned",
        preview: "Local extraction complete. Content stays inside the organization.",
      };
      setDocuments((prev) => [doc, ...prev]);

      const stages: DocStatus[] = ["processing", "ocr", "indexed"];
      stages.forEach((status, i) => {
        setTimeout(
          () => {
            setDocuments((prev) =>
              prev.map((d) =>
                d.id === id ? { ...d, status, indexed: status === "indexed" } : d,
              ),
            );
            if (status === "indexed") {
              addAuditLog({
                user: "Test Engineer",
                action: "Document indexed",
                model: "bge-local-embed",
                document: file.name,
                result: "Embedded into local vector database",
                status: "success",
                trace: [
                  { step: "Upload", detail: "Stored on-premise", ms: 210 },
                  { step: "OCR", detail: "Text layer extracted locally", ms: 1400 },
                  { step: "Embed", detail: "Chunks written to ChromaDB", ms: 980 },
                ],
              });
            }
          },
          900 * (i + 1),
        );
      });
    },
    [addAuditLog],
  );

  const openPreview = useCallback(
    (nameOrDoc: string | DocumentRecord) => {
      if (typeof nameOrDoc !== "string") return setPreviewDoc(nameOrDoc);
      const found = documents.find((d) => nameOrDoc.includes(d.name)) ?? documents[0];
      setPreviewDoc(found ?? null);
    },
    [documents],
  );

  const value = useMemo<AppState>(
    () => ({
      documents,
      auditLogs,
      agents: agentsSeed,
      models: modelsSeed,
      documentCount: baseCount + (documents.length - documentsSeed.length),
      chunkCount: 24680 + (documents.length - documentsSeed.length) * 312,
      notifications: 3,
      previewDoc,
      openPreview,
      closePreview: () => setPreviewDoc(null),
      uploadDocument,
      addAuditLog,
    }),
    [documents, auditLogs, baseCount, previewDoc, openPreview, uploadDocument, addAuditLog],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider");
  return ctx;
}
