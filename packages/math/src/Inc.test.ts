import { beNever, describe, equal, expect, it } from "typroof";

import type { Inc } from "./Inc";

describe("Inc", () => {
  it("should increase a positive `number`", () => {
    expect<Inc<3>>().to(equal<4>);
    expect<Inc<89>>().to(equal<90>);
    expect<Inc<5.5>>().to(equal<6.5>);
  });

  it("should increase a negative `number`", () => {
    expect<Inc<-3>>().to(equal<-2>);
    expect<Inc<-80>>().to(equal<-79>);
    expect<Inc<-4.3>>().to(equal<-3.3>);
  });

  it("should return `1` for `0`", () => {
    expect<Inc<0>>().to(equal<1>);
  });

  it("should handle unions of literals", () => {
    expect<Inc<0 | 42>>().to(equal<1 | 43>);
    expect<Inc<-2 | 3.5 | 7>>().to(equal<-1 | 4.5 | 8>);
  });

  it("should return `number` for `number`", () => {
    expect<Inc<number>>().to(equal<number>);
  });

  it("should return `number` for `any`", () => {
    expect<Inc<any>>().to(equal<number>);
  });

  it("should return `never` for `never`", () => {
    expect<Inc<never>>().to(beNever);
  });
});
