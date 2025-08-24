// __tests__/components/pricing-card.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PricingCard } from '@/src/components/PriceCard';

// Mock next/navigation router (component calls useRouter)
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));


type Plan = { id: number; title: string; price: string ; type: string; features: string[] };

const makePlan = (overrides: Partial<Plan> = {}): Plan => ({
  id: 1,
  title: 'Pro',
  price: '$9',
  type: 'Monthly',
  features: ['Unlimited streaming', '4K quality', 'Offline viewing'],
  ...overrides,
});

describe('PricingCard', () => {
  it('renders base card (not selected, not popular) and calls onSelect', () => {
    const plan = makePlan();
    const onSelect = jest.fn();

    const { container } = render(
      <PricingCard plan={plan} isSelected={false} onSelect={onSelect} />
    );

    // Title, price, billing type (lowercased)
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('/monthly')).toBeInTheDocument();

    // Features rendered
    plan.features.forEach((f) => {
      expect(screen.getByText(f)).toBeInTheDocument();
    });

    // Not selected styles: has base border, not the selected border-2; icons are green
    const card = container.querySelector('article') as HTMLElement;
    expect(card).toBeInTheDocument();
    expect(card.className).toMatch(/border\s/); // has a border
    expect(card.className).not.toMatch(/border-2/); // not selected border

    // All feature checkmarks green when not selected
    const featureList = screen.getByRole('list');
    // Note: jsdom does not assign role to svg; fallback to querySelectorAll as robust alternative
    const rawSvgs = featureList.querySelectorAll('svg');
    rawSvgs.forEach((svg) => {
      expect(svg.className.baseVal || svg.getAttribute('class') || '').toMatch(/text-green-500/);
    });

    // Button says Select Plan and fires onSelect with id
    const button = screen.getByRole('button', { name: /select plan/i });
    fireEvent.click(button);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(plan.id);

    // No Popular ribbon
    expect(screen.queryByText('Popular')).not.toBeInTheDocument();
  });

  it('shows Popular ribbon and selected styling, including red icons and Current Plan label', () => {
    const plan = makePlan({ id: 7, title: 'Ultimate', price: '$19', type: 'Yearly' });
    const onSelect = jest.fn();

    const { container } = render(
      <PricingCard plan={plan} isSelected={true} onSelect={onSelect} isPopular />
    );

    // Ribbon visible
    expect(screen.getByText('Popular')).toBeInTheDocument();

    // Selected styles: border-2 and overflow-hidden on the article
    const card = container.querySelector('article') as HTMLElement;
    expect(card.className).toMatch(/border-2/);
    expect(card.className).toMatch(/overflow-hidden/);

    // Icons are red when selected
    const featureList = screen.getByRole('list');
    const rawSvgs = featureList.querySelectorAll('svg');
    rawSvgs.forEach((svg) => {
      expect(svg.className.baseVal || svg.getAttribute('class') || '').toMatch(/text-red-500/);
    });

    // Button label switches
    expect(screen.getByRole('button', { name: /current plan/i })).toBeInTheDocument();
  });
});
