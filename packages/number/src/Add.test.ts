import type { Num } from "@tyda/number";
import { beNever, describe, equal, expect, it } from "typroof";

describe("Num.Add", () => {
  it("should add two numbers", () => {
    expect<Num.Add<42, 8>>().to(equal<50>);
    expect<Num.Add<4356, 832>>().to(equal<5188>);
    expect<Num.Add<4356.791, 832.329>>().to(equal<5189.12>);
    expect<Num.Add<832.329, -4356.791>>().to(equal<-3524.462>);
    expect<Num.Add<-4356.791, -832.329>>().to(equal<-5189.12>);
  });

  it("should handle unions of numbers", () => {
    expect<Num.Add<0 | 42, 1>>().to(equal<1 | 43>);
    expect<Num.Add<-2 | 3.5 | 7, 1 | -1.5>>().to(equal<-1 | -3.5 | 4.5 | 2 | 8 | 5.5>);
  });

  it("should return `number` if either argument is `number`", () => {
    expect<Num.Add<number, number>>().to(equal<number>);
    expect<Num.Add<42, number>>().to(equal<number>);
    expect<Num.Add<number, 42>>().to(equal<number>);
  });

  it("should return `number` if either argument is `any`", () => {
    expect<Num.Add<any, any>>().to(equal<number>);
    expect<Num.Add<42, any>>().to(equal<number>);
    expect<Num.Add<any, 42>>().to(equal<number>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Num.Add<never, 42>>().to(beNever);
    expect<Num.Add<42, never>>().to(beNever);
    expect<Num.Add<never, never>>().to(beNever);
  });
});
