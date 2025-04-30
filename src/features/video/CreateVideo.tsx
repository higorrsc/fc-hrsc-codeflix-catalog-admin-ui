import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { useUniqueCategories } from 'src/hooks/useUniqueCategories';
import { Page } from '../../components/Page';
import { FileObject, Video } from '../../types/Video';
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
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);

  const dispatch = useAppDispatch();

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
    const { id, ...payload } = mapVideoToForm(videoState);
    try {
      await createVideo(payload).unwrap();
    } catch (error) {
      console.log(error);
    }
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
        handleAddFile={handleAddFile}
        handleRemoveFile={handleRemoveFile}
      />
    </Page>
  );
};
