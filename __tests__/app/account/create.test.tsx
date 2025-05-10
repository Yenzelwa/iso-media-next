import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/src/app/context/authContext';
import axios from 'axios';
import CreateAccount from '@/src/app/(account)/account/create/page';
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import React, { ReactNode } from 'react';
import Email from 'next-auth/providers/email';



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
  });

  
    xit('should render the form with required fields', () => {
      
      render( <AuthProvider><CreateAccount /></AuthProvider>);
  
      // Check for form fields
      expect(screen.getByLabelText(/first_name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Terms of Use and Privacy Policy/i)).toBeInTheDocument();
      expect(screen.getByText(/Yes, sign me up/i)).toBeInTheDocument();
    });
  
    xit('should enable the continue button only when the form is valid', () => {
      render(  <AuthProvider><CreateAccount /></AuthProvider>);
  
      const submitButton = screen.getByText(/Continue/i);
      
      // By default, form is valid, so the button should be enabled
      expect(submitButton).toBeEnabled();
    });
  
    it('disables the Continue button when the form is invalid', () => { 
      render(<CreateAccount />);
    
      const button = screen.getByRole('button', { name: /continue/i });
     // expect(button).toBeDisabled();
      expect(button).toHaveStyle('background-color: rgb(229, 231, 235)');
    });
    
    it('should handle form submission', async () => {
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
    
      // Simulate form submission
      fireEvent.click(submitButton);
    
      // Wait for the fetch call to be made
      await waitFor(() => {
        // Check if the fetch was called once
        expect(fetch).toHaveBeenCalledTimes(1);
    
        // Get the arguments of the first call
        const callArgs = (fetch as jest.Mock).mock.calls[0]; 
    
        // Parse the body (since it's a string, we need to JSON.parse it)
        const requestBody = JSON.parse(callArgs[1].body);
        console.log("body", JSON.stringify(callArgs, null, 2) )
  //  console.log("body " + requestBody)
    console.log("requestBody:", JSON.stringify(requestBody, null, 2)); 
        // Assert the correct URL and body structure
        expect(callArgs[0]).toBe("http://172.24.74.185:4002/profile");
        expect(requestBody).toEqual(expect.objectContaining({
          id: null,
         // email: "email.email@com",
          //name: "John Doe",
          plan_id: 1,
          status: "pending",
          stripe_customer_id: null,
          currency: "USD",
          phone: null,
          payment_method_id: null
        }));
        
       });
    });
    
    xit('should show loading indicator during form submission', async () => {
      render(<CreateAccount />);
  
      const submitButton = screen.getByText(/Continue/i);
      
      fireEvent.click(submitButton);
      
      // Assert loader is visible
      expect(screen.getByRole('status')).toBeInTheDocument(); // Assuming your loader has a role="status"
      
      await waitFor(() => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument(); // Ensure loader is removed after submission
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
        expect(mockRouterPush).toHaveBeenCalledWith('/plan-selection');
      });
    });
  
    xit('should show error message if account creation fails', async () => {
      (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
  
      render(<CreateAccount />);
  
      const submitButton = screen.getByText(/Continue/i);
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        expect(mockSetErrorMessage).toHaveBeenCalledWith('Something went wrong');
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