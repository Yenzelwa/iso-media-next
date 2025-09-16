import successMock from '@/mocks/auth/login.success.json';

export interface LoginRequest {
  email: string;
  password: string;
}

export async function loginService(request: LoginRequest) {
  // Mock authentication logic - always returns success for valid format
  if (request.email === 'invalid@test.com') {
    throw new Error('Invalid credentials');
  }
  
  return Promise.resolve(successMock);
}