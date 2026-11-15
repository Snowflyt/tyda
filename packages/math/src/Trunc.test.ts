import { beNever, describe, equal, expect, it } from "typroof";

import type { Trunc } from "./Trunc";

describe("Trunc", () => {
  it("should truncate a positive `number`", () => {
    expect<Trunc<3>>().to(equal<3>);
    expect<Trunc<79>>().to(equal<79>);
    expect<Trunc<3.14>>().to(equal<3>);
    expect<Trunc<0.718>>().to(equal<0>);
  });

  it("should truncate a negative `number`", () => {
    expect<Trunc<-3>>().to(equal<-3>);
    expect<Trunc<-79>>().to(equal<-79>);
    expect<Trunc<-0.14>>().to(equal<0>);
    expect<Trunc<-2.718>>().to(equal<-2>);
  });

  it("should return `0` for `0`", () => {
    expect<Trunc<0>>().to(equal<0>);
  });

  it("should handle unions of literals", () => {
    expect<Trunc<3.5 | -2.3>>().to(equal<3 | -2>);
    expect<Trunc<0 | 4.9 | -1.1>>().to(equal<0 | 4 | -1>);
  });

  it("should return `number` for `number`", () => {
    expect<Trunc<number>>().to(equal<number>);
  });

  it("should return `number` for `any`", () => {
    expect<Trunc<any>>().to(equal<number>);
  });

  it("should return `never` for `never`", () => {
    expect<Trunc<never>>().to(beNever);
  });
});
