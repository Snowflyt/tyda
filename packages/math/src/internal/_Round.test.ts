import { describe, equal, expect, it } from "typroof";

import type { _Round } from "./_Round";

describe("_Round", () => {
  it("should do nothing for integers", () => {
    expect<_Round<"0">>().to(equal<"0">);
    expect<_Round<"-0">>().to(equal<"-0">);
    expect<_Round<"42">>().to(equal<"42">);
    expect<_Round<"-42">>().to(equal<"-42">);
    expect<_Round<"314159">>().to(equal<"314159">);
    expect<_Round<"-314159">>().to(equal<"-314159">);
  });

  it("should round positive numbers correctly", () => {
    expect<_Round<"3.14">>().to(equal<"3">);
    expect<_Round<"2.71828">>().to(equal<"3">);
    expect<_Round<"0.5">>().to(equal<"1">);
    expect<_Round<"0.4999">>().to(equal<"0">);
    expect<_Round<"42.0">>().to(equal<"42">);
    expect<_Round<"42.5">>().to(equal<"43">);
    expect<_Round<"42.5001">>().to(equal<"43">);
  });

  it("should round negative numbers correctly", () => {
    expect<_Round<"-3.14">>().to(equal<"-3">);
    expect<_Round<"-2.71828">>().to(equal<"-3">);
    expect<_Round<"-0.5">>().to(equal<"-1">);
    expect<_Round<"-0.4999">>().to(equal<"-0">);
    expect<_Round<"-42.0">>().to(equal<"-42">);
    expect<_Round<"-42.5">>().to(equal<"-43">);
    expect<_Round<"-42.5001">>().to(equal<"-43">);
  });
});
