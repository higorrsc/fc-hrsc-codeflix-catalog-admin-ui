import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from '@mui/icons-material/FileCopy';
import { IconButton, TextField } from '@mui/material';
import { useRef, useState } from 'react';

interface Props {
  onAdd: (file: File) => void;
  onRemove: (file: File) => void;
}

export const InputFile: React.FC<Props> = ({ onAdd, onRemove }) => {
  const [selectedFiles, setSelectedFiles] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    if (!file) return;
    setSelectedFiles(file);
    onAdd(file);
  };

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setSelectedFiles(undefined);
    if (selectedFiles) {
      onRemove(selectedFiles);
    }
  };

  return (
    <>
      <TextField
        type='text'
        placeholder='Select a file'
        value={selectedFiles?.name || ''}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: selectedFiles ? (
              <IconButton onClick={handleClear}>
                <DeleteIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleFileInput}>
                <FileIcon />
              </IconButton>
            ),
          },
        }}
      />
      <input
        type='file'
        accept='*'
        name='inputFile'
        id='inputFile'
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleChange}
      />
    </>
  );
};
