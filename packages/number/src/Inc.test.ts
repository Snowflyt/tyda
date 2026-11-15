import type { Num } from "@tyda/number";
import { beNever, describe, equal, expect, it } from "typroof";

describe("Num.Inc", () => {
  it("should increase a positive `number`", () => {
    expect<Num.Inc<3>>().to(equal<4>);
    expect<Num.Inc<89>>().to(equal<90>);
    expect<Num.Inc<5.5>>().to(equal<6.5>);
  });

  it("should increase a negative `number`", () => {
    expect<Num.Inc<-3>>().to(equal<-2>);
    expect<Num.Inc<-80>>().to(equal<-79>);
    expect<Num.Inc<-4.3>>().to(equal<-3.3>);
  });

  it("should return `1` for `0`", () => {
    expect<Num.Inc<0>>().to(equal<1>);
  });

  it("should handle unions of literals", () => {
    expect<Num.Inc<0 | 42>>().to(equal<1 | 43>);
    expect<Num.Inc<-2 | 3.5 | 7>>().to(equal<-1 | 4.5 | 8>);
  });

  it("should return `number` for `number`", () => {
    expect<Num.Inc<number>>().to(equal<number>);
  });

  it("should return `number` for `any`", () => {
    expect<Num.Inc<any>>().to(equal<number>);
  });

  it("should return `never` for `never`", () => {
    expect<Num.Inc<never>>().to(beNever);
  });
});
