export type FeatureFlags = {
  browseNavRouting: boolean;
};

const parseBool = (value: string | undefined, fallback = false): boolean => {
  if (value === undefined) return fallback;
  const v = value.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes" || v === "on";
};

export const flags: FeatureFlags = {
  // Controls routing to series vs watch based on content type
  browseNavRouting: parseBool(process.env.NEXT_PUBLIC_FEATURE_BROWSE_NAV_ROUTING, true),
};

