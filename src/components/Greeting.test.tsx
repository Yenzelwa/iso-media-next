// components/Greeting.test.tsx
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('displays the greeting', () => {
  render(<Greeting name="Alice" />);
  expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();
});
