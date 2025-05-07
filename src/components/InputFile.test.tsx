import { fireEvent, render, screen } from '../utils/test-utils';
import { InputFile } from './InputFile';

describe('Test InputFile Component', () => {
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
    mockOnRemove.mockClear();
  });

  it('should render correctly initially', () => {
    const { asFragment } = render(
      <InputFile onAdd={mockOnAdd} onRemove={mockOnRemove} />
    );
    expect(screen.getByPlaceholderText('Select a file')).toBeInTheDocument();
    expect(screen.getByTestId('FileCopyIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('DeleteIcon')).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onAdd and update UI when a file is selected', () => {
    render(<InputFile onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    const inputElement = screen.getByTestId('input-file'); // Assuming you add a data-testid to the input

    // Simulate file selection
    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(file);
    expect(screen.getByDisplayValue('example.png')).toBeInTheDocument();
    expect(screen.getByTestId('DeleteIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('FileCopyIcon')).not.toBeInTheDocument();
  });

  it('should call onRemove and update UI when the delete button is clicked', () => {
    render(<InputFile onAdd={mockOnAdd} onRemove={mockOnRemove} />);

    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    const inputElement = screen.getByTestId('input-file');

    // Select a file first
    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(screen.getByDisplayValue('example.png')).toBeInTheDocument();
    const deleteButton = screen.getByTestId('DeleteIcon');

    // Click the delete button
    fireEvent.click(deleteButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith(file);
    expect(screen.getByPlaceholderText('Select a file')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('example.png')).not.toBeInTheDocument();
    expect(screen.getByTestId('FileCopyIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('DeleteIcon')).not.toBeInTheDocument();
  });

  it('should trigger file input click when FileIcon is clicked', async () => {
    render(<InputFile onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    const fileIcon = screen.getByTestId('FileCopyIcon');
    const inputElement = screen.getByTestId('input-file') as HTMLInputElement;
    const inputClickSpy = jest.spyOn(inputElement, 'click');

    await fireEvent.click(fileIcon);

    expect(inputClickSpy).toHaveBeenCalledTimes(1);
    inputClickSpy.mockRestore();
  });

  it('should not call onAdd if no file is selected', () => {
    render(<InputFile onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    const inputElement = screen.getByTestId('input-file');

    fireEvent.change(inputElement, { target: { files: [] } });
    expect(mockOnAdd).not.toHaveBeenCalled();

    fireEvent.change(inputElement, { target: { files: null } });
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('should not call onRemove if no file was previously selected when clear is called', () => {
    render(<InputFile onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    expect(mockOnRemove).not.toHaveBeenCalled();
  });
});
