// Very lightweight international phone formatting helpers
// Supported heuristics: US (+1) and South Africa (+27). Fallback = +<digits>

const onlyDigits = (v: string) => v.replace(/\D/g, "");

export const toE164 = (value: string): string => {
  const raw = value.trim();
  const digits = onlyDigits(raw);
  if (!digits) return "";

  // Already includes +27 or +1 prefix
  if (raw.startsWith("+27")) return "+" + digits;
  if (raw.startsWith("+1")) return "+" + digits;

  // South Africa: local numbers commonly start with 0 and are 10 digits
  if (digits.length === 10 && digits.startsWith("0")) {
    const national = digits.slice(1); // drop leading 0
    return "+27" + national;
  }

  // South Africa already provided without + (e.g., 27xxxxxxxxx)
  if (digits.length === 11 && digits.startsWith("27")) {
    return "+" + digits;
  }

  // US default for 10-digit numbers
  if (digits.length === 10) {
    return "+1" + digits;
  }

  // If it looks like a full international number already (11-15 digits), prefix with '+'
  if (digits.length >= 11 && digits.length <= 15) {
    return "+" + digits;
  }

  // Fallback: return whatever digits prefixed with +
  return "+" + digits;
};

export const formatPhoneNumber = (value: string): string => {
  const e164 = toE164(value);
  if (!e164) return "";

  // US formatting: +1 (AAA) BBB-CCCC
  if (e164.startsWith("+1") && e164.length >= 12) {
    const digits = e164.slice(2); // 10 digits
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c = digits.slice(6, 10);
    return `+1 (${a}) ${b}-${c}`;
  }

  // South Africa formatting: +27 AA BBB CCCC (2-3-4 for 9-digit national)
  if (e164.startsWith("+27") && e164.length >= 12) {
    const digits = e164.slice(3); // 9 digits
    const a = digits.slice(0, 2);
    const b = digits.slice(2, 5);
    const c = digits.slice(5, 9);
    return `+27 ${a} ${b} ${c}`;
  }

  // Generic: group in 3s after country code
  const match = e164.match(/^\+(\d{1,3})(\d+)$/);
  if (match) {
    const cc = match[1];
    const rest = match[2].replace(/(.{3})/g, "$1 ").trim();
    return `+${cc} ${rest}`.trim();
  }
  return e164;
};
