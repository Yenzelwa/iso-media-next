import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
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
    // Mock fullscreen API on HTMLElement prototype
  Object.defineProperty(HTMLElement.prototype, 'requestFullscreen', {
    configurable: true,
    value: jest.fn().mockImplementation(function (this: HTMLElement) {
      Object.defineProperty(document, 'fullscreenElement', {
        configurable: true,
        get: () => this,
      });
    }),
  });

  Object.defineProperty(document, 'exitFullscreen', {
    configurable: true,
    value: jest.fn().mockImplementation(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        configurable: true,
        get: () => null,
      });
    }),
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


  const playButton = screen.getByRole('button', { name: /play/i });
  expect(playButton).toBeInTheDocument();
});



test('mute/unmute toggle works', async () => {
  render(<Player video_path="https://www.w3schools.com/html/mov_bbb.mp4" />);

  const videoContainer = screen.getByTestId('video-container');
  fireEvent.mouseEnter(videoContainer);

  const muteToggle = await screen.findByTestId('mute-toggle');

  expect(muteToggle).toHaveTextContent(/mute/i);

  fireEvent.click(muteToggle);

  expect(muteToggle).toHaveTextContent(/unmute/i);
});


  test('volume slider changes volume', async () => {
      render(<Player video_path="https://www.w3schools.com/html/mov_bbb.mp4" />);

  const videoContainer = screen.getByTestId('video-container');
  fireEvent.mouseEnter(videoContainer);
    const volumeSlider = screen.getByLabelText('volume slider');
    fireEvent.change(volumeSlider, { target: { value: '0.5' } });
    await act(async () => {
    fireEvent.change(volumeSlider, { target: { value: '0.5' } });
  });
await waitFor(() => {
  expect(volumeSlider).toHaveValue('0.5');
});
  });

test('fullscreen button toggles state', () => {
  render(<Player video_path="https://www.w3schools.com/html/mov_bbb.mp4" />);
  
  const videoContainer = document.querySelector('.video-container') as HTMLElement;

  fireEvent.mouseEnter(videoContainer);

  const fullscreenBtn = screen.getByRole('button', { name: /fullscreen/i });
  expect(fullscreenBtn).toBeInTheDocument();

  
  fireEvent.click(fullscreenBtn);
  expect(document.fullscreenElement).toBe(videoContainer);
  expect(screen.getByRole('button', { name: /exit fullscreen/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /exit fullscreen/i }));
  expect(document.fullscreenElement).toBe(null);
  expect(screen.getByRole('button', { name: /fullscreen/i })).toBeInTheDocument();
});


 test('shows video controls on hover', () => {
  render(<Player video_path="https://www.w3schools.com/html/mov_bbb.mp4" />);


  const videoContainer = screen.getByTestId('video-container');
  fireEvent.mouseEnter(videoContainer);

  const controls = screen.getByText(/mute/i).closest('.video-controls-container');
  expect(controls).toBeInTheDocument();
});
});
