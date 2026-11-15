import { beNever, describe, equal, expect, it } from "typroof";

import type { Div } from "./Div";

describe("Div", () => {
  it("should divide two numbers", () => {
    expect<Div<0, 0>>().to(equal<number>);
    expect<Div<0, 42>>().to(equal<0>);
    expect<Div<42, 0>>().to(equal<number>);
    expect<Div<42, 3>>().to(equal<14>);
    expect<Div<4356, 832>>().to(equal<5.235576923076923>);
    expect<Div<4356.791, 832.329>>().to(equal<5.234457768502599>);
    expect<Div<832.329, -4356.791>>().to(equal<-0.1910417552735488>);
    expect<Div<-4356.791, -832.329>>().to(equal<5.234457768502599>);
  });

  it("should handle unions of numbers", () => {
    expect<Div<0 | 42, 1>>().to(equal<0 | 42>);
    expect<Div<-2 | 3.5 | 7, 1 | -1.5>>().to(
      equal<-2 | 1.3333333333333333 | 3.5 | -2.333333333333333 | 7 | -4.666666666666666>,
    );
  });

  it("should return `number` if either argument is `number`", () => {
    expect<Div<number, number>>().to(equal<number>);
    expect<Div<42, number>>().to(equal<number>);
    expect<Div<number, 42>>().to(equal<number>);
  });

  it("should return `number` if either argument is `any`", () => {
    expect<Div<any, any>>().to(equal<number>);
    expect<Div<42, any>>().to(equal<number>);
    expect<Div<any, 42>>().to(equal<number>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Div<never, 42>>().to(beNever);
    expect<Div<42, never>>().to(beNever);
    expect<Div<never, never>>().to(beNever);
  });
});
