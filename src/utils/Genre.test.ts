// src/utils/__tests__/Genre.spec.ts (or src/utils/Genre.spec.ts)

import { Category } from '../types/Category'; // Adjust the path if needed
import { Genre } from '../types/Genre'; // Adjust the path if needed
import { mapGenreToForm } from './Genre'; // Adjust the path if needed

// Mock Data Setup
const mockCategory1: Category = {
  id: 'cat-123',
  name: 'Action',
  description: 'Action movies',
  is_active: true,
  created_at: '2023-01-01T10:00:00Z',
  updated_at: '2023-01-01T10:00:00Z',
  deleted_at: null,
};

const mockCategory2: Category = {
  id: 'cat-456',
  name: 'Comedy',
  description: 'Comedy movies',
  is_active: true,
  created_at: '2023-01-02T11:00:00Z',
  updated_at: '2023-01-02T11:00:00Z',
  deleted_at: null,
};

describe('mapGenreToForm', () => {
  it('should correctly map a Genre with all properties including categories', () => {
    const inputGenre: Genre = {
      id: 'gen-abc',
      name: 'Sci-Fi Adventure',
      is_active: true,
      categories: [mockCategory1, mockCategory2],
      created_at: '2023-02-01T12:00:00Z',
      updated_at: '2023-02-01T12:00:00Z',
      deleted_at: null,
    };

    const expectedOutput = {
      id: 'gen-abc',
      name: 'Sci-Fi Adventure',
      is_active: true,
      categories_id: ['cat-123', 'cat-456'],
    };

    const result = mapGenreToForm(inputGenre);
    expect(result).toEqual(expectedOutput);
  });

  it('should correctly map a Genre with is_active set to false', () => {
    const inputGenre: Genre = {
      id: 'gen-def',
      name: 'Inactive Genre',
      is_active: false,
      categories: [mockCategory1],
      created_at: '2023-03-01T13:00:00Z',
      updated_at: '2023-03-01T13:00:00Z',
      deleted_at: null,
    };

    const expectedOutput = {
      id: 'gen-def',
      name: 'Inactive Genre',
      is_active: false,
      categories_id: ['cat-123'],
    };

    const result = mapGenreToForm(inputGenre);
    expect(result).toEqual(expectedOutput);
  });

  it('should correctly map a Genre with an empty categories array', () => {
    const inputGenre: Genre = {
      id: 'gen-ghi',
      name: 'Genre Without Categories',
      is_active: true,
      categories: [], // Empty array
      created_at: '2023-04-01T14:00:00Z',
      updated_at: '2023-04-01T14:00:00Z',
      deleted_at: null,
    };

    const expectedOutput = {
      id: 'gen-ghi',
      name: 'Genre Without Categories',
      is_active: true,
      categories_id: [], // Expecting an empty array
    };

    const result = mapGenreToForm(inputGenre);
    expect(result).toEqual(expectedOutput);
  });

  it('should correctly map a Genre where categories property is undefined', () => {
    // Assuming the Genre type allows categories to be optional
    const inputGenre: Genre = {
      id: 'gen-jkl',
      name: 'Genre With Undefined Categories',
      is_active: true,
      categories: undefined, // Undefined categories
      created_at: '2023-05-01T15:00:00Z',
      updated_at: '2023-05-01T15:00:00Z',
      deleted_at: null,
    };

    const expectedOutput = {
      id: 'gen-jkl',
      name: 'Genre With Undefined Categories',
      is_active: true,
      categories_id: undefined, // Expecting undefined due to optional chaining
    };

    const result = mapGenreToForm(inputGenre);
    expect(result).toEqual(expectedOutput);
  });

  it('should correctly map a Genre where categories property is null', () => {
    // Assuming the Genre type allows categories to be null
    const inputGenre: Genre = {
      id: 'gen-mno',
      name: 'Genre With Null Categories',
      is_active: true,
      categories: null, // Null categories
      created_at: '2023-06-01T16:00:00Z',
      updated_at: '2023-06-01T16:00:00Z',
      deleted_at: null,
    } as any; // Using 'as any' if the strict Genre type doesn't allow null

    const expectedOutput = {
      id: 'gen-mno',
      name: 'Genre With Null Categories',
      is_active: true,
      categories_id: undefined, // Expecting undefined due to optional chaining
    };

    const result = mapGenreToForm(inputGenre);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle is_active being undefined if the type allows it', () => {
    // This test depends on whether the Genre type definition allows is_active to be optional
    const inputGenre: Partial<Genre> & { id: string; name: string } = {
      // Using Partial<Genre> if is_active might truly be missing
      id: 'gen-pqr',
      name: 'Genre Maybe Active',
      is_active: undefined, // is_active is undefined
      categories: [],
    };

    const expectedOutput = {
      id: 'gen-pqr',
      name: 'Genre Maybe Active',
      is_active: undefined, // Expecting undefined
      categories_id: [],
    };

    // Cast to Genre if the function strictly expects it, even if properties are missing
    const result = mapGenreToForm(inputGenre as Genre);
    expect(result).toEqual(expectedOutput);
  });
});
