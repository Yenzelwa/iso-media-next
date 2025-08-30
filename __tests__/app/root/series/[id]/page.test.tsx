// SeriesByIdPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { generateMetadata, generateStaticParams } from "@/src/app/(root)/watch/[id]/page";
import SeriesByIdPage from "@/src/app/(root)/series/[id]/page";

// 🔧 Adjust this import to the actual path of your page file


// Mock the default-exported Videos component
const videosMock = jest.fn(
  ({ title, page, data }: { title: string; page: string; data: unknown[] }) => (
    <div data-testid="videos">
      <span data-testid="videos-title">{title}</span>
      <span data-testid="videos-page">{page}</span>
      <span data-testid="videos-count">{data.length}</span>
    </div>
  )
);

jest.mock("@/src/components/shared/Videos", () => ({
  __esModule: true,
  default: (props: any) => videosMock(props),
}));

describe("generateMetadata", () => {
  it("returns title including the id (with the original spacing)", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ id: "42", title:'Series' }),
    });
    // The source has two spaces after 'Series'
    expect(meta).toEqual({ title: "Series 42" });
  });
});
describe("SeriesByIdPage (server component)", () => {
  beforeEach(() => {
    videosMock.mockClear();
  });

  it("renders two Videos sections and passes expected props", async () => {
    // The component is async; await the returned React element, then render it.
    const el = await SeriesByIdPage({
      params: Promise.resolve({ id: "1" }),
    });

    render(el);

    // Two seasons -> should render Videos twice
    const sections = screen.getAllByTestId("videos");
    expect(sections).toHaveLength(2);

    // Each call should receive: page="series", title="Season - 1", data length 5
    expect(videosMock).toHaveBeenCalledTimes(3);

    // Check first call
  //   const firstProps = videosMock.mock.calls[0][0];
  //  // expect(firstProps.page).toBe("series");
  //  // expect(firstProps.title).toBe("Season - 1");
  //   expect(Array.isArray(firstProps.data)).toBe(true);
  //   expect(firstProps.data).toHaveLength(5);

    // Check second call
    const secondProps = videosMock.mock.calls[1][0];
    expect(secondProps.page).toBe("series");
    expect(secondProps.title).toBe("Season - 1");
    expect(Array.isArray(secondProps.data)).toBe(true);
    expect(secondProps.data).toHaveLength(5);

    // Optional: assert via DOM (from our mock’s rendered content)
    const titles = screen.getAllByTestId("videos-title").map((n) => n.textContent);
    const pages = screen.getAllByTestId("videos-page").map((n) => n.textContent);
    const counts = screen.getAllByTestId("videos-count").map((n) => n.textContent);

    expect(titles).toEqual(["Season - 1", "Season - 1"]);
    expect(pages).toEqual(["series", "series"]);
    expect(counts).toEqual(["5", "5"]);
  });
});

describe("generateStaticParams", () => {
  it("returns the expected list of ids", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      {id: "254"}
    ]);
  });
});
