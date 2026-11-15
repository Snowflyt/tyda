import type { Num } from "@tyda/number";
import { beNever, describe, equal, expect, it } from "typroof";

describe("Num.Sub", () => {
  it("should subtract two numbers", () => {
    expect<Num.Sub<42, 8>>().to(equal<34>);
    expect<Num.Sub<4356, 832>>().to(equal<3524>);
    expect<Num.Sub<4356.791, 832.329>>().to(equal<3524.462>);
    expect<Num.Sub<832.329, -4356.791>>().to(equal<5189.12>);
    expect<Num.Sub<-4356.791, -832.329>>().to(equal<-3524.462>);
  });

  it("should handle unions of numbers", () => {
    expect<Num.Sub<0 | 42, 1>>().to(equal<-1 | 41>);
    expect<Num.Sub<-2 | 3.5 | 7, 1 | -1.5>>().to(equal<-3 | -0.5 | 2.5 | 5 | 6 | 8.5>);
  });

  it("should return `number` if either argument is `number`", () => {
    expect<Num.Sub<number, number>>().to(equal<number>);
    expect<Num.Sub<42, number>>().to(equal<number>);
    expect<Num.Sub<number, 42>>().to(equal<number>);
  });

  it("should return `number` if either argument is `any`", () => {
    expect<Num.Sub<any, any>>().to(equal<number>);
    expect<Num.Sub<42, any>>().to(equal<number>);
    expect<Num.Sub<any, 42>>().to(equal<number>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Num.Sub<never, 42>>().to(beNever);
    expect<Num.Sub<42, never>>().to(beNever);
    expect<Num.Sub<never, never>>().to(beNever);
  });
});
