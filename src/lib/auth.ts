export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export function validateBearerToken(req: Request): string {
  const authorization = req.headers.get('authorization');
  
  if (!authorization) {
    throw new AuthenticationError('Authorization header required');
  }
  
  if (!authorization.startsWith('Bearer ')) {
    throw new AuthenticationError('Invalid authorization format');
  }
  
  const token = authorization.substring(7);
  
  if (!token) {
    throw new AuthenticationError('Bearer token required');
  }
  
  // Mock validation - in production, verify JWT token
  if (token === 'invalid') {
    throw new AuthenticationError('Invalid token');
  }
  
  return token;
}