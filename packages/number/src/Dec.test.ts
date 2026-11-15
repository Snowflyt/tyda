import type { Num } from "@tyda/number";
import { beNever, describe, equal, expect, it } from "typroof";

describe("Num.Dec", () => {
  it("should decrease a positive `number`", () => {
    expect<Num.Dec<3>>().to(equal<2>);
    expect<Num.Dec<90>>().to(equal<89>);
    expect<Num.Dec<5.5>>().to(equal<4.5>);
    expect<Num.Dec<0.5>>().to(equal<-0.5>);
  });

  it("should decrease a negative `number`", () => {
    expect<Num.Dec<-3>>().to(equal<-4>);
    expect<Num.Dec<-79>>().to(equal<-80>);
    expect<Num.Dec<-4.3>>().to(equal<-5.3>);
  });

  it("should return `-1` for `0`", () => {
    expect<Num.Dec<0>>().to(equal<-1>);
  });

  it("should handle unions of literals", () => {
    expect<Num.Dec<0 | 42>>().to(equal<-1 | 41>);
    expect<Num.Dec<-2 | 3.5 | 7>>().to(equal<-3 | 2.5 | 6>);
  });

  it("should return `number` for `number`", () => {
    expect<Num.Dec<number>>().to(equal<number>);
  });

  it("should return `number` for `any`", () => {
    expect<Num.Dec<any>>().to(equal<number>);
  });

  it("should return `never` for `never`", () => {
    expect<Num.Dec<never>>().to(beNever);
  });
});
