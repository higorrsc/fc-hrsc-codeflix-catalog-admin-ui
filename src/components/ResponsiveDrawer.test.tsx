import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, within } from '../utils/test-utils';
import { ResponsiveDrawer } from './ResponsiveDrawer';

const routes = [
  { path: '/categories', name: 'Categories' },
  { path: '/cast-members', name: 'Cast Members' },
  { path: '/genres', name: 'Genres' },
  { path: '/videos', name: 'Videos' },
];

describe('Test ResponsiveDrawer Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('should render common drawer content (title and links) and match snapshot when open', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ResponsiveDrawer open={true} onClose={mockOnClose} />
      </MemoryRouter>
    );

    // Title - will be present in both temporary (dialog) and permanent drawers' DOM structure
    expect(screen.getAllByText('Codeflix').length).toBeGreaterThanOrEqual(1);
    // Specifically check within the dialog (temporary drawer)
    const temporaryDrawerWhenOpen = screen.getByTestId('drawer');
    expect(
      within(temporaryDrawerWhenOpen).getByText('Codeflix')
    ).toBeInTheDocument();

    // Links - check in dialog
    routes.forEach((route) => {
      const linkElement = within(temporaryDrawerWhenOpen).getByRole('link', {
        name: route.name,
      });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', route.path);
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onClose when a link is clicked in the temporary drawer', () => {
    render(
      <MemoryRouter>
        <ResponsiveDrawer open={true} onClose={mockOnClose} />
      </MemoryRouter>
    );

    const temporaryDrawer = screen.getByTestId('drawer');
    const firstLink = within(temporaryDrawer).getByRole('link', {
      name: routes[0].name,
    });

    fireEvent.click(firstLink);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  describe('Temporary Drawer (Mobile View)', () => {
    it('should be visible when open prop is true', () => {
      render(
        <MemoryRouter>
          <ResponsiveDrawer open={true} onClose={mockOnClose} />
        </MemoryRouter>
      );
      const drawerElement = screen.getByTestId('drawer');
      expect(drawerElement).toBeInTheDocument();
      expect(drawerElement).toBeVisible();

      // Check content within the temporary drawer
      expect(within(drawerElement).getByText('Codeflix')).toBeInTheDocument();
      routes.forEach((route) => {
        expect(
          within(drawerElement).getByRole('link', { name: route.name })
        ).toBeInTheDocument();
      });
    });

    it('should not be visible when open prop is false', () => {
      render(
        <MemoryRouter>
          <ResponsiveDrawer open={false} onClose={mockOnClose} />
        </MemoryRouter>
      );
      // Due to ModalProps={{ keepMounted: true }}, it might be in DOM but not visible.
      // The element with data-testid='drawer' will be in the document.
      const drawerElement = screen.getByTestId('drawer');
      expect(drawerElement).toBeInTheDocument();
      expect(drawerElement).not.toBeVisible();
    });

    it('should call onClose when Escape key is pressed', () => {
      render(
        <MemoryRouter>
          <ResponsiveDrawer open={true} onClose={mockOnClose} />
        </MemoryRouter>
      );
      const drawerElement = screen.getByTestId('drawer');

      fireEvent.keyDown(drawerElement, { key: 'Escape', code: 'Escape' });
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Permanent Drawer (Desktop View)', () => {
    it('should always render its content structure', () => {
      // Render with temporary drawer closed to isolate permanent drawer's content
      render(
        <MemoryRouter>
          <ResponsiveDrawer open={false} onClose={mockOnClose} />
        </MemoryRouter>
      );

      // The permanent drawer is not a 'dialog'. Its content should be directly accessible.
      // We expect "Codeflix" titles.
      // Note: This assertion might be tricky if JSDOM renders both structures regardless of CSS.
      // We rely on the fact that when open=false, the temporary drawer (identified by data-testid='drawer') is not visible.
      // The permanent drawer's content should still be found.
      const titles = screen.getAllByText('Codeflix');
      // Depending on MUI's rendering with keepMounted, there might be a hidden one.
      // Let's find one that is not the temporary drawer.
      const permanentTitle = titles.find(
        (t) => t.closest('[data-testid="drawer"]') === null
      );
      expect(permanentTitle).toBeInTheDocument();

      routes.forEach((route) => {
        const links = screen.getAllByRole('link', { name: route.name });
        const permanentLink = links.find(
          (l) => l.closest('[data-testid="drawer"]') === null
        );
        expect(permanentLink).toBeInTheDocument();
        expect(permanentLink).toHaveAttribute('href', route.path);
      });
    });
  });
});
