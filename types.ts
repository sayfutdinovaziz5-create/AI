export enum ProcessingState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  ERROR = 'ERROR',
}

export interface EditedImage {
  id: string;
  dataUrl: string; // Base64
  prompt: string;
  timestamp: number;
  isHighQuality: boolean;
}

export interface AppState {
  originalImage: string | null;
  currentImage: string | null;
  history: EditedImage[];
  processingState: ProcessingState;
  error: string | null;
}
