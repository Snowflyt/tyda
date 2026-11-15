import type { Arr } from "@tyda/array";
import type { None, Option, Some } from "@tyda/core";
import type { Num } from "@tyda/number";
import type { Show } from "@tyda/typeclass";
import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, Call2, Kind } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Functor, FunctorHKT } from ".";

describe("Functor.Map", () => {
  it("should be of correct signature", () => {
    expect<Functor.Map$<Show.Show$>>().to(
      beOfSig<(self: Kind<FunctorHKT, Show>) => Kind<FunctorHKT, string>>,
    );
    expect<Functor.Map$<Arr.Of1$>>().to(
      beOfSig<<A>(self: Kind<FunctorHKT, A>) => Kind<FunctorHKT, readonly [A]>>,
    );
    expect<Functor.Map$$>().to(
      beOfSig<<A, B>(self: Kind<FunctorHKT, A>, f: (a: A) => B) => Kind<FunctorHKT, B>>(),
    );
  });

  it("should apply type-level functions to `Functor`s correctly", () => {
    expect<Functor.Map<[1, 2, 3], Num.Inc$>>().to(equal<[2, 3, 4]>);
    expect<Functor.Map<readonly [1, 2, 3], Num.Inc$>>().to(equal<readonly [2, 3, 4]>);
    expect<Call1<Functor.Map$<Num.Inc$>, [1, 2, 3]>>().to(equal<[2, 3, 4]>);
    expect<Call1<Functor.Map$<Num.Inc$>, readonly [1, 2, 3]>>().to(equal<readonly [2, 3, 4]>);
    expect<Call2<Functor.Map$$, [1, 2, 3], Num.Inc$>>().to(equal<[2, 3, 4]>);
    expect<Call2<Functor.Map$$, readonly [1, 2, 3], Num.Inc$>>().to(equal<readonly [2, 3, 4]>);

    expect<Functor.Map<[true, 42], Show.Show$>>().to(equal<["true", "42"]>);
    expect<Functor.Map<readonly [true, 42], Show.Show$>>().to(equal<readonly ["true", "42"]>);
    expect<Call1<Functor.Map$<Show.Show$>, [true, 42]>>().to(equal<["true", "42"]>);
    expect<Call1<Functor.Map$<Show.Show$>, readonly [true, 42]>>().to(
      equal<readonly ["true", "42"]>,
    );
    expect<Call2<Functor.Map$$, [true, 42], Show.Show$>>().to(equal<["true", "42"]>);
    expect<Call2<Functor.Map$$, readonly [true, 42], Show.Show$>>().to(
      equal<readonly ["true", "42"]>,
    );

    expect<Functor.Map<[], Num.Inc$>>().to(equal<[]>);
    expect<Functor.Map<readonly [], Num.Inc$>>().to(equal<readonly []>);
    expect<Call1<Functor.Map$<Num.Inc$>, []>>().to(equal<[]>);
    expect<Call1<Functor.Map$<Num.Inc$>, readonly []>>().to(equal<readonly []>);
    expect<Call2<Functor.Map$$, [], Num.Inc$>>().to(equal<[]>);
    expect<Call2<Functor.Map$$, readonly [], Num.Inc$>>().to(equal<readonly []>);

    expect<Functor.Map<Some<3.14>, Num.Inc$>>().to(equal<Some<4.14>>);
    expect<Call1<Functor.Map$<Num.Inc$>, Some<3.14>>>().to(equal<Some<4.14>>);
    expect<Call2<Functor.Map$$, Some<3.14>, Num.Inc$>>().to(equal<Some<4.14>>);

    expect<Functor.Map<Some<Some<"hello">>, Show.Show$>>().to(equal<Some<"Some<'hello'>">>);
    expect<Call1<Functor.Map$<Show.Show$>, Some<Some<"hello">>>>().to(equal<Some<"Some<'hello'>">>);
    expect<Call2<Functor.Map$$, Some<Some<"hello">>, Show.Show$>>().to(
      equal<Some<"Some<'hello'>">>,
    );

    expect<Functor.Map<Some<true>, Arr.Of1$>>().to(equal<Some<readonly [true]>>);
    expect<Call1<Functor.Map$<Arr.Of1$>, Some<true>>>().to(equal<Some<readonly [true]>>);
    expect<Call2<Functor.Map$$, Some<true>, Arr.Of1$>>().to(equal<Some<readonly [true]>>);

    expect<Functor.Map<None, Arr.Of1$>>().to(equal<None>);
    expect<Call1<Functor.Map$<Arr.Of1$>, None>>().to(equal<None>);
    expect<Call2<Functor.Map$$, None, Arr.Of1$>>().to(equal<None>);
  });

  it("should handle unions of `Functor`s", () => {
    expect<Functor.Map<Some<"foo"> | [1, 2], Show.Show$>>().to(equal<Some<"'foo'"> | ["1", "2"]>);
    expect<Call1<Functor.Map$<Show.Show$>, Some<"foo"> | [1, 2]>>().to(
      equal<Some<"'foo'"> | ["1", "2"]>,
    );
    expect<Call2<Functor.Map$$, Some<"foo"> | [1, 2], Show.Show$>>().to(
      equal<Some<"'foo'"> | ["1", "2"]>,
    );

    expect<Functor.Map<None | [42, 43], Arr.Of1$>>().to(
      equal<None | [readonly [42], readonly [43]]>,
    );
    expect<Call1<Functor.Map$<Arr.Of1$>, None | [42, 43]>>().to(
      equal<None | [readonly [42], readonly [43]]>,
    );
    expect<Call2<Functor.Map$$, None | [42, 43], Arr.Of1$>>().to(
      equal<None | [readonly [42], readonly [43]]>,
    );
  });

  it("should handle unions of type-level functions", () => {
    expect<Functor.Map<[1, 2, 3], Num.Inc$ | Show.Show$>>().to(equal<[2, 3, 4] | ["1", "2", "3"]>);
    expect<Call1<Functor.Map$<Num.Inc$ | Show.Show$>, [1, 2, 3]>>().to(
      equal<[2, 3, 4] | ["1", "2", "3"]>,
    );
    expect<Call2<Functor.Map$$, [1, 2, 3], Num.Inc$ | Show.Show$>>().to(
      equal<[2, 3, 4] | ["1", "2", "3"]>,
    );

    expect<Functor.Map<Some<3.14> | [2.718, 1.618], Num.Inc$ | Show.Show$>>().to(
      equal<Some<4.14> | [3.718, 2.618] | Some<"3.14"> | ["2.718", "1.618"]>,
    );
    expect<Call1<Functor.Map$<Num.Inc$ | Show.Show$>, Some<3.14> | [2.718, 1.618]>>().to(
      equal<Some<4.14> | [3.718, 2.618] | Some<"3.14"> | ["2.718", "1.618"]>,
    );
    expect<Call2<Functor.Map$$, Some<3.14> | [2.718, 1.618], Num.Inc$ | Show.Show$>>().to(
      equal<Some<4.14> | [3.718, 2.618] | Some<"3.14"> | ["2.718", "1.618"]>,
    );
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Functor.Map<never, Num.Inc$>>().to(beNever);
    expect<Call1<Functor.Map$<Num.Inc$>, never>>().to(beNever);
    expect<Call2<Functor.Map$$, never, Num.Inc$>>().to(beNever);

    expect<Functor.Map<None, never>>().to(beNever);
    expect<Call1<Functor.Map$<never>, None>>().to(beNever);
    expect<Call2<Functor.Map$$, None, never>>().to(beNever);

    expect<Functor.Map<never, never>>().to(beNever);
    expect<Call1<Functor.Map$<never>, never>>().to(beNever);
    expect<Call2<Functor.Map$$, never, never>>().to(beNever);
  });

  it("should apply the type-level function with `any` if the `Functor` is `any`", () => {
    expect<Functor.Map<any, Arr.Of1$>>().to(
      equal<Option<readonly [any]> | readonly (readonly [any])[]>,
    );
    expect<Call1<Functor.Map$<Arr.Of1$>, any>>().to(
      equal<Option<readonly [any]> | readonly (readonly [any])[]>,
    );
    expect<Call2<Functor.Map$$, any, Arr.Of1$>>().to(
      equal<Option<readonly [any]> | readonly (readonly [any])[]>,
    );
  });

  it("should replace the value(s) in the `Functor` with `any` if the type-level function is `any`", () => {
    expect<Functor.Map<Some<string>, any>>().to(equal<Some<any>>);
    expect<Call1<Functor.Map$<any>, Some<string>>>().to(equal<Some<any>>);
    expect<Call2<Functor.Map$$, Some<string>, any>>().to(equal<Some<any>>);

    expect<Functor.Map<None, any>>().to(equal<None>);
    expect<Call1<Functor.Map$<any>, None>>().to(equal<None>);
    expect<Call2<Functor.Map$$, None, any>>().to(equal<None>);

    expect<Functor.Map<[1, 2, 3], any>>().to(equal<[any, any, any]>);
    expect<Functor.Map<readonly [1, 2, 3], any>>().to(equal<readonly [any, any, any]>);
    expect<Call1<Functor.Map$<any>, [1, 2, 3]>>().to(equal<[any, any, any]>);
    expect<Call1<Functor.Map$<any>, readonly [1, 2, 3]>>().to(equal<readonly [any, any, any]>);
    expect<Call2<Functor.Map$$, [1, 2, 3], any>>().to(equal<[any, any, any]>);
    expect<Call2<Functor.Map$$, readonly [1, 2, 3], any>>().to(equal<readonly [any, any, any]>);

    expect<Functor.Map<[], any>>().to(equal<[]>);
    expect<Functor.Map<readonly [], any>>().to(equal<readonly []>);
    expect<Call1<Functor.Map$<any>, []>>().to(equal<[]>);
    expect<Call1<Functor.Map$<any>, readonly []>>().to(equal<readonly []>);
    expect<Call2<Functor.Map$$, [], any>>().to(equal<[]>);
    expect<Call2<Functor.Map$$, readonly [], any>>().to(equal<readonly []>);

    expect<Functor.Map<Some<Some<"hello">> | [1, 2], any>>().to(equal<Some<any> | [any, any]>);
    expect<Call1<Functor.Map$<any>, Some<Some<"hello">> | [1, 2]>>().to(
      equal<Some<any> | [any, any]>,
    );
    expect<Call2<Functor.Map$$, Some<Some<"hello">> | [1, 2], any>>().to(
      equal<Some<any> | [any, any]>,
    );
  });

  it("should return a union of all `Functor` types with value(s) replaced by `any` if both arguments are `any`", () => {
    expect<Functor.Map<any, any>>().to(equal<Option<any> | readonly any[]>);
    expect<Call1<Functor.Map$<any>, any>>().to(equal<Option<any> | readonly any[]>);
    expect<Call2<Functor.Map$$, any, any>>().to(equal<Option<any> | readonly any[]>);
  });

  it("should accept only `Functor`s and type-level functions that match the signature", () => {
    // @ts-expect-error
    expect<Functor.Map<Some<"foo">, Num.Inc$>>().to(error);
    // @ts-expect-error
    expect<Call1<Functor.Map$<Num.Inc$>, Some<"foo">>>().to(error);
    // This should error, but currently doesn’t due to limitations in hkt-core
    // expect<Call2<Functor.Map$$, Some<"foo">, Num.Inc$>>().to(error);

    // @ts-expect-error
    expect<Functor.Map<Some<42>, string>>().to(error);
    // @ts-expect-error
    expect<Call1<Functor.Map$<string>, Some<42>>>().to(error);
    // @ts-expect-error
    expect<Call2<Functor.Map$$, Some<42>, string>>().to(error);

    // @ts-expect-error
    expect<Functor.Map<unknown, Show.Show$>>().to(error);
    // @ts-expect-error
    expect<Call1<Functor.Map$<Show.Show$>, unknown>>().to(error);
    // @ts-expect-error
    expect<Call2<Functor.Map$$, unknown, Show.Show$>>().to(error);

    // @ts-expect-error
    expect<Functor.Map<unknown, string>>().to(error);
    // @ts-expect-error
    expect<Call1<Functor.Map$<string>, unknown>>().to(error);
    // @ts-expect-error
    expect<Call2<Functor.Map$$, unknown, string>>().to(error);
  });
});
