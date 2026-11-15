import { describe, equal, expect, it } from "typroof";

import type { _AddInt } from "./_AddInt";

describe("_AddInt", () => {
  it("should add two positive integers", () => {
    expect<_AddInt<"0", "0">>().to(equal<"0">);
    expect<_AddInt<"3", "3">>().to(equal<"6">);
    expect<_AddInt<"2", "5">>().to(equal<"7">);
    expect<_AddInt<"5", "2">>().to(equal<"7">);
  });

  it("should add two negative integers", () => {
    expect<_AddInt<"-3", "-3">>().to(equal<"-6">);
    expect<_AddInt<"-2", "-5">>().to(equal<"-7">);
    expect<_AddInt<"-5", "-2">>().to(equal<"-7">);
  });

  it("should add a positive and a negative integer", () => {
    expect<_AddInt<"0", "-1">>().to(equal<"-1">);
    expect<_AddInt<"3", "-3">>().to(equal<"0">);
    expect<_AddInt<"2", "-5">>().to(equal<"-3">);
    expect<_AddInt<"5", "-2">>().to(equal<"3">);
  });

  it("should add a negative and a positive integer", () => {
    expect<_AddInt<"-3", "3">>().to(equal<"0">);
    expect<_AddInt<"-2", "5">>().to(equal<"3">);
    expect<_AddInt<"-5", "2">>().to(equal<"-3">);
  });
});
