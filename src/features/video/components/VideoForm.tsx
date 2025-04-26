import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { RatingList } from 'src/components/RatingList';
import { AutoCompleteField } from '../../../components/AutoCompleteField';
import { CastMember } from '../../../types/CastMember';
import { Category } from '../../../types/Category';
import { Genre } from '../../../types/Genre';
import { Video } from '../../../types/Video';

type Props = {
  video: Video;
  categories?: Category[];
  genres?: Genre[];
  castMembers?: CastMember[];
  isDisabled?: boolean;
  isLoading?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function VideoForm({
  video,
  categories,
  genres,
  castMembers,
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
            {/* right */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ '& .MuiTextField-root': { my: 2 } }}
            >
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
              <FormControl fullWidth>
                <TextField
                  required
                  multiline
                  rows={4}
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
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name='year-launched'
                      label='Year Launched'
                      value={video.year_launched}
                      disabled={isDisabled}
                      onChange={handleChange}
                      slotProps={{
                        htmlInput: { 'data-testid': 'year-launched-input' },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name='duration'
                      label='Duration'
                      value={video.duration}
                      disabled={isDisabled}
                      onChange={handleChange}
                      slotProps={{
                        htmlInput: { 'data-testid': 'duration-input' },
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <AutoCompleteField
                  name='genres'
                  label='Genres'
                  options={genres || []}
                  value={video.genres || []}
                  isDisabled={isDisabled || !genres}
                  isLoading={isLoading}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <AutoCompleteField
                  name='categories'
                  label='Categories'
                  options={categories || []}
                  value={video.categories || []}
                  isDisabled={isDisabled || !categories}
                  isLoading={isLoading}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <AutoCompleteField
                  name='cast-member'
                  label='Cast Member'
                  options={castMembers || []}
                  value={video.cast_members || []}
                  isDisabled={isDisabled || !castMembers}
                  isLoading={isLoading}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
            {/* left */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ '& .MuiTextField-root': { my: 2 } }}
            >
              <FormControl>
                <FormLabel id='rating-label'>Rating</FormLabel>
                <RadioGroup
                  name='rating'
                  value={video.rating}
                  onChange={handleChange}
                  row
                >
                  <RatingList isDisabled={isDisabled} />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
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
        </form>
      </Box>
    </Box>
  );
}
