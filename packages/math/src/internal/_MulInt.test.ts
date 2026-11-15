import { describe, equal, expect, it } from "typroof";

import type { _MulInt } from "./_MulInt";

describe("_MulInt", () => {
  it("should multiply two positive integers", () => {
    expect<_MulInt<"0", "0">>().to(equal<"0">);
    expect<_MulInt<"3", "3">>().to(equal<"9">);
    expect<_MulInt<"2", "5">>().to(equal<"10">);
    expect<_MulInt<"5", "2">>().to(equal<"10">);
  });

  it("should multiply two negative integers", () => {
    expect<_MulInt<"-3", "-3">>().to(equal<"9">);
    expect<_MulInt<"-2", "-5">>().to(equal<"10">);
    expect<_MulInt<"-5", "-2">>().to(equal<"10">);
  });

  it("should multiply a positive and a negative integer", () => {
    expect<_MulInt<"0", "-1">>().to(equal<"0">);
    expect<_MulInt<"3", "-3">>().to(equal<"-9">);
    expect<_MulInt<"2", "-5">>().to(equal<"-10">);
    expect<_MulInt<"5", "-2">>().to(equal<"-10">);
  });

  it("should multiply a negative and a positive integer", () => {
    expect<_MulInt<"-3", "3">>().to(equal<"-9">);
    expect<_MulInt<"-2", "5">>().to(equal<"-10">);
    expect<_MulInt<"-5", "2">>().to(equal<"-10">);
  });
});
