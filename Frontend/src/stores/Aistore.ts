import { create } from "zustand";

export interface MetaInfo {
  summaryStyle: "educator" | "analytical" | "concise" | "";
  summaryLength: "short" | "medium" | "long" | "";
  summaryFormat: "essay" | "bullet" | "report" | "";
  contentType: "general" | "technical" | "business" | "visual" | "";
}

export interface AISummaryItem {
  id: string;
  fileId: string | null;
  userId: string | null;
  sourceType: "pdf" | "image" | "link" | "";
  sourceUrl: string;
  extractedText: string;
  promptUsed: string;
  aiSummary: string;
  taskType: "summary" | "coding" | "";

  // Summary-specific (grouped into meta optionally)
  meta: MetaInfo;

  // Coding-specific
  language: string;
  codingStyle:
    | "clean and well-commented"
    | "concise"
    | "beginner-friendly"
    | "efficient"
    | "";
  complexity: "easy" | "medium" | "hard" | "";
  codingTaskType:
    | "detailed view"
    | "function implementation"
    | "query analysis"
    | "";

  isProcessing: boolean;
  error: string | null;
}

interface AISummaryStore {
  summaries: AISummaryItem[];
  addSummary: (summary: AISummaryItem) => void;
  updateSummary: (id: string, updatedFields: Partial<AISummaryItem>) => void;
  removeSummary: (id: string) => void;
  reset: () => void;
}

export const useAISummaryStore = create<AISummaryStore>((set) => ({
  summaries: [],

  addSummary: (summary) =>
    set((state) => ({ summaries: [...state.summaries, summary] })),

  updateSummary: (id, updatedFields) =>
    set((state) => ({
      summaries: state.summaries.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      ),
    })),

  removeSummary: (id) =>
    set((state) => ({
      summaries: state.summaries.filter((item) => item.id !== id),
    })),

  reset: () => set({ summaries: [] }),
}));
