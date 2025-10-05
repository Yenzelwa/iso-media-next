Test Plan

- Unit
  - Run: `npm run test -- __tests__/app/account/create.test.tsx -i`
  - Expect all 9 tests to pass. Ensure `getByLabelText` still finds inputs.

- Manual
  - Build and open Register page.
  - Confirm labels are not visually rendered for text/password fields.
  - Verify keyboard focus order and placeholder visibility.
  - Confirm checkbox label still visible and clickable.

