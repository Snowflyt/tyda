import type {} from "@tyda/boolean";
import type { None, Option, Some } from "@tyda/core";
import type {} from "@tyda/number";
import type {} from "@tyda/string";
import { beOfSig, beOneOf } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { describe, equal, error, expect, it } from "typroof";

import type { Show } from ".";

describe("Show.Show", () => {
  it("should be of correct signature", () => {
    expect<Show.Show$>().to(beOfSig<(self: Show) => string>);
  });

  it("should show primitive types correctly", () => {
    expect<Show.Show<"hello">>().to(equal<"'hello'">);
    expect<Call1<Show.Show$, "hello">>().to(equal<"'hello'">);

    expect<Show.Show<string>>().to(equal<"string">);
    expect<Call1<Show.Show$, string>>().to(equal<"string">);

    expect<Show.Show<42>>().to(equal<"42">);
    expect<Call1<Show.Show$, 42>>().to(equal<"42">);

    expect<Show.Show<number>>().to(equal<"number">);
    expect<Call1<Show.Show$, number>>().to(equal<"number">);

    expect<Show.Show<true>>().to(equal<"true">);
    expect<Call1<Show.Show$, true>>().to(equal<"true">);

    expect<Show.Show<false>>().to(equal<"false">);
    expect<Call1<Show.Show$, false>>().to(equal<"false">);

    expect<Show.Show<boolean>>().to(equal<"boolean">);
    expect<Call1<Show.Show$, boolean>>().to(equal<"boolean">);
  });

  it("should show generic types correctly", () => {
    expect<Show.Show<Some<"bar">>>().to(equal<"Some<'bar'>">);
    expect<Call1<Show.Show$, Some<"bar">>>().to(equal<"Some<'bar'>">);

    expect<Show.Show<Some<string>>>().to(equal<"Some<string>">);
    expect<Call1<Show.Show$, Some<string>>>().to(equal<"Some<string>">);

    expect<Show.Show<Some<114514>>>().to(equal<"Some<114514>">);
    expect<Call1<Show.Show$, Some<114514>>>().to(equal<"Some<114514>">);

    expect<Show.Show<Some<number>>>().to(equal<"Some<number>">);
    expect<Call1<Show.Show$, Some<number>>>().to(equal<"Some<number>">);

    expect<Show.Show<Some<true>>>().to(equal<"Some<true>">);
    expect<Call1<Show.Show$, Some<true>>>().to(equal<"Some<true>">);

    expect<Show.Show<Some<false>>>().to(equal<"Some<false>">);
    expect<Call1<Show.Show$, Some<false>>>().to(equal<"Some<false>">);

    expect<Show.Show<Some<boolean>>>().to(equal<"Some<boolean>">);
    expect<Call1<Show.Show$, Some<boolean>>>().to(equal<"Some<boolean>">);

    expect<Show.Show<None>>().to(equal<"None">);
    expect<Call1<Show.Show$, None>>().to(equal<"None">);

    expect<Show.Show<Some<Some<42>>>>().to(equal<"Some<Some<42>>">);
    expect<Call1<Show.Show$, Some<Some<42>>>>().to(equal<"Some<Some<42>>">);

    expect<Show.Show<Option<Some<string>>>>().to(equal<"Option<Some<string>>">);
    expect<Call1<Show.Show$, Option<Some<string>>>>().to(equal<"Option<Some<string>>">);
  });

  it("should handle unions of `Show`s", () => {
    expect<Show.Show<Some<"foo"> | 42>>().to(equal<"Some<'foo'> | 42">);
    expect<Call1<Show.Show$, Some<"foo"> | 42>>().to(equal<"Some<'foo'> | 42">);

    expect<Show.Show<Option<Some<string | number>> | 42>>().to(
      beOneOf<
        "Option<Some<string | number>> | 42",
        "Option<Some<number | string>> | 42",
        "42 | Option<Some<string | number>>",
        "42 | Option<Some<number | string>>"
      >,
    );
    expect<Call1<Show.Show$, Option<Some<string | number>> | 42>>().to(
      beOneOf<
        "Option<Some<string | number>> | 42",
        "Option<Some<number | string>> | 42",
        "42 | Option<Some<string | number>>",
        "42 | Option<Some<number | string>>"
      >,
    );
  });

  it('should return `"never"` for `never`', () => {
    expect<Show.Show<never>>().to(equal<"never">);
    expect<Call1<Show.Show$, never>>().to(equal<"never">);
  });

  it('should return `"any"` for `any`', () => {
    expect<Show.Show<any>>().to(equal<"any">);
    expect<Call1<Show.Show$, any>>().to(equal<"any">);
  });

  it("should accept only `Show`s", () => {
    // @ts-expect-error
    expect<Show.Show<() => void>>().to(error);
    // @ts-expect-error
    expect<Call1<Show.Show$, () => void>>().to(error);

    // @ts-expect-error
    expect<Show.Show<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Show.Show$, unknown>>().to(error);
  });
});
