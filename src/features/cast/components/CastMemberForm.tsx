import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { CastMember } from '../../../types/CastMember';
import { castMemberTypeOptions } from '../../../utils/CastMember';

export type Props = {
  castMember: CastMember;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CastMemberForm({
  castMember,
  isDisabled = false,
  isLoading = false,
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
                  value={castMember.name}
                  disabled={isDisabled}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormGroup>
                <FormLabel>Type</FormLabel>
                <RadioGroup
                  aria-labelledby='Type of cast member'
                  defaultValue={1}
                  name='type'
                  onChange={handleChange}
                  value={castMember.type}
                >
                  {castMemberTypeOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormGroup>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box display='flex' gap={2}>
                <Button variant='contained' component={Link} to='/cast-members'>
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
