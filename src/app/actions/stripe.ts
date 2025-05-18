'use server'
import { headers } from "next/headers";
import { stripe } from '../lib/stripe';


interface LineItem {
  price: string;
  quantity: number;
}

export async function fetchClientSecret(
  line_items: LineItem[],
  mode: 'payment' | 'subscription'
): Promise<any> {
  const origin = (await headers()).get('origin');
debugger;
  // TypeScript narrowing: if origin is null, we throw an error
  if (origin === null) {
    throw new Error('Unable to retrieve origin');
  }
debugger
  // Create the Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
  });

  // Ensure the client_secret is a string before returning it
  if (typeof session.client_secret === 'string') {
    return session.client_secret;
  } else {
    throw new Error('Client secret is not a string');
  }
}
