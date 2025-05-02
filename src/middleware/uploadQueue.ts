import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addUpload } from '../features/upload/uploadSlice';
import { updateVideo } from '../features/upload/uploadThunk';

const uploadQueue = createListenerMiddleware();

uploadQueue.startListening({
  actionCreator: addUpload,
  effect: async (action, store) => {
    await store.dispatch(updateVideo(action.payload));
  },
});

export { uploadQueue };
