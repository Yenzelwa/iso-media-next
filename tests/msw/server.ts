import { setupServer } from 'msw/node';
import { profileHandlers } from './handlers/profile';
import { authHandlers } from './handlers/auth';
import { billingHandlers } from './handlers/billing';

export const server = setupServer(
  ...profileHandlers,
  ...authHandlers,
  ...billingHandlers
);
