import { setupServer } from 'msw/node';
import { profileHandlers } from './handlers/profile';

export const server = setupServer(...profileHandlers);

