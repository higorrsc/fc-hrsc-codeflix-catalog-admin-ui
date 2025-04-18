import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { CastMember } from '../../types/CastMember';
import { initialState, useCreateCastMemberMutation } from './castMemberSlice';
import { CastMemberForm } from './components/CastMemberForm';

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
      enqueueSnackbar('CastMember created successfully!', {
        variant: 'success',
      });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar('Error creating castMember!', { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Create Cast Member</Typography>
          </Box>
        </Box>
        <CastMemberForm
          castMember={castMemberState}
          isDisabled={isDisabled}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
