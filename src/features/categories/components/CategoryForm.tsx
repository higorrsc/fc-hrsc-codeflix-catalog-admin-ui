import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../../types/Category';

export type Props = {
  category: Category;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CategoryForm({
  category,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
  handleToggle,
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
                  value={category.name}
                  disabled={isDisabled}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <TextField
                  required
                  name='description'
                  label='Description'
                  value={category.description}
                  disabled={isDisabled}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name='is_active'
                      color='secondary'
                      onChange={handleToggle}
                      checked={category.is_active}
                      inputProps={{ 'aria-label': 'controlled' }}
                      disabled={isDisabled}
                    />
                  }
                  label='Active'
                />
              </FormGroup>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box display='flex' gap={2}>
                <Button variant='contained' component={Link} to='/categories'>
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
