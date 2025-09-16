import successMock from '@/mocks/auth/logout.success.json';

export interface LogoutRequest {
  token?: string; // Optional token for server-side logout
}

export async function logoutService(request?: LogoutRequest) {
  // Mock service - always returns success
  // In real implementation, would invalidate token server-side
  return Promise.resolve(successMock);
}