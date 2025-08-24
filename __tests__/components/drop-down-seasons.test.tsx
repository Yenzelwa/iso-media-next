import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DropdownSeasons } from '@/src/components/DropDownSeasons';

describe('DropdownSeasons', () => {
  const seasons = [
    { id: 1, seasonNumber: 1 } as any,
    { id: 2, seasonNumber: 2 } as any,
  ];

  test('shows initial selection and toggles list', () => {
    const onSelectSeason = jest.fn();
    render(<DropdownSeasons seasons={seasons} onSelectSeason={onSelectSeason} />);

    // Initially shows Season 1 on the toggle button
    const toggle = screen.getByRole('button', { name: /season 1/i });
    expect(toggle).toBeInTheDocument();

    // Open dropdown
    fireEvent.click(toggle);
    const s2 = screen.getByRole('button', { name: /^season 2$/i });
    expect(s2).toBeInTheDocument();

    // Select season 2
    fireEvent.click(s2);
    expect(onSelectSeason).toHaveBeenCalledWith(seasons[1]);

    // Dropdown closes and toggle shows Season 2 (only the toggle remains)
    const season2Buttons = screen.getAllByRole('button', { name: /^season 2$/i });
    expect(season2Buttons).toHaveLength(1);

    // Options list is gone
    expect(screen.queryByText(/^Season 1$/i)).not.toBeInTheDocument();
  });
});
