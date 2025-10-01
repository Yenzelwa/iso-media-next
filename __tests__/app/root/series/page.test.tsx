// SeriesPage.test.tsx
import React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SeriesPage from "@/src/app/(root)/series/page";

const mockSeriesItems = [
  {
    id: 'series-001',
    title: 'Energy Healing Mastery',
    description: 'Transformative practices for everyday healers.',
    image_path: '/images/series-energy-healing.jpg',
    likes: 182,
    rating: 4.7,
    release_date: '2023-08-01',
    type: { name: 'Series', category: { name: 'Wellness' } },
  },
  {
    id: 'series-002',
    title: 'Digital Detox',
    description: 'Modern mindfulness and balanced tech use.',
    image_path: '/images/series-digital-detox.jpg',
    likes: 136,
    rating: 4.4,
    release_date: '2023-07-10',
    type: { name: 'Series', category: { name: 'Wellness' } },
  },
  {
    id: 'series-003',
    title: 'Consciousness Expansion',
    description: 'Deep dives into meditation and awareness science.',
    image_path: '/images/series-consciousness.jpg',
    likes: 267,
    rating: 4.9,
    release_date: '2023-06-12',
    type: { name: 'Series', category: { name: 'Spirituality' } },
  },
  {
    id: 'series-004',
    title: 'Mystic Journeys',
    description: 'Travel through ancient sacred sites with modern guides.',
    image_path: '/images/series-mystic-journeys.jpg',
    likes: 158,
    rating: 4.6,
    release_date: '2023-05-22',
    type: { name: 'Series', category: { name: 'Spirituality' } },
  },
  {
    id: 'series-005',
    title: 'Sacred Geometry Explained',
    description: 'Visual storytelling about sacred patterns.',
    image_path: '/images/series-sacred-geometry.jpg',
    likes: 149,
    rating: 4.5,
    release_date: '2023-04-18',
    type: { name: 'Series', category: { name: 'Spirituality' } },
  },
  {
    id: 'series-006',
    title: 'Ancient Wisdom',
    description: 'Scholars decode timeless teachings for modern life.',
    image_path: '/images/series-ancient-wisdom.jpg',
    likes: 120,
    rating: 4.3,
    release_date: '2023-03-11',
    type: { name: 'Series', category: { name: 'Education' } },
  },
];

const mockFetchResponse = {
  ok: true,
  json: async () => ({ items: mockSeriesItems }),
};

const originalFetch = global.fetch;

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ChevronDown: (props: any) => <svg data-testid="chevron" {...props} />,
}));
// Mock next/navigation for App Router hooks
jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }),
    usePathname: () => "/series",
    useSearchParams: () =>
      new (class extends URLSearchParams {
        toString() { return ""; }
      })(),
  };
});

// (Optional) Mock next/image to behave like a normal <img> in JSDOM
jest.mock("next/image", () => (props: any) => {
  const { src, alt, ...rest } = props;
  return <img src={typeof src === "string" ? src : src?.src} alt={alt} {...rest} />;
});

// Mock EnhancedCarousel and capture props
const enhancedCarouselMock = jest.fn(() => <div data-testid="carousel" />);
jest.mock("@/src/components/EnhancedCarousel", () => ({
  EnhancedCarousel: (props: any) => enhancedCarouselMock(props),
}));

const renderSeriesPage = async () => {
  const utils = render(<SeriesPage />);
  await screen.findByText(/6 series found/i);
  return utils;
};

beforeEach(() => {
  (global as any).fetch = jest.fn().mockResolvedValue(mockFetchResponse);
  jest.spyOn(Math, "random").mockReturnValue(0.5); // stabilize "Episodes"
  enhancedCarouselMock.mockClear();
});

afterEach(() => {
  jest.restoreAllMocks();
  if (originalFetch) {
    (global as any).fetch = originalFetch;
  } else {
    delete (global as any).fetch;
  }
});

describe("SeriesPage", () => {
  it("renders initial state: count and 'Latest' ordering", async () => {
    const { container } = await renderSeriesPage();

    const main = container.querySelector('main');
    expect(main?.className).toContain('relative');
    expect(main?.className).toContain('isolate');
    expect(container.querySelector('[class*="from-slate-950"]')).toBeInTheDocument();
    expect(screen.queryByText(/^SERIES$/)).not.toBeInTheDocument();

    expect(screen.getByText(/6 series found/i)).toBeInTheDocument();

    const firstCard = container.querySelector(".grid [class*='group']") as HTMLElement;
    expect(firstCard).not.toBeNull();
    expect(
      within(firstCard).getByText("Energy Healing Mastery")
    ).toBeInTheDocument();

    await waitFor(() => expect(enhancedCarouselMock).toHaveBeenCalledTimes(4));
    expect(screen.getAllByTestId("chevron").length).toBeGreaterThanOrEqual(2);
  });

  it("filters by category 'Wellness' and updates count and visible items", async () => {
    await renderSeriesPage();
    const user = userEvent.setup();

    const categorySelect = screen.getByLabelText(/category/i);
    await user.selectOptions(categorySelect, "Wellness");

    expect(await screen.findByText(/2 series found/i)).toBeInTheDocument();
    expect(await screen.findByText("Digital Detox")).toBeInTheDocument();
    expect(await screen.findByText("Energy Healing Mastery")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("Ancient Wisdom")).not.toBeInTheDocument());
  });

  it("filters by category 'Education' and shows the single match", async () => {
    await renderSeriesPage();
    const user = userEvent.setup();

    const categorySelect = screen.getByLabelText(/category/i);
    await user.selectOptions(categorySelect, "Education");

    expect(await screen.findByText(/1 series found/i)).toBeInTheDocument();
    expect(await screen.findByText("Ancient Wisdom")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("Digital Detox")).not.toBeInTheDocument());
  });

  it("sorts A-Z correctly", async () => {
    const { container } = await renderSeriesPage();
    const user = userEvent.setup();

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.selectOptions(sortSelect, "A-Z");

    await waitFor(() => {
      const firstCard = container.querySelector(".grid [class*='group']") as HTMLElement;
      expect(firstCard).not.toBeNull();
      expect(
        within(firstCard as Element).getByText("Ancient Wisdom")
      ).toBeInTheDocument();
    });
  });

  it("sorts by 'Most Popular' (likes desc)", async () => {
    const { container } = await renderSeriesPage();
    const user = userEvent.setup();

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.selectOptions(sortSelect, "Most Popular");

    await waitFor(() => {
      const firstCard = container.querySelector(".grid [class*='group']") as HTMLElement;
      expect(
        within(firstCard as Element).getByText("Consciousness Expansion")
      ).toBeInTheDocument();
    });
  });

  it("sorts by 'Highest Rated' (rating desc)", async () => {
    const { container } = await renderSeriesPage();
    const user = userEvent.setup();

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.selectOptions(sortSelect, "Highest Rated");

    await waitFor(() => {
      const firstCard = container.querySelector(".grid [class*='group']") as HTMLElement;
      expect(
        within(firstCard as Element).getByText("Consciousness Expansion")
      ).toBeInTheDocument();
    });
  });

  it("passes correct props to EnhancedCarousel instances", async () => {
    await renderSeriesPage();

    expect(enhancedCarouselMock.mock.calls[0][0]).toMatchObject({
      title: "New Releases",
      variant: "series",
    });
    expect(enhancedCarouselMock.mock.calls[0][0].movies).toHaveLength(3);

    expect(enhancedCarouselMock.mock.calls[1][0]).toMatchObject({
      title: "Most Popular Series",
      variant: "series",
    });
    expect(enhancedCarouselMock.mock.calls[1][0].movies).toHaveLength(6);

    expect(enhancedCarouselMock.mock.calls[2][0]).toMatchObject({
      title: "Spirituality Collection",
      variant: "series",
    });
    expect(enhancedCarouselMock.mock.calls[2][0].movies).toHaveLength(3);

    expect(enhancedCarouselMock.mock.calls[3][0]).toMatchObject({
      title: "Wellness Journey",
      variant: "series",
    });
    expect(enhancedCarouselMock.mock.calls[3][0].movies).toHaveLength(2);
  });

  it("shows the image with correct alt text on the first card", async () => {
    const { container } = await renderSeriesPage();
    const firstCard = container.querySelector(".grid [class*='group']")!;
    const img = within(firstCard).getByRole("img", { name: /energy healing mastery/i });
    expect(img).toBeInTheDocument();
  });
});
