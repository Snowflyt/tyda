import { beNever, describe, equal, expect, it } from "typroof";

import type { Sub } from "./Sub";

describe("Sub", () => {
  it("should subtract two numbers", () => {
    expect<Sub<42, 8>>().to(equal<34>);
    expect<Sub<4356, 832>>().to(equal<3524>);
    expect<Sub<4356.791, 832.329>>().to(equal<3524.462>);
    expect<Sub<832.329, -4356.791>>().to(equal<5189.12>);
    expect<Sub<-4356.791, -832.329>>().to(equal<-3524.462>);
  });

  it("should handle unions of numbers", () => {
    expect<Sub<0 | 42, 1>>().to(equal<-1 | 41>);
    expect<Sub<-2 | 3.5 | 7, 1 | -1.5>>().to(equal<-3 | -0.5 | 2.5 | 5 | 6 | 8.5>);
  });

  it("should return `number` if either argument is `number`", () => {
    expect<Sub<number, number>>().to(equal<number>);
    expect<Sub<42, number>>().to(equal<number>);
    expect<Sub<number, 42>>().to(equal<number>);
  });

  it("should return `number` if either argument is `any`", () => {
    expect<Sub<any, any>>().to(equal<number>);
    expect<Sub<42, any>>().to(equal<number>);
    expect<Sub<any, 42>>().to(equal<number>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Sub<never, 42>>().to(beNever);
    expect<Sub<42, never>>().to(beNever);
    expect<Sub<never, never>>().to(beNever);
  });
});
