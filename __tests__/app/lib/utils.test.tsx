import { cn } from "@/src/app/lib/utils";


describe("cn utility", () => {
  it("should merge multiple class strings", () => {
    expect(cn("px-2", "py-4", "text-lg")).toBe("px-2 py-4 text-lg");
  });

  it("should handle conditional classes via clsx", () => {
    const condition = true;
    expect(cn("base", condition && "active")).toBe("base active");
    expect(cn("base", !condition && "active")).toBe("base");
  });

  it("should override conflicting Tailwind classes with twMerge", () => {
    expect(cn("p-2", "p-4")).toBe("p-4"); // twMerge keeps the last one
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("should handle arrays and objects correctly", () => {
    expect(
      cn("base", ["px-2", "py-2"], { hidden: false, block: true })
    ).toBe("base px-2 py-2 block");
  });

  it("should remove falsy values", () => {
    // eslint-disable-next-line no-constant-binary-expression
    expect(cn("base", null, undefined, false, "", 0 && "zero")).toBe("base");
  });
});
