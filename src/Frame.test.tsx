import React from 'react';
import { render, screen } from '@testing-library/react';
import Frame from './Frame';

describe('Frame', () => {
  it('renders frame information correctly', () => {
    render(<Frame frameNumber={1} roll1="X" roll2="" roll3="" frameScore={10} />);

    expect(screen.getByText('Frame 1')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
