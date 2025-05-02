import { Genre, GenreParams, GenrePayload, Pivot, Result, Results } from '.';
import { Links, Meta } from '../../../types/_shared'; // Import shared types
import { Category } from '../../category/types'; // Import Category type

// Mock data conforming to the shared interfaces
const mockLinks: Links = {
  first: 'http://example.com/api/genres?page=1',
  next: 'http://example.com/api/genres?page=3',
  prev: 'http://example.com/api/genres?page=1',
  last: 'http://example.com/api/genres?page=5',
};

const mockMeta: Meta = {
  from: 16,
  to: 30,
  path: 'http://example.com/api/genres',
  total: 75,
  per_page: 15,
  current_page: 2,
  last_page: 5,
};

// Mock data for Category (simplified)
const mockCategory1: Category = {
  id: 'cat-123',
  name: 'Action',
  description: 'Action-packed movies',
  is_active: true,
  deleted_at: null,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

const mockCategory2: Category = {
  id: 'cat-456',
  name: 'Comedy',
  description: null,
  is_active: true,
  deleted_at: null,
  created_at: '2023-01-02T00:00:00Z',
  updated_at: '2023-01-02T00:00:00Z',
};

// Mock data for Pivot
const mockPivot: Pivot = {
  genre_id: 'gen-abc',
  category_id: 'cat-123',
};

// Mock data for Genre
const mockGenreActive: Genre = {
  id: 'gen-abc',
  name: 'Sci-Fi',
  is_active: true,
  deleted_at: null,
  created_at: '2023-03-01T10:00:00Z',
  updated_at: '2023-03-15T12:30:00Z',
  categories: [mockCategory1, mockCategory2],
  pivot: mockPivot, // Pivot might be present in some contexts, e.g., when nested
};

const mockGenreInactive: Genre = {
  id: 'gen-def',
  name: 'Western',
  is_active: false,
  deleted_at: null,
  created_at: '2023-04-01T00:00:00Z',
  updated_at: '2023-04-01T00:00:00Z',
  // categories and pivot are optional
};

const mockGenreDeleted: Genre = {
  id: 'gen-ghi',
  name: 'Horror',
  is_active: false, // Usually inactive when deleted
  deleted_at: '2023-05-01T18:00:00Z',
  created_at: '2022-11-01T00:00:00Z',
  updated_at: '2023-05-01T18:00:00Z',
  categories: [mockCategory1],
};

describe('Types: Genre', () => {
  // Test the Genre interface itself
  describe('Genre Interface', () => {
    it('should allow creation of active genre objects with categories and pivot', () => {
      const genre: Genre = { ...mockGenreActive };

      expect(genre.id).toBe(mockGenreActive.id);
      expect(typeof genre.id).toBe('string');
      expect(genre.name).toBe(mockGenreActive.name);
      expect(typeof genre.name).toBe('string');
      expect(genre.is_active).toBe(true);
      expect(typeof genre.is_active).toBe('boolean');
      expect(genre.deleted_at).toBeNull();
      expect(genre.created_at).toBe(mockGenreActive.created_at);
      expect(typeof genre.created_at).toBe('string');
      expect(genre.updated_at).toBe(mockGenreActive.updated_at);
      expect(typeof genre.updated_at).toBe('string');
      expect(Array.isArray(genre.categories)).toBe(true);
      expect(genre.categories?.length).toBe(2);
      expect(genre.categories?.[0]).toEqual(mockCategory1);
      expect(genre.pivot).toEqual(mockPivot);
      expect(typeof genre.pivot?.genre_id).toBe('string');
      expect(typeof genre.pivot?.category_id).toBe('string');
    });

    it('should allow creation of inactive genre objects without optional fields', () => {
      const genre: Genre = { ...mockGenreInactive };

      expect(genre.id).toBe(mockGenreInactive.id);
      expect(genre.name).toBe(mockGenreInactive.name);
      expect(genre.is_active).toBe(false);
      expect(genre.deleted_at).toBeNull();
      expect(genre.created_at).toBe(mockGenreInactive.created_at);
      expect(genre.updated_at).toBe(mockGenreInactive.updated_at);
      expect(genre.categories).toBeUndefined();
      expect(genre.pivot).toBeUndefined();
    });

    it('should allow creation of deleted genre objects', () => {
      const genre: Genre = { ...mockGenreDeleted };

      expect(genre.id).toBe(mockGenreDeleted.id);
      expect(genre.name).toBe(mockGenreDeleted.name);
      expect(genre.is_active).toBe(false);
      expect(genre.deleted_at).toBe(mockGenreDeleted.deleted_at);
      expect(
        typeof genre.deleted_at === 'string' || genre.deleted_at === null
      ).toBe(true);
      expect(genre.created_at).toBe(mockGenreDeleted.created_at);
      expect(genre.updated_at).toBe(mockGenreDeleted.updated_at);
      expect(Array.isArray(genre.categories)).toBe(true);
      expect(genre.categories?.length).toBe(1);
    });
  });

  // Test the Pivot interface
  describe('Pivot Interface', () => {
    it('should allow creation of objects conforming to the Pivot interface', () => {
      const pivot: Pivot = { ...mockPivot };

      expect(pivot.genre_id).toBe(mockPivot.genre_id);
      expect(typeof pivot.genre_id).toBe('string');
      expect(pivot.category_id).toBe(mockPivot.category_id);
      expect(typeof pivot.category_id).toBe('string');
    });
  });

  // Test the Results interface (list of genres)
  describe('Results Interface', () => {
    it('should allow creation of objects conforming to the Results interface', () => {
      const results: Results = {
        data: [mockGenreActive, mockGenreInactive, mockGenreDeleted],
        links: mockLinks,
        meta: mockMeta,
      };

      expect(Array.isArray(results.data)).toBe(true);
      expect(results.data.length).toBe(3);
      expect(results.data[0]).toEqual(mockGenreActive);
      expect(results.data[1]).toEqual(mockGenreInactive);
      expect(results.data[2]).toEqual(mockGenreDeleted);
      expect(results.links).toEqual(mockLinks);
      expect(results.meta).toEqual(mockMeta);
    });

    it('should allow empty data array in Results', () => {
      const resultsEmpty: Results = {
        data: [],
        links: { ...mockLinks, next: null, prev: null }, // Adjust links for empty/first page
        meta: {
          ...mockMeta,
          from: 0,
          to: 0,
          total: 0,
          current_page: 1,
          last_page: 1,
        }, // Adjust meta for empty
      };

      expect(resultsEmpty.data).toEqual([]);
      expect(resultsEmpty.links).toBeDefined();
      expect(resultsEmpty.meta).toBeDefined();
      expect(resultsEmpty.meta.total).toBe(0);
    });
  });

  // Test the Result interface (single genre)
  describe('Result Interface', () => {
    it('should allow creation of objects conforming to the Result interface', () => {
      // Note: Single result responses might not always include Links/Meta,
      // but the interface includes them for consistency.
      const result: Result = {
        data: mockGenreActive,
        links: mockLinks, // Often might be simplified or absent
        meta: mockMeta, // Often might be simplified or absent
      };

      expect(result.data).toEqual(mockGenreActive);
      expect(result.links).toEqual(mockLinks);
      expect(result.meta).toEqual(mockMeta);
    });
  });

  // Test the GenreParams interface
  describe('GenreParams Interface', () => {
    it('should allow creation of objects with all optional params', () => {
      const params: GenreParams = {
        page: 3,
        perPage: 20,
        search: 'Sci',
        isActive: true,
      };

      expect(params.page).toBe(3);
      expect(typeof params.page).toBe('number');
      expect(params.perPage).toBe(20);
      expect(typeof params.perPage).toBe('number');
      expect(params.search).toBe('Sci');
      expect(typeof params.search).toBe('string');
      expect(params.isActive).toBe(true);
      expect(typeof params.isActive).toBe('boolean');
    });

    it('should allow creation of objects with only some optional params', () => {
      const paramsPartial: GenreParams = {
        isActive: false,
      };

      expect(paramsPartial.page).toBeUndefined();
      expect(paramsPartial.perPage).toBeUndefined();
      expect(paramsPartial.search).toBeUndefined();
      expect(paramsPartial.isActive).toBe(false);
    });

    it('should allow creation of empty params object', () => {
      const paramsEmpty: GenreParams = {};

      expect(paramsEmpty.page).toBeUndefined();
      expect(paramsEmpty.perPage).toBeUndefined();
      expect(paramsEmpty.search).toBeUndefined();
      expect(paramsEmpty.isActive).toBeUndefined();
    });
  });

  // Test the GenrePayload interface
  describe('GenrePayload Interface', () => {
    it('should allow creation of payload objects with categories_id', () => {
      const payload: GenrePayload = {
        id: 'gen-xyz',
        name: 'Thriller',
        is_active: true,
        categories_id: ['cat-123', 'cat-789'],
      };

      expect(payload.id).toBe('gen-xyz');
      expect(typeof payload.id).toBe('string');
      expect(payload.name).toBe('Thriller');
      expect(typeof payload.name).toBe('string');
      expect(payload.is_active).toBe(true);
      expect(typeof payload.is_active).toBe('boolean');
      expect(Array.isArray(payload.categories_id)).toBe(true);
      expect(payload.categories_id?.length).toBe(2);
      expect(payload.categories_id?.[0]).toBe('cat-123');
      expect(typeof payload.categories_id?.[0]).toBe('string');
    });

    it('should allow creation of payload objects without optional categories_id', () => {
      const payload: GenrePayload = {
        id: 'gen-pqr',
        name: 'Documentary',
        is_active: false,
      };

      expect(payload.id).toBe('gen-pqr');
      expect(payload.name).toBe('Documentary');
      expect(payload.is_active).toBe(false);
      expect(payload.categories_id).toBeUndefined();
    });

    it('should allow empty categories_id array', () => {
      const payload: GenrePayload = {
        id: 'gen-stu',
        name: 'Animation',
        is_active: true,
        categories_id: [],
      };

      expect(payload.id).toBe('gen-stu');
      expect(payload.name).toBe('Animation');
      expect(payload.is_active).toBe(true);
      expect(Array.isArray(payload.categories_id)).toBe(true);
      expect(payload.categories_id?.length).toBe(0);
    });
  });
});
