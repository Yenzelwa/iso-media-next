import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Player from '@/src/components/Player';

// ---- Global HTMLMediaElement mocks ----
beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    writable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    writable: true,
    value: jest.fn(),
  });
  // Fullscreen mock on HTMLVideoElement (it inherits from HTMLElement)
  Object.defineProperty(HTMLVideoElement.prototype, 'requestFullscreen', {
    configurable: true,
    writable: true,
    value: jest.fn(),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Player', () => {
  const SRC = 'https://www.w3schools.com/html/mov_bbb.mp4';

  it('renders placeholder UI when no video_path is provided', () => {
    render(<Player />);
    expect(screen.getByRole('heading', { name: /content loading/i })).toBeInTheDocument();
    expect(screen.getByText(/preparing your transformational experience/i)).toBeInTheDocument();
    // No <video> element in placeholder mode
    expect(document.querySelector('video')).not.toBeInTheDocument();
  });

  it('renders video, shows loading overlay, then hides overlay on loadeddata and shows formatted duration', () => {
    render(<Player video_path={SRC} />);

    // Video present
    const video = document.querySelector('video') as HTMLVideoElement;
    expect(video).toBeInTheDocument();

    // Loading overlay visible initially
    expect(screen.getByText(/loading experience/i)).toBeInTheDocument();

    // Provide a duration and fire loadeddata
    Object.defineProperty(video, 'duration', {
      configurable: true,
      value: 123, // 2:03
    });
    fireEvent.loadedData(video);

    // Overlay gone
    expect(screen.queryByText(/loading experience/i)).not.toBeInTheDocument();

    // Duration label appears as 2:03; current time starts 0:00
    expect(screen.getByText('0:00')).toBeInTheDocument();
    expect(screen.getByText('2:03')).toBeInTheDocument();
  });

  it('toggles play/pause state via video events (center play button visibility)', () => {
    render(<Player video_path={SRC} />);
    const video = document.querySelector('video') as HTMLVideoElement;

    // Make it "ready"
    Object.defineProperty(video, 'duration', { configurable: true, value: 60 });
    fireEvent.loadedData(video);

    // Not playing initially → center play button visible
    const centerPlayBtnBefore = document.querySelector(
      'button.w-20.h-20.bg-black\\/70'
    ) as HTMLButtonElement | null;
    expect(centerPlayBtnBefore).toBeInTheDocument();

    // When video plays, center play button should disappear
    fireEvent.play(video);
    const centerPlayBtnAfterPlay = document.querySelector(
      'button.w-20.h-20.bg-black\\/70'
    );
    expect(centerPlayBtnAfterPlay).not.toBeInTheDocument();

    // When video pauses, center play button should appear again
    fireEvent.pause(video);
    const centerPlayBtnAfterPause = document.querySelector(
      'button.w-20.h-20.bg-black\\/70'
    );
    expect(centerPlayBtnAfterPause).toBeInTheDocument();
  });

  it('seeks via the progress slider and updates current time label', () => {
    render(<Player video_path={SRC} />);
    const video = document.querySelector('video') as HTMLVideoElement;

    Object.defineProperty(video, 'duration', { configurable: true, value: 200 });
    fireEvent.loadedData(video);

    // The first range input is the progress bar (the volume slider is later)
    const sliders = screen.getAllByRole('slider') as HTMLInputElement[];
    const progress = sliders[0];

    // Seek to 30s
    fireEvent.change(progress, { target: { value: '30' } });

    // Current time label should show 0:30
    expect(screen.getByText('0:30')).toBeInTheDocument();

    // The underlying video element should have currentTime updated
    expect(video.currentTime).toBe(30);
  });

  it('changes volume via the volume slider', () => {
    render(<Player video_path={SRC} />);
    const video = document.querySelector('video') as HTMLVideoElement;

    Object.defineProperty(video, 'duration', { configurable: true, value: 60 });
    fireEvent.loadedData(video);

    // The second range input is the volume slider
    const sliders = screen.getAllByRole('slider') as HTMLInputElement[];
    expect(sliders.length).toBeGreaterThanOrEqual(2);
    const volumeSlider = sliders[1];

    fireEvent.change(volumeSlider, { target: { value: '0.5' } });
    expect(volumeSlider).toHaveValue('0.5');
    expect(video.volume).toBeCloseTo(0.5);
  });

  it('mutes/unmutes when clicking the volume icon button', () => {
    render(<Player video_path={SRC} />);
    const video = document.querySelector('video') as HTMLVideoElement;

    Object.defineProperty(video, 'duration', { configurable: true, value: 60 });
    fireEvent.loadedData(video);

    // The mute button is the first button inside the small volume container
    // Find that container via the small slider class and move up to its parent
    const volContainer = document.querySelector('.slider-small')?.closest('div');
    expect(volContainer).toBeTruthy();
    const buttons = volContainer!.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    const muteBtn = buttons[0] as HTMLButtonElement;
    // Toggle mute on
    fireEvent.click(muteBtn);
    expect(video.muted).toBe(true);
    // Toggle mute off
    fireEvent.click(muteBtn);
    expect(video.muted).toBe(false);
  });

  it('changes quality via the selector (combobox)', () => {
    render(<Player video_path={SRC} />);
    const video = document.querySelector('video') as HTMLVideoElement;

    Object.defineProperty(video, 'duration', { configurable: true, value: 60 });
    fireEvent.loadedData(video);

    const selects = screen.getAllByRole('combobox') as HTMLSelectElement[];
    // There is exactly one select for quality
    expect(selects.length).toBe(1);
    const qualitySelect = selects[0];
    expect(qualitySelect).toHaveValue('Auto');

    fireEvent.change(qualitySelect, { target: { value: '720p' } });
    expect(qualitySelect).toHaveValue('720p');
  });

  it('requests fullscreen when clicking the fullscreen button', () => {
    render(<Player video_path={SRC} />);
    const video = document.querySelector('video') as HTMLVideoElement;

    Object.defineProperty(video, 'duration', { configurable: true, value: 60 });
    fireEvent.loadedData(video);

    const fullscreenBtn = Array.from(document.querySelectorAll('button')).pop() as HTMLButtonElement;
    expect(fullscreenBtn).toBeInTheDocument();

    fireEvent.click(fullscreenBtn);
    expect((video.requestFullscreen as jest.Mock)).toHaveBeenCalled();
  });

  it('shows/hides custom controls on mouse enter/leave (opacity class toggles)', () => {
    const { container } = render(<Player video_path={SRC} />);
    const video = container.querySelector('video') as HTMLVideoElement;

    Object.defineProperty(video, 'duration', { configurable: true, value: 60 });
    fireEvent.loadedData(video);

    // Root interactive container is the immediate parent of the <video>
    const root = video.parentElement as HTMLElement;
    expect(root).toBeInTheDocument();

    // Controls container is the gradient bar (bottom)
    const controls = container.querySelector(
      'div.bg-gradient-to-t.from-black\\/90'
    ) as HTMLElement;
    expect(controls).toBeInTheDocument();

    // Enter → should include opacity-100
    fireEvent.mouseEnter(root);
    expect(controls.className).toMatch(/opacity-100/);

    // Leave → should include opacity-0
    fireEvent.mouseLeave(root);
    expect(controls.className).toMatch(/opacity-0/);
  });
});
