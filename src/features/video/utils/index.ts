import { Video, VideoPayload } from 'src/features/video/types';

export const mapVideoToForm = (video: Video): VideoPayload => {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    year_launched: video.year_launched,
    opened: video.opened,
    rating: video.rating,
    duration: video.duration,
    genres_id: video.genres?.map((genre) => genre.id),
    categories_id: video.categories?.map((category) => category.id),
    cast_members_id: video.cast_members?.map((cast_member) => cast_member.id),
  };
};
