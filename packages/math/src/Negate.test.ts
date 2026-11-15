import { beNever, describe, equal, expect, it } from "typroof";

import type { Negate } from "./Negate";

describe("Negate", () => {
  it("should negate a positive `number`", () => {
    expect<Negate<3>>().to(equal<-3>);
    expect<Negate<5.5>>().to(equal<-5.5>);
  });

  it("should negate a negative `number`", () => {
    expect<Negate<-3>>().to(equal<3>);
    expect<Negate<-5.5>>().to(equal<5.5>);
  });

  it("should do nothing for `0`", () => {
    expect<Negate<0>>().to(equal<0>);
  });

  it("should handle unions of literals", () => {
    expect<Negate<0 | 42>>().to(equal<0 | -42>);
    expect<Negate<1 | -2 | 3>>().to(equal<-1 | 2 | -3>);
  });

  it("should return `number` for `number`", () => {
    expect<Negate<number>>().to(equal<number>);
  });

  it("should return `number` for `any`", () => {
    expect<Negate<any>>().to(equal<number>);
  });

  it("should return `never` for `never`", () => {
    expect<Negate<never>>().to(beNever);
  });
});
