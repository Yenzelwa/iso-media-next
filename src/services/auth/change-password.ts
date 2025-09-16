import successMock from '@/mocks/auth/change-password.success.json';

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export async function changePasswordService(request: ChangePasswordRequest) {
  // Mock incorrect current password for testing
  if (request.current_password === 'wrong_password') {
    throw new Error('Current password is incorrect');
  }
  
  return Promise.resolve(successMock);
}