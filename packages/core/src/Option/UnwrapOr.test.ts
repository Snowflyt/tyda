import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, Call2 } from "hkt-core";
import { beAny, beNever, describe, equal, error, expect, it } from "typroof";

import type { None, Option, Some } from ".";

describe("Option.UnwrapOr", () => {
  it("should be of correct signature", () => {
    expect<Option.UnwrapOr$<"default">>().to(beOfSig<<A>(self: Option<A>) => A | "default">);
    expect<Option.UnwrapOr$$>().to(
      beOfSig<<A, Default>(self: Option<A>, default_: Default) => A | Default>,
    );
  });

  it("should get the underlying value of a `Some`", () => {
    expect<Option.UnwrapOr<Some<42>, "default">>().to(equal<42>);
    expect<Call1<Option.UnwrapOr$<"default">, Some<42>>>().to(equal<42>);
    expect<Call2<Option.UnwrapOr$$, Some<42>, "default">>().to(equal<42>);

    expect<Option.UnwrapOr<Some<string>, number>>().to(equal<string>);
    expect<Call1<Option.UnwrapOr$<number>, Some<string>>>().to(equal<string>);
    expect<Call2<Option.UnwrapOr$$, Some<string>, number>>().to(equal<string>);
  });

  it("should return the default value for `None`", () => {
    expect<Option.UnwrapOr<None, "default">>().to(equal<"default">);
    expect<Call1<Option.UnwrapOr$<"default">, None>>().to(equal<"default">);
    expect<Call2<Option.UnwrapOr$$, None, "default">>().to(equal<"default">);

    expect<Option.UnwrapOr<None, 123>>().to(equal<123>);
    expect<Call1<Option.UnwrapOr$<123>, None>>().to(equal<123>);
    expect<Call2<Option.UnwrapOr$$, None, 123>>().to(equal<123>);
  });

  it("should handle unions of `Option`s", () => {
    expect<Option.UnwrapOr<Some<42> | None, "default">>().to(equal<42 | "default">);
    expect<Call1<Option.UnwrapOr$<"default">, Some<42> | None>>().to(equal<42 | "default">);
    expect<Call2<Option.UnwrapOr$$, Some<42> | None, "default">>().to(equal<42 | "default">);

    expect<Option.UnwrapOr<Some<string> | Some<number>, boolean>>().to(equal<string | number>);
    expect<Call1<Option.UnwrapOr$<boolean>, Some<string> | Some<number>>>().to(
      equal<string | number>,
    );
    expect<Call2<Option.UnwrapOr$$, Some<string> | Some<number>, boolean>>().to(
      equal<string | number>,
    );

    expect<Option.UnwrapOr<Option<string> | Some<number>, boolean>>().to(
      equal<string | number | boolean>,
    );
    expect<Call1<Option.UnwrapOr$<boolean>, Option<string> | Some<number>>>().to(
      equal<string | number | boolean>,
    );
    expect<Call2<Option.UnwrapOr$$, Option<string> | Some<number>, boolean>>().to(
      equal<string | number | boolean>,
    );
  });

  it("should return `never` for `never`", () => {
    expect<Option.UnwrapOr<never, "default">>().to(beNever);
    expect<Call1<Option.UnwrapOr$<"default">, never>>().to(beNever);
    expect<Call2<Option.UnwrapOr$$, never, "default">>().to(beNever);
  });

  it("should return `any` for `any`", () => {
    expect<Option.UnwrapOr<any, "default">>().to(beAny);
    expect<Call1<Option.UnwrapOr$<"default">, any>>().to(beAny);
    expect<Call2<Option.UnwrapOr$$, any, "default">>().to(beAny);
  });

  it("should accept only `UnwrapOr`s and `Option`s", () => {
    // @ts-expect-error
    expect<Option.UnwrapOr<string, Some<"foo">>>().to(error);
    // @ts-expect-error
    expect<Call1<Option.UnwrapOr$<"default">, string>>().to(error);
    // @ts-expect-error
    expect<Call2<Option.UnwrapOr$$, string, Some<"foo">>>().to(error);

    // @ts-expect-error
    expect<Option.UnwrapOr<unknown, "default">>().to(error);
    // @ts-expect-error
    expect<Call1<Option.UnwrapOr$<"default">, unknown>>().to(error);
    // @ts-expect-error
    expect<Call2<Option.UnwrapOr$$, unknown, "default">>().to(error);

    // @ts-expect-error
    expect<Call2<Option.UnwrapOr$$, string, unknown>>().to(error);
    // @ts-expect-error
    expect<Call2<Option.UnwrapOr$$, unknown, Some<"foo">>>().to(error);
    // @ts-expect-error
    expect<Call2<Option.UnwrapOr$$, unknown, unknown>>().to(error);
  });
});
