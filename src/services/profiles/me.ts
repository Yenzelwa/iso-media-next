import profileMock from '@/mocks/profiles/me.json';
import updatedProfileMock from '@/mocks/profiles/me.updated.json';

export interface UpdateProfileRequest {
  name?: string;
  phone?: string | null;
  avatar_url?: string | null;
}

export async function getProfileService() {
  return Promise.resolve(profileMock);
}

export async function updateProfileService(request: UpdateProfileRequest) {
  // Mock service - returns updated profile data
  return Promise.resolve(updatedProfileMock);
}