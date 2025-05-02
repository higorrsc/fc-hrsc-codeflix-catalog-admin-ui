import { getCastMemberTypeOptions } from '.';
import { CastMemberType } from '../types';

describe('Utils: CastMember', () => {
  describe('getCastMemberTypeOptions', () => {
    it('should return an array of options based on CastMemberType enum', () => {
      const options = getCastMemberTypeOptions();

      // Expected output based on the CastMemberType enum
      const expectedOptions = [
        {
          value: CastMemberType.ACTOR, // 1
          label: 'Actor', // Formatted from 'ACTOR'
        },
        {
          value: CastMemberType.DIRECTOR, // 2
          label: 'Director', // Formatted from 'DIRECTOR'
        },
      ];

      // Check if the output is an array
      expect(Array.isArray(options)).toBe(true);

      // Check if the length matches the number of numeric enum members
      const numericEnumMembers = Object.values(CastMemberType).filter(
        (v) => typeof v === 'number'
      );
      expect(options).toHaveLength(numericEnumMembers.length);

      // Check if the structure and content match the expected output
      expect(options).toEqual(expectedOptions);

      // Optionally, check individual elements for more specific testing
      expect(options[0]).toEqual({ value: 1, label: 'Actor' });
      expect(options[1]).toEqual({ value: 2, label: 'Director' });
    });

    it('should correctly format the labels (Capitalize first letter, rest lowercase)', () => {
      const options = getCastMemberTypeOptions();

      options.forEach((option) => {
        // Retrieve the original enum key string
        const enumKey = CastMemberType[option.value as CastMemberType];
        // Check if the label matches the expected format
        const expectedLabel =
          enumKey.charAt(0).toUpperCase() + enumKey.slice(1).toLowerCase();
        expect(option.label).toBe(expectedLabel);
      });
    });

    it('should only include numeric enum values', () => {
      const options = getCastMemberTypeOptions();

      // Ensure all returned values are numbers
      options.forEach((option) => {
        expect(typeof option.value).toBe('number');
        // Ensure the value corresponds to a valid enum member
        expect(CastMemberType[option.value as CastMemberType]).toBeDefined();
      });
    });
  });
});
