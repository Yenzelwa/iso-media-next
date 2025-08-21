import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FaqsPage from '@/src/app/(root)/faqs/page';

describe('FaqsPage', () => {
  beforeEach(() => {
    render(<FaqsPage />);
  });

  it('renders the main FAQ heading and filter', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/frequently asked questions/i);

    const questions = screen.getAllByRole('button');
    expect(questions).toHaveLength(19); 
    expect(questions[0]).toHaveTextContent(/all questions/i);
    expect(questions[1]).toHaveTextContent(/general/i);
    expect(questions[2]).toHaveTextContent(/subscription/i);
    expect(questions[3]).toHaveTextContent(/technical/i);
    expect(questions[4]).toHaveTextContent(/account/i);
    expect(questions[5]).toHaveTextContent(/content/i);
    expect(questions[6]).toHaveTextContent(/billing/i);





  });

  it('expands an FAQ answer when clicked', () => {
    const firstQuestion = screen.getByText(/what is isolakwamuntu/i);
    fireEvent.click(firstQuestion);

    const answer = screen.getByText(/we curate documentaries, series, and educational content focused on spirituality, wellness, personal development, and human consciousness exploration/i);
    expect(answer).toBeInTheDocument();
  });

  it('shows only one answer at a time (accordion behavior)', () => {
    const firstQuestion = screen.getByText(/what is isolakwamuntu/i);
    const secondQuestion = screen.getByText(/how much does a subscription cost/i);

    fireEvent.click(firstQuestion);
    expect(screen.getByText(/we curate documentaries, series, and educational content focused on spirituality/i)).toBeInTheDocument();

    fireEvent.click(secondQuestion);
    expect(screen.getByText(/we offer flexible subscription plans to suit different needs./i)).toBeInTheDocument();

  });
});
