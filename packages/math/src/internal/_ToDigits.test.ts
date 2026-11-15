import { describe, equal, expect, it } from "typroof";

import type { _FastToDigits, _FastToDigitsRev, _ToDigits, _ToDigitsRev } from "./_ToDigits";

describe("_ToDigits", () => {
  it("should convert a string representation of a number to a tuple of its digits", () => {
    expect<_ToDigits<"12345", "">>().to(equal<[1, 2, 3, 4, 5]>);
    expect<_ToDigits<"512", "12">>().to(equal<[5, 1, 2]>);
    expect<_ToDigits<"0", "">>().to(equal<[0]>);
    expect<_ToDigits<"456", "">>().to(equal<[4, 5, 6]>);
  });

  it("should pad with zeroes if the string representation is shorter than LengthAtLeast", () => {
    expect<_ToDigits<"512", "12345">>().to(equal<[0, 0, 5, 1, 2]>);
    expect<_ToDigits<"45", "0000">>().to(equal<[0, 0, 4, 5]>);
    expect<_ToDigits<"7", "00">>().to(equal<[0, 7]>);
    expect<_ToDigits<"89", "000">>().to(equal<[0, 8, 9]>);
  });
});

describe("_ToDigitsRev", () => {
  it("should convert a string representation of a number to a tuple of its digits in reverse order", () => {
    expect<_ToDigitsRev<"12345", "">>().to(equal<[5, 4, 3, 2, 1]>);
    expect<_ToDigitsRev<"512", "12">>().to(equal<[2, 1, 5]>);
    expect<_ToDigitsRev<"0", "">>().to(equal<[0]>);
    expect<_ToDigitsRev<"456", "">>().to(equal<[6, 5, 4]>);
  });

  it("should pad with zeroes if the string representation is shorter than LengthAtLeast", () => {
    expect<_ToDigitsRev<"512", "12345">>().to(equal<[2, 1, 5, 0, 0]>);
    expect<_ToDigitsRev<"45", "0000">>().to(equal<[5, 4, 0, 0]>);
    expect<_ToDigitsRev<"7", "00">>().to(equal<[7, 0]>);
    expect<_ToDigitsRev<"89", "000">>().to(equal<[9, 8, 0]>);
  });
});

describe("_FastToDigits", () => {
  it("should convert a string representation of a number to a tuple of its digits", () => {
    expect<_FastToDigits<"12345">>().to(equal<[1, 2, 3, 4, 5]>);
    expect<_FastToDigits<"512">>().to(equal<[5, 1, 2]>);
    expect<_FastToDigits<"0">>().to(equal<[0]>);
    expect<_FastToDigits<"456">>().to(equal<[4, 5, 6]>);
  });
});

describe("_FastToDigitsRev", () => {
  it("should convert a string representation of a number to a tuple of its digits in reverse order", () => {
    expect<_FastToDigitsRev<"12345">>().to(equal<[5, 4, 3, 2, 1]>);
    expect<_FastToDigitsRev<"512">>().to(equal<[2, 1, 5]>);
    expect<_FastToDigitsRev<"0">>().to(equal<[0]>);
    expect<_FastToDigitsRev<"456">>().to(equal<[6, 5, 4]>);
  });
});
