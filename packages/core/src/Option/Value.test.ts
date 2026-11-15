import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beAny, beNever, describe, equal, error, expect, it } from "typroof";

import type { None, Option, Some } from ".";

describe("Option.Value", () => {
  it("should be of correct signature", () => {
    expect<Option.Value$>().to(beOfSig<(self: Option<unknown>) => unknown>);
  });

  it("should get the value type of `Option`s", () => {
    expect<Option.Value<Option<string>>>().to(equal<string>);
    expect<Call1<Option.Value$, Option<string>>>().to(equal<string>);

    expect<Option.Value<Option<never>>>().to(beNever);
    expect<Call1<Option.Value$, Option<never>>>().to(beNever);

    expect<Option.Value<Some<number>>>().to(equal<number>);
    expect<Call1<Option.Value$, Some<number>>>().to(equal<number>);

    expect<Option.Value<None>>().to(beNever);
    expect<Call1<Option.Value$, None>>().to(beNever);
  });

  it("should handle unions of `Option`s", () => {
    expect<Option.Value<Option<string> | Option<number>>>().to(equal<string | number>);
    expect<Call1<Option.Value$, Option<string> | Option<number>>>().to(equal<string | number>);

    expect<Option.Value<Option<string> | Option<never>>>().to(equal<string>);
    expect<Call1<Option.Value$, Option<string> | Option<never>>>().to(equal<string>);
  });

  it("should return `never` for `never`", () => {
    expect<Option.Value<never>>().to(beNever);
    expect<Call1<Option.Value$, never>>().to(beNever);
  });

  it("should return `any` for `any`", () => {
    expect<Option.Value<any>>().to(beAny);
    expect<Call1<Option.Value$, any>>().to(beAny);
  });

  it("should accept only `Option`s", () => {
    // @ts-expect-error
    expect<Option.Value<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Option.Value$, string>>().to(error);

    // @ts-expect-error
    expect<Option.Value<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Option.Value$, unknown>>().to(error);
  });
});
