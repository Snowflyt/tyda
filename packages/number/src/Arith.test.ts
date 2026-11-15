import type { Num } from "@tyda/number";
import type { Call1, Call2, Pipe } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

describe("Num arithmetic", () => {
  it("should be exact on decimals", () => {
    expect<Num.Add<0.1, 0.2>>().to(equal<0.3>);
    expect<Num.Sub<0.3, 0.1>>().to(equal<0.2>);
    expect<Num.Mul<0.001, 0.001>>().to(equal<0.000001>);
    expect<Num.Mul<1.5, 1.5>>().to(equal<2.25>);
  });

  it("should carry and borrow across the decimal point", () => {
    expect<Num.Add<999.99, 0.01>>().to(equal<1000>);
    expect<Num.Inc<0.999>>().to(equal<1.999>);
    expect<Num.Dec<0.25>>().to(equal<-0.75>);
    expect<Num.Sub<-0.001, 0.009>>().to(equal<-0.01>);
    expect<Num.Sub<1000, 0.001>>().to(equal<999.999>);
    expect<Num.Mul<99999, 99999>>().to(equal<9999800001>);
  });

  it("should give 0 (not -0) for zero results", () => {
    expect<Num.Add<0.5, -0.5>>().to(equal<0>);
    expect<Num.Sub<1, 1>>().to(equal<0>);
    expect<Num.Mul<-3, 0>>().to(equal<0>);
    expect<Num.Div<0, -3>>().to(equal<0>);
  });

  it("should divide to the last representable digit", () => {
    expect<Num.Div<1, 3>>().to(equal<0.3333333333333333>);
    expect<Num.Div<2, 3>>().to(equal<0.6666666666666666>);
    expect<Num.Div<-7, 2>>().to(equal<-3.5>);
    expect<Num.Div<1, 1024>>().to(equal<0.0009765625>);
    expect<Num.Div<0.1, 0.02>>().to(equal<5>);
    expect<Num.Div<1, 0>>().to(equal<number>);
    expect<Num.Div<-1, 0>>().to(equal<number>);
  });

  it("should give `number` for exponent-notation literals", () => {
    expect<Num.Add<1e21, 1>>().to(equal<number>);
    expect<Num.Mul<2, 1e-7>>().to(equal<number>);
  });

  it("should work as type-level functions", () => {
    expect<Pipe<3, Num.Inc$>>().to(equal<4>);
    expect<Call1<Num.Dec$, 3>>().to(equal<2>);
    expect<Pipe<4356, Num.Add$<832>>>().to(equal<5188>);
    expect<Pipe<4356, Num.Sub$<832>>>().to(equal<3524>);
    expect<Call2<Num.Mul$$, 42, 3>>().to(equal<126>);
    expect<Call2<Num.Div$$, 42, 3>>().to(equal<14>);
  });
});
