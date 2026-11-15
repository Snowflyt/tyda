import { describe, equal, expect, it } from "typroof";

import type { _PadEnd } from "./_PadEnd";

describe("_PadEnd", () => {
  it("should pad the end of a string to a given length with a given pad string", () => {
    expect<_PadEnd<"123", "0", "xxxxx">>().to(equal<"12300">);
    expect<_PadEnd<"abc", "x", "xxxxxx">>().to(equal<"abcxxx">);
    expect<_PadEnd<"", "*", "xxx">>().to(equal<"***">);
    expect<_PadEnd<"hello", " ", "xxxxxxxxxx">>().to(equal<"hello     ">);
  });

  it("should not pad if the string is already at or above the target length", () => {
    expect<_PadEnd<"12345", "0", "xxxxx">>().to(equal<"12345">);
    expect<_PadEnd<"abcdef", "x", "xxxx">>().to(equal<"abcdef">);
    expect<_PadEnd<"longstring", "*", "xxxxx">>().to(equal<"longstring">);
  });
});
