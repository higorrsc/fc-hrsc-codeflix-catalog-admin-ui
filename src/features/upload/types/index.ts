export interface UploadState {
  id: string;
  videoId: string;
  field: string;
  file: File;
  progress?: number;
  status?: 'idle' | 'loading' | 'success' | 'failed';
}

export interface UploadProgress {
  id: string;
  progress: number;
}
