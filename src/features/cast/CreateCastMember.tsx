import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Page } from '../../components/Page';
import { initialState, useCreateCastMemberMutation } from './castMemberSlice';
import { CastMemberForm } from './components/CastMemberForm';
import { CastMember } from './types';

export const CreateCastMember = () => {
  const [createCastMember, status] = useCreateCastMemberMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createCastMember(castMemberState);
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Cast member created successfully!', {
        variant: 'success',
      });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar('Error creating cast member!', { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Page title='Create Cast Member'>
      <CastMemberForm
        castMember={castMemberState}
        isDisabled={isDisabled}
        isLoading={false}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Page>
  );
};
