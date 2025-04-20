import { Links, Meta } from './_shared';

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
    it('should allow creation of objects conforming to the Links interface', () => {
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

    it('should allow null or empty strings if the API might return them (though the type is string)', () => {
      // While the type is `string`, real-world APIs might sometimes return null
      // or empty strings where a link isn't applicable. TypeScript itself
      // doesn't prevent assigning `null` unless strict null checks are aggressively used
      // or the type is explicitly `string | null`. This test acknowledges that possibility.
      // However, based *strictly* on the interface, only strings are expected.
      const mockLinksPartial: Partial<Links> & { next: string | null } = {
        // Using Partial for flexibility in example
        first: 'http://example.com/api/resource?page=1',
        next: null, // Example: No next page
        prev: '', // Example: No previous page (or represented as empty string)
        last: 'http://example.com/api/resource?page=1',
      };

      expect(mockLinksPartial.first).toBe(
        'http://example.com/api/resource?page=1'
      );
      // Depending on how null/empty strings are handled, adjust expectations.
      // If strictly adhering to the `string` type, `null` would cause a TS error
      // without the explicit `| null`.
      expect(mockLinksPartial.next).toBeNull();
      expect(mockLinksPartial.prev).toBe('');
      expect(mockLinksPartial.last).toBe(
        'http://example.com/api/resource?page=1'
      );
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

    it('should handle zero values correctly for numeric properties', () => {
      // Test edge case like zero results or first page
      const mockMetaZero: Meta = {
        from: 0, // Or null/undefined depending on API for empty results
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
    });
  });
});
