import { Links, Meta } from './_shared'; // Import shared types
import { CastMember, CastMemberType } from './CastMember'; // Import CastMember types
import { Category } from './Category'; // Import Category type
import { Genre } from './Genre'; // Import Genre type
import { Result, Results, Video, VideoParams } from './Video';

// Mock data conforming to the shared interfaces
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
  total: 100,
  per_page: 10,
  current_page: 1,
  last_page: 10,
};

// Mock data for related entities (simplified)
const mockCategory1: Category = {
  id: 'cat-1',
  name: 'Movies',
  description: null,
  is_active: true,
  deleted_at: null,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

const mockCategory2: Category = {
  id: 'cat-2',
  name: 'Documentary',
  description: 'Educational content',
  is_active: true,
  deleted_at: null,
  created_at: '2023-01-02T00:00:00Z',
  updated_at: '2023-01-02T00:00:00Z',
};

const mockGenre1: Genre = {
  id: 'gen-1',
  name: 'Action',
  is_active: true,
  deleted_at: null,
  created_at: '2023-02-01T00:00:00Z',
  updated_at: '2023-02-01T00:00:00Z',
};

const mockGenre2: Genre = {
  id: 'gen-2',
  name: 'Sci-Fi',
  is_active: true,
  deleted_at: null,
  created_at: '2023-02-02T00:00:00Z',
  updated_at: '2023-02-02T00:00:00Z',
};

const mockActor: CastMember = {
  id: 'cm-1',
  name: 'Actor One',
  type: CastMemberType.ACTOR,
  deleted_at: null,
  created_at: '2023-03-01T00:00:00Z',
  updated_at: '2023-03-01T00:00:00Z',
};

const mockDirector: CastMember = {
  id: 'cm-2',
  name: 'Director Two',
  type: CastMemberType.DIRECTOR,
  deleted_at: null,
  created_at: '2023-03-02T00:00:00Z',
  updated_at: '2023-03-02T00:00:00Z',
};

// Mock data for Video
const mockVideoFull: Video = {
  id: 'vid-123',
  title: 'Epic Adventure',
  description: 'An epic adventure through time and space.',
  year_launched: 2023,
  opened: true,
  rating: 'L', // Assuming 'L' for Livre (Free for all ages)
  duration: 125,
  deleted_at: null,
  created_at: '2023-04-01T10:00:00Z',
  updated_at: '2023-04-15T11:30:00Z',
  genres: [mockGenre1, mockGenre2],
  categories: [mockCategory1],
  cast_members: [mockActor, mockDirector],
  thumb_file_url: 'http://example.com/thumb.jpg',
  banner_file_url: 'http://example.com/banner.jpg',
  trailer_file_url: 'http://example.com/trailer.mp4',
  video_file_url: 'http://example.com/video.mp4',
};

const mockVideoMinimal: Video = {
  id: 'vid-456',
  title: 'Simple Story',
  description: 'A simple story.',
  year_launched: 2022,
  opened: false,
  rating: '14',
  duration: 90,
  // deleted_at omitted
  created_at: '2023-05-01T00:00:00Z',
  updated_at: '2023-05-01T00:00:00Z',
  // genres, categories, cast_members omitted
  thumb_file_url: 'http://example.com/simple_thumb.jpg',
  banner_file_url: 'http://example.com/simple_banner.jpg',
  trailer_file_url: 'http://example.com/simple_trailer.mp4',
  video_file_url: 'http://example.com/simple_video.mp4',
};

const mockVideoDeleted: Video = {
  id: 'vid-789',
  title: 'Deleted Flick',
  description: 'This video was removed.',
  year_launched: 2020,
  opened: false,
  rating: '18',
  duration: 60,
  deleted_at: '2023-06-01T12:00:00Z', // Has deleted_at timestamp
  created_at: '2020-01-01T00:00:00Z',
  updated_at: '2023-06-01T12:00:00Z',
  genres: [mockGenre1],
  categories: [mockCategory2],
  cast_members: [], // Empty array
  thumb_file_url: 'http://example.com/deleted_thumb.jpg',
  banner_file_url: 'http://example.com/deleted_banner.jpg',
  trailer_file_url: 'http://example.com/deleted_trailer.mp4',
  video_file_url: 'http://example.com/deleted_video.mp4',
};

describe('Types: Video', () => {
  // Test the Video interface itself
  describe('Video Interface', () => {
    it('should allow creation of video objects with all fields', () => {
      const video: Video = { ...mockVideoFull };

      expect(video.id).toBe(mockVideoFull.id);
      expect(typeof video.id).toBe('string');
      expect(video.title).toBe(mockVideoFull.title);
      expect(typeof video.title).toBe('string');
      expect(video.description).toBe(mockVideoFull.description);
      expect(typeof video.description).toBe('string');
      expect(video.year_launched).toBe(mockVideoFull.year_launched);
      expect(typeof video.year_launched).toBe('number');
      expect(video.opened).toBe(true);
      expect(typeof video.opened).toBe('boolean');
      expect(video.rating).toBe(mockVideoFull.rating);
      expect(typeof video.rating).toBe('string');
      expect(video.duration).toBe(mockVideoFull.duration);
      expect(typeof video.duration).toBe('number');
      expect(video.deleted_at).toBeNull();
      expect(video.created_at).toBe(mockVideoFull.created_at);
      expect(typeof video.created_at).toBe('string');
      expect(video.updated_at).toBe(mockVideoFull.updated_at);
      expect(typeof video.updated_at).toBe('string');

      expect(Array.isArray(video.genres)).toBe(true);
      expect(video.genres?.length).toBe(2);
      expect(video.genres?.[0]).toEqual(mockGenre1);
      expect(Array.isArray(video.categories)).toBe(true);
      expect(video.categories?.length).toBe(1);
      expect(video.categories?.[0]).toEqual(mockCategory1);
      expect(Array.isArray(video.cast_members)).toBe(true);
      expect(video.cast_members?.length).toBe(2);
      expect(video.cast_members?.[0]).toEqual(mockActor);

      expect(video.thumb_file_url).toBe(mockVideoFull.thumb_file_url);
      expect(typeof video.thumb_file_url).toBe('string');
      expect(video.banner_file_url).toBe(mockVideoFull.banner_file_url);
      expect(typeof video.banner_file_url).toBe('string');
      expect(video.trailer_file_url).toBe(mockVideoFull.trailer_file_url);
      expect(typeof video.trailer_file_url).toBe('string');
      expect(video.video_file_url).toBe(mockVideoFull.video_file_url);
      expect(typeof video.video_file_url).toBe('string');
    });

    it('should allow creation of video objects with minimal optional fields', () => {
      const video: Video = { ...mockVideoMinimal };

      expect(video.id).toBe(mockVideoMinimal.id);
      expect(video.title).toBe(mockVideoMinimal.title);
      expect(video.year_launched).toBe(mockVideoMinimal.year_launched);
      expect(video.opened).toBe(false);
      expect(video.rating).toBe(mockVideoMinimal.rating);
      expect(video.duration).toBe(mockVideoMinimal.duration);
      expect(video.deleted_at).toBeUndefined(); // Optional field is absent
      expect(video.genres).toBeUndefined();
      expect(video.categories).toBeUndefined();
      expect(video.cast_members).toBeUndefined();
      expect(video.thumb_file_url).toBe(mockVideoMinimal.thumb_file_url);
      expect(video.banner_file_url).toBe(mockVideoMinimal.banner_file_url);
      expect(video.trailer_file_url).toBe(mockVideoMinimal.trailer_file_url);
      expect(video.video_file_url).toBe(mockVideoMinimal.video_file_url);
    });

    it('should allow creation of deleted video objects', () => {
      const video: Video = { ...mockVideoDeleted };

      expect(video.id).toBe(mockVideoDeleted.id);
      expect(video.title).toBe(mockVideoDeleted.title);
      expect(video.deleted_at).toBe(mockVideoDeleted.deleted_at);
      expect(typeof video.deleted_at).toBe('string'); // Check it's a string when present
      expect(Array.isArray(video.genres)).toBe(true);
      expect(video.genres?.length).toBe(1);
      expect(Array.isArray(video.categories)).toBe(true);
      expect(video.categories?.length).toBe(1);
      expect(Array.isArray(video.cast_members)).toBe(true);
      expect(video.cast_members?.length).toBe(0); // Check empty array case
    });
  });

  // Test the Results interface (list of videos)
  describe('Results Interface', () => {
    it('should allow creation of objects conforming to the Results interface', () => {
      const results: Results = {
        data: [mockVideoFull, mockVideoMinimal, mockVideoDeleted],
        links: mockLinks,
        meta: mockMeta,
      };

      expect(Array.isArray(results.data)).toBe(true);
      expect(results.data.length).toBe(3);
      expect(results.data[0]).toEqual(mockVideoFull);
      expect(results.data[1]).toEqual(mockVideoMinimal);
      expect(results.data[2]).toEqual(mockVideoDeleted);
      expect(results.links).toEqual(mockLinks);
      expect(results.meta).toEqual(mockMeta);
    });

    it('should allow empty data array in Results', () => {
      const resultsEmpty: Results = {
        data: [],
        links: { ...mockLinks, next: null, prev: null }, // Adjust links
        meta: {
          ...mockMeta,
          from: 0,
          to: 0,
          total: 0,
          current_page: 1,
          last_page: 1,
        }, // Adjust meta
      };

      expect(resultsEmpty.data).toEqual([]);
      expect(resultsEmpty.links).toBeDefined();
      expect(resultsEmpty.meta).toBeDefined();
      expect(resultsEmpty.meta.total).toBe(0);
    });
  });

  // Test the Result interface (single video)
  describe('Result Interface', () => {
    it('should allow creation of objects conforming to the Result interface', () => {
      const result: Result = {
        data: mockVideoFull,
        links: mockLinks, // Often might be simplified or absent
        meta: mockMeta, // Often might be simplified or absent
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
        search: 'Adventure',
      };

      expect(params.page).toBe(2);
      expect(typeof params.page).toBe('number');
      expect(params.perPage).toBe(50);
      expect(typeof params.perPage).toBe('number');
      expect(params.search).toBe('Adventure');
      expect(typeof params.search).toBe('string');
    });

    it('should allow creation of objects with only some optional params', () => {
      const paramsPartial: VideoParams = {
        search: 'Simple',
      };

      expect(paramsPartial.page).toBeUndefined();
      expect(paramsPartial.perPage).toBeUndefined();
      expect(paramsPartial.search).toBe('Simple');
    });

    it('should allow creation of empty params object', () => {
      const paramsEmpty: VideoParams = {};

      expect(paramsEmpty.page).toBeUndefined();
      expect(paramsEmpty.perPage).toBeUndefined();
      expect(paramsEmpty.search).toBeUndefined();
    });
  });
});
