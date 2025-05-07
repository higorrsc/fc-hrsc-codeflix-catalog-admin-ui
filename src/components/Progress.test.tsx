import { render, screen } from '../utils/test-utils';
import { LinearProgressWithLabel } from './Progress';

describe('Test LinearProgressWithLabel Component', () => {
  it('should render correctly with default value (0%)', () => {
    const { asFragment } = render(<LinearProgressWithLabel value={0} />);

    // Check for the progress bar role
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();

    // Check for the label
    expect(screen.getByText('0%')).toBeInTheDocument();

    // Snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a specific value', () => {
    render(<LinearProgressWithLabel value={50} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');

    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should render correctly with value 0', () => {
    render(<LinearProgressWithLabel value={0} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should render correctly with value 100', () => {
    render(<LinearProgressWithLabel value={100} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');

    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('should round the value for the label display', () => {
    render(<LinearProgressWithLabel value={75.7} />);
    expect(screen.getByText('76%')).toBeInTheDocument(); // 75.7 rounds to 76
  });
});
