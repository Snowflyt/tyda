import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beAny, beNever, describe, equal, error, expect, it } from "typroof";

import type { None, Option, Some } from ".";

describe("Option.Unwrap", () => {
  it("should be of correct signature", () => {
    expect<Option.Unwrap$>().to(beOfSig<<A>(self: Option<A>) => A>);
  });

  it("should return the underlying value of a `Some`", () => {
    expect<Option.Unwrap<Some<42>>>().to(equal<42>);
    expect<Call1<Option.Unwrap$, Some<42>>>().to(equal<42>);

    expect<Option.Unwrap<Some<string>>>().to(equal<string>);
    expect<Call1<Option.Unwrap$, Some<string>>>().to(equal<string>);
  });

  it("should return `never` for `None`", () => {
    expect<Option.Unwrap<None>>().to(beNever);
    expect<Call1<Option.Unwrap$, None>>().to(beNever);
  });

  it("should handle unions of `Option`s", () => {
    expect<Option.Unwrap<Some<"foo"> | Some<"bar">>>().to(equal<"foo" | "bar">);
    expect<Call1<Option.Unwrap$, Some<"foo"> | Some<"bar">>>().to(equal<"foo" | "bar">);

    expect<Option.Unwrap<Some<number> | None>>().to(equal<number>);
    expect<Call1<Option.Unwrap$, Some<number> | None>>().to(equal<number>);

    expect<Option.Unwrap<Some<boolean> | None | Some<string>>>().to(equal<boolean | string>);
    expect<Call1<Option.Unwrap$, Some<boolean> | None | Some<string>>>().to(
      equal<boolean | string>,
    );
  });

  it("should return `never` for `never`", () => {
    expect<Option.Unwrap<never>>().to(beNever);
    expect<Call1<Option.Unwrap$, never>>().to(beNever);
  });

  it("should return `any` for `any`", () => {
    expect<Option.Unwrap<any>>().to(beAny);
    expect<Call1<Option.Unwrap$, any>>().to(beAny);
  });

  it("should accept only `Option`s", () => {
    // @ts-expect-error
    expect<Option.Unwrap<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Option.Unwrap$, string>>().to(error);

    // @ts-expect-error
    expect<Option.Unwrap<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Option.Unwrap$, unknown>>().to(error);
  });
});
