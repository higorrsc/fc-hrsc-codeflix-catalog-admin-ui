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
import { AutoCompleteField } from '../../../components/AutoCompleteField';
import { InputFile } from '../../../components/InputFile';
import { RatingList } from '../../../components/RatingList';
import { CastMember } from '../../cast/types';
import { Category } from '../../category/types';
import { Genre } from '../../genre/types';
import { FileObject, Video } from '../types';

type Props = {
  video: Video;
  categories?: Category[];
  genres?: Genre[];
  castMembers?: CastMember[];
  isDisabled?: boolean;
  isLoading?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAddFile: ({ name, file }: FileObject) => void;
  handleRemoveFile: (name: string) => void;
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
  handleAddFile,
  handleRemoveFile,
}: Props) {
  const handleAddThumbnail = (file: File) => {
    handleAddFile({ name: 'thumb_file', file });
  };

  const handleAddBanner = (file: File) => {
    handleAddFile({ name: 'banner_file', file });
  };

  const handleAddTrailer = (file: File) => {
    handleAddFile({ name: 'trailer_file', file });
  };

  const handleAddVideo = (file: File) => {
    handleAddFile({ name: 'video_file', file });
  };

  const handleRemoveThumbnail = () => {
    handleRemoveFile('thumb_file');
  };

  const handleRemoveBanner = () => {
    handleRemoveFile('banner_file');
  };

  const handleRemoveTrailer = () => {
    handleRemoveFile('trailer_file');
  };

  const handleRemoveVideo = () => {
    handleRemoveFile('video_file');
  };

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
                      name='year_launched'
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
                  name='cast_members'
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

              <FormControl fullWidth>
                <FormLabel component='legend'>Thumbnail</FormLabel>
                <InputFile
                  onAdd={handleAddThumbnail}
                  onRemove={handleRemoveThumbnail}
                />
                <FormLabel component='legend'>Banner</FormLabel>
                <InputFile
                  onAdd={handleAddBanner}
                  onRemove={handleRemoveBanner}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel component='legend'>Videos</FormLabel>
                <InputFile
                  onAdd={handleAddVideo}
                  onRemove={handleRemoveVideo}
                />
                <FormLabel component='legend'>Trailer</FormLabel>
                <InputFile
                  onAdd={handleAddTrailer}
                  onRemove={handleRemoveTrailer}
                />
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
