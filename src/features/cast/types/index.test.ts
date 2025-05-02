import {
  CastMember,
  CastMemberParams,
  CastMemberType,
  Result,
  Results,
} from '.';
import { Links, Meta } from '../../../types/_shared'; // Import shared types

// Mock data conforming to the shared interfaces
const mockLinks: Links = {
  first: 'http://example.com/api/cast_members?page=1',
  next: 'http://example.com/api/cast_members?page=3',
  prev: 'http://example.com/api/cast_members?page=1',
  last: 'http://example.com/api/cast_members?page=5',
};

const mockMeta: Meta = {
  from: 16,
  to: 30,
  path: 'http://example.com/api/cast_members',
  total: 75,
  per_page: 15,
  current_page: 2,
  last_page: 5,
};

// Mock data for CastMember
const mockActor: CastMember = {
  id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  name: 'John Doe',
  type: CastMemberType.ACTOR,
  deleted_at: null,
  created_at: '2023-02-01T11:00:00Z',
  updated_at: '2023-02-10T14:20:00Z',
};

const mockDirector: CastMember = {
  id: 'f0e9d8c7-b6a5-4321-fedc-ba9876543210',
  name: 'Jane Smith',
  type: CastMemberType.DIRECTOR,
  deleted_at: null,
  created_at: '2023-03-05T09:15:00Z',
  updated_at: '2023-03-05T09:15:00Z',
};

const mockDeletedCastMember: CastMember = {
  id: '12345678-90ab-cdef-1234-567890abcdef',
  name: 'Old Timer',
  type: CastMemberType.ACTOR,
  deleted_at: '2023-01-20T18:00:00Z', // Example with deleted_at timestamp
  created_at: '2022-10-01T07:00:00Z',
  updated_at: '2023-01-20T18:00:00Z',
};

describe('Types: CastMember', () => {
  // Test the CastMemberType enum
  describe('CastMemberType Enum', () => {
    it('should have correct numeric values', () => {
      expect(CastMemberType.ACTOR).toBe(1);
      expect(CastMemberType.DIRECTOR).toBe(2);
    });
  });

  // Test the CastMember interface itself
  describe('CastMember Interface', () => {
    it('should allow creation of actor cast member objects', () => {
      const member: CastMember = { ...mockActor };

      expect(member.id).toBe(mockActor.id);
      expect(typeof member.id).toBe('string');
      expect(member.name).toBe(mockActor.name);
      expect(typeof member.name).toBe('string');
      expect(member.type).toBe(CastMemberType.ACTOR);
      expect(Object.values(CastMemberType)).toContain(member.type);
      expect(member.deleted_at).toBeNull();
      expect(member.created_at).toBe(mockActor.created_at);
      expect(typeof member.created_at).toBe('string');
      expect(member.updated_at).toBe(mockActor.updated_at);
      expect(typeof member.updated_at).toBe('string');
    });

    it('should allow creation of director cast member objects', () => {
      const member: CastMember = { ...mockDirector };

      expect(member.id).toBe(mockDirector.id);
      expect(member.name).toBe(mockDirector.name);
      expect(member.type).toBe(CastMemberType.DIRECTOR);
      expect(member.deleted_at).toBeNull();
      expect(member.created_at).toBe(mockDirector.created_at);
      expect(member.updated_at).toBe(mockDirector.updated_at);
    });

    it('should allow creation of deleted cast member objects', () => {
      const member: CastMember = { ...mockDeletedCastMember };

      expect(member.id).toBe(mockDeletedCastMember.id);
      expect(member.name).toBe(mockDeletedCastMember.name);
      expect(member.type).toBe(CastMemberType.ACTOR);
      expect(member.deleted_at).toBe(mockDeletedCastMember.deleted_at);
      expect(
        typeof member.deleted_at === 'string' || member.deleted_at === null
      ).toBe(true);
      expect(member.created_at).toBe(mockDeletedCastMember.created_at);
      expect(member.updated_at).toBe(mockDeletedCastMember.updated_at);
    });
  });

  // Test the Results interface (list of cast members)
  describe('Results Interface', () => {
    it('should allow creation of objects conforming to the Results interface', () => {
      const results: Results = {
        data: [mockActor, mockDirector, mockDeletedCastMember],
        links: mockLinks,
        meta: mockMeta,
      };

      expect(Array.isArray(results.data)).toBe(true);
      expect(results.data.length).toBe(3);
      expect(results.data[0]).toEqual(mockActor);
      expect(results.data[1]).toEqual(mockDirector);
      expect(results.data[2]).toEqual(mockDeletedCastMember);
      expect(results.links).toEqual(mockLinks);
      expect(results.meta).toEqual(mockMeta);
    });

    it('should allow empty data array in Results', () => {
      const resultsEmpty: Results = {
        data: [],
        links: { ...mockLinks, next: '', prev: '' }, // Adjust links for empty/first page
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

  // Test the Result interface (single cast member)
  describe('Result Interface', () => {
    it('should allow creation of objects conforming to the Result interface', () => {
      // Note: Single result responses might not always include Links/Meta,
      // but the interface includes them for consistency.
      const result: Result = {
        data: mockDirector,
        links: mockLinks, // Often might be simplified or absent
        meta: mockMeta, // Often might be simplified or absent
      };

      expect(result.data).toEqual(mockDirector);
      expect(result.links).toEqual(mockLinks);
      expect(result.meta).toEqual(mockMeta);
    });
  });

  // Test the CastMemberParams interface
  describe('CastMemberParams Interface', () => {
    it('should allow creation of objects with all optional params', () => {
      const params: CastMemberParams = {
        page: 3,
        perPage: 20,
        search: 'Jane',
        type: CastMemberType.DIRECTOR,
      };

      expect(params.page).toBe(3);
      expect(typeof params.page).toBe('number');
      expect(params.perPage).toBe(20);
      expect(typeof params.perPage).toBe('number');
      expect(params.search).toBe('Jane');
      expect(typeof params.search).toBe('string');
      expect(params.type).toBe(CastMemberType.DIRECTOR);
      expect(Object.values(CastMemberType)).toContain(params.type);
    });

    it('should allow creation of objects with only some optional params', () => {
      const paramsPartial: CastMemberParams = {
        type: CastMemberType.ACTOR,
      };

      expect(paramsPartial.page).toBeUndefined();
      expect(paramsPartial.perPage).toBeUndefined();
      expect(paramsPartial.search).toBeUndefined();
      expect(paramsPartial.type).toBe(CastMemberType.ACTOR);
    });

    it('should allow creation of empty params object', () => {
      const paramsEmpty: CastMemberParams = {};

      expect(paramsEmpty.page).toBeUndefined();
      expect(paramsEmpty.perPage).toBeUndefined();
      expect(paramsEmpty.search).toBeUndefined();
      expect(paramsEmpty.type).toBeUndefined();
    });
  });
});
