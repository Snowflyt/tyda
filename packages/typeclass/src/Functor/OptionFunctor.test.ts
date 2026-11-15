import type { Arr } from "@tyda/array";
import type { None, Option, Some } from "@tyda/core";
import type { Num } from "@tyda/number";
import type { Functor, Show } from "@tyda/typeclass";
import { beOneOf } from "@tyda/typroof-plugin";
import type { Call1, Call2 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

describe("Functor<Option<~>>", () => {
  it("should apply the type-level function to the value inside `Some`", () => {
    expect<Functor.Map<Some<42>, Show.Show$>>().to(equal<Some<"42">>);
    expect<Call1<Functor.Map$<Show.Show$>, Some<42>>>().to(equal<Some<"42">>);
    expect<Call2<Functor.Map$$, Some<42>, Show.Show$>>().to(equal<Some<"42">>);

    expect<Functor.Map<Some<string>, Show.Show$>>().to(equal<Some<"string">>);
    expect<Call1<Functor.Map$<Show.Show$>, Some<string>>>().to(equal<Some<"string">>);
    expect<Call2<Functor.Map$$, Some<string>, Show.Show$>>().to(equal<Some<"string">>);

    expect<Functor.Map<Some<true | 42>, Show.Show$>>().to(
      beOneOf<Some<"true | 42">, Some<"42 | true">>,
    );
    expect<Call1<Functor.Map$<Show.Show$>, Some<true | 42>>>().to(
      beOneOf<Some<"true | 42">, Some<"42 | true">>,
    );
    expect<Call2<Functor.Map$$, Some<true | 42>, Show.Show$>>().to(
      beOneOf<Some<"true | 42">, Some<"42 | true">>,
    );

    expect<Functor.Map<Some<boolean>, Show.Show$>>().to(equal<Some<"boolean">>);
    expect<Call1<Functor.Map$<Show.Show$>, Some<boolean>>>().to(equal<Some<"boolean">>);
    expect<Call2<Functor.Map$$, Some<boolean>, Show.Show$>>().to(equal<Some<"boolean">>);

    expect<Functor.Map<Some<Some<"foo">>, Show.Show$>>().to(equal<Some<"Some<'foo'>">>);
    expect<Call1<Functor.Map$<Show.Show$>, Some<Some<"foo">>>>().to(equal<Some<"Some<'foo'>">>);
    expect<Call2<Functor.Map$$, Some<Some<"foo">>, Show.Show$>>().to(equal<Some<"Some<'foo'>">>);

    expect<Functor.Map<Some<None>, Show.Show$>>().to(equal<Some<"None">>);
    expect<Call1<Functor.Map$<Show.Show$>, Some<None>>>().to(equal<Some<"None">>);
    expect<Call2<Functor.Map$$, Some<None>, Show.Show$>>().to(equal<Some<"None">>);

    expect<Functor.Map<Some<42>, Num.Inc$>>().to(equal<Some<43>>);
    expect<Call1<Functor.Map$<Num.Inc$>, Some<42>>>().to(equal<Some<43>>);
    expect<Call2<Functor.Map$$, Some<42>, Num.Inc$>>().to(equal<Some<43>>);

    expect<Functor.Map<Some<-2.718>, Num.Inc$>>().to(equal<Some<-1.718>>);
    expect<Call1<Functor.Map$<Num.Inc$>, Some<-2.718>>>().to(equal<Some<-1.718>>);
    expect<Call2<Functor.Map$$, Some<-2.718>, Num.Inc$>>().to(equal<Some<-1.718>>);

    expect<Functor.Map<Some<"foo">, Arr.Of1$>>().to(equal<Some<readonly ["foo"]>>);
    expect<Call1<Functor.Map$<Arr.Of1$>, Some<"foo">>>().to(equal<Some<readonly ["foo"]>>);
    expect<Call2<Functor.Map$$, Some<"foo">, Arr.Of1$>>().to(equal<Some<readonly ["foo"]>>);
  });

  it("should do nothing for `None`s", () => {
    expect<Functor.Map<None, Arr.Of1$>>().to(equal<None>);
    expect<Call1<Functor.Map$<Arr.Of1$>, None>>().to(equal<None>);
    expect<Call2<Functor.Map$$, None, Arr.Of1$>>().to(equal<None>);
  });

  it("should apply the type-level function to the value inside `Option`", () => {
    expect<Functor.Map<Option<42>, Show.Show$>>().to(equal<Option<"42">>);
    expect<Call1<Functor.Map$<Show.Show$>, Option<42>>>().to(equal<Option<"42">>);
    expect<Call2<Functor.Map$$, Option<42>, Show.Show$>>().to(equal<Option<"42">>);

    expect<Functor.Map<Option<string>, Show.Show$>>().to(equal<Option<"string">>);
    expect<Call1<Functor.Map$<Show.Show$>, Option<string>>>().to(equal<Option<"string">>);
    expect<Call2<Functor.Map$$, Option<string>, Show.Show$>>().to(equal<Option<"string">>);

    expect<Functor.Map<Option<boolean>, Show.Show$>>().to(equal<Option<"boolean">>);
    expect<Call1<Functor.Map$<Show.Show$>, Option<boolean>>>().to(equal<Option<"boolean">>);
    expect<Call2<Functor.Map$$, Option<boolean>, Show.Show$>>().to(equal<Option<"boolean">>);

    expect<Functor.Map<Option<Some<"foo">>, Show.Show$>>().to(equal<Option<"Some<'foo'>">>);
    expect<Call1<Functor.Map$<Show.Show$>, Option<Some<"foo">>>>().to(equal<Option<"Some<'foo'>">>);
    expect<Call2<Functor.Map$$, Option<Some<"foo">>, Show.Show$>>().to(
      equal<Option<"Some<'foo'>">>,
    );

    expect<Functor.Map<Option<3.14>, Num.Inc$>>().to(equal<Option<4.14>>);
    expect<Call1<Functor.Map$<Num.Inc$>, Option<3.14>>>().to(equal<Option<4.14>>);
    expect<Call2<Functor.Map$$, Option<3.14>, Num.Inc$>>().to(equal<Option<4.14>>);

    expect<Functor.Map<Option<"bar">, Arr.Of1$>>().to(equal<Option<readonly ["bar"]>>);
    expect<Call1<Functor.Map$<Arr.Of1$>, Option<"bar">>>().to(equal<Option<readonly ["bar"]>>);
    expect<Call2<Functor.Map$$, Option<"bar">, Arr.Of1$>>().to(equal<Option<readonly ["bar"]>>);
  });
});
