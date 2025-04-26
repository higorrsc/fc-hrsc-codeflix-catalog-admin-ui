import { Page } from '../../components/Page';
import { VideoForm } from './components/VideoForm';
import { initialState } from './videoSlice';

export const CreateVideo = () => {
  return (
    <Page title='Create Video'>
      <VideoForm
        video={initialState}
        isLoading={false}
        isDisabled={true}
        handleChange={() => {}}
        handleSubmit={() => {}}
      />
    </Page>
  );
};
