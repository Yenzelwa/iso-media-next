import { http, HttpResponse, delay } from 'msw';

// Handlers for billing-related endpoints used by Payment page
export const billingHandlers = [
  // Create customer
  http.post('/api/billing/customers', async ({ request }) => {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      payment_method_id?: string;
      profile_id?: string | number;
    };

    if (!body?.email || !body?.payment_method_id) {
      return HttpResponse.json({ error: 'invalid_request' }, { status: 400 });
    }

    await delay(120);
    return HttpResponse.json(
      {
        customer: JSON.stringify({ customer: 'cus_test123' }),
      },
      { status: 200 }
    );
  }),

  // Create subscription
  http.post('/api/billing/subscriptions', async ({ request }) => {
    const body = (await request.json()) as {
      customer_id?: string;
      plan_id?: string;
    };
    if (!body?.customer_id || !body?.plan_id) {
      return HttpResponse.json({ error: 'invalid_request' }, { status: 400 });
    }
    await delay(100);
    return HttpResponse.json({ status: 'active', id: 'sub_test_123' }, { status: 200 });
  }),
];

