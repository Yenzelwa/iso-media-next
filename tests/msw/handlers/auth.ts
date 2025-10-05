import { http, HttpResponse, delay } from 'msw';

// Handler for auth/register used by Register page
export const authHandlers = [
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json();
    // Basic shape validation
    if (!body || !body.email || !body.password || !body.first_name) {
      return HttpResponse.json('Invalid payload', { status: 400 });
    }
    await delay(100);
    return HttpResponse.json(
      {
        access_token: 'mock-jwt-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        user: {
          id: 1,
          email: body.email,
          name: body.first_name,
        },
      },
      { status: 200 }
    );
  }),
];

