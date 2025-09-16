import accountMock from '@/mocks/profiles/account.json';
import updatedAccountMock from '@/mocks/profiles/account.updated.json';
import successMock from '@/mocks/profiles/change.success.json';

export interface UpdateAccountRequest {
  name?: string;
  phone?: string | null;
  avatar_url?: string | null;
  billing_address?: {
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
}

export interface ChangeEmailRequest {
  new_email: string;
  password: string;
}

export interface ChangePhoneRequest {
  new_phone: string;
}

export async function getAccountService() {
  return Promise.resolve(accountMock);
}

export async function updateAccountService(request: UpdateAccountRequest) {
  return Promise.resolve(updatedAccountMock);
}

export async function changeEmailService(request: ChangeEmailRequest) {
  if (request.password === 'invalid') {
    throw new Error('Invalid password');
  }
  return Promise.resolve(successMock);
}

export async function changePhoneService(request: ChangePhoneRequest) {
  return Promise.resolve(successMock);
}