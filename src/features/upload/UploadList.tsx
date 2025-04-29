import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  Typography,
} from '@mui/material';

type Upload = {
  name: string;
  progress: number;
};

type Props = {
  uploads?: Upload[];
};

export const UploadList: React.FC<Props> = ({ uploads }) => {
  if (!uploads) {
    return null;
  }

  return (
    <Box
      right={0}
      bottom={0}
      zIndex={9}
      width={'100%'}
      position={'fixed'}
      sx={{ '@media (min-width: 600px)': { width: 450 } }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='upload-content'
        >
          <Typography component='span'>Uploads</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {uploads.map((upload, index) => (
              <ListItem key={index}>
                <Typography>{upload.name}</Typography>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
