import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../components/Page';
import { CastMember } from '../../types/CastMember';
import {
  initialState,
  useGetCastMemberByIdQuery,
  useUpdateCastMemberMutation,
} from './castMemberSlice';
import { CastMemberForm } from './components/CastMemberForm';

export const EditCastMember = () => {
  const id = useParams().id || '';
  const { data: castMember, isFetching } = useGetCastMemberByIdQuery({ id });

  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);
  const [updateCastMember, status] = useUpdateCastMemberMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCastMember(castMemberState);
  }

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember.data);
    }
    if (status.isSuccess) {
      enqueueSnackbar('Cast member updated successfully!', {
        variant: 'success',
      });
    }
    if (status.error) {
      enqueueSnackbar('Error updating cast member!', { variant: 'error' });
    }
  }, [castMember, status, enqueueSnackbar]);

  return (
    <Page title='Edit Cast Member'>
      <CastMemberForm
        castMember={castMemberState}
        isDisabled={status.isLoading}
        isLoading={isFetching}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Page>
  );
};
