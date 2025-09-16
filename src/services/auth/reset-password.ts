import successMock from '@/mocks/auth/reset-password.success.json';

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export async function resetPasswordService(request: ResetPasswordRequest) {
  // Mock invalid token for testing
  if (request.token === 'invalid_token') {
    throw new Error('Invalid or expired reset token');
  }
  
  return Promise.resolve(successMock);
}