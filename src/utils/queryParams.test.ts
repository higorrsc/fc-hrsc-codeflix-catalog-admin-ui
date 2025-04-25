// /home/higorrsc/devdisk/courses/fullcycle/v.3/codeflix-catalog-admin-ui/src/utils/queryParams.test.ts
import { ListOptions } from '../types/_shared';
import { parseQueryParams } from './queryParams';

describe('Utils: parseQueryParams', () => {
  it('should return an empty string for an empty params object', () => {
    const params = {};
    expect(parseQueryParams(params)).toBe('');
  });

  it('should correctly parse basic ListOptions', () => {
    const params: ListOptions = {
      page: 1,
      perPage: 10,
      rowsPerPage: [10, 25, 50], // Should be ignored
      search: 'test',
    };
    // Expected order might vary, but URLSearchParams usually sorts
    const expected = 'page=1&per_page=10&search=test';
    expect(parseQueryParams(params)).toBe(expected);
  });

  it('should map perPage to per_page', () => {
    const params = { perPage: 25 };
    expect(parseQueryParams(params)).toBe('per_page=25');
  });

  it('should include page parameter', () => {
    const params = { page: 3 };
    expect(parseQueryParams(params)).toBe('page=3');
  });

  it('should include search parameter if not empty', () => {
    const params = { search: 'query term' };
    expect(parseQueryParams(params)).toBe('search=query+term'); // URL encodes space
  });

  it('should ignore empty search parameter', () => {
    const params: ListOptions = {
      page: 1,
      perPage: 10,
      rowsPerPage: [10],
      search: '', // Empty search
    };
    expect(parseQueryParams(params)).toBe('page=1&per_page=10');
  });

  it('should ignore null search parameter', () => {
    const params = {
      page: 1,
      search: null, // Null search
    };
    expect(parseQueryParams(params)).toBe('page=1');
  });

  it('should ignore undefined search parameter', () => {
    const params: ListOptions = {
      page: 1,
      perPage: 10,
      rowsPerPage: [10],
      search: undefined, // Undefined search
    };
    expect(parseQueryParams(params)).toBe('page=1&per_page=10');
  });

  it('should ignore rowsPerPage parameter', () => {
    const params = { rowsPerPage: [5, 10, 15] };
    expect(parseQueryParams(params)).toBe('');
  });

  it('should ignore parameters with null values', () => {
    const params = { page: 1, search: null, perPage: null };
    expect(parseQueryParams(params)).toBe('page=1');
  });

  it('should ignore parameters with undefined values', () => {
    const params = { page: undefined, search: 'test', perPage: 15 };
    expect(parseQueryParams(params)).toBe('search=test&per_page=15');
  });

  it('should handle mixed valid, ignored, and null/undefined parameters', () => {
    const params = {
      page: 2,
      perPage: 50,
      rowsPerPage: [50, 100], // Ignore
      search: '', // Ignore
      isActive: null, // Ignore
      sortBy: undefined, // Ignore
      filter: 'active', // Include
    };
    const expected = 'page=2&per_page=50&filter=active';
    expect(parseQueryParams(params)).toBe(expected);
  });

  it('should handle parameters not defined in ListOptions or paramKeyMap', () => {
    const params = {
      page: 1,
      customFilter: 'value123',
      anotherParam: true, // Booleans are converted to string
    };
    const expected = 'page=1&customFilter=value123&anotherParam=true';
    // Note: URLSearchParams sorts alphabetically by default in many environments
    // Let's sort the expected string to be safe
    const sortedExpected = expected.split('&').sort().join('&');
    const result = parseQueryParams(params);
    const sortedResult = result.split('&').sort().join('&');
    expect(sortedResult).toBe(sortedExpected);
  });

  it('should handle numeric values correctly', () => {
    const params = { page: 5, perPage: 100 };
    expect(parseQueryParams(params)).toBe('page=5&per_page=100');
  });

  it('should handle zero values for numeric params', () => {
    // Assuming page 0 is not valid, but perPage 0 might be (though unlikely)
    // Let's test if it passes '0' correctly if provided
    const params = { page: 0, perPage: 10 };
    expect(parseQueryParams(params)).toBe('page=0&per_page=10');
  });
});
