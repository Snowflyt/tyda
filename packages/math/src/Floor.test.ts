import { beNever, describe, equal, expect, it } from "typroof";

import type { Floor } from "./Floor";

describe("Floor", () => {
  it("should floor a positive `number`", () => {
    expect<Floor<3>>().to(equal<3>);
    expect<Floor<79>>().to(equal<79>);
    expect<Floor<3.14>>().to(equal<3>);
    expect<Floor<0.718>>().to(equal<0>);
  });

  it("should floor a negative `number`", () => {
    expect<Floor<-3>>().to(equal<-3>);
    expect<Floor<-79>>().to(equal<-79>);
    expect<Floor<-0.14>>().to(equal<-1>);
    expect<Floor<-2.718>>().to(equal<-3>);
  });

  it("should return `0` for `0`", () => {
    expect<Floor<0>>().to(equal<0>);
  });

  it("should handle unions of literals", () => {
    expect<Floor<3.5 | -2.3>>().to(equal<3 | -3>);
    expect<Floor<0 | 4.9 | -1.1>>().to(equal<0 | 4 | -2>);
  });

  it("should return `number` for `number`", () => {
    expect<Floor<number>>().to(equal<number>);
  });

  it("should return `number` for `any`", () => {
    expect<Floor<any>>().to(equal<number>);
  });

  it("should return `never` for `never`", () => {
    expect<Floor<never>>().to(beNever);
  });
});
