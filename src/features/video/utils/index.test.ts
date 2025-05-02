// /home/higorrsc/devdisk/courses/fullcycle/v.3/codeflix-catalog-admin-ui/src/utils/Video.test.ts
import { mapVideoToForm } from '.'; // Import the function to test
import { CastMember, CastMemberType } from '../../cast/types';
import { Category } from '../../category/types';
import { Genre } from '../../genre/types';
import { Video, VideoPayload } from '../types';

// --- Mock Data ---

const mockCategory1: Category = {
  id: 'cat-uuid-1',
  name: 'Movies',
  description: null,
  is_active: true,
  deleted_at: null,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

const mockCategory2: Category = {
  id: 'cat-uuid-2',
  name: 'Documentaries',
  description: 'Educational',
  is_active: true,
  deleted_at: null,
  created_at: '2023-01-02T00:00:00Z',
  updated_at: '2023-01-02T00:00:00Z',
};

const mockGenre1: Genre = {
  id: 'genre-uuid-1',
  name: 'Action',
  is_active: true,
  deleted_at: null,
  created_at: '2023-02-01T00:00:00Z',
  updated_at: '2023-02-01T00:00:00Z',
};

const mockGenre2: Genre = {
  id: 'genre-uuid-2',
  name: 'Adventure',
  is_active: true,
  deleted_at: null,
  created_at: '2023-02-02T00:00:00Z',
  updated_at: '2023-02-02T00:00:00Z',
};

const mockActor: CastMember = {
  id: 'cm-uuid-1',
  name: 'Actor One',
  type: CastMemberType.ACTOR,
  deleted_at: null,
  created_at: '2023-03-01T00:00:00Z',
  updated_at: '2023-03-01T00:00:00Z',
};

const mockDirector: CastMember = {
  id: 'cm-uuid-2',
  name: 'Director One',
  type: CastMemberType.DIRECTOR,
  deleted_at: null,
  created_at: '2023-03-02T00:00:00Z',
  updated_at: '2023-03-02T00:00:00Z',
};

// Mock Video object with full data including relationships
const mockVideoFull: Video = {
  id: 'video-uuid-123',
  title: 'Full Feature',
  description: 'A video with all relationships.',
  year_launched: 2023,
  opened: true,
  rating: '12',
  duration: 115,
  deleted_at: null,
  created_at: '2023-04-01T10:00:00Z',
  updated_at: '2023-04-15T11:30:00Z',
  genres: [mockGenre1, mockGenre2],
  categories: [mockCategory1, mockCategory2],
  cast_members: [mockActor, mockDirector],
  thumb_file_url: 'url1',
  banner_file_url: 'url2',
  trailer_file_url: 'url3',
  video_file_url: 'url4',
};

// Mock Video object with missing relationships
const mockVideoMinimal: Video = {
  id: 'video-uuid-456',
  title: 'Minimal Feature',
  description: 'No relationships defined.',
  year_launched: 2022,
  opened: false,
  rating: 'L',
  duration: 90,
  deleted_at: null,
  created_at: '2023-05-01T00:00:00Z',
  updated_at: '2023-05-01T00:00:00Z',
  // genres, categories, cast_members are undefined
  thumb_file_url: 'url5',
  banner_file_url: 'url6',
  trailer_file_url: 'url7',
  video_file_url: 'url8',
};

// Mock Video object with empty relationship arrays
const mockVideoEmptyArrays: Video = {
  id: 'video-uuid-789',
  title: 'Empty Arrays Feature',
  description: 'Relationships are empty arrays.',
  year_launched: 2021,
  opened: true,
  rating: '10',
  duration: 60,
  deleted_at: null,
  created_at: '2023-06-01T00:00:00Z',
  updated_at: '2023-06-01T00:00:00Z',
  genres: [],
  categories: [],
  cast_members: [],
  thumb_file_url: 'url9',
  banner_file_url: 'url10',
  trailer_file_url: 'url11',
  video_file_url: 'url12',
};

// Mock Video object with mixed relationships (some present, some empty, some missing)
const mockVideoMixed: Video = {
  id: 'video-uuid-abc',
  title: 'Mixed Feature',
  description: 'Some relationships present, some not.',
  year_launched: 2020,
  opened: false,
  rating: '18',
  duration: 150,
  deleted_at: null,
  created_at: '2023-07-01T00:00:00Z',
  updated_at: '2023-07-01T00:00:00Z',
  genres: [mockGenre1], // Present
  categories: [], // Empty array
  // cast_members is undefined
  thumb_file_url: 'url13',
  banner_file_url: 'url14',
  trailer_file_url: 'url15',
  video_file_url: 'url16',
};

// --- Tests ---

describe('Utils: Video', () => {
  describe('mapVideoToForm', () => {
    it('should map a Video object with full relationships to VideoPayload', () => {
      const result = mapVideoToForm(mockVideoFull);

      const expectedPayload: VideoPayload = {
        id: 'video-uuid-123',
        title: 'Full Feature',
        description: 'A video with all relationships.',
        year_launched: 2023,
        opened: true,
        rating: '12',
        duration: 115,
        genres_id: ['genre-uuid-1', 'genre-uuid-2'],
        categories_id: ['cat-uuid-1', 'cat-uuid-2'],
        cast_members_id: ['cm-uuid-1', 'cm-uuid-2'],
      };

      expect(result).toEqual(expectedPayload);
    });

    it('should map a Video object with missing relationships to VideoPayload (IDs should be undefined)', () => {
      const result = mapVideoToForm(mockVideoMinimal);

      const expectedPayload: VideoPayload = {
        id: 'video-uuid-456',
        title: 'Minimal Feature',
        description: 'No relationships defined.',
        year_launched: 2022,
        opened: false,
        rating: 'L',
        duration: 90,
        genres_id: undefined, // Expect undefined due to optional chaining on undefined input
        categories_id: undefined, // Expect undefined
        cast_members_id: undefined, // Expect undefined
      };

      expect(result).toEqual(expectedPayload);
    });

    it('should map a Video object with empty relationship arrays to VideoPayload (IDs should be empty arrays)', () => {
      const result = mapVideoToForm(mockVideoEmptyArrays);

      const expectedPayload: VideoPayload = {
        id: 'video-uuid-789',
        title: 'Empty Arrays Feature',
        description: 'Relationships are empty arrays.',
        year_launched: 2021,
        opened: true,
        rating: '10',
        duration: 60,
        genres_id: [], // Expect empty array
        categories_id: [], // Expect empty array
        cast_members_id: [], // Expect empty array
      };

      expect(result).toEqual(expectedPayload);
    });

    it('should map a Video object with mixed relationships correctly', () => {
      const result = mapVideoToForm(mockVideoMixed);

      const expectedPayload: VideoPayload = {
        id: 'video-uuid-abc',
        title: 'Mixed Feature',
        description: 'Some relationships present, some not.',
        year_launched: 2020,
        opened: false,
        rating: '18',
        duration: 150,
        genres_id: ['genre-uuid-1'], // Expect array with one ID
        categories_id: [], // Expect empty array
        cast_members_id: undefined, // Expect undefined
      };

      expect(result).toEqual(expectedPayload);
    });
  });
});
