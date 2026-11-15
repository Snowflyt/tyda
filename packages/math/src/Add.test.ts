import { beNever, describe, equal, expect, it } from "typroof";

import type { Add } from "./Add";

describe("Add", () => {
  it("should add two numbers", () => {
    expect<Add<42, 8>>().to(equal<50>);
    expect<Add<4356, 832>>().to(equal<5188>);
    expect<Add<4356.791, 832.329>>().to(equal<5189.12>);
    expect<Add<832.329, -4356.791>>().to(equal<-3524.462>);
    expect<Add<-4356.791, -832.329>>().to(equal<-5189.12>);
  });

  it("should handle unions of numbers", () => {
    expect<Add<0 | 42, 1>>().to(equal<1 | 43>);
    expect<Add<-2 | 3.5 | 7, 1 | -1.5>>().to(equal<-1 | -3.5 | 4.5 | 2 | 8 | 5.5>);
  });

  it("should return `number` if either argument is `number`", () => {
    expect<Add<number, number>>().to(equal<number>);
    expect<Add<42, number>>().to(equal<number>);
    expect<Add<number, 42>>().to(equal<number>);
  });

  it("should return `number` if either argument is `any`", () => {
    expect<Add<any, any>>().to(equal<number>);
    expect<Add<42, any>>().to(equal<number>);
    expect<Add<any, 42>>().to(equal<number>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Add<never, 42>>().to(beNever);
    expect<Add<42, never>>().to(beNever);
    expect<Add<never, never>>().to(beNever);
  });
});
