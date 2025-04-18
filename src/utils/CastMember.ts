import { CastMemberType } from '../types/CastMember';

export function getCastMemberTypeOptions() {
  return Object.values(CastMemberType)
    .filter((value) => typeof value === 'number')
    .map((value) => ({
      value,
      label:
        CastMemberType[value as CastMemberType].charAt(0) +
        CastMemberType[value as CastMemberType].slice(1).toLowerCase(),
    }));
}
