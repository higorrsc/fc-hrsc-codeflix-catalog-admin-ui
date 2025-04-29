import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useUniqueCategories } from 'src/hooks/useUniqueCategories';
import { Page } from '../../components/Page';
import { Video } from '../../types/Video';
import { mapVideoToForm } from '../../utils/Video';
import { VideoForm } from './components/VideoForm';
import {
  initialState,
  useCreateVideoMutation,
  useGetAllCastMembersQuery,
  useGetAllGenresQuery,
} from './videoSlice';

export const CreateVideo = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isDisabled, setIsDisabled] = useState(false);
  const [videoState, setVideoState] = useState<Video>(initialState);
  // const { data: categories } = useGetAllCategoriesQuery();
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const [createVideo, status] = useCreateVideoMutation();
  const [categories] = useUniqueCategories(videoState, setVideoState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideoState({ ...videoState, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createVideo(mapVideoToForm(videoState));
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Video created successfully!', { variant: 'success' });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar('Error creating video!', { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Page title='Create Video'>
      <VideoForm
        video={videoState}
        categories={categories}
        genres={genres?.data}
        castMembers={castMembers?.data}
        isDisabled={isDisabled}
        isLoading={status.isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Page>
  );
};
