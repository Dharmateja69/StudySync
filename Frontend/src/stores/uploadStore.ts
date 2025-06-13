import { create } from "zustand";

export interface FileUpload {
  _id: string;
  title: string;
  description: string;
  subject: string;
  semester: string;
  university: string;
  tags: string[];
  file: File;
  status: "pending" | "approved" | "rejected";
  uploadedAt: Date;
  uploadedBy: string;
}

interface UploadState {
  uploads: FileUpload[];
  currentUpload: Partial<FileUpload> | null;
  isUploading: boolean;
  uploadProgress: number;

  // Actions
  setCurrentUpload: (upload: Partial<FileUpload> | null) => void;
  addUpload: (upload: FileUpload) => void;
  updateUpload: (id: string, updates: Partial<FileUpload>) => void;
  removeUpload: (id: string) => void;
  setUploading: (isUploading: boolean) => void;
  setUploadProgress: (progress: number) => void;
  getUserUploads: (userId: string) => FileUpload[];
  getPendingUploads: () => FileUpload[];
}

export const useUploadStore = create<UploadState>((set, get) => ({
  uploads: [],
  currentUpload: null,
  isUploading: false,
  uploadProgress: 0,

  setCurrentUpload: (upload) => set({ currentUpload: upload }),

  addUpload: (upload) =>
    set((state) => ({
      uploads: [...state.uploads, upload],
    })),

  updateUpload: (id, updates) =>
    set((state) => ({
      uploads: state.uploads.map((upload) =>
        upload._id === id ? { ...upload, ...updates } : upload
      ),
    })),

  removeUpload: (id) =>
    set((state) => ({
      uploads: state.uploads.filter((upload) => upload._id !== id),
    })),

  setUploading: (isUploading) => set({ isUploading }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),

  getUserUploads: (userId) =>
    get().uploads.filter((upload) => upload.uploadedBy === userId),
  getPendingUploads: () =>
    get().uploads.filter((upload) => upload.status === "pending"),
}));
