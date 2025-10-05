import { http, HttpResponse, delay } from 'msw';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.example.test';

// Example handlers for profile-related endpoints
// In-memory state to simulate backend persistence across requests
let securityState = {
  twoFactorEnabled: false,
  emailNotifications: true,
  autoLogout: '30',
};

let devicesState = [
  { id: 1, device: 'MacBook Pro', browser: 'Chrome', location: 'Los Angeles, CA', lastActive: 'Active now', current: true, ip: '192.168.1.100' },
  { id: 2, device: 'iPhone 14 Pro', browser: 'Safari', location: 'Los Angeles, CA', lastActive: '2 hours ago', current: false, ip: '192.168.1.101' },
  { id: 3, device: 'Samsung TV', browser: 'Tizen', location: 'Los Angeles, CA', lastActive: 'Yesterday', current: false, ip: '192.168.1.102' },
  { id: 4, device: 'Windows PC', browser: 'Edge', location: 'Los Angeles, CA', lastActive: '3 days ago', current: false, ip: '192.168.1.103' },
];

export const profileHandlers = [
  // PATCH /v1/profile/phone — validate simple E.164 and echo value
  http.patch(`${BASE}/v1/profile/phone`, async ({ request }) => {
    const body = (await request.json()) as { phone: string };
    if (!/^\+?[1-9]\d{6,14}$/.test(body.phone)) {
      return HttpResponse.json(
        { error: { code: 'INVALID_PHONE', field: 'phone' } },
        { status: 400 }
      );
    }
    await delay(150);
    return HttpResponse.json({ phone: body.phone }, { status: 200 });
  }),

  // Security settings
  http.get(/\/api\/security$/, async () => {
    await delay(100);
    return HttpResponse.json(securityState, { status: 200 });
  }),

  http.put(/\/api\/security$/, async ({ request }) => {
    const body = (await request.json()) as Partial<typeof securityState>;
    securityState = { ...securityState, ...body };
    await delay(120);
    return HttpResponse.json(securityState, { status: 200 });
  }),

  // Devices
  http.get(/\/api\/security\/devices$/, async () => {
    await delay(100);
    return HttpResponse.json({ items: devicesState }, { status: 200 });
  }),

  http.post(/\/api\/security\/devices\/\d+\/logout$/, async ({ request }) => {
    const url = new URL(request.url);
    const match = url.pathname.match(/\/(\d+)\/logout$/);
    const id = match ? Number(match[1]) : NaN;
    
    devicesState = devicesState.filter((d) => d.id !== id);
    await delay(100);
    return HttpResponse.json({ success: true }, { status: 200 });
  }),

  http.post(/\/api\/security\/devices\/logout-all-others$/, async () => {
    const current = devicesState.find((d) => d.current);
    devicesState = current ? [current] : [];
    await delay(120);
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];

