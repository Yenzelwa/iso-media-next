import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Player from '@/src/components/Player';


Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: jest.fn(),
});

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  value: jest.fn(),
});
beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation(() => Promise.resolve()), // ✅ return a Promise
  });

  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    writable: true,
    value: jest.fn(),
  });
});
describe('Player Component', () => {
  const testVideoPath = 'https://www.w3schools.com/html/mov_bbb.mp4';

  test('renders without crashing', () => {
    render(<Player video_path={testVideoPath} />);
    const video = screen.getByTestId('video-element');
    expect(video).toBeInTheDocument();
  });

test('play/pause toggle works', () => {
  render(<Player video_path={testVideoPath} />);
  
  // Simulate mouse enter to set isHovered = true
  const videoContainer = screen.getByTestId('video-container');
  fireEvent.mouseEnter(videoContainer);

  // Pause button should appear because btnPlay is initially true
  const pauseButton = screen.getByRole('button', { name: /pause/i });
  expect(pauseButton).toBeInTheDocument();

  // Click to toggle play → pause → play state
  fireEvent.click(pauseButton);

  // Now the play button should appear
  const playButton = screen.getByRole('button', { name: /play/i });
  expect(playButton).toBeInTheDocument();
});


  xtest('mute/unmute toggle works', () => {
    render(<Player video_path={testVideoPath} />);
    const muteButton = screen.getByRole('button', { name: /mute/i });
    fireEvent.click(muteButton);
    expect(screen.getByRole('button', { name: /unmute/i })).toBeInTheDocument();
  });

  test('volume slider changes volume', () => {
    render(<Player video_path={testVideoPath} />);
    const volumeSlider = screen.getByRole('slider');
    fireEvent.change(volumeSlider, { target: { value: '0.5' } });
    expect(volumeSlider).toHaveValue('0.5');
  });

  xtest('fullscreen button toggles state', () => {
    render(<Player video_path={testVideoPath} />);
    const fullScreenBtn = screen.getByRole('button', { name: /fullscreen/i });
    expect(fullScreenBtn).toBeInTheDocument();
    fireEvent.click(fullScreenBtn);
    expect(screen.getByRole('button', { name: /exit fullscreen/i })).toBeInTheDocument();
  });

  xtest('shows video controls on hover', () => {
    render(<Player video_path={testVideoPath} />);
    const container = screen.getByRole('video').parentElement;
    if (!container) throw new Error('Video container not found');

    act(() => {
      fireEvent.mouseEnter(container);
    });

    expect(screen.getByText(/pause/i)).toBeInTheDocument();
  });
});
