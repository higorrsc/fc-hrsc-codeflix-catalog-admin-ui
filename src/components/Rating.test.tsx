import { render, screen } from '@testing-library/react';
import { Rating } from './Rating';

const backgroundColors = {
  L: 'rgb(57, 181, 73)', // #39B549
  '10': 'rgb(32, 163, 212)', // #20A3D4
  '12': 'rgb(231, 151, 56)', // #E79738
  '14': 'rgb(227, 94, 0)', // #E35E00
  '16': 'rgb(208, 0, 3)', // #D00003
  '18': 'rgb(0, 0, 0)', // #000000
};

type RatingValue = keyof typeof backgroundColors;

describe('Test Rating Component', () => {
  it('should render correctly for rating "L" and match snapshot', () => {
    const { asFragment } = render(<Rating rating='L' />);
    const ratingElement = screen.getByText('L');
    expect(ratingElement).toBeInTheDocument();
    expect(ratingElement.parentElement).toHaveStyle(
      `background-color: ${backgroundColors.L}`
    );
    expect(asFragment()).toMatchSnapshot();
  });

  const ratingsToTest: RatingValue[] = ['10', '12', '14', '16', '18'];

  ratingsToTest.forEach((ratingValue) => {
    it(`should render correctly for rating "${ratingValue}"`, () => {
      render(<Rating rating={ratingValue} />);
      const ratingElement = screen.getByText(ratingValue);
      expect(ratingElement).toBeInTheDocument();
      expect(ratingElement.parentElement).toHaveStyle(
        `background-color: ${backgroundColors[ratingValue]}`
      );
    });
  });

  // Example of how you might test for specific styles if needed beyond background color
  it('should have correct common styling', () => {
    render(<Rating rating='L' />);
    const boxElement = screen.getByText('L').parentElement;

    expect(boxElement).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      height: '48px',
      width: '48px',
    });
  });

  it('should display the rating text inside the box', () => {
    render(<Rating rating='14' />);
    const typographyElement = screen.getByText('14');
    expect(typographyElement).toBeInTheDocument();
    expect(typographyElement.tagName).toBe('P'); // MUI Typography renders a <p> by default for body2
  });
});
