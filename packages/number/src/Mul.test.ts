import type { Num } from "@tyda/number";
import { beNever, describe, equal, expect, it } from "typroof";

describe("Num.Mul", () => {
  it("should multiply two numbers", () => {
    expect<Num.Mul<0, 0>>().to(equal<0>);
    expect<Num.Mul<0, 42>>().to(equal<0>);
    expect<Num.Mul<42, 0>>().to(equal<0>);
    expect<Num.Mul<42, 3>>().to(equal<126>);
    expect<Num.Mul<4356, 832>>().to(equal<3624192>);
    expect<Num.Mul<4356.791, 832.329>>().to(equal<3626283.496239>);
    expect<Num.Mul<832.329, -4356.791>>().to(equal<-3626283.496239>);
    expect<Num.Mul<-4356.791, -832.329>>().to(equal<3626283.496239>);
  });

  it("should handle unions of numbers", () => {
    expect<Num.Mul<0 | 42, 1>>().to(equal<0 | 42>);
    expect<Num.Mul<-2 | 3.5 | 7, 1 | -1.5>>().to(equal<-2 | 3 | 3.5 | -5.25 | 7 | -10.5>);
  });

  it("should return `number` if either argument is `number`", () => {
    expect<Num.Mul<number, number>>().to(equal<number>);
    expect<Num.Mul<42, number>>().to(equal<number>);
    expect<Num.Mul<number, 42>>().to(equal<number>);
  });

  it("should return `number` if either argument is `any`", () => {
    expect<Num.Mul<any, any>>().to(equal<number>);
    expect<Num.Mul<42, any>>().to(equal<number>);
    expect<Num.Mul<any, 42>>().to(equal<number>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Num.Mul<never, 42>>().to(beNever);
    expect<Num.Mul<42, never>>().to(beNever);
    expect<Num.Mul<never, never>>().to(beNever);
  });
});
