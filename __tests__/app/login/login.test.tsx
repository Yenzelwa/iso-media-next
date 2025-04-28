import { useAuth } from '@/src/app/context/authContext';
import LoginPage from '@/src/app/login/page';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// Mocking necessary hooks and global functions
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/src/app/context/authContext', () => ({
  useAuth: jest.fn(),
}));

describe('LoginPage', () => {
  let mockLogin: jest.Mock;
  let mockPush: jest.Mock;
  const mockUser = { id: 1, name: 'John Doe' };

  // Setup mocks before each test
  beforeEach(() => {
    mockLogin = jest.fn();
    mockPush = jest.fn();

    // Mock the useRouter hook
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Mock the useAuth hook
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      logout: jest.fn(),
      user: mockUser,
    });

    // Mock the global fetch function to avoid network requests
    global.fetch = jest.fn();
  });

  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully with valid credentials', async () => {
    // Mock the fetch response to simulate a successful login
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue(mockUser) };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    render(<LoginPage />);

    // Simulate user input for email and password
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Simulate a button click to trigger the login
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the async fetch and check the behavior
    await waitFor(() => {
      // Ensure fetch was called with the correct URL and body
      expect(fetch).toHaveBeenCalledWith(
        'http://172.24.74.185:4002/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
        })
      );

      // Verify that the login function was called with the token and user
      expect(mockLogin).toHaveBeenCalledWith("gdjfgudishfioshg24545ds4gsgsdg_fdag", mockUser);

      // Ensure the user was redirected after login
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('should show error message on failed login', async () => {
    // Simulate a failed login with an unsuccessful fetch response
    const mockResponse = { ok: false, json: jest.fn().mockResolvedValue({}) };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    render(<LoginPage />);

    // Simulate user input for invalid credentials
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

    // Trigger the login button click
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password./i)).toBeInTheDocument();
    });
  });

  it('should enable login button after input', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate user input for email and password
    fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.input(passwordInput, { target: { value: 'password123' } });

    // Check that the button is enabled after input
    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
    });
  });
  it('should show validation errors for empty email and password fields', async () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
  
    // Clear fields
    fireEvent.input(emailInput, { target: { value: '' } });
    fireEvent.input(passwordInput, { target: { value: '' } });
  
    fireEvent.click(loginButton);
  
    await waitFor(() => {
      const errors = document.querySelectorAll('.text-red');
      const errorTexts = Array.from(errors).map(el => el.textContent?.toLowerCase());
  
      expect(errorTexts).toContain('email is required.');
      expect(errorTexts).toContain('password is required.');
    });
  });
  
xit('should show error message for invalid email format', async () => {

    render(<LoginPage />);
   
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'invalidemail' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/email address is not valid/i)).toBeInTheDocument();
    });
  });

  it('should show error message for short password', async () => {
    render(<LoginPage />);

    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'sho' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });
  it('should mask password input', async () => {
    render(<LoginPage />);

    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

   const inputPassword = screen.getByLabelText(/password/i)

    await waitFor(() => {
      expect(inputPassword).toHaveValue("password123")
      expect(inputPassword).toHaveAttribute('type', 'password')
    });
  });

});

