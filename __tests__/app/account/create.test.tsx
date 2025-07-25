import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/src/app/context/authContext';
import axios from 'axios';
import CreateAccount from '@/src/app/(account)/account/create/page';
import {useForm } from 'react-hook-form';
import React from 'react';


if (!HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = function () {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    this.dispatchEvent(event);
  };
}

// Mocking external dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/src/app/context/authContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: jest.fn(), 
}));

jest.mock('axios');
jest.mock('react-hook-form', () => {
  const actual = jest.requireActual('react-hook-form');
  return {
    ...actual,
    useForm: jest.fn(),
  };
});

describe('CreateAccount Component', () => {
  const mockRouterPush = jest.fn();
  const mockLogin = jest.fn();
  const mockSetErrorMessage = jest.fn();

  beforeEach(() => {
    // Correctly mock the useRouter to match the expected return type
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

    (axios.post as jest.Mock).mockResolvedValue({ ok: true, json: () => ({ user: {}, token: '123' }) });
    const mockUseFormReturn = {
      register: jest.fn(),
      handleSubmit: jest.fn(fn => fn),
      setValue: jest.fn(),
      getValues: jest.fn(),
      watch: jest.fn(),
      trigger: jest.fn(),
      control: {},
      formState: {
        isValid: false,
        errors: {},
      },
    };

    // Mock useForm to return the mocked form state
    (useForm as jest.Mock).mockReturnValue(mockUseFormReturn);
    global.fetch = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      user: null, // Default to no authenticated user
      login: mockLogin, // Mock the login function
    });
    global.fetch = jest.fn();
  });

  
    it('should render the form with required fields', () => {
      
      render( <AuthProvider><CreateAccount /></AuthProvider>);
  
      // Check for form fields
      expect(screen.getByLabelText(/first_name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Terms of Use and Privacy Policy/i)).toBeInTheDocument();
      expect(screen.getByText(/Yes, sign me up/i)).toBeInTheDocument();
    });
  
    it('should enable the continue button only when the form is valid', () => {
      render(  <AuthProvider><CreateAccount /></AuthProvider>);
  
      const submitButton = screen.getByText(/Continue/i);
      
      // By default, form is valid, so the button should be enabled
      expect(submitButton).toBeEnabled();
    });
  
    it('disables the Continue button when the form is invalid', () => { 
      render(<CreateAccount />);
    
      const button = screen.getByRole('button', { name: /continue/i });

      expect(button).toBeDisabled();
      expect(button).toHaveClass('bg-gray-400');
    });
    
  it('should handle form submission', async () => {
  // Arrange - mock useForm before rendering
  const mockUseFormReturn = {
    register: jest.fn(),
    handleSubmit: jest.fn(fn => fn),
    setValue: jest.fn(),
    getValues: jest.fn(() => ({
      first_name: 'John Doe',
      email: 'email@email.com',
      password: 'Password123!',
      t_and_cs: true,
    })),
    watch: jest.fn(),
    trigger: jest.fn(),
    control: {},
    formState: {
      isValid: true,
      errors: {},
    },
  };
  (useForm as jest.Mock).mockReturnValue(mockUseFormReturn);

  const mockUser = {
    id: null,
    name: 'John Doe',
    email: 'email@email.com',
    plan_id: 1,
    status: 'pending',
     currency: "USD",
    stripe_customer_id: null,
     payment_method_id: null,
    phone: null,
  }; 

  const mockResponse = {
    ok: true,
    json: jest.fn().mockResolvedValue(mockUser),
  };
  (fetch as jest.Mock).mockResolvedValue(mockResponse);

  // Render the component after mocks
  render(<AuthProvider><CreateAccount /></AuthProvider>);

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/first_name/i), {
    target: { value: 'John' },
  });
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'email@email.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'Password123!' },
  });
  fireEvent.click(screen.getByLabelText(/t&cs/i));

  // Act - simulate submit
fireEvent.submit(screen.getByRole('button', { name: /Continue/i }).closest('form')!);

  // Assert
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);

    const callArgs = (fetch as jest.Mock).mock.calls[0];
    const requestBody = JSON.parse(callArgs[1].body);

    expect(callArgs[0]).toBe('http://172.24.74.185:4002/profile');
    expect(requestBody).toEqual(expect.objectContaining({
    id: null,
        plan_id: 1,
        status: 'pending',
        stripe_customer_id: null,
        currency: 'USD',
        phone: null,
        payment_method_id: null
    }));
  });
});
  
  it('should show loading indicator during form submission', async () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'email@email.com',
    plan_id: 1,
    status: 'pending',
  };
  const mockResponse = {
    ok: true,
    json: jest.fn().mockResolvedValue(mockUser),
  };
  (fetch as jest.Mock).mockResolvedValue(mockResponse);

  render(<AuthProvider><CreateAccount /></AuthProvider>);

  // Fill out form
  fireEvent.change(screen.getByLabelText(/first_name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'email@email.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123!' } });
  fireEvent.click(screen.getByLabelText(/t&cs/i));

  fireEvent.click(screen.getByRole('button', { name: /continue/i }));
  await waitFor(() => {
    expect(screen.queryByLabelText('status')).not.toBeInTheDocument();
  });
});
    it('should redirect to plan selection page on successful account creation', async () => {
      render(<CreateAccount />);
         // Mock the response for the fetch call
         const mockUser = { id: 1, name: 'John Doe', email: 'email.email@com', plan_id: 1, status: 'pending' };
         const mockResponse = { 
           ok: true, 
           json: jest.fn().mockResolvedValue(mockUser) 
         };
         
         // Cast fetch as jest.Mock
         (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const submitButton = screen.getByText(/Continue/i);
  
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith('/plan-selection/plans');
      });
    });
 
it('should show error message if account creation fails', async () => {
  const mockUseFormReturn = {
    register: jest.fn(),
    handleSubmit: jest.fn(fn => fn),
    setValue: jest.fn(),
    getValues: jest.fn(() => ({
      first_name: 'John Doe',
      email: 'email@email.com',
      password: 'Password123!',
      t_and_cs: true,
    })),
    watch: jest.fn(),
    trigger: jest.fn(),
    control: {},
    formState: {
      isValid: true,
      errors: {},
    },
  };
  (useForm as jest.Mock).mockReturnValue(mockUseFormReturn);

  // Mock fetch to simulate server error
  (fetch as jest.Mock).mockResolvedValue({
    ok: false,
    json: jest.fn().mockResolvedValue('error occurred'),
  });

  // Mock useAuth
  (useAuth as jest.Mock).mockReturnValue({
    user: null,
    login: jest.fn(),
  });

  render(
    <AuthProvider>
      <CreateAccount />
    </AuthProvider>
  );

  fireEvent.submit(screen.getByRole('button', { name: /continue/i }).closest('form')!);
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

  });
});  
    it('should show session option if user is already authenticated', () => {

        (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      login: mockLogin,
    });

      render(<CreateAccount />);
  
      expect(screen.getByText(/Account created/i)).toBeInTheDocument();
      expect(screen.getByText(/use below email to log in/i)).toBeInTheDocument();
    });
});