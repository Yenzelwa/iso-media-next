import securitySettingsMock from '@/mocks/security/settings.json';
import devicesMock from '@/mocks/security/devices.json';
import logoutResponseMock from '@/mocks/security/logout.response.json';

export interface SecuritySettingsUpdate {
  two_factor_enabled?: boolean;
  login_alerts?: boolean;
  auto_logout_minutes?: number;
  data_collection?: boolean;
}

export async function getSecuritySettingsService() {
  return Promise.resolve(securitySettingsMock);
}

export async function updateSecuritySettingsService(updates: SecuritySettingsUpdate) {
  const updated = { ...securitySettingsMock, ...updates };
  return Promise.resolve(updated);
}

export async function getDeviceSessionsService() {
  return Promise.resolve(devicesMock);
}

export async function logoutDeviceService(deviceId: string) {
  if (deviceId === 'not_found') {
    throw new Error('Device not found');
  }
  return Promise.resolve(logoutResponseMock);
}

export async function logoutAllOtherDevicesService() {
  return Promise.resolve(logoutResponseMock);
}