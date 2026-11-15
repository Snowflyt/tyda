import { describe, equal, expect, it } from "typroof";

import type { _PadStart } from "./_PadStart";

describe("_PadStart", () => {
  it("should pad the start of a string to a given length with a given character", () => {
    expect<_PadStart<"123", "0", "xxxxx">>().to(equal<"00123">);
    expect<_PadStart<"abc", "x", "xxxxxx">>().to(equal<"xxxabc">);
    expect<_PadStart<"", "*", "xxx">>().to(equal<"***">);
    expect<_PadStart<"hello", " ", "xxxxxxxxxx">>().to(equal<"     hello">);
  });

  it("should not pad if the string is already at or above the target length", () => {
    expect<_PadStart<"12345", "0", "xxxxx">>().to(equal<"12345">);
    expect<_PadStart<"abcdef", "x", "xxxx">>().to(equal<"abcdef">);
    expect<_PadStart<"longstring", "*", "xxxxx">>().to(equal<"longstring">);
  });
});
