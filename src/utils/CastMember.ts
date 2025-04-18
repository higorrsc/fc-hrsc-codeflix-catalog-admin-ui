import { CastMemberType } from '../types/CastMember';

const castMemberTypeLabelMap: Record<CastMemberType, string> = {
  [CastMemberType.ACTOR]: 'Actor',
  [CastMemberType.DIRECTOR]: 'Director',
};

export function getCastMemberTypeLabel(type: CastMemberType): string {
  return castMemberTypeLabelMap[type] || 'Unknown';
}

export const castMemberTypeOptions = [
  { value: CastMemberType.ACTOR, label: 'Actor' },
  { value: CastMemberType.DIRECTOR, label: 'Director' },
];
