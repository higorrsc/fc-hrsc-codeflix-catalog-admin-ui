import { CastMemberType } from '../types/CastMember';

const castMemberTypeLabelMap: Record<CastMemberType, string> = {
  [CastMemberType.ACTOR]: 'Actor',
  [CastMemberType.DIRECTOR]: 'Director',
};

export function getCastMemberTypeLabel(type: CastMemberType): string {
  return castMemberTypeLabelMap[type] || 'Unknown';
}
