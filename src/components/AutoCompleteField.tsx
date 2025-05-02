import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material';
import { CastMember } from '../features/cast/types';
import { Category } from '../features/category/types';
import { Genre } from '../features/genre/types';

type Props = {
  name: string;
  label: string;
  value: (Category | Genre | CastMember)[];
  options: (Category | Genre | CastMember)[];
  isDisabled?: boolean;
  isLoading?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AutoCompleteField = ({
  name,
  label,
  value,
  options,
  isDisabled = false,
  isLoading = false,
  handleChange,
}: Props) => {
  const handleRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Category | Genre | CastMember
  ) => (
    <li {...props} key={option.id}>
      {option.name}
    </li>
  );

  const isIdEqual = (
    option: CastMember | Category | Genre,
    value: CastMember | Category | Genre
  ): boolean => option.id === value.id;

  const handleRenderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label={label} data-testid={`${name}-input`} />
  );

  const handleOnChange = (
    e: React.ChangeEvent<{}>,
    newValue: (CastMember | Category | Genre)[]
  ) => {
    handleChange({ target: { name, value: newValue } } as any);
  };

  return (
    <Autocomplete
      data-testid={`${name}-search`}
      disabled={isDisabled || !options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={isIdEqual}
      loading={isLoading}
      multiple
      onChange={handleOnChange}
      options={options}
      renderInput={handleRenderInput}
      renderOption={handleRenderOption}
      value={value}
    />
  );
};
