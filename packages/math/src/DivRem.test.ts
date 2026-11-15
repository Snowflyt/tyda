import { beNever, describe, equal, expect, it } from "typroof";

import type { DivRem } from "./DivRem";

describe("DivRem", () => {
  it("should divide two numbers and return `readonly [quotient, remainder]`", () => {
    expect<DivRem<0, 0>>().to(equal<readonly [number, number]>);
    expect<DivRem<0, 42>>().to(equal<readonly [0, 0]>);
    expect<DivRem<42, 0>>().to(equal<readonly [number, number]>);
    expect<DivRem<42, 3>>().to(equal<readonly [14, 0]>);
    expect<DivRem<4356, 832>>().to(equal<readonly [5, 196]>);
    expect<DivRem<4356.791, 832.329>>().to(equal<readonly [5, 195.146]>);
    expect<DivRem<832.329, -4356.791>>().to(equal<readonly [0, 832.329]>);
    expect<DivRem<-4356.791, -832.329>>().to(equal<readonly [5, -195.146]>);
    expect<DivRem<832.329, -56.791>>().to(equal<readonly [-14, 37.255]>);
  });

  it("should handle unions of numbers", () => {
    expect<DivRem<0 | 42, 1>>().to(equal<readonly [0, 0] | readonly [42, 0]>);
    expect<DivRem<-2 | 3.5 | 7, 1 | -1.5>>().to(
      equal<
        | readonly [-2, 0]
        | readonly [1, -0.5]
        | readonly [3, 0.5]
        | readonly [-2, 0.5]
        | readonly [7, 0]
        | readonly [-4, 1]
      >,
    );
  });

  it("should return `readonly [number, number]` if either argument is `number`", () => {
    expect<DivRem<number, number>>().to(equal<readonly [number, number]>);
    expect<DivRem<42, number>>().to(equal<readonly [number, number]>);
    expect<DivRem<number, 42>>().to(equal<readonly [number, number]>);
  });

  it("should return `readonly [number, number]` if either argument is `any`", () => {
    expect<DivRem<any, any>>().to(equal<readonly [number, number]>);
    expect<DivRem<42, any>>().to(equal<readonly [number, number]>);
    expect<DivRem<any, 42>>().to(equal<readonly [number, number]>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<DivRem<never, 42>>().to(beNever);
    expect<DivRem<42, never>>().to(beNever);
    expect<DivRem<never, never>>().to(beNever);
  });
});
