import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Category } from '../../../types/Category';

export type Props = {
  genre: any /*Genre;*/;
  categories?: Category | null;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function GenreForm({
  genre,
  categories,
  isDisabled,
  isLoading,
  handleSubmit,
  handleChange,
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
                  name='name'
                  label='Name'
                  value={genre.name}
                  disabled={isDisabled}
                  onChange={handleChange}
                  slotProps={{
                    htmlInput: { 'data-testid': 'name-input' },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Autocomplete
                multiple
                id='categories'
                options={[]}
                // getOptionLabel={(option) => option.title}
                value={genre.categories}
                disabled={isDisabled || !categories}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Categories'
                    data-testid='categories-input'
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name='is_active'
                      color='secondary'
                      onChange={() => {}}
                      checked={genre.is_active}
                      inputProps={{ 'aria-label': 'controlled' }}
                      disabled={isDisabled}
                      data-testid='is-active-input'
                    />
                  }
                  label='Active'
                />
              </FormGroup>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box display='flex' gap={2}>
                <Button variant='contained' component={Link} to='/genres'>
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
