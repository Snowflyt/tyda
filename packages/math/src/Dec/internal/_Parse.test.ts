import { describe, equal, expect, it } from "typroof";

import type { _Parse } from "./_Parse";
import type { _Stringify } from "./_Stringify";

describe("_Parse", () => {
  it("should parse a decimal string into its components", () => {
    expect<_Stringify<_Parse<"42">>>().to(equal<"42">);
    expect<_Stringify<_Parse<"100">>>().to(equal<"100">);
    expect<_Stringify<_Parse<"123.45">>>().to(equal<"123.45">);
    expect<_Stringify<_Parse<"-123.45">>>().to(equal<"-123.45">);
    expect<_Stringify<_Parse<"1.23">>>().to(equal<"1.23">);
    expect<_Stringify<_Parse<"-1.23">>>().to(equal<"-1.23">);
    expect<_Stringify<_Parse<"0.123">>>().to(equal<"0.123">);
    expect<_Stringify<_Parse<"-0.123">>>().to(equal<"-0.123">);
    expect<_Stringify<_Parse<"0.0123">>>().to(equal<"0.0123">);
    expect<_Stringify<_Parse<"-0.0123">>>().to(equal<"-0.0123">);
    expect<_Stringify<_Parse<"0.00123">>>().to(equal<"0.00123">);
    expect<_Stringify<_Parse<"-0.00123">>>().to(equal<"-0.00123">);
  });

  it("should distinguish `0` and `-0`", () => {
    expect<_Stringify<_Parse<"0">>>().to(equal<"0">);
    expect<_Stringify<_Parse<"-0">>>().to(equal<"-0">);
  });
});
