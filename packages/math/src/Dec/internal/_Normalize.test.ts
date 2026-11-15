import { describe, equal, expect, it } from "typroof";

import type { _Normalize } from "./_Normalize";
import type { _Parse } from "./_Parse";
import type { _Stringify } from "./_Stringify";

describe("_Normalize", () => {
  it("should do nothing for integers", () => {
    expect<_Stringify<_Normalize<_Parse<"0">>>>().to(equal<"0">);
    expect<_Stringify<_Normalize<_Parse<"-0">>>>().to(equal<"-0">);
    expect<_Stringify<_Normalize<_Parse<"42">>>>().to(equal<"42">);
    expect<_Stringify<_Normalize<_Parse<"4200">>>>().to(equal<"4200">);
    expect<_Stringify<_Normalize<_Parse<"-42">>>>().to(equal<"-42">);
    expect<_Stringify<_Normalize<_Parse<"-42000">>>>().to(equal<"-42000">);
    expect<_Stringify<_Normalize<_Parse<"314159">>>>().to(equal<"314159">);
    expect<_Stringify<_Normalize<_Parse<"-314159">>>>().to(equal<"-314159">);
  });

  it("should normalize variants of zero", () => {
    expect<_Stringify<_Normalize<_Parse<"0.0">>>>().to(equal<"0">);
    expect<_Stringify<_Normalize<_Parse<"0.00">>>>().to(equal<"0">);
    expect<_Stringify<_Normalize<_Parse<"-0.0">>>>().to(equal<"-0">);
    expect<_Stringify<_Normalize<_Parse<"-0.0000">>>>().to(equal<"-0">);
  });

  it("should do nothing for positive numbers", () => {
    expect<_Stringify<_Normalize<_Parse<"3.14">>>>().to(equal<"3.14">);
    expect<_Stringify<_Normalize<_Parse<"2.71828">>>>().to(equal<"2.71828">);
    expect<_Stringify<_Normalize<_Parse<"0.5">>>>().to(equal<"0.5">);
    expect<_Stringify<_Normalize<_Parse<"0.4999">>>>().to(equal<"0.4999">);
    expect<_Stringify<_Normalize<_Parse<"42.0">>>>().to(equal<"42">);
    expect<_Stringify<_Normalize<_Parse<"43.00">>>>().to(equal<"43">);
    expect<_Stringify<_Normalize<_Parse<"42.5">>>>().to(equal<"42.5">);
    expect<_Stringify<_Normalize<_Parse<"42.5001">>>>().to(equal<"42.5001">);
  });

  it("should do nothing for negative numbers", () => {
    expect<_Stringify<_Normalize<_Parse<"-3.14">>>>().to(equal<"-3.14">);
    expect<_Stringify<_Normalize<_Parse<"-2.71828">>>>().to(equal<"-2.71828">);
    expect<_Stringify<_Normalize<_Parse<"-0.5">>>>().to(equal<"-0.5">);
    expect<_Stringify<_Normalize<_Parse<"-0.4999">>>>().to(equal<"-0.4999">);
    expect<_Stringify<_Normalize<_Parse<"-42.0">>>>().to(equal<"-42">);
    expect<_Stringify<_Normalize<_Parse<"-43.00">>>>().to(equal<"-43">);
    expect<_Stringify<_Normalize<_Parse<"-42.5">>>>().to(equal<"-42.5">);
    expect<_Stringify<_Normalize<_Parse<"-42.5001">>>>().to(equal<"-42.5001">);
  });
});
