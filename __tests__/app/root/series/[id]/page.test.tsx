import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SeriesDetail from "@/src/app/(root)/series/[id]/page";

// -------------------- Mocks --------------------

const push = jest.fn();
const replace = jest.fn();
const back = jest.fn();
const forward = jest.fn();
const refresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace, back, forward, refresh }),
  usePathname: () => "/series/2",
  useSearchParams: () => new URLSearchParams(""),
  useParams: () => ({ id: "2" }),
}));

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "2" }),
}));

jest.mock("lucide-react", () => {
  const Icon = (props: any) => <svg aria-hidden="true" data-test-icon {...props} />;
  return {
    Play: Icon,
    Star: Icon,
    Calendar: Icon,
    ChevronLeft: Icon,
  };
});

// -------------------- Test Data --------------------

type EpisodePayload = {
  id: number;
  title: string;
  description: string;
  duration: string;
  image_path: string;
  episode_number: number;
  season_number: number;
  release_date: Date;
  video_path: string;
};

const mockEpisodesSeasonOne: EpisodePayload[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `Episode ${index + 1}`,
  description: "Exploring consciousness frontiers.",
  duration: "45m",
  image_path: `https://example.com/episode-${index + 1}.jpg`,
  episode_number: index + 1,
  season_number: 1,
  release_date: new Date(`2023-01-0${index + 1}T00:00:00Z`),
  video_path: `/videos/${index + 1}`,
}));

const mockEpisodesBySeason: Record<number, EpisodePayload[]> = {
  1: mockEpisodesSeasonOne,
  2: [],
};

const mockSeriesResponse = {
  id: "series_2",
  title: "Consciousness Expansion",
  description: "A transformative journey through the depths of human consciousness and self-discovery.",
  image_path: "https://example.com/series-hero.jpg",
  rating: "4.9",
  likes: "267",
  seasons: 3,
  totalEpisodes: 24,
  year: 2023,
  duration: "45-60 min per episode",
  genre: ["Spirituality", "Documentary", "Self-Development"],
  release_date: "2023-01-01T00:00:00.000Z",
  type: {
    category: { name: "Spirituality" },
  },
};

const createFetchResponse = (payload: unknown, ok = true): Promise<Response> =>
  Promise.resolve({
    ok,
    status: ok ? 200 : 500,
    json: jest.fn().mockResolvedValue(payload),
  } as unknown as Response);

const renderPage = async () => {
  const utils = render(<SeriesDetail />);
  await screen.findByRole("heading", { name: /consciousness expansion/i });
  return utils;
};

const getSeasonButton = (container: HTMLElement, label: string) => {
  const episodesHeader = screen.getByRole("heading", { name: /episodes/i });
  const headerRow =
    episodesHeader.closest(".flex")?.parentElement ?? episodesHeader.parentElement!;
  const allButtons = within(headerRow).getAllByRole("button");
  const btn = allButtons.find((b) => b.textContent?.trim() === label);
  if (!btn) throw new Error(`Season button "${label}" not found`);
  return btn;
};

// -------------------- Tests --------------------

describe("SeriesDetail page", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn((input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();

      if (url.includes("/seasons/")) {
        const match = url.match(/seasons\/(\d+)/);
        const seasonKey = match ? Number(match[1]) : 1;
        const items = mockEpisodesBySeason[seasonKey] ?? [];
        return createFetchResponse({ items });
      }

      if (url.includes("/api/series/")) {
        return createFetchResponse(mockSeriesResponse);
      }

      return createFetchResponse({});
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("renders hero details with simplified meta and no deprecated badges", async () => {
    await renderPage();

    expect(
      screen.getByRole("heading", { name: /consciousness expansion/i })
    ).toBeInTheDocument();

    expect(screen.queryByText(/^SERIES$/)).not.toBeInTheDocument();
    expect(screen.getByText(/3 Seasons/i)).toBeInTheDocument();
    expect(screen.getByText(/24 Episodes/i)).toBeInTheDocument();

    expect(screen.getByText("4.9")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();

    expect(screen.queryByText("267")).not.toBeInTheDocument();
    expect(screen.queryByText(/45-60 min per episode/i)).not.toBeInTheDocument();

    expect(
      screen.getByText(/transformative journey through the depths of human consciousness/i)
    ).toBeInTheDocument();
  });

  it("breadcrumb button navigates back to /series", async () => {
    const user = userEvent.setup();
    await renderPage();

    const backBtn = screen.getByTestId("hero-btn");
    await user.click(backBtn);

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/series");
  });

  it("initially lists Season 1 episodes with correct art sizing and no hover icon", async () => {
    const user = userEvent.setup();
    const { container } = await renderPage();

    const cards = container.querySelectorAll(".group.cursor-pointer");
    expect(cards.length).toBe(6);

    const firstImage = cards[0]?.querySelector("img");
    expect(firstImage).toHaveClass("aspect-video");

    expect(cards[0]?.querySelector("svg")).toBeNull();

    await user.click(cards[2]);
    expect(push).toHaveBeenCalledWith("/watch/3");
  });

  it("Play Series plays the first episode and respects currentEpisode across season switches", async () => {
    const user = userEvent.setup();
    const { container } = await renderPage();

    const playBtn = screen.getByRole("button", { name: /play series/i });
    await user.click(playBtn);
    expect(push).toHaveBeenLastCalledWith("/watch/1");

    const seasonTwoBtn = getSeasonButton(container, "2");
    await user.click(seasonTwoBtn);
    expect(container.querySelectorAll(".group.cursor-pointer").length).toBe(0);

    await user.click(playBtn);
    expect(push).toHaveBeenLastCalledWith("/watch/1");

    const seasonOneBtn = getSeasonButton(container, "1");
    await user.click(seasonOneBtn);

    const updatedCards = container.querySelectorAll(".group.cursor-pointer");
    expect(updatedCards.length).toBe(6);

    await user.click(updatedCards[4]);
    expect(push).toHaveBeenLastCalledWith("/watch/5");

    await user.click(playBtn);
    expect(push).toHaveBeenLastCalledWith("/watch/5");
  });

  it("matches snapshot", async () => {
    const { container } = await renderPage();
    expect(container.firstChild).toMatchSnapshot();
  });
});
