## Test Plan — Epic: Profile — Account Details

Scope
- Account Settings phone update inline flow in `MembershipBilling` component.

Unit/Component
- `__tests__/app/root/profile/membership-billing.test.tsx`
  - Renders static info with formatted phone
  - Phone edit formats digits and triggers `updateUser`
  - Cancel restores original value; no update
  - Save disabled when digits unchanged

Manual
- Open Profile → Account Settings → Phone → Change
- Enter invalid formats (short, same number) → Save disabled
- Enter valid new 10 digits → Save enabled → Saved and formatted

Regression
- Verify Full Name edit flow unaffected
- Verify Billing modal still opens and closes
