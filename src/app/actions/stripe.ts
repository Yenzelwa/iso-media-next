'use server'

import { headers } from 'next/headers';
import { stripe } from '../lib/stripe';

interface LineItem {
  price: string;
  quantity: number;
}

export async function fetchClientSecret(
  line_items: LineItem[],
  mode: 'payment' | 'subscription'
): Promise<string> {
  const origin = (await headers()).get('origin');

  // TypeScript narrowing: if origin is null, we throw an error
  if (origin === null) {
    throw new Error('Unable to retrieve origin');
  }

  // TypeScript now knows origin is a string, so we can use it
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
  });

  return session.client_secret;
}
