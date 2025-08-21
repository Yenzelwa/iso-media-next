import BrowsePage from '@/src/app/(root)/browse/page';
import { useAuth } from '@/src/app/context/authContext';

import { render, screen, waitFor } from '@testing-library/react';
 // Adjust the path to where your BrowsePage is located
import { useRouter } from 'next/navigation';// Import the correct path for useAuth

// Mocking necessary hooks and global functions
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  jest.mock('@/src/app/context/authContext', () => ({
    useAuth: jest.fn(),
  }));

describe('BrowsePage', () => {
    let mockPush: jest.Mock;
    let mockLogin: jest.Mock;
    const mockUser = { id: 1, name: 'John Doe' };
      // Setup mocks before each test
      beforeEach(() => {
        mockPush = jest.fn();
        mockLogin = jest.fn();
    
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
  xit('should redirect to login if user is not authenticated', async () => {

          // Mock the useAuth hook
          (useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
            logout: jest.fn(),
            user: null,
          });

          
    render(<BrowsePage />);

    // Check if the redirection to the login page happens
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('should render video content if user is authenticated', async () => {

    render(<BrowsePage />);

    // Check if the video elements are rendered
    await waitFor(() => {
      expect(screen.getByText(/Trending Now/i)).toBeInTheDocument();
       expect(screen.getByText(/Spiritual Awakening/i)).toBeInTheDocument();
      expect(screen.getByText(/Documentary Collections/i)).toBeInTheDocument();
      expect(screen.getByText(/Wellness & Healing/i)).toBeInTheDocument();
    });
  });
});
