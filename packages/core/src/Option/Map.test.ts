import type { Arr } from "@tyda/array";
import type { Num } from "@tyda/number";
import type { Str } from "@tyda/string";
import type { Show } from "@tyda/typeclass";
import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, Call2, PartialApply } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Either, Right } from "../Either";

import type { None, Option, Some } from ".";

type MapWith$<Self extends Option<unknown>> = PartialApply<Option.Map$$, [Self]>;

describe("Option.Map", () => {
  it("should be of correct signature", () => {
    expect<Option.Map$<Show.Show$>>().to(beOfSig<(self: Option<Show>) => Option<string>>);
    expect<Option.Map$<Str.Parse$<number>>>().to(
      beOfSig<(self: Option<string>) => Option<Either<string, number>>>,
    );
    expect<Option.Map$<Arr.Of1$>>().to(beOfSig<<A>(self: Option<A>) => Option<readonly [A]>>);
    expect<MapWith$<Option<string>>>().to(beOfSig<<B>(f: (a: string) => B) => Option<B>>);
    expect<MapWith$<Option<number>>>().to(beOfSig<<B>(f: (a: number) => B) => Option<B>>);
    expect<Option.Map$$>().to(beOfSig<<A, B>(self: Option<A>, f: (a: A) => B) => Option<B>>);
  });

  it("should call the mapping function on `Some`", () => {
    expect<Option.Map<Some<42>, Show.Show$>>().to(equal<Some<"42">>);
    expect<Call1<Option.Map$<Show.Show$>, Some<42>>>().to(equal<Some<"42">>);
    expect<Call1<MapWith$<Some<42>>, Show.Show$>>().to(equal<Some<"42">>);
    expect<Call2<Option.Map$$, Some<42>, Show.Show$>>().to(equal<Some<"42">>);

    expect<Option.Map<Some<"3.14">, Str.Parse$<number>>>().to(equal<Some<Right<3.14>>>);
    expect<Call1<Option.Map$<Str.Parse$<number>>, Some<"3.14">>>().to(equal<Some<Right<3.14>>>);
    expect<Call1<MapWith$<Some<"3.14">>, Str.Parse$<number>>>().to(equal<Some<Right<3.14>>>);
    expect<Call2<Option.Map$$, Some<"3.14">, Str.Parse$<number>>>().to(equal<Some<Right<3.14>>>);

    expect<Option.Map<Some<-2.718>, Num.Inc$>>().to(equal<Some<-1.718>>);
    expect<Call1<Option.Map$<Num.Inc$>, Some<-2.718>>>().to(equal<Some<-1.718>>);
    expect<Call1<MapWith$<Some<-2.718>>, Num.Inc$>>().to(equal<Some<-1.718>>);
    expect<Call2<Option.Map$$, Some<-2.718>, Num.Inc$>>().to(equal<Some<-1.718>>);

    expect<Option.Map<Some<0>, Arr.Of1$>>().to(equal<Some<readonly [0]>>);
    expect<Call1<Option.Map$<Arr.Of1$>, Some<0>>>().to(equal<Some<readonly [0]>>);
    expect<Call1<MapWith$<Some<0>>, Arr.Of1$>>().to(equal<Some<readonly [0]>>);
    expect<Call2<Option.Map$$, Some<0>, Arr.Of1$>>().to(equal<Some<readonly [0]>>);
  });

  it("should return `never` if either the option type or the mapping function is `never`", () => {
    expect<Option.Map<never, never>>().to(beNever);
    expect<Call1<Option.Map$<never>, never>>().to(beNever);
    expect<Call1<MapWith$<never>, never>>().to(beNever);
    expect<Call2<Option.Map$$, never, never>>().to(beNever);

    expect<Option.Map<never, Arr.Of1$>>().to(beNever);
    expect<Call1<Option.Map$<Arr.Of1$>, never>>().to(beNever);
    expect<Call1<MapWith$<never>, Arr.Of1$>>().to(beNever);
    expect<Call2<Option.Map$$, never, Arr.Of1$>>().to(beNever);

    expect<Option.Map<Some<42>, never>>().to(beNever);
    expect<Call1<Option.Map$<never>, None>>().to(beNever);
    expect<Call1<MapWith$<Some<42>>, never>>().to(beNever);
    expect<Call2<Option.Map$$, Some<42>, never>>().to(beNever);
  });

  it("should call the mapping function with `any` and wrap the result in `Option` if the option type is `any`", () => {
    expect<Option.Map<any, Arr.Of1$>>().to(equal<Option<readonly [any]>>);
    expect<Call1<Option.Map$<Arr.Of1$>, any>>().to(equal<Option<readonly [any]>>);
    expect<Call1<MapWith$<any>, Arr.Of1$>>().to(equal<Option<readonly [any]>>);
    expect<Call2<Option.Map$$, any, Arr.Of1$>>().to(equal<Option<readonly [any]>>);
  });

  it("should accept only `Option`s and functions", () => {
    // @ts-expect-error
    expect<Option.Map<boolean, Show.Show$>>().to(error);
    // @ts-expect-error
    expect<Call1<Option.Map$<Show.Show$>, boolean>>().to(error);
    // @ts-expect-error
    expect<Call1<MapWith$<boolean>, Show.Show$>>().to(error);
    // @ts-expect-error
    expect<Call2<Option.Map$$, boolean, Show.Show$>>().to(error);

    // @ts-expect-error
    expect<Option.Map<Some<42>, unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Option.Map$<unknown>, Some<42>>>().to(error);
    // @ts-expect-error
    expect<Call1<MapWith$<Some<42>>, unknown>>().to(error);
    // @ts-expect-error
    expect<Call2<Option.Map$$, Some<42>, unknown>>().to(error);
  });
});
