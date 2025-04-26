import { Box, Typography } from '@mui/material';

type Props = {
  rating: 'L' | '10' | '12' | '14' | '16' | '18';
};

const backgroundColors = {
  L: '#39B549',
  '10': '#20A3D4',
  '12': '#E79738',
  '14': '#E35E00',
  '16': '#D00003',
  '18': '#000000',
};

export const Rating = ({ rating }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColors[rating],
        borderRadius: '4px',
        height: 48,
        width: 48,
      }}
    >
      <Typography>{rating}</Typography>
    </Box>
  );
};
