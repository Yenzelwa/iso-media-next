import { setupServer } from 'msw/node';
import { profileHandlers } from './handlers/profile';
import { authHandlers } from './handlers/auth';

export const server = setupServer(
  ...profileHandlers,
  ...authHandlers
);
