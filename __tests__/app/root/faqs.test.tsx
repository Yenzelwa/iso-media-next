import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FaqsPage from '@/src/app/(root)/faqs/page';

describe('FaqsPage', () => {
  beforeEach(() => {
    render(<FaqsPage />);
  });

  it('renders the main FAQ heading and all questions', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/frequently asked questions/i);

    const questions = screen.getAllByRole('button');
    expect(questions).toHaveLength(4); 
    expect(questions[0]).toHaveTextContent(/what is isolakwamuntu/i);
    expect(questions[1]).toHaveTextContent(/how do i subscribe/i);
  });

  it('expands an FAQ answer when clicked', () => {
    const firstQuestion = screen.getByText(/what is isolakwamuntu/i);
    fireEvent.click(firstQuestion);

    const answer = screen.getByText(/Isolakwamuntu is a streaming platform/i);
    expect(answer).toBeInTheDocument();
  });

  it('shows only one answer at a time (accordion behavior)', () => {
    const firstQuestion = screen.getByText(/what is isolakwamuntu/i);
    const secondQuestion = screen.getByText(/how do i subscribe/i);

    fireEvent.click(firstQuestion);
    expect(screen.getByText(/Isolakwamuntu is a streaming platform/i)).toBeInTheDocument();

    fireEvent.click(secondQuestion);
    expect(screen.getByText(/You can subscribe via the 'Plans'/i)).toBeInTheDocument();

  });
});
