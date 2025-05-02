import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileObject, Video } from './types';

import { useUniqueCategories } from 'src/hooks/useUniqueCategories';
import { Page } from '../../components/Page';
import { VideoForm } from './components/VideoForm';
import { mapVideoToForm } from './utils';
import {
  initialState,
  useGetAllCastMembersQuery,
  useGetAllGenresQuery,
  useGetVideoByIdQuery,
  useUpdateVideoMutation,
} from './videoSlice';

export const EditVideo = () => {
  const id = useParams<{ id: string }>().id as string;
  const { enqueueSnackbar } = useSnackbar();
  const [isDisabled, setIsDisabled] = useState(false);
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [updateVideo, status] = useUpdateVideoMutation();
  const [categories, setCategories] = useUniqueCategories(
    videoState,
    setVideoState
  );
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const { data: video, isFetching } = useGetVideoByIdQuery({ id });
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideoState({ ...videoState, [name]: value });
  };

  const handleAddFile = ({ name, file }: FileObject) => {
    setSelectedFiles([...selectedFiles, { name, file }]);
  };

  const handleRemoveFile = (name: string) => {
    setSelectedFiles(selectedFiles.filter((f) => f.name !== name));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateVideo(mapVideoToForm(videoState));
  }

  useEffect(() => {
    if (video) {
      setVideoState(video.data);
      setCategories(video.data.categories || []);
    }
  }, [video, setCategories]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Video updated successfully!', { variant: 'success' });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar('Error updating video!', { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Page title='Edit Video'>
      <VideoForm
        video={videoState}
        categories={categories}
        genres={genres?.data}
        castMembers={castMembers?.data}
        isDisabled={isDisabled}
        isLoading={isFetching}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleAddFile={handleAddFile}
        handleRemoveFile={handleRemoveFile}
      />
    </Page>
  );
};
