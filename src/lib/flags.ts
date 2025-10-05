export function isEnabled(key: string) {
  if (typeof window !== 'undefined') {
    // Allow local overrides via window for manual QA
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w: any = window as any;
    if (w.__FF_PROFILE_ACCOUNT_DETAILS__ === true) return true;
  }
  // Env-driven default
  return process.env.NEXT_PUBLIC_FF_PROFILE_ACCOUNT_DETAILS === '1';
}

