import type { Either } from "@tyda/core";
import type { Num } from "@tyda/number";
import type { Str } from "@tyda/string";
import type { Show } from "@tyda/typeclass";
import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, Call2, PartialApply, Pipe } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

type MapWith$<Self extends readonly unknown[]> = PartialApply<Arr.Map$$, [Self]>;

describe("Arr.Map", () => {
  it("should be of correct signature", () => {
    expect<Arr.Map$<Show.Show$>>().to(beOfSig<(self: readonly Show[]) => readonly string[]>);
    expect<Arr.Map$<Str.Parse$<number>>>().to(
      beOfSig<(self: readonly string[]) => readonly Either<string, number>[]>,
    );
    expect<Arr.Map$<Arr.Of1$>>().to(beOfSig<<A>(self: readonly A[]) => readonly (readonly [A])[]>);
    expect<MapWith$<string[]>>().to(beOfSig<<B>(f: (a: string) => B) => readonly B[]>);
    expect<MapWith$<readonly number[]>>().to(beOfSig<<B>(f: (a: number) => B) => readonly B[]>);
    expect<Arr.Map$$>().to(beOfSig<<A, B>(self: readonly A[], f: (a: A) => B) => readonly B[]>);
  });

  it("should map each element of an array", () => {
    expect<Arr.Map<string[], Str.ToUpper$>>().to(equal<Uppercase<string>[]>);
    expect<Call1<Arr.Map$<Str.ToUpper$>, string[]>>().to(equal<Uppercase<string>[]>);
    expect<Call1<MapWith$<string[]>, Str.ToUpper$>>().to(equal<Uppercase<string>[]>);
    expect<Call2<Arr.Map$$, string[], Str.ToUpper$>>().to(equal<Uppercase<string>[]>);

    expect<Arr.Map<readonly string[], Str.ToUpper$>>().to(equal<readonly Uppercase<string>[]>);
    expect<Pipe<readonly string[], Arr.Map$<Str.ToUpper$>>>().to(
      equal<readonly Uppercase<string>[]>,
    );

    expect<Arr.Map<never[], Str.ToUpper$>>().to(equal<never[]>);
  });

  it("should map each element of a tuple", () => {
    expect<Arr.Map<[1, 2, 3], Num.Inc$>>().to(equal<[2, 3, 4]>);
    expect<Pipe<[1, 2, 3], Arr.Map$<Num.Inc$>>>().to(equal<[2, 3, 4]>);
    expect<Call2<Arr.Map$$, [1, 2, 3], Num.Inc$>>().to(equal<[2, 3, 4]>);
    expect<Call1<MapWith$<[1, 2, 3]>, Num.Inc$>>().to(equal<[2, 3, 4]>);

    expect<Arr.Map<[1, "a"], Show.Show$>>().to(equal<["1", "'a'"]>);
    expect<Arr.Map<[1, 2], Arr.Of1$>>().to(equal<[readonly [1], readonly [2]]>);
    expect<Arr.Map<readonly ["a", "b"], Str.ToUpper$>>().to(equal<readonly ["A", "B"]>);
    expect<Arr.Map<[x: "a", y: "b"], Str.ToUpper$>>().to(equal<[x: "A", y: "B"]>);
    expect<Arr.Map<["a", ...string[]], Str.ToUpper$>>().to(equal<["A", ...Uppercase<string>[]]>);
    expect<Arr.Map<[...string[], "z"], Str.ToUpper$>>().to(equal<[...Uppercase<string>[], "Z"]>);

    expect<Pipe<[1, 2], Arr.Map$<Num.Inc$>, Arr.Map$<Show.Show$>>>().to(equal<["2", "3"]>);
  });

  it("should distribute over unions of arrays or tuples", () => {
    expect<Arr.Map<["a"] | readonly ["b", "c"], Str.ToUpper$>>().to(
      equal<["A"] | readonly ["B", "C"]>,
    );
  });

  it("should do nothing for empty tuples", () => {
    expect<Arr.Map<[], Str.ToUpper$>>().to(equal<[]>);
    expect<Call1<Arr.Map$<Str.ToUpper$>, []>>().to(equal<[]>);
    expect<Arr.Map<readonly [], Str.ToUpper$>>().to(equal<readonly []>);
    expect<Call2<Arr.Map$$, readonly [], Str.ToUpper$>>().to(equal<readonly []>);
  });

  it("should return `never` if the array type is `never`", () => {
    expect<Arr.Map<never, Str.ToUpper$>>().to(beNever);
    expect<Call1<Arr.Map$<Str.ToUpper$>, never>>().to(beNever);
    expect<Call2<Arr.Map$$, never, Str.ToUpper$>>().to(beNever);
  });

  it("should return a readonly array of the mapped `any` if the array type is `any`", () => {
    expect<Arr.Map<any, Str.ToUpper$>>().to(equal<readonly Uppercase<any>[]>);
    expect<Call1<Arr.Map$<Str.ToUpper$>, any>>().to(equal<readonly Uppercase<any>[]>);
    expect<Call2<Arr.Map$$, any, Str.ToUpper$>>().to(equal<readonly Uppercase<any>[]>);
  });

  it("should accept only array or tuple types", () => {
    // @ts-expect-error
    expect<Arr.Map<boolean, Str.ToUpper$>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Map$<Str.ToUpper$>, boolean>>().to(error);
    // @ts-expect-error
    expect<Call2<Arr.Map$$, unknown, Str.ToUpper$>>().to(error);
  });

  it("should accept only functions that take the element type", () => {
    // @ts-expect-error
    expect<Arr.Map<number[], Str.ToUpper$>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Map$<Str.ToUpper$>, number[]>>().to(error);
  });
});
