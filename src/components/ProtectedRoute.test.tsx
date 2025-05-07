import { useSelector } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '../utils/test-utils';
import { ProtectedRoute } from './ProtectedRoute';

// Mock react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // Import and retain default behavior
  useSelector: jest.fn(),
}));

const MockLoginPage = () => <div>Login Page</div>;
const MockProtectedContent = () => <div>Protected Content</div>;

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    // Clear any previous mock implementation details
    (useSelector as jest.Mock).mockClear();
  });

  it('should render children when user is authenticated', () => {
    (useSelector as jest.Mock).mockReturnValue(true); // Mock isAuthenticated = true

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path='/protected'
            element={
              <ProtectedRoute>
                <MockProtectedContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('should redirect to /login when user is not authenticated', () => {
    (useSelector as jest.Mock).mockReturnValue(false); // Mock isAuthenticated = false

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path='/login' element={<MockLoginPage />} />
          <Route
            path='/protected'
            element={
              <ProtectedRoute>
                <MockProtectedContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
