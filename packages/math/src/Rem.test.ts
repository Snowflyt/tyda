import { beNever, describe, equal, expect, it } from "typroof";

import type { Rem } from "./Rem";

describe("Rem", () => {
  it("should divide two numbers and return the remainder", () => {
    expect<Rem<0, 0>>().to(equal<number>);
    expect<Rem<0, 42>>().to(equal<0>);
    expect<Rem<42, 0>>().to(equal<number>);
    expect<Rem<42, 3>>().to(equal<0>);
    expect<Rem<4356, 832>>().to(equal<196>);
    expect<Rem<4356.791, 832.329>>().to(equal<195.146>);
    expect<Rem<832.329, -4356.791>>().to(equal<832.329>);
    expect<Rem<-4356.791, -832.329>>().to(equal<-195.146>);
    expect<Rem<832.329, -56.791>>().to(equal<37.255>);
  });

  it("should handle unions of numbers", () => {
    expect<Rem<0 | 42, 1>>().to(equal<0>);
    expect<Rem<-2 | 3.5 | 7, 1 | -1.5>>().to(equal<0 | -0.5 | 0.5 | 1>);
  });

  it("should return `number` if either argument is `number`", () => {
    expect<Rem<number, number>>().to(equal<number>);
    expect<Rem<42, number>>().to(equal<number>);
    expect<Rem<number, 42>>().to(equal<number>);
  });

  it("should return `number` if either argument is `any`", () => {
    expect<Rem<any, any>>().to(equal<number>);
    expect<Rem<42, any>>().to(equal<number>);
    expect<Rem<any, 42>>().to(equal<number>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Rem<never, 42>>().to(beNever);
    expect<Rem<42, never>>().to(beNever);
    expect<Rem<never, never>>().to(beNever);
  });
});
