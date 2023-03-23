import React from 'react';
import { render, screen } from '@testing-library/react';
import { Bowling } from './bowling';
import BowlingScoreboard from './BowlingScoreboard';

describe('BowlingScoreboard', () => {
  it('renders scoreboard with 10 frames', () => {
    const bowling = new Bowling();
    const rolls: number[] = [];

    render(<BowlingScoreboard bowling={bowling} rolls={rolls} />);

    const frames = screen.getAllByText(/Frame/i);
    expect(frames.length).toBe(10);
  });
});
