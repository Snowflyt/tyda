import { describe, equal, expect, it } from "typroof";

import type { _RemoveLeadingZeroes } from "./_RemoveLeadingZeroes";

describe("_RemoveLeadingZeroes", () => {
  it("should remove leading zeroes from a string representation of a non-negative number", () => {
    expect<_RemoveLeadingZeroes<"000123">>().to(equal<"123">);
    expect<_RemoveLeadingZeroes<"-000123">>().to(equal<"-123">);
    expect<_RemoveLeadingZeroes<"0000.789">>().to(equal<"0.789">);
    expect<_RemoveLeadingZeroes<"-0000.789">>().to(equal<"-0.789">);
  });

  it("should preserve a single zero in the integral part", () => {
    expect<_RemoveLeadingZeroes<"0">>().to(equal<"0">);
    expect<_RemoveLeadingZeroes<"-0">>().to(equal<"-0">);
    expect<_RemoveLeadingZeroes<"0.123">>().to(equal<"0.123">);
    expect<_RemoveLeadingZeroes<"-0.123">>().to(equal<"-0.123">);
  });
});
