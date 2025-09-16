import successMock from '@/mocks/auth/forgot-password.success.json';

export interface ForgotPasswordRequest {
  email: string;
}

export async function forgotPasswordService(request: ForgotPasswordRequest) {
  // Mock service - always returns success for valid email format
  // In real implementation, this would send an email
  return Promise.resolve(successMock);
}