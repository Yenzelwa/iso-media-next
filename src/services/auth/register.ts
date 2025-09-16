import successMock from '@/mocks/auth/register.success.json';

export interface RegisterRequest {
  first_name: string;
  email: string;
  password: string;
}

export async function registerService(request: RegisterRequest) {
  if (request.email === 'existing@test.com') {
    throw new Error('Email already exists');
  }
  
  return Promise.resolve(successMock);
}