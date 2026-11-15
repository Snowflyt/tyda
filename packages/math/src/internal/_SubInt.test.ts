import { describe, equal, expect, it } from "typroof";

import type { _SubInt } from "./_SubInt";

describe("_SubInt", () => {
  it("should subtract two positive integers", () => {
    expect<_SubInt<"0", "0">>().to(equal<"0">);
    expect<_SubInt<"0", "1">>().to(equal<"-1">);
    expect<_SubInt<"3", "3">>().to(equal<"0">);
    expect<_SubInt<"2", "5">>().to(equal<"-3">);
    expect<_SubInt<"5", "2">>().to(equal<"3">);
  });

  it("should subtract two negative integers", () => {
    expect<_SubInt<"-3", "-3">>().to(equal<"0">);
    expect<_SubInt<"-2", "-5">>().to(equal<"3">);
    expect<_SubInt<"-5", "-2">>().to(equal<"-3">);
  });

  it("should subtract a positive and a negative integer", () => {
    expect<_SubInt<"3", "-3">>().to(equal<"6">);
    expect<_SubInt<"2", "-5">>().to(equal<"7">);
    expect<_SubInt<"5", "-2">>().to(equal<"7">);
  });

  it("should subtract a negative and a positive integer", () => {
    expect<_SubInt<"-3", "3">>().to(equal<"-6">);
    expect<_SubInt<"-2", "5">>().to(equal<"-7">);
    expect<_SubInt<"-5", "2">>().to(equal<"-7">);
  });
});
