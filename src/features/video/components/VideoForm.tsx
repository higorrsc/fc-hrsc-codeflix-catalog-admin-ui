import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Video } from '../../../types/Video';

type Props = {
  video: Video;
  isDisabled: boolean;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export function VideoForm({
  video,
  isDisabled,
  isLoading,
  handleChange,
  handleSubmit,
}: Props) {
  return (
    <Box>
      <Box p={2}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <TextField
                  required
                  name='title'
                  label='Title'
                  value={video.title}
                  disabled={isDisabled}
                  onChange={handleChange}
                  slotProps={{
                    htmlInput: { 'data-testid': 'title-input' },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <TextField
                  required
                  name='description'
                  label='Description'
                  value={video.description}
                  disabled={isDisabled}
                  onChange={handleChange}
                  slotProps={{
                    htmlInput: { 'data-testid': 'description-input' },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Autocomplete
                multiple
                data-testid='categories-search'
                loading={isLoading}
                options={video.categories || []}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={video.categories}
                disabled={isDisabled || !video.categories}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Categories'
                    data-testid='categories-input'
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => {
                  handleChange({
                    target: { name: 'categories', value },
                  } as any);
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Autocomplete
                multiple
                data-testid='genres-search'
                loading={isLoading}
                options={video.genres || []}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={video.genres}
                disabled={isDisabled || !video.genres}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Genres'
                    data-testid='genres-input'
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => {
                  handleChange({
                    target: { name: 'genres', value },
                  } as any);
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Autocomplete
                multiple
                data-testid='cast-members-search'
                loading={isLoading}
                options={video.cast_members || []}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={video.cast_members}
                disabled={isDisabled || !video.cast_members}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Cast Members'
                    data-testid='cast-members-input'
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => {
                  handleChange({
                    target: { name: 'cast-members', value },
                  } as any);
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box display='flex' gap={2}>
                <Button variant='contained' component={Link} to='/videos'>
                  Back
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  disabled={isDisabled}
                >
                  {isLoading ? 'loading...' : 'Save'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
