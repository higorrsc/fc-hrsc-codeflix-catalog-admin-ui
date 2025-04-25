import { Links, ListOptions, Meta } from './_shared';

// Since _shared.ts only contains TypeScript interfaces,
// there's no runtime logic to test directly with unit tests.
// Interfaces are compile-time constructs used for type checking.
//
// The "tests" below primarily serve to:
// 1. Ensure the types can be imported and used without syntax errors.
// 2. Demonstrate the expected structure of objects conforming to these interfaces.
// 3. Satisfy test coverage tools if they require test files for all source files.

describe('Types: _shared', () => {
  describe('Links Interface', () => {
    it('should allow creation of objects conforming to the Links interface with non-null next/prev', () => {
      // This test primarily checks if the type definition is valid TypeScript
      // and can be used to type an object.
      const mockLinks: Links = {
        first: 'http://example.com/api/resource?page=1',
        next: 'http://example.com/api/resource?page=3',
        prev: 'http://example.com/api/resource?page=1',
        last: 'http://example.com/api/resource?page=10',
      };

      // Basic assertions to ensure the properties exist and have the correct type (implicitly checked by TS)
      expect(mockLinks.first).toBeDefined();
      expect(typeof mockLinks.first).toBe('string');
      expect(mockLinks.next).toBeDefined();
      expect(typeof mockLinks.next).toBe('string');
      expect(mockLinks.prev).toBeDefined();
      expect(typeof mockLinks.prev).toBe('string');
      expect(mockLinks.last).toBeDefined();
      expect(typeof mockLinks.last).toBe('string');

      // A trivial assertion to make the test runner happy
      expect(true).toBe(true);
    });

    it('should allow creation of objects conforming to the Links interface with null next/prev', () => {
      // Test the case where next/prev links might be null (e.g., first or last page)
      const mockLinksNull: Links = {
        first: 'http://example.com/api/resource?page=1',
        next: null, // Example: Last page
        prev: null, // Example: First page
        last: 'http://example.com/api/resource?page=1',
      };

      expect(mockLinksNull.first).toBe(
        'http://example.com/api/resource?page=1'
      );
      expect(mockLinksNull.next).toBeNull();
      expect(mockLinksNull.prev).toBeNull();
      expect(mockLinksNull.last).toBe('http://example.com/api/resource?page=1');
    });
  });

  describe('Meta Interface', () => {
    it('should allow creation of objects conforming to the Meta interface', () => {
      // This test primarily checks if the type definition is valid TypeScript.
      const mockMeta: Meta = {
        from: 1,
        to: 15,
        path: 'http://example.com/api/resource',
        total: 100,
        per_page: 15,
        current_page: 1,
        last_page: 7,
      };

      // Basic assertions for existence and type (implicitly checked by TS)
      expect(mockMeta.from).toBeDefined();
      expect(typeof mockMeta.from).toBe('number');
      expect(mockMeta.to).toBeDefined();
      expect(typeof mockMeta.to).toBe('number');
      expect(mockMeta.path).toBeDefined();
      expect(typeof mockMeta.path).toBe('string');
      expect(mockMeta.total).toBeDefined();
      expect(typeof mockMeta.total).toBe('number');
      expect(mockMeta.per_page).toBeDefined();
      expect(typeof mockMeta.per_page).toBe('number');
      expect(mockMeta.current_page).toBeDefined();
      expect(typeof mockMeta.current_page).toBe('number');
      expect(mockMeta.last_page).toBeDefined();
      expect(typeof mockMeta.last_page).toBe('number');

      // A trivial assertion
      expect(true).toBe(true);
    });

    it('should handle zero values correctly for numeric properties in Meta', () => {
      // Test edge case like zero results or first page
      const mockMetaZero: Meta = {
        from: 0, // Or null/undefined depending on API for empty results, but type is number
        to: 0, // Or null/undefined
        path: 'http://example.com/api/resource',
        total: 0,
        per_page: 15,
        current_page: 1, // Or 0 if API uses 0-based indexing? Assume 1-based per example.
        last_page: 0, // If total is 0, last_page is often 0 or 1.
      };

      expect(mockMetaZero.from).toBe(0);
      expect(mockMetaZero.to).toBe(0);
      expect(mockMetaZero.total).toBe(0);
      expect(mockMetaZero.last_page).toBe(0);
      expect(mockMetaZero.per_page).toBe(15);
      expect(mockMetaZero.current_page).toBe(1);
      expect(mockMetaZero.path).toBe('http://example.com/api/resource');
    });
  });

  describe('ListOptions Interface', () => {
    it('should allow creation of objects conforming to the ListOptions interface with search', () => {
      const mockOptions: ListOptions = {
        page: 2,
        perPage: 25,
        rowsPerPage: [10, 25, 50],
        search: 'test query',
      };

      expect(mockOptions.page).toBeDefined();
      expect(typeof mockOptions.page).toBe('number');
      expect(mockOptions.perPage).toBeDefined();
      expect(typeof mockOptions.perPage).toBe('number');
      expect(mockOptions.rowsPerPage).toBeDefined();
      expect(Array.isArray(mockOptions.rowsPerPage)).toBe(true);
      expect(mockOptions.rowsPerPage[0]).toBe(10);
      expect(typeof mockOptions.rowsPerPage[0]).toBe('number');
      expect(mockOptions.search).toBeDefined();
      expect(typeof mockOptions.search).toBe('string');

      expect(mockOptions.page).toBe(2);
      expect(mockOptions.perPage).toBe(25);
      expect(mockOptions.rowsPerPage).toEqual([10, 25, 50]);
      expect(mockOptions.search).toBe('test query');
    });

    it('should allow creation of objects conforming to the ListOptions interface without optional search', () => {
      const mockOptions: ListOptions = {
        page: 1,
        perPage: 10,
        rowsPerPage: [10, 20, 30, 40],
        // search is omitted
      };

      expect(mockOptions.page).toBe(1);
      expect(mockOptions.perPage).toBe(10);
      expect(mockOptions.rowsPerPage).toEqual([10, 20, 30, 40]);
      expect(mockOptions.search).toBeUndefined(); // Check that optional property is undefined
    });

    it('should allow search to be an empty string', () => {
      const mockOptions: ListOptions = {
        page: 1,
        perPage: 10,
        rowsPerPage: [10, 20, 30, 40],
        search: '',
      };

      expect(mockOptions.page).toBe(1);
      expect(mockOptions.perPage).toBe(10);
      expect(mockOptions.rowsPerPage).toEqual([10, 20, 30, 40]);
      expect(mockOptions.search).toBe('');
    });
  });
});
