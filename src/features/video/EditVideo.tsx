import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Video } from '../../types/Video';

import { Page } from '../../components/Page';
import { VideoForm } from './components/VideoForm';
import { initialState, useGetVideoByIdQuery } from './videoSlice';

export const EditVideo = () => {
  const id = useParams<{ id: string }>().id as string;
  const { enqueueSnackbar } = useSnackbar();
  const [isDisabled, setIsDisabled] = useState(false);
  const [videoState, setVideoState] = useState<Video>(initialState);
  // const [updateVideo, status] = useUpdateVideoMutation();
  // const { data: categories } = useGetAllCategoriesQuery();
  const { data: video, isFetching } = useGetVideoByIdQuery({ id });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideoState({ ...videoState, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // await updateVideo(mapVideoToForm(videoState));
  }

  useEffect(() => {
    if (video) {
      setVideoState(video.data);
    }
  }, [video]);

  // useEffect(() => {
  //   if (status.isSuccess) {
  //     enqueueSnackbar('Video updated successfully!', { variant: 'success' });
  //     setIsDisabled(true);
  //   }
  //   if (status.error) {
  //     enqueueSnackbar('Error updating video!', { variant: 'error' });
  //   }
  // }, [status, enqueueSnackbar]);

  return (
    <Page title='Edit Video'>
      <VideoForm
        video={videoState}
        isDisabled={isDisabled}
        isLoading={isFetching}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Page>
  );
};
