import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextNav from "next/navigation";
import SeriesDetail from "@/src/app/(root)/series/[id]/page";

// -------------------- Mocks --------------------

// Capture router fns for assertions
const push = jest.fn();
const replace = jest.fn();
const back = jest.fn();
const forward = jest.fn();
const refresh = jest.fn();

// Mock Next App Router hooks used by the component
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace, back, forward, refresh }),
  usePathname: () => "/series/2",
  useSearchParams: () => new URLSearchParams(""),
  // NOTE: your component imports useParams from react-router-dom,
  // so this useParams isn't used; we still provide it harmlessly.
  useParams: () => ({ id: "2" }),
}));

// Mock react-router-dom's useParams (component calls this)
jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "2" }),
}));

// Make lucide-react icons lightweight to keep DOM clean
jest.mock("lucide-react", () => {
  const Icon = (props: any) => <svg aria-hidden="true" {...props} />;
  return {
    Play: Icon,
    Heart: Icon,
    Share2: Icon,
    Download: Icon,
    Star: Icon,
    Clock: Icon,
    Calendar: Icon,
    ChevronLeft: Icon,
  };
});

// -------------------- Helpers --------------------

const renderPage = () => render(<SeriesDetail />);

const getSeasonButton = (container: HTMLElement, label: string) => {
  // Season buttons are the numeric buttons (1..n) in the Episodes header row
  const episodesHeader = screen.getByRole("heading", { name: /episodes/i });
  // Walk up to the container that includes the season controls
  const headerRow =
    episodesHeader.closest(".flex")?.parentElement ?? episodesHeader.parentElement!;
  const allButtons = within(headerRow).getAllByRole("button");
  const btn = allButtons.find((b) => b.textContent?.trim() === label);
  if (!btn) throw new Error(`Season button "${label}" not found`);
  return btn;
};

// -------------------- Tests --------------------

describe("SeriesDetail page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders hero details: title, badges, rating, likes, year, duration, genres, description", () => {
    renderPage();

    // Title
    expect(
      screen.getByRole("heading", { name: /consciousness expansion/i })
    ).toBeInTheDocument();

    // Badges
    //expect(screen.getByRole(/series/i)).toBeInTheDocument();
    expect(screen.getByText(/3 seasons/i)).toBeInTheDocument();
    expect(screen.getByText(/24 episodes/i)).toBeInTheDocument();

    // Meta
    expect(screen.getByText("4.9")).toBeInTheDocument(); // rating
    expect(screen.getByText("267")).toBeInTheDocument(); // likes
    expect(screen.getByText("2023")).toBeInTheDocument(); // year
    expect(screen.getByText(/45-60 min per episode/i)).toBeInTheDocument(); // duration

    // Genres
    expect(screen.getByText("Spirituality")).toBeInTheDocument();
    expect(screen.getByText("Documentary")).toBeInTheDocument();
    expect(screen.getByText("Self-Development")).toBeInTheDocument();

    // Description snippet
    expect(
      screen.getByText(/transformative journey through the depths of human consciousness/i)
    ).toBeInTheDocument();
  });

  it("breadcrumb button navigates back to /series", async () => {
    const user = userEvent.setup();
    renderPage();

    const backBtn = screen.getByTestId("hero-btn");
    await user.click(backBtn);

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/series");
  });

  it("initially lists Season 1 episodes and clicking a card navigates to that episode watch page", async () => {
    const user = userEvent.setup();
    const { container } = renderPage();

    // 6 episode cards for season 1
    const cards = container.querySelectorAll(".group.cursor-pointer");
    expect(cards.length).toBe(6);

    // Click the 3rd card (episode id 3 in mock)
    await user.click(cards[2]);
    expect(push).toHaveBeenCalledWith("/watch/3");
  });

  it("Play Series plays the first episode of the current season; switching to season 2 keeps old currentEpisode", async () => {
    const user = userEvent.setup();
    const { container } = renderPage();

    // On mount, effect sets currentEpisode to first ep of season 1 (id 1)
    const playBtn = screen.getByRole("button", { name: /play series/i });
    await user.click(playBtn);
    expect(push).toHaveBeenLastCalledWith("/watch/1");

    // Switch to Season 2 (no episodes in mock)
    const s2Btn = getSeasonButton(container, "2");
    await user.click(s2Btn);

    // Grid should be empty
    expect(container.querySelectorAll(".group.cursor-pointer").length).toBe(0);

    // Because code keeps previous currentEpisode, Play still goes to id 1
    await user.click(playBtn);
    expect(push).toHaveBeenLastCalledWith("/watch/1");

    // Switch back to Season 1; effect sets currentEpisode to first ep again
    const s1Btn = getSeasonButton(container, "1");
    await user.click(s1Btn);

    // Cards are back
    const cards = container.querySelectorAll(".group.cursor-pointer");
    expect(cards.length).toBe(6);

    // Click a different episode to update currentEpisode via handlePlayEpisode
    await user.click(cards[4]); // episode id 5
    expect(push).toHaveBeenLastCalledWith("/watch/5");

    // Now Play Series should jump to the last selected episode (id 5)
    await user.click(playBtn);
    expect(push).toHaveBeenLastCalledWith("/watch/5");
  });

  it("like button toggles active styling on and off", async () => {
    const user = userEvent.setup();
    renderPage();

    // Action bar contains Play, Like, Share, Download (in that order)
    const playBtn = screen.getByRole("button", { name: /play series/i });
    const actions = playBtn.parentElement as HTMLElement;
    const buttons = within(actions).getAllByRole("button");
    const likeBtn = buttons[1];

    // Initial (inactive)
    expect(likeBtn.className).not.toMatch(/bg-red-600/);

    // Toggle on
    await user.click(likeBtn);
    expect(likeBtn.className).toMatch(/bg-red-600/);

    // Toggle off
    await user.click(likeBtn);
    expect(likeBtn.className).not.toMatch(/bg-red-600/);
  });
});
