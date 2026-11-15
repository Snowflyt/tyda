import { describe, equal, expect, it } from "typroof";

import type { _StrToNum } from "./_StrToNum";

describe("_StrToNum", () => {
  it("should convert string literals to number literals", () => {
    expect<_StrToNum<"0">>().to(equal<0>);
    expect<_StrToNum<"1">>().to(equal<1>);
    expect<_StrToNum<"42">>().to(equal<42>);
    expect<_StrToNum<"314159">>().to(equal<314159>);
  });

  it("should handle floating point numbers", () => {
    expect<_StrToNum<"3.14">>().to(equal<3.14>);
    expect<_StrToNum<"2.71828">>().to(equal<2.71828>);
  });

  it("should handle negative numbers", () => {
    expect<_StrToNum<"-1">>().to(equal<-1>);
    expect<_StrToNum<"-42">>().to(equal<-42>);
    expect<_StrToNum<"-3.14">>().to(equal<-3.14>);
  });

  it('should handle `"-0"`', () => {
    expect<_StrToNum<"-0">>().to(equal<0>);
  });

  it("should handle various representations of zero", () => {
    expect<_StrToNum<"00">>().to(equal<0>);
    expect<_StrToNum<"000">>().to(equal<0>);
    expect<_StrToNum<"0000">>().to(equal<0>);
    expect<_StrToNum<"0.">>().to(equal<0>);
    expect<_StrToNum<"00.">>().to(equal<0>);
    expect<_StrToNum<"000.">>().to(equal<0>);
    expect<_StrToNum<"0.0">>().to(equal<0>);
    expect<_StrToNum<"0.00">>().to(equal<0>);
    expect<_StrToNum<"0.000">>().to(equal<0>);
    expect<_StrToNum<".0">>().to(equal<0>);
    expect<_StrToNum<".00">>().to(equal<0>);
    expect<_StrToNum<".000">>().to(equal<0>);
  });

  it("should handle floating point numbers with trailing zeros", () => {
    expect<_StrToNum<"42.0">>().to(equal<42>);
    expect<_StrToNum<"3.1400">>().to(equal<3.14>);
  });

  it("should truncate decimal parts that are not representable as `number`", () => {
    expect<_StrToNum<"0.333333333333333333333333333333">>().to(equal<0.3333333333333333>);
    expect<_StrToNum<"0.142857142857142857142857142857">>().to(equal<0.14285714285714285>);
    expect<_StrToNum<"14285714.2857142857142857142857">>().to(equal<14285714.285714285>);
  });

  it('should handle `"NaN"`, `"Infinity"`, and `"-Infinity"`', () => {
    expect<_StrToNum<"NaN">>().to(equal<number>);
    expect<_StrToNum<"Infinity">>().to(equal<number>);
    expect<_StrToNum<"-Infinity">>().to(equal<number>);
  });
});
