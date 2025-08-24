// __tests__/app/watch/page.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the child server component used by the page so we can assert props
jest.mock('@/src/app/(root)/watch/[id]/watch-video', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="watch-video" data-id={props.params?.id} />,
}));

// Import the module under test (server page + helpers)
import * as PageModule from '@/src/app/(root)/watch/[id]/page';

// --- Tests ---

test('generateStaticParams returns the expected id list', () => {
  const params = PageModule.generateStaticParams();
  expect(params).toEqual([
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '254' },
  ]);
});

test('generateMetadata builds a title using the dynamic id', async () => {
  const md = await PageModule.generateMetadata({ params: Promise.resolve({ id: '42' }) } as any);
  expect(md.title).toBe('Watch Video 42');
});

test('WatchPage renders the id and passes it to <WatchVideo />', async () => {
  const element = await PageModule.default({ params: Promise.resolve({ id: '99' }) } as any);
  render(element as any);

  expect(screen.getByText('Watch Page - ID: 99')).toBeInTheDocument();
  const child = screen.getByTestId('watch-video');
  expect(child).toHaveAttribute('data-id', '99');
});
