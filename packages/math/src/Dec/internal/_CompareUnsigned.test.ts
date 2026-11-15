import { describe, equal, expect, it } from "typroof";

import type { _CompareUnsigned } from "./_CompareUnsigned";
import type { _Parse } from "./_Parse";

describe("_CompareUnsigned", () => {
  it("should compare unsigned decimals with different lengths", () => {
    expect<_CompareUnsigned<_Parse<"10">, _Parse<"1">>>().to(equal<1>);
    expect<_CompareUnsigned<_Parse<"1">, _Parse<"10">>>().to(equal<-1>);
    expect<_CompareUnsigned<_Parse<"345">, _Parse<"1">>>().to(equal<1>);
    expect<_CompareUnsigned<_Parse<"1">, _Parse<"345">>>().to(equal<-1>);
    expect<_CompareUnsigned<_Parse<"456789">, _Parse<"123">>>().to(equal<1>);
    expect<_CompareUnsigned<_Parse<"123">, _Parse<"456789">>>().to(equal<-1>);
    expect<_CompareUnsigned<_Parse<"42.000000">, _Parse<"42">>>().to(equal<0>);
    expect<_CompareUnsigned<_Parse<"123.45">, _Parse<"123.4500">>>().to(equal<0>);
    expect<_CompareUnsigned<_Parse<"123.45">, _Parse<"1230">>>().to(equal<-1>);
    expect<_CompareUnsigned<_Parse<"1230">, _Parse<"123.45">>>().to(equal<1>);
    expect<_CompareUnsigned<_Parse<"123.45">, _Parse<"124">>>().to(equal<-1>);
    expect<_CompareUnsigned<_Parse<"123.45">, _Parse<"123">>>().to(equal<1>);
    expect<_CompareUnsigned<_Parse<"123.45">, _Parse<"122">>>().to(equal<1>);
  });

  it("should compare digits", () => {
    expect<_CompareUnsigned<_Parse<"1">, _Parse<"1">>>().to(equal<0>);
    expect<_CompareUnsigned<_Parse<"3">, _Parse<"6">>>().to(equal<-1>);
    expect<_CompareUnsigned<_Parse<"8">, _Parse<"5">>>().to(equal<1>);
  });

  it("should compare unsigned decimals with the same length", () => {
    expect<_CompareUnsigned<_Parse<"123">, _Parse<"123">>>().to(equal<0>);
    expect<_CompareUnsigned<_Parse<"123">, _Parse<"124">>>().to(equal<-1>);
    expect<_CompareUnsigned<_Parse<"124">, _Parse<"123">>>().to(equal<1>);
    expect<_CompareUnsigned<_Parse<"123">, _Parse<"512">>>().to(equal<-1>);
    expect<_CompareUnsigned<_Parse<"512">, _Parse<"123">>>().to(equal<1>);
  });
});
