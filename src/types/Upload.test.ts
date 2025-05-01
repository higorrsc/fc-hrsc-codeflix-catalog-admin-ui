import { UploadProgress, UploadState } from './Upload';

// Mock File object for testing purposes
const createMockFile = (name: string, size: number, type: string): File => {
  const blob = new Blob([''], { type });
  return new File([blob], name, { type });
};

describe('Upload Types', () => {
  describe('UploadState Interface', () => {
    it('should correctly define the structure for an upload state object', () => {
      const mockFile = createMockFile('video.mp4', 1024 * 1024, 'video/mp4');

      const uploadState: UploadState = {
        id: 'upload-123',
        videoId: 'video-abc',
        field: 'videoFile',
        file: mockFile,
        progress: 50,
        status: 'loading',
      };

      // Type assertions (compile-time checks)
      expect(uploadState.id).toBe('upload-123');
      expect(uploadState.videoId).toBe('video-abc');
      expect(uploadState.field).toBe('videoFile');
      expect(uploadState.file).toBe(mockFile);
      expect(uploadState.progress).toBe(50);
      expect(uploadState.status).toBe('loading');

      // Test optional properties
      const minimalUploadState: UploadState = {
        id: 'upload-456',
        videoId: 'video-def',
        field: 'trailerFile',
        file: createMockFile('trailer.mp4', 512 * 1024, 'video/mp4'),
      };
      expect(minimalUploadState.progress).toBeUndefined();
      expect(minimalUploadState.status).toBeUndefined();
    });
  });

  describe('UploadProgress Interface', () => {
    it('should correctly define the structure for an upload progress object', () => {
      const uploadProgress: UploadProgress = { id: 'upload-789', progress: 75 };
      expect(uploadProgress.id).toBe('upload-789');
      expect(uploadProgress.progress).toBe(75);
    });
  });
});
