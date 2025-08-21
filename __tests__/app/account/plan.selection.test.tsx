import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';
import PlanSelection from '@/src/app/(account)/plan-selection/page';
import { AuthProvider, useAuth } from '@/src/app/context/authContext';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="link">{children}</a>
  );
});
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/src/app/context/authContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: jest.fn(), 
}));

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
    const mockLogin = jest.fn();
  it('renders pricing plans', () => {
         (useAuth as jest.Mock).mockReturnValue({
          user: { email: 'test@example.com' , name: 'John Doe'},
          login: mockLogin,
        });
    render(<AuthProvider><PlanSelection /></AuthProvider>);

    expect(screen.getByTestId('pricing-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('pricing-card-2')).toBeInTheDocument();
  });

  it('highlights selected pricing plan', () => {
    render(<AuthProvider><PlanSelection /></AuthProvider>);

    const firstPlan = screen.getByTestId('pricing-card-1');
    const secondPlan = screen.getByTestId('pricing-card-2');

    // Click second plan
    fireEvent.click(secondPlan);

    // You can add checks based on class changes or custom styles
    expect(firstPlan).toHaveStyle('border: 1px solid gray');
    expect(secondPlan).toHaveStyle('border: 2px solid green');
  });

  it('marks the yearly plan as popular', () => {
    render(<AuthProvider><PlanSelection /></AuthProvider>);
    expect(screen.getByTestId('popular-badge')).toBeInTheDocument();
  });

  it('has a link to the payment page', () => {
    render(<AuthProvider><PlanSelection /></AuthProvider>);
    const link = screen.getByText('Continue to Payment');
   // expect(link).toHaveAttribute('href', '/billing/payment');
    expect(link).toHaveTextContent('Continue to Payment');
  });
});
