import { AuthProvider, useAuth } from '@/src/app/context/authContext';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  getCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

const TestComponent = () => {
  const { user, token, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="user">{user ? user.name : 'No User'}</div>
      <div data-testid="token">{token || 'No Token'}</div>
      <button onClick={() => login('token123', { name: 'John Doe' })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};


describe('AuthProvider', () => {
    it('should initialize user and token from cookies if they exist', () => {
      (getCookie as jest.Mock).mockReturnValueOnce('token123').mockReturnValueOnce(JSON.stringify({ name: 'John Doe' }));
  
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
  
      // Check if the context is correctly initialized
      expect(screen.getByTestId('user')).toHaveTextContent('John Doe');
      expect(screen.getByTestId('token')).toHaveTextContent('token123');
    });
  
    it('should initialize with no user and token if cookies are not set', () => {
      (getCookie as jest.Mock).mockReturnValueOnce(null).mockReturnValueOnce(null);
  
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      expect(screen.getByTestId('user')).toHaveTextContent('No User');
      expect(screen.getByTestId('token')).toHaveTextContent('No Token');
    });
  });

  describe('AuthContext - login', () => {
    it('should persist session in cookies after successful login', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
  
      fireEvent.click(screen.getByText('Login'));
  
      await waitFor(() => {
        const users = screen.getAllByTestId('user');
        expect(users.length).toBe(1);
        expect(users[0]).toHaveTextContent('John Doe');
  
        const tokens = screen.getAllByTestId('token');
        expect(tokens.length).toBe(1); 
        expect(tokens[0]).toHaveTextContent('token123');
      });
  
      expect(setCookie).toHaveBeenCalledWith('auth_token', 'token123', expect.objectContaining({ maxAge: 60 * 60 * 24 * 7 }));
      expect(setCookie).toHaveBeenCalledWith('auth_user', JSON.stringify({ name: 'John Doe' }), expect.objectContaining({ maxAge: 60 * 60 * 24 * 7 }));

      (getCookie as jest.Mock).mockReturnValueOnce('token123').mockReturnValueOnce(JSON.stringify({ name: 'John Doe' }));
  
      await waitFor(() => {
        const users = screen.getAllByTestId('user');
        expect(users.length).toBe(1); 
        expect(users[0]).toHaveTextContent('John Doe');
  
        const tokens = screen.getAllByTestId('token');
        expect(tokens.length).toBe(1); 
        expect(tokens[0]).toHaveTextContent('token123');
      });
    });
  });

  describe('AuthProvider - logout', () => {
    it('should clear user and token and delete cookies on logout', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      fireEvent.click(screen.getByText('Login'));
  
      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('John Doe');
        expect(screen.getByTestId('token')).toHaveTextContent('token123');
      });
  
      fireEvent.click(screen.getByText('Logout'));
  
      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('No User');
        expect(screen.getByTestId('token')).toHaveTextContent('No Token');
      });
      expect(deleteCookie).toHaveBeenCalledWith('auth_token');
      expect(deleteCookie).toHaveBeenCalledWith('auth_user');
    });
  });

 