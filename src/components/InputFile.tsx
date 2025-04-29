import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from '@mui/icons-material/FileCopy';
import { IconButton, TextField } from '@mui/material';
import { useRef, useState } from 'react';

interface Props {
  onAdd: (files: FileList | null) => void;
  onRemove: (file: File) => void;
}

export const InputFile: React.FC<Props> = ({ onAdd, onRemove }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    onAdd(e.target.files);
  };

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setSelectedFiles(null);
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        onRemove(file);
      });
    }
  };

  return (
    <>
      <TextField
        type='text'
        placeholder='Select a file'
        value={selectedFiles?.length ? selectedFiles[0].name : ''}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: selectedFiles?.length ? (
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
