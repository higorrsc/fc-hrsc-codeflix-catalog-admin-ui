import { render, screen, within } from '../utils/test-utils'; // Assuming this provides ThemeProvider
import { RatingList } from './RatingList';

const ratingValues = ['L', '10', '12', '14', '16', '18'];

describe('Test RatingList Component', () => {
  it('should render all rating options correctly by default and match snapshot', () => {
    const { asFragment } = render(<RatingList />);

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(ratingValues.length);

    ratingValues.forEach((value) => {
      // Check radio button by its value
      const radio = screen.getByDisplayValue(value) as HTMLInputElement;
      expect(radio).toBeInTheDocument();
      expect(radio).toBeEnabled();

      // Check the FormControlLabel wrapping the radio
      const formControlLabel = radio.closest('label');
      expect(formControlLabel).toBeInTheDocument();
      expect(formControlLabel).toHaveClass(
        'MuiFormControlLabel-labelPlacementTop'
      );

      // Check that the Rating component (identified by its text) is within the label
      if (formControlLabel) {
        expect(within(formControlLabel).getByText(value)).toBeInTheDocument();
      }
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render all rating options as disabled when isDisabled is true', () => {
    render(<RatingList isDisabled={true} />);

    ratingValues.forEach((value) => {
      const radio = screen.getByDisplayValue(value) as HTMLInputElement;
      expect(radio).toBeInTheDocument();
      expect(radio).toBeDisabled();
    });
  });

  it('should apply correct sx styling for the first and last items', () => {
    render(<RatingList />);

    // First item
    const firstRadio = screen.getByDisplayValue(ratingValues[0]);
    const firstLabel = firstRadio.closest('label');
    expect(firstLabel).toHaveStyle('margin-left: 0px');

    // Last item
    const lastRadio = screen.getByDisplayValue(
      ratingValues[ratingValues.length - 1]
    );
    const lastLabel = lastRadio.closest('label');
    expect(lastLabel).toHaveStyle('margin-right: 0px');

    // Check an intermediate item to ensure it doesn't have these specific overrides
    // (MUI might apply its own margins, we are checking our overrides)
    if (ratingValues.length > 2) {
      const middleRadio = screen.getByDisplayValue(ratingValues[1]);
      const middleLabel = middleRadio.closest('label');

      // Get computed style to check if the specific override is NOT there.
      // Note: This can be brittle if MUI default styles change.
      // It's often sufficient to just test that the overrides ARE applied where expected.
      const middleLabelStyles = window.getComputedStyle(middleLabel!);
      expect(middleLabelStyles.marginLeft).not.toBe('0px');
      // marginRight might be 0px by default in some flex scenarios or if it's the last in a row.
      // So, this assertion is less reliable without knowing MUI's exact default.
      // For now, focusing on the presence of overrides is safer.
    }
  });

  it('should ensure all labels have Rating components', () => {
    render(<RatingList />);
    ratingValues.forEach((value) => {
      // This implicitly checks that a Rating component rendering this text exists
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
