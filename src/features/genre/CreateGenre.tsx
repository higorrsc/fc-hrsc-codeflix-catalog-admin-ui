import { Box, Paper, Typography } from '@mui/material';
import { GenreForm } from './components/GenreForm';

export const CreateGenre = () => {
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Create Genre</Typography>
          </Box>
        </Box>
        <GenreForm
          genre={{}}
          categories={null}
          isLoading={false}
          isDisabled={false}
          handleChange={() => {}}
          handleSubmit={() => {}}
        />
      </Paper>
    </Box>
  );
};
