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
import { useAppSelector } from '../../app/hooks';
import { LinearProgressWithLabel } from '../../components/Progress';
import { selectUploads } from './uploadSlice';

type Upload = {
  name: string;
  progress: number;
};

type Props = {
  uploads?: Upload[];
};

export const UploadList: React.FC<Props> = () => {
  const uploadList = useAppSelector(selectUploads);

  if (!uploadList) {
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
            {uploadList.map((upload, index) => (
              <Box key={index}>
                <Typography>{upload.field}</Typography>
                <ListItem>
                  <LinearProgressWithLabel value={upload.progress} />
                </ListItem>
              </Box>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
