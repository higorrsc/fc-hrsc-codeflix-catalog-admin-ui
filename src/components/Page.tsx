import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

interface PageProps {
  title: string;
  children: React.ReactNode;
}

export function Page({ title, children }: PageProps) {
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>{title}</Typography>
          </Box>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
