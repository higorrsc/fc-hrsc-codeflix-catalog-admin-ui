import { Links, Meta } from './_shared'; // Import shared types
import { CastMember, CastMemberType } from './CastMember'; // Import related types
import { Category } from './Category';
import { Genre } from './Genre';
import {
  FileObject,
  Result,
  Results,
  Video,
  VideoParams,
  VideoPayload,
} from './Video';

// --- Mock Data ---

// Mock shared types
const mockLinks: Links = {
  first: 'http://example.com/api/videos?page=1',
  next: 'http://example.com/api/videos?page=3',
  prev: 'http://example.com/api/videos?page=1',
  last: 'http://example.com/api/videos?page=10',
};

const mockMeta: Meta = {
  from: 1,
  to: 10,
  path: 'http://example.com/api/videos',
  total: 95,
  per_page: 10,
  current_page: 2,
  last_page: 10,
};

// Mock related entities (simplified)
const mockCategory1: Category = {
  id: 'cat-uuid-1',
  name: 'Action',
  description: 'Action-packed movies',
  is_active: true,
  deleted_at: null,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

const mockCategory2: Category = {
  id: 'cat-uuid-2',
  name: 'Comedy',
  description: null,
  is_active: true,
  deleted_at: null,
  created_at: '2023-01-02T00:00:00Z',
  updated_at: '2023-01-02T00:00:00Z',
};

const mockGenre1: Genre = {
  id: 'genre-uuid-1',
  name: 'Sci-Fi',
  is_active: true,
  deleted_at: null,
  created_at: '2023-02-01T00:00:00Z',
  updated_at: '2023-02-01T00:00:00Z',
};

const mockGenre2: Genre = {
  id: 'genre-uuid-2',
  name: 'Thriller',
  is_active: true,
  deleted_at: null,
  created_at: '2023-02-02T00:00:00Z',
  updated_at: '2023-02-02T00:00:00Z',
};

const mockActor: CastMember = {
  id: 'cm-uuid-1',
  name: 'Actor Name',
  type: CastMemberType.ACTOR,
  deleted_at: null,
  created_at: '2023-03-01T00:00:00Z',
  updated_at: '2023-03-01T00:00:00Z',
};

const mockDirector: CastMember = {
  id: 'cm-uuid-2',
  name: 'Director Name',
  type: CastMemberType.DIRECTOR,
  deleted_at: null,
  created_at: '2023-03-02T00:00:00Z',
  updated_at: '2023-03-02T00:00:00Z',
};

// Mock Video data
const mockVideoFull: Video = {
  id: 'video-uuid-123',
  title: 'Awesome Movie',
  description: 'A description of the awesome movie.',
  year_launched: 2023,
  opened: true,
  rating: 'L', // Livre (Free for all ages)
  duration: 120,
  deleted_at: null,
  created_at: '2023-04-01T10:00:00Z',
  updated_at: '2023-04-15T11:30:00Z',
  genres: [mockGenre1, mockGenre2],
  categories: [mockCategory1, mockCategory2],
  cast_members: [mockActor, mockDirector],
  thumb_file_url: 'http://example.com/thumb.jpg',
  banner_file_url: 'http://example.com/banner.jpg',
  trailer_file_url: 'http://example.com/trailer.mp4',
  video_file_url: 'http://example.com/video.mp4',
};

const mockVideoMinimal: Video = {
  id: 'video-uuid-456',
  title: 'Minimal Movie',
  description: 'Minimal description.',
  year_launched: 2022,
  opened: false,
  rating: '14',
  duration: 90,
  // deleted_at omitted (implicitly undefined)
  created_at: '2023-05-01T00:00:00Z',
  updated_at: '2023-05-01T00:00:00Z',
  // genres, categories, cast_members omitted (implicitly undefined)
  thumb_file_url: 'http://example.com/thumb_min.jpg',
  banner_file_url: 'http://example.com/banner_min.jpg',
  trailer_file_url: 'http://example.com/trailer_min.mp4',
  video_file_url: 'http://example.com/video_min.mp4',
};

const mockVideoDeleted: Video = {
  id: 'video-uuid-789',
  title: 'Deleted Movie',
  description: 'This was deleted.',
  year_launched: 2020,
  opened: false,
  rating: '18',
  duration: 60,
  deleted_at: '2023-06-01T12:00:00Z', // Has deleted_at timestamp
  created_at: '2020-01-01T00:00:00Z',
  updated_at: '2023-06-01T12:00:00Z',
  genres: [], // Empty array
  categories: [mockCategory1],
  cast_members: undefined, // Explicitly undefined
  thumb_file_url: 'http://example.com/thumb_del.jpg',
  banner_file_url: 'http://example.com/banner_del.jpg',
  trailer_file_url: 'http://example.com/trailer_del.mp4',
  video_file_url: 'http://example.com/video_del.mp4',
};

// --- Tests ---

describe('Types: Video', () => {
  // Test the main Video interface
  describe('Video Interface', () => {
    it('should allow creation of objects conforming to the Video interface with all fields', () => {
      const video: Video = { ...mockVideoFull };

      // Assertions to check structure and basic types (implicitly checked by TS)
      expect(video.id).toBe('video-uuid-123');
      expect(typeof video.id).toBe('string');
      expect(video.title).toBe('Awesome Movie');
      expect(typeof video.title).toBe('string');
      expect(video.description).toBe('A description of the awesome movie.');
      expect(typeof video.description).toBe('string');
      expect(video.year_launched).toBe(2023);
      expect(typeof video.year_launched).toBe('number');
      expect(video.opened).toBe(true);
      expect(typeof video.opened).toBe('boolean');
      expect(video.rating).toBe('L');
      expect(typeof video.rating).toBe('string');
      expect(video.duration).toBe(120);
      expect(typeof video.duration).toBe('number');
      expect(video.deleted_at).toBeNull();
      expect(video.created_at).toBe('2023-04-01T10:00:00Z');
      expect(typeof video.created_at).toBe('string');
      expect(video.updated_at).toBe('2023-04-15T11:30:00Z');
      expect(typeof video.updated_at).toBe('string');

      expect(Array.isArray(video.genres)).toBe(true);
      expect(video.genres).toHaveLength(2);
      expect(video.genres?.[0]).toEqual(mockGenre1);
      expect(Array.isArray(video.categories)).toBe(true);
      expect(video.categories).toHaveLength(2);
      expect(video.categories?.[1]).toEqual(mockCategory2);
      expect(Array.isArray(video.cast_members)).toBe(true);
      expect(video.cast_members).toHaveLength(2);
      expect(video.cast_members?.[1]).toEqual(mockDirector);

      expect(video.thumb_file_url).toBe('http://example.com/thumb.jpg');
      expect(typeof video.thumb_file_url).toBe('string');
      expect(video.banner_file_url).toBe('http://example.com/banner.jpg');
      expect(typeof video.banner_file_url).toBe('string');
      expect(video.trailer_file_url).toBe('http://example.com/trailer.mp4');
      expect(typeof video.trailer_file_url).toBe('string');
      expect(video.video_file_url).toBe('http://example.com/video.mp4');
      expect(typeof video.video_file_url).toBe('string');
    });

    it('should allow creation of objects conforming to the Video interface with minimal optional fields', () => {
      const video: Video = { ...mockVideoMinimal };

      expect(video.id).toBe('video-uuid-456');
      expect(video.title).toBe('Minimal Movie');
      expect(video.deleted_at).toBeUndefined(); // Optional field is absent
      expect(video.genres).toBeUndefined();
      expect(video.categories).toBeUndefined();
      expect(video.cast_members).toBeUndefined();
      expect(video.thumb_file_url).toBeDefined();
    });

    it('should allow creation of deleted video objects with varying optional arrays', () => {
      const video: Video = { ...mockVideoDeleted };

      expect(video.id).toBe('video-uuid-789');
      expect(video.title).toBe('Deleted Movie');
      expect(video.deleted_at).toBe('2023-06-01T12:00:00Z');
      expect(typeof video.deleted_at).toBe('string');
      expect(video.genres).toEqual([]); // Check empty array case
      expect(Array.isArray(video.categories)).toBe(true);
      expect(video.categories).toHaveLength(1);
      expect(video.cast_members).toBeUndefined(); // Check undefined case
    });
  });

  // Test the Results interface (list response)
  describe('Results Interface', () => {
    it('should allow creation of objects conforming to the Results interface', () => {
      const results: Results = {
        data: [mockVideoFull, mockVideoMinimal, mockVideoDeleted],
        links: mockLinks,
        meta: mockMeta,
      };

      expect(Array.isArray(results.data)).toBe(true);
      expect(results.data).toHaveLength(3);
      expect(results.data[0]).toEqual(mockVideoFull);
      expect(results.data[1]).toEqual(mockVideoMinimal);
      expect(results.data[2]).toEqual(mockVideoDeleted);
      expect(results.links).toEqual(mockLinks);
      expect(results.meta).toEqual(mockMeta);
    });

    it('should allow empty data array in Results', () => {
      const emptyMeta: Meta = {
        ...mockMeta,
        from: 0,
        to: 0,
        total: 0,
        current_page: 1,
        last_page: 1,
      };
      const emptyLinks: Links = { ...mockLinks, next: null, prev: null };
      const resultsEmpty: Results = {
        data: [],
        links: emptyLinks,
        meta: emptyMeta,
      };

      expect(resultsEmpty.data).toEqual([]);
      expect(resultsEmpty.links).toBeDefined();
      expect(resultsEmpty.meta).toBeDefined();
      expect(resultsEmpty.meta.total).toBe(0);
    });
  });

  // Test the Result interface (single item response)
  describe('Result Interface', () => {
    it('should allow creation of objects conforming to the Result interface', () => {
      // Often links/meta might be simplified or absent in single result, but test with full structure
      const result: Result = {
        data: mockVideoFull,
        links: mockLinks,
        meta: mockMeta,
      };

      expect(result.data).toEqual(mockVideoFull);
      expect(result.links).toEqual(mockLinks);
      expect(result.meta).toEqual(mockMeta);
    });
  });

  // Test the VideoParams interface
  describe('VideoParams Interface', () => {
    it('should allow creation of objects with all optional params', () => {
      const params: VideoParams = {
        page: 2,
        perPage: 50,
        search: 'Awesome',
      };

      expect(params.page).toBe(2);
      expect(typeof params.page).toBe('number');
      expect(params.perPage).toBe(50);
      expect(typeof params.perPage).toBe('number');
      expect(params.search).toBe('Awesome');
      expect(typeof params.search).toBe('string');
    });

    it('should allow creation of objects with only some optional params', () => {
      const paramsPartial: VideoParams = {
        search: 'Minimal',
      };

      expect(paramsPartial.page).toBeUndefined();
      expect(paramsPartial.perPage).toBeUndefined();
      expect(paramsPartial.search).toBe('Minimal');
    });

    it('should allow creation of empty params object', () => {
      const paramsEmpty: VideoParams = {};

      expect(paramsEmpty.page).toBeUndefined();
      expect(paramsEmpty.perPage).toBeUndefined();
      expect(paramsEmpty.search).toBeUndefined();
    });
  });

  // Test the VideoPayload interface
  describe('VideoPayload Interface', () => {
    it('should allow creation of objects conforming to VideoPayload with all fields', () => {
      const payload: VideoPayload = {
        id: 'video-uuid-123', // Usually ID is for update, might be omitted for create
        title: 'Payload Title',
        description: 'Payload description.',
        year_launched: 2024,
        opened: true,
        rating: '10',
        duration: 88,
        genres_id: ['genre-uuid-1', 'genre-uuid-2'],
        categories_id: ['cat-uuid-1'],
        cast_members_id: ['cm-uuid-1', 'cm-uuid-2'],
      };

      expect(payload.id).toBe('video-uuid-123');
      expect(payload.title).toBe('Payload Title');
      expect(typeof payload.title).toBe('string');
      expect(payload.description).toBe('Payload description.');
      expect(typeof payload.description).toBe('string');
      expect(payload.year_launched).toBe(2024);
      expect(typeof payload.year_launched).toBe('number');
      expect(payload.opened).toBe(true);
      expect(typeof payload.opened).toBe('boolean');
      expect(payload.rating).toBe('10');
      expect(typeof payload.rating).toBe('string');
      expect(payload.duration).toBe(88);
      expect(typeof payload.duration).toBe('number');

      expect(Array.isArray(payload.genres_id)).toBe(true);
      expect(payload.genres_id).toEqual(['genre-uuid-1', 'genre-uuid-2']);
      expect(Array.isArray(payload.categories_id)).toBe(true);
      expect(payload.categories_id).toEqual(['cat-uuid-1']);
      expect(Array.isArray(payload.cast_members_id)).toBe(true);
      expect(payload.cast_members_id).toEqual(['cm-uuid-1', 'cm-uuid-2']);
    });

    it('should allow creation of VideoPayload with minimal optional fields (omitting relationship IDs)', () => {
      const payloadMinimal: VideoPayload = {
        id: 'video-uuid-456',
        title: 'Minimal Payload',
        description: 'Minimal payload desc.',
        year_launched: 2021,
        opened: false,
        rating: '12',
        duration: 75,
        // genres_id, categories_id, cast_members_id omitted
      };

      expect(payloadMinimal.id).toBe('video-uuid-456');
      expect(payloadMinimal.title).toBe('Minimal Payload');
      expect(payloadMinimal.genres_id).toBeUndefined();
      expect(payloadMinimal.categories_id).toBeUndefined();
      expect(payloadMinimal.cast_members_id).toBeUndefined();
    });

    it('should allow empty arrays for relationship IDs in VideoPayload', () => {
      const payloadEmptyArrays: VideoPayload = {
        id: 'video-uuid-789',
        title: 'Empty Arrays Payload',
        description: 'Desc.',
        year_launched: 2020,
        opened: true,
        rating: 'L',
        duration: 100,
        genres_id: [],
        categories_id: [],
        cast_members_id: [],
      };

      expect(payloadEmptyArrays.genres_id).toEqual([]);
      expect(payloadEmptyArrays.categories_id).toEqual([]);
      expect(payloadEmptyArrays.cast_members_id).toEqual([]);
    });
  });

  // Test the FileObject interface
  describe('FileObject Interface', () => {
    it('should allow creation of objects conforming to FileObject', () => {
      // Mock a File object (in a testing environment like Jest/Vitest,
      // you might need specific setup or use a library for full File mocking)
      const mockFile = new File(['dummy content'], 'video.mp4', {
        type: 'video/mp4',
      });

      const fileObject: FileObject = {
        name: 'Main Video',
        file: mockFile,
      };

      expect(fileObject.name).toBe('Main Video');
      expect(typeof fileObject.name).toBe('string');
      expect(fileObject.file).toBeInstanceOf(File);
      expect(fileObject.file.name).toBe('video.mp4');
    });
  });
});
