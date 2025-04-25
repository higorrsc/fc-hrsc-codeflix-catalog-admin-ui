import { ListOptions } from '../types/_shared'; // Import ListOptions if needed for typing map

/**
 * Maps specific frontend parameter names (keys often matching ListOptions)
 * to their corresponding backend query parameter names expected by the API.
 * We use Partial<Record<keyof ListOptions | string, string>> to allow mapping
 * ListOptions keys and potentially other string keys if needed later.
 */
const paramKeyMap: Partial<Record<keyof ListOptions | string, string>> = {
  perPage: 'per_page',
  // Add other mappings if needed
};

/**
 * Parses an object containing potential query parameters into a URL query string
 * suitable for API requests.
 *
 * - Accepts an object like `ListOptions` or any object with potential query params.
 * - Filters out parameters with `null` or `undefined` values.
 * - Explicitly ignores UI-specific keys like `rowsPerPage`.
 * - Maps keys according to `paramKeyMap` (e.g., 'perPage' becomes 'per_page').
 * - Converts remaining parameter values to strings.
 *
 * @template T - The type of the params object (e.g., ListOptions).
 * @param params - An object containing potential query parameters.
 * @returns A URL query string (without the leading '?'). Returns an empty string
 *          if no valid parameters are found after filtering and mapping.
 */
export function parseQueryParams<T extends Record<string, any>>(
  params: T
): string {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    // 1. Skip null/undefined/empty string for search
    if (
      value === null ||
      value === undefined ||
      (key === 'search' && value === '') // Also skip empty search strings
    ) {
      return;
    }

    // 2. Skip known UI-specific keys
    if (key === 'rowsPerPage') {
      return;
    }

    // 3. Determine the correct key name for the API
    const mappedKey = paramKeyMap[key as keyof typeof paramKeyMap] || key;

    // 4. Convert the value to a string and append
    queryParams.append(mappedKey, String(value));
  });

  return queryParams.toString();
}
