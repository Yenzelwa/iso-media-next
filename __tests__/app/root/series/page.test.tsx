// SeriesPage.test.tsx
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SeriesPage from "@/src/app/(root)/series/page";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ChevronDown: (props: any) => <svg data-testid="chevron" {...props} />,
}));

// Mock EnhancedCarousel and capture props
const enhancedCarouselMock = jest.fn(() => <div data-testid="carousel" />);
jest.mock("@/src/components/EnhancedCarousel", () => ({
  EnhancedCarousel: (props: any) => enhancedCarouselMock(props),
}));

beforeEach(() => {
  jest.spyOn(Math, "random").mockReturnValue(0.5); // stabilize "Episodes"
  enhancedCarouselMock.mockClear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("SeriesPage", () => {
  it("renders initial state: count and 'Latest' ordering", () => {
    const { container } = render(<SeriesPage />);

    // Count
    expect(screen.getByText(/6 series found/i)).toBeInTheDocument();

    // First card title under Latest (release_date desc) should be "Energy Healing Mastery" (2023-08-01)
    const firstCard = container.querySelector(".grid [class*='group']") as HTMLElement;
    expect(firstCard).not.toBeNull();
    expect(
      within(firstCard).getByText("Energy Healing Mastery")
    ).toBeInTheDocument();

    // Carousels rendered 4 times
    expect(enhancedCarouselMock).toHaveBeenCalledTimes(4);

    // Chevron icon present (basic smoke check for select UI)
    expect(screen.getAllByTestId("chevron").length).toBeGreaterThanOrEqual(2);
  });

  it("filters by category 'Wellness' and updates count and visible items", async () => {
    render(<SeriesPage />);
    const user = userEvent.setup();

    const categorySelect = screen.getByLabelText(/category/i);
    await user.selectOptions(categorySelect, "Wellness");

    // Count should be 2
    expect(screen.getByText(/2 series found/i)).toBeInTheDocument();

    // Only Wellness titles should be present
    expect(screen.getByText("Digital Detox")).toBeInTheDocument();
    expect(screen.getByText("Energy Healing Mastery")).toBeInTheDocument();

    // Non-Wellness example should be filtered out
    expect(screen.queryByText("Ancient Wisdom")).not.toBeInTheDocument();
  });

  it("filters by category 'Education' and shows the single match", async () => {
    render(<SeriesPage />);
    const user = userEvent.setup();

    const categorySelect = screen.getByLabelText(/category/i);
    await user.selectOptions(categorySelect, "Education");

    expect(screen.getByText(/1 series found/i)).toBeInTheDocument();
    expect(screen.getByText("Ancient Wisdom")).toBeInTheDocument();
    // Ensure a non-education item is gone
    expect(screen.queryByText("Digital Detox")).not.toBeInTheDocument();
  });

  it("sorts A–Z correctly", async () => {
    const { container } = render(<SeriesPage />);
    const user = userEvent.setup();

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.selectOptions(sortSelect, "A-Z");

    const firstCard = container.querySelector(".grid [class*='group']") as HTMLElement;
    expect(firstCard).not.toBeNull();
    // Alphabetically, "Ancient Wisdom" should come first
    expect(
      within(firstCard as Element).getByText("Ancient Wisdom")
    ).toBeInTheDocument();
  });

  it("sorts by 'Most Popular' (likes desc)", async () => {
    const { container } = render(<SeriesPage />);
    const user = userEvent.setup();

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.selectOptions(sortSelect, "Most Popular");

    const firstCard = container.querySelector(".grid [class*='group']") as HTMLElement;
    expect(
      within(firstCard as Element).getByText("Consciousness Expansion")
    ).toBeInTheDocument(); // likes: 267 (highest)
  });

  it("sorts by 'Highest Rated' (rating desc)", async () => {
    const { container } = render(<SeriesPage />);
    const user = userEvent.setup();

    const sortSelect = screen.getByLabelText(/sort by/i);
    await user.selectOptions(sortSelect, "Highest Rated");

    const firstCard = container.querySelector(".grid [class*='group']") as HTMLElement;
    expect(
      within(firstCard as Element).getByText("Consciousness Expansion")
    ).toBeInTheDocument(); // rating: 4.9 (highest)
  });

  it("passes correct props to EnhancedCarousel instances", () => {
    render(<SeriesPage />);

    // Call 0: "New Releases" ≥ 2023-06-01 → 3 items (Jun, Jul, Aug)
    expect(enhancedCarouselMock.mock.calls[0][0]).toMatchObject({
      title: "New Releases",
      variant: "series",
    });
    expect(enhancedCarouselMock.mock.calls[0][0].movies).toHaveLength(3);

    // Call 1: "Most Popular Series" → 6 items
    expect(enhancedCarouselMock.mock.calls[1][0]).toMatchObject({
      title: "Most Popular Series",
      variant: "series",
    });
    expect(enhancedCarouselMock.mock.calls[1][0].movies).toHaveLength(6);

    // Call 2: "Spirituality Collection" → 3 items
    expect(enhancedCarouselMock.mock.calls[2][0]).toMatchObject({
      title: "Spirituality Collection",
      variant: "series",
    });
    expect(enhancedCarouselMock.mock.calls[2][0].movies).toHaveLength(3);

    // Call 3: "Wellness Journey" → 2 items
    expect(enhancedCarouselMock.mock.calls[3][0]).toMatchObject({
      title: "Wellness Journey",
      variant: "series",
    });
    expect(enhancedCarouselMock.mock.calls[3][0].movies).toHaveLength(2);
  });

  it("shows the image with correct alt text on the first card", () => {
    const { container } = render(<SeriesPage />);
    const firstCard = container.querySelector(".grid [class*='group']")!;
    const img = within(firstCard).getByRole("img", { name: /energy healing mastery/i });
    expect(img).toBeInTheDocument();
  });
});
