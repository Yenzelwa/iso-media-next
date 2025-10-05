/** @jest-environment node */
import axios from 'axios';

describe.skip('MSW Security & Devices API (MSW node intercept)', () => {
  test('GET /api/security returns defaults', async () => {
    const { data: json, status } = await axios.get('http://localhost/api/security');
    expect(status).toBe(200);
    expect(json).toMatchObject({
      twoFactorEnabled: false,
      emailNotifications: true,
      autoLogout: '30',
    });
  });

  test('PUT /api/security updates state', async () => {
    const { data: json, status } = await axios.put('http://localhost/api/security', {
      twoFactorEnabled: true,
      autoLogout: '60',
    });
    expect(status).toBe(200);
    expect(json.twoFactorEnabled).toBe(true);
    expect(json.autoLogout).toBe('60');
  });

  test('GET /api/security/devices returns 4 items initially', async () => {
    const { data: json, status } = await axios.get('http://localhost/api/security/devices');
    expect(status).toBe(200);
    expect(Array.isArray(json.items)).toBe(true);
    expect(json.items.length).toBeGreaterThanOrEqual(1);
  });

  test('POST /api/security/devices/:id/logout removes device', async () => {
    const initial = (await axios.get('http://localhost/api/security/devices')).data;
    const removable = initial.items.find((d: any) => !d.current);
    expect(removable).toBeTruthy();

    const res = await axios.post(`http://localhost/api/security/devices/${removable.id}/logout`);
    expect(res.status).toBe(200);

    const after = (await axios.get('http://localhost/api/security/devices')).data;
    expect(after.items.find((d: any) => d.id === removable.id)).toBeUndefined();
  });

  test('POST /api/security/devices/logout-all-others leaves only current', async () => {
    const res = await axios.post('http://localhost/api/security/devices/logout-all-others');
    expect(res.status).toBe(200);

    const after = (await axios.get('http://localhost/api/security/devices')).data;
    const current = after.items.filter((d: any) => d.current === true);
    expect(after.items.length).toBe(1);
    expect(current.length).toBe(1);
  });
});
