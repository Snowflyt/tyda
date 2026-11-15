import { describe, equal, expect, it } from "typroof";

import type { _Mul10Pow } from "./_Mul10Pow";

describe("_Mul10Pow", () => {
  it("should multiply an integer by 10 raised to the power of `Pow`", () => {
    expect<_Mul10Pow<"0", "">>().to(equal<"0">);
    expect<_Mul10Pow<"0", "x">>().to(equal<"0">);
    expect<_Mul10Pow<"0", "xx">>().to(equal<"0">);
    expect<_Mul10Pow<"0", "xxx">>().to(equal<"0">);
    expect<_Mul10Pow<"0.1", "">>().to(equal<"0.1">);
    expect<_Mul10Pow<"0.1", "x">>().to(equal<"1">);
    expect<_Mul10Pow<"0.1", "xx">>().to(equal<"10">);
    expect<_Mul10Pow<"0.1", "xxx">>().to(equal<"100">);
    expect<_Mul10Pow<"0.01", "">>().to(equal<"0.01">);
    expect<_Mul10Pow<"0.01", "x">>().to(equal<"0.1">);
    expect<_Mul10Pow<"0.01", "xx">>().to(equal<"1">);
    expect<_Mul10Pow<"0.123", "">>().to(equal<"0.123">);
    expect<_Mul10Pow<"0.123", "x">>().to(equal<"1.23">);
    expect<_Mul10Pow<"0.123", "xx">>().to(equal<"12.3">);
    expect<_Mul10Pow<"0.123", "xxx">>().to(equal<"123">);
    expect<_Mul10Pow<"7", "">>().to(equal<"7">);
    expect<_Mul10Pow<"7", "x">>().to(equal<"70">);
    expect<_Mul10Pow<"7", "xx">>().to(equal<"700">);
    expect<_Mul10Pow<"7", "xxx">>().to(equal<"7000">);
    expect<_Mul10Pow<"42", "">>().to(equal<"42">);
    expect<_Mul10Pow<"42", "x">>().to(equal<"420">);
    expect<_Mul10Pow<"42", "xx">>().to(equal<"4200">);
    expect<_Mul10Pow<"42", "xxx">>().to(equal<"42000">);
    expect<_Mul10Pow<"34.56", "">>().to(equal<"34.56">);
    expect<_Mul10Pow<"34.56", "x">>().to(equal<"345.6">);
    expect<_Mul10Pow<"34.56", "xx">>().to(equal<"3456">);
    expect<_Mul10Pow<"34.56", "xxx">>().to(equal<"34560">);
    expect<_Mul10Pow<"34.56", "xxxx">>().to(equal<"345600">);
    expect<_Mul10Pow<"34.56", "xxxxx">>().to(equal<"3456000">);
    expect<_Mul10Pow<"-78.9", "">>().to(equal<"-78.9">);
    expect<_Mul10Pow<"-78.9", "x">>().to(equal<"-789">);
    expect<_Mul10Pow<"-78.9", "xx">>().to(equal<"-7890">);
    expect<_Mul10Pow<"-78.9", "xxx">>().to(equal<"-78900">);
    expect<_Mul10Pow<"-78.9", "xxxx">>().to(equal<"-789000">);
    expect<_Mul10Pow<"-78.9", "xxxxx">>().to(equal<"-7890000">);
    expect<_Mul10Pow<"123.456", "">>().to(equal<"123.456">);
    expect<_Mul10Pow<"123.456", "x">>().to(equal<"1234.56">);
    expect<_Mul10Pow<"123.456", "xx">>().to(equal<"12345.6">);
    expect<_Mul10Pow<"123.456", "xxx">>().to(equal<"123456">);
    expect<_Mul10Pow<"123.456", "xxxx">>().to(equal<"1234560">);
    expect<_Mul10Pow<"123.456", "xxxxx">>().to(equal<"12345600">);
  });
});
