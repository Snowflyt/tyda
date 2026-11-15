import { describe, equal, expect, it } from "typroof";

import type { _CompareNat } from "./_CompareNat";

describe("_CompareNat", () => {
  it("should compare natural numbers with different lengths", () => {
    expect<_CompareNat<"10", "1">>().to(equal<1>);
    expect<_CompareNat<"1", "10">>().to(equal<-1>);
    expect<_CompareNat<"345", "1">>().to(equal<1>);
    expect<_CompareNat<"1", "345">>().to(equal<-1>);
    expect<_CompareNat<"456789", "123">>().to(equal<1>);
    expect<_CompareNat<"123", "456789">>().to(equal<-1>);
  });

  it("should compare digits", () => {
    expect<_CompareNat<"1", "1">>().to(equal<0>);
    expect<_CompareNat<"3", "6">>().to(equal<-1>);
    expect<_CompareNat<"8", "5">>().to(equal<1>);
  });

  it("should compare natural numbers with the same length", () => {
    expect<_CompareNat<"123", "123">>().to(equal<0>);
    expect<_CompareNat<"123", "124">>().to(equal<-1>);
    expect<_CompareNat<"124", "123">>().to(equal<1>);
    expect<_CompareNat<"123", "512">>().to(equal<-1>);
    expect<_CompareNat<"512", "123">>().to(equal<1>);
  });
});
