import { beNever, describe, equal, expect, it } from "typroof";

import type { Round } from "./Round";

describe("Round", () => {
  it("should round a positive `number`", () => {
    expect<Round<3>>().to(equal<3>);
    expect<Round<3.5>>().to(equal<4>);
    expect<Round<79>>().to(equal<79>);
    expect<Round<3.14>>().to(equal<3>);
    expect<Round<0.718>>().to(equal<1>);
  });

  it("should round a negative `number`", () => {
    expect<Round<-3>>().to(equal<-3>);
    expect<Round<-3.5>>().to(equal<-4>);
    expect<Round<-79>>().to(equal<-79>);
    expect<Round<-0.14>>().to(equal<0>);
    expect<Round<-2.718>>().to(equal<-3>);
  });

  it("should return `0` for `0`", () => {
    expect<Round<0>>().to(equal<0>);
  });

  it("should handle unions of literals", () => {
    expect<Round<3.5 | -2.3>>().to(equal<4 | -2>);
    expect<Round<0 | 4.9 | -1.1>>().to(equal<0 | 5 | -1>);
  });

  it("should return `number` for `number`", () => {
    expect<Round<number>>().to(equal<number>);
  });

  it("should return `number` for `any`", () => {
    expect<Round<any>>().to(equal<number>);
  });

  it("should return `never` for `never`", () => {
    expect<Round<never>>().to(beNever);
  });
});
