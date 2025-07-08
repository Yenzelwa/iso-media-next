import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';
import PricingPlans from '@/src/app/(account)/plan-selection/plans/page';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="link">{children}</a>
  );
});

// Mock PricingCard component
jest.mock('@/src/components/PriceCard', () => ({
  PricingCard: ({ plan, isSelected, onSelect, isPopular }: any) => (
    <div
      data-testid={`pricing-card-${plan.id}`}
      onClick={() => onSelect(plan.id)}
      style={{ border: isSelected ? '2px solid green' : '1px solid gray' }}
    >
      <h3>{plan.title}</h3>
      <p>{plan.price}</p>
      {isPopular && <span data-testid="popular-badge">Popular</span>}
    </div>
  )
}));

describe('PricingPlans Component', () => {
  it('renders pricing plans', () => {
    render(<PricingPlans />);

    expect(screen.getByTestId('pricing-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('pricing-card-2')).toBeInTheDocument();
  });

  it('highlights selected pricing plan', () => {
    render(<PricingPlans />);

    const firstPlan = screen.getByTestId('pricing-card-1');
    const secondPlan = screen.getByTestId('pricing-card-2');

    // Click second plan
    fireEvent.click(secondPlan);

    // You can add checks based on class changes or custom styles
    expect(firstPlan).toHaveStyle('border: 1px solid gray');
    expect(secondPlan).toHaveStyle('border: 2px solid green');
  });

  it('marks the yearly plan as popular', () => {
    render(<PricingPlans />);
    expect(screen.getByTestId('popular-badge')).toBeInTheDocument();
  });

  it('has a link to the payment page', () => {
    render(<PricingPlans />);
    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/billing/payment');
    expect(link).toHaveTextContent('Continue to Payment');
  });
});
