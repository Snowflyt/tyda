import { beNever, describe, equal, expect, it } from "typroof";

import type { Abs } from "./Abs";

describe("Abs", () => {
  it("should do nothing for positive `number`s", () => {
    expect<Abs<3>>().to(equal<3>);
    expect<Abs<5.5>>().to(equal<5.5>);
  });

  it("should negate negative `number`s", () => {
    expect<Abs<-3>>().to(equal<3>);
    expect<Abs<-4.3>>().to(equal<4.3>);
  });

  it("should do nothing for `0`", () => {
    expect<Abs<0>>().to(equal<0>);
  });

  it("should handle unions of literals", () => {
    expect<Abs<0 | -42>>().to(equal<0 | 42>);
    expect<Abs<1 | -2 | 3>>().to(equal<1 | 2 | 3>);
  });

  it("should return `number` for `number`", () => {
    expect<Abs<number>>().to(equal<number>);
  });

  it("should return `number` for `any`", () => {
    expect<Abs<any>>().to(equal<number>);
  });

  it("should return `never` for `never`", () => {
    expect<Abs<never>>().to(beNever);
  });
});
