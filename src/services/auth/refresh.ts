import successMock from '@/mocks/auth/refresh.success.json';

export interface RefreshRequest {
  refresh_token: string;
}

export async function refreshService(request: RefreshRequest) {
  // Mock invalid token for testing
  if (request.refresh_token === 'invalid_token') {
    throw new Error('Invalid or expired refresh token');
  }
  
  return Promise.resolve(successMock);
}