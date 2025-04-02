import React from 'react';
import { redirect } from 'next/navigation';
import { stripe } from '../lib/stripe';

interface ReturnProps {
  searchParams: URLSearchParams;
}

export default async function Return({ searchParams }: ReturnProps) {
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const { status, customer_details } = session;
  const customerEmail = customer_details?.email;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete' && customerEmail) {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
        </p>
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </section>
    );
  }

  return null;
}
