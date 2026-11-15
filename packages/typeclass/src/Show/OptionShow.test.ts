import type {} from "@tyda/boolean";
import type { None, Option, Some } from "@tyda/core";
import type {} from "@tyda/number";
import type {} from "@tyda/string";
import type { Show } from "@tyda/typeclass";
import { beOneOf } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

describe("Show<Option<Show>>", () => {
  it("should show `Some<Show>`s", () => {
    expect<Show.Show<Some<42>>>().to(equal<"Some<42>">);
    expect<Call1<Show.Show$, Some<42>>>().to(equal<"Some<42>">);

    expect<Show.Show<Some<42 | 3.14>>>().to(beOneOf<"Some<42 | 3.14>", "Some<3.14 | 42>">);
    expect<Call1<Show.Show$, Some<42 | 3.14>>>().to(beOneOf<"Some<42 | 3.14>", "Some<3.14 | 42>">);

    expect<Show.Show<Some<number>>>().to(equal<"Some<number>">);
    expect<Call1<Show.Show$, Some<number>>>().to(equal<"Some<number>">);

    expect<Show.Show<Some<"foo">>>().to(equal<"Some<'foo'>">);
    expect<Call1<Show.Show$, Some<"foo">>>().to(equal<"Some<'foo'>">);

    expect<Show.Show<Some<string>>>().to(equal<"Some<string>">);
    expect<Call1<Show.Show$, Some<string>>>().to(equal<"Some<string>">);

    expect<Show.Show<Some<true>>>().to(equal<"Some<true>">);
    expect<Call1<Show.Show$, Some<true>>>().to(equal<"Some<true>">);

    expect<Show.Show<Some<false>>>().to(equal<"Some<false>">);
    expect<Call1<Show.Show$, Some<false>>>().to(equal<"Some<false>">);

    expect<Show.Show<Some<boolean>>>().to(equal<"Some<boolean>">);
    expect<Call1<Show.Show$, Some<boolean>>>().to(equal<"Some<boolean>">);

    expect<Show.Show<Some<string | number | boolean>>>().to(
      beOneOf<
        "Some<string | number | boolean>",
        "Some<string | boolean | number>",
        "Some<number | string | boolean>",
        "Some<number | boolean | string>",
        "Some<boolean | string | number>",
        "Some<boolean | number | string"
      >,
    );
    expect<Call1<Show.Show$, Some<string | number | boolean>>>().to(
      beOneOf<
        "Some<string | number | boolean>",
        "Some<string | boolean | number>",
        "Some<number | string | boolean>",
        "Some<number | boolean | string>",
        "Some<boolean | string | number>",
        "Some<boolean | number | string"
      >,
    );
  });

  it("should show `None`s", () => {
    expect<Show.Show<None>>().to(equal<"None">);
    expect<Call1<Show.Show$, None>>().to(equal<"None">);
  });

  it("should show `Option<Show>`s", () => {
    expect<Show.Show<Option<3.14>>>().to(equal<"Option<3.14>">);
    expect<Call1<Show.Show$, Option<3.14>>>().to(equal<"Option<3.14>">);

    expect<Show.Show<Option<number | "foo">>>().to(
      beOneOf<"Option<number | 'foo'>", "Option<'foo' | number>">,
    );
    expect<Call1<Show.Show$, Option<number | "foo">>>().to(
      beOneOf<"Option<number | 'foo'>", "Option<'foo' | number>">,
    );

    expect<Show.Show<Option<string | number | boolean>>>().to(
      beOneOf<
        "Option<string | number | boolean>",
        "Option<string | boolean | number>",
        "Option<number | string | boolean>",
        "Option<number | boolean | string>",
        "Option<boolean | string | number>",
        "Option<boolean | number | string"
      >,
    );
    expect<Call1<Show.Show$, Option<string | number | boolean>>>().to(
      beOneOf<
        "Option<string | number | boolean>",
        "Option<string | boolean | number>",
        "Option<number | string | boolean>",
        "Option<number | boolean | string>",
        "Option<boolean | string | number>",
        "Option<boolean | number | string"
      >,
    );
  });

  it("should show `Option<Option<...>>`s", () => {
    expect<Show.Show<Some<Some<3.14>>>>().to(equal<"Some<Some<3.14>>">);
    expect<Call1<Show.Show$, Some<Some<3.14>>>>().to(equal<"Some<Some<3.14>>">);

    expect<Show.Show<Some<None>>>().to(equal<"Some<None>">);
    expect<Call1<Show.Show$, Some<None>>>().to(equal<"Some<None>">);

    expect<Show.Show<None>>().to(equal<"None">);
    expect<Call1<Show.Show$, None>>().to(equal<"None">);

    expect<Show.Show<Some<Some<Some<-2.718>>>>>().to(equal<"Some<Some<Some<-2.718>>>">);
    expect<Call1<Show.Show$, Some<Some<Some<-2.718>>>>>().to(equal<"Some<Some<Some<-2.718>>>">);

    expect<Show.Show<Some<Some<None>>>>().to(equal<"Some<Some<None>>">);
    expect<Call1<Show.Show$, Some<Some<None>>>>().to(equal<"Some<Some<None>>">);

    expect<Show.Show<Some<None>>>().to(equal<"Some<None>">);
    expect<Call1<Show.Show$, Some<None>>>().to(equal<"Some<None>">);

    expect<Show.Show<None>>().to(equal<"None">);
    expect<Call1<Show.Show$, None>>().to(equal<"None">);
  });
});
