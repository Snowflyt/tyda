import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, Call2, PartialApply } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

type MixInto$<Self extends readonly unknown[]> = PartialApply<Arr.Mix$$, [Self]>;

describe("Arr.Mix", () => {
  it("should be of correct signature", () => {
    expect<Arr.Mix$<string>>().to(beOfSig<<A>(self: readonly A[]) => readonly (A | string)[]>);
    expect<Arr.Mix$<number>>().to(beOfSig<<A>(self: readonly A[]) => readonly (A | number)[]>);
    expect<MixInto$<string[]>>().to(beOfSig<<B>(b: B) => readonly (string | B)[]>);
    expect<MixInto$<readonly number[]>>().to(beOfSig<<B>(b: B) => readonly (number | B)[]>);
    expect<Arr.Mix$$>().to(beOfSig<<A, B>(self: readonly A[], b: B) => readonly (A | B)[]>);
  });

  it("should mix a type into an array", () => {
    expect<Arr.Mix<string[], number>>().to(equal<(string | number)[]>);
    expect<Call1<Arr.Mix$<number>, string[]>>().to(equal<(string | number)[]>);
    expect<Call1<MixInto$<string[]>, number>>().to(equal<(string | number)[]>);
    expect<Call2<Arr.Mix$$, string[], number>>().to(equal<(string | number)[]>);

    expect<Arr.Mix<readonly number[], string>>().to(equal<readonly (number | string)[]>);
    expect<Call1<Arr.Mix$<string>, readonly number[]>>().to(equal<readonly (number | string)[]>);
    expect<Call1<MixInto$<readonly number[]>, string>>().to(equal<readonly (number | string)[]>);
    expect<Call2<Arr.Mix$$, readonly number[], string>>().to(equal<readonly (number | string)[]>);

    expect<Arr.Mix<number[], "foo">>().to(equal<(number | "foo")[]>);
    expect<Call1<Arr.Mix$<"foo">, number[]>>().to(equal<(number | "foo")[]>);
    expect<Call1<MixInto$<number[]>, "foo">>().to(equal<(number | "foo")[]>);
    expect<Call2<Arr.Mix$$, number[], "foo">>().to(equal<(number | "foo")[]>);

    expect<Arr.Mix<(string | number)[], boolean>>().to(equal<(string | number | boolean)[]>);
    expect<Call1<Arr.Mix$<boolean>, (string | number)[]>>().to(
      equal<(string | number | boolean)[]>,
    );
    expect<Call1<MixInto$<(string | number)[]>, boolean>>().to(
      equal<(string | number | boolean)[]>,
    );
    expect<Call2<Arr.Mix$$, (string | number)[], boolean>>().to(
      equal<(string | number | boolean)[]>,
    );

    expect<Arr.Mix<{}[], boolean>>().to(equal<(boolean | {})[]>);
    expect<Call2<Arr.Mix$$, {}[], boolean>>().to(equal<(boolean | {})[]>);
    expect<Call1<Arr.Mix$<boolean>, {}[]>>().to(equal<(boolean | {})[]>);
    expect<Call1<MixInto$<{}[]>, boolean>>().to(equal<(boolean | {})[]>);

    expect<Arr.Mix<never[], boolean>>().to(equal<boolean[]>);
    expect<Call1<Arr.Mix$<boolean>, never[]>>().to(equal<boolean[]>);
    expect<Call1<MixInto$<never[]>, boolean>>().to(equal<boolean[]>);
    expect<Call2<Arr.Mix$$, never[], boolean>>().to(equal<boolean[]>);

    expect<Arr.Mix<any[], boolean>>().to(equal<any[]>);
    expect<Call1<Arr.Mix$<boolean>, any[]>>().to(equal<any[]>);
    expect<Call1<MixInto$<any[]>, boolean>>().to(equal<any[]>);
    expect<Call2<Arr.Mix$$, any[], boolean>>().to(equal<any[]>);

    expect<Arr.Mix<readonly string[], any>>().to(equal<readonly any[]>);
    expect<Call1<Arr.Mix$<any>, readonly string[]>>().to(equal<readonly any[]>);
    expect<Call1<MixInto$<readonly string[]>, any>>().to(equal<readonly any[]>);
    expect<Call2<Arr.Mix$$, readonly string[], any>>().to(equal<readonly any[]>);

    expect<Arr.Mix<{ a?: string; b: number; c: readonly string[] }[], never>>().to(
      equal<{ a?: string; b: number; c: readonly string[] }[]>,
    );
    expect<Call1<Arr.Mix$<never>, { a?: string; b: number; c: readonly string[] }[]>>().to(
      equal<{ a?: string; b: number; c: readonly string[] }[]>,
    );
    expect<Call1<MixInto$<{ a?: string; b: number; c: readonly string[] }[]>, never>>().to(
      equal<{ a?: string; b: number; c: readonly string[] }[]>,
    );
    expect<Call2<Arr.Mix$$, { a?: string; b: number; c: readonly string[] }[], never>>().to(
      equal<{ a?: string; b: number; c: readonly string[] }[]>,
    );

    expect<Arr.Mix<unknown[], boolean>>().to(equal<unknown[]>);
    expect<Call1<Arr.Mix$<boolean>, unknown[]>>().to(equal<unknown[]>);
    expect<Call1<MixInto$<unknown[]>, boolean>>().to(equal<unknown[]>);
    expect<Call2<Arr.Mix$$, unknown[], boolean>>().to(equal<unknown[]>);
  });

  it("should work for mixed readonly and non-readonly arrays or tuples", () => {
    expect<Arr.Mix<(string | number)[] | readonly string[], boolean>>().to(
      equal<(string | number | boolean)[] | readonly (string | boolean)[]>,
    );
    expect<Call1<Arr.Mix$<boolean>, (string | number)[] | readonly string[]>>().to(
      equal<(string | number | boolean)[] | readonly (string | boolean)[]>,
    );
    expect<Call1<MixInto$<(string | number)[] | readonly string[]>, boolean>>().to(
      equal<(string | number | boolean)[] | readonly (string | boolean)[]>,
    );
    expect<Call2<Arr.Mix$$, (string | number)[] | readonly string[], boolean>>().to(
      equal<(string | number | boolean)[] | readonly (string | boolean)[]>,
    );
  });

  it("should do nothing for empty tuples", () => {
    expect<Arr.Mix<[], string>>().to(equal<[]>);
    expect<Call1<Arr.Mix$<string>, []>>().to(equal<[]>);
    expect<Call1<MixInto$<[]>, string>>().to(equal<[]>);
    expect<Call2<Arr.Mix$$, [], string>>().to(equal<[]>);

    expect<Arr.Mix<readonly [], string>>().to(equal<readonly []>);
    expect<Call1<Arr.Mix$<string>, readonly []>>().to(equal<readonly []>);
    expect<Call1<MixInto$<readonly []>, string>>().to(equal<readonly []>);
    expect<Call2<Arr.Mix$$, readonly [], string>>().to(equal<readonly []>);
  });

  it("should return `never` if the array type is `never`", () => {
    expect<Arr.Mix<never, boolean>>().to(beNever);
    expect<Call1<Arr.Mix$<boolean>, never>>().to(beNever);
    expect<Call1<MixInto$<never>, boolean>>().to(beNever);
    expect<Call2<Arr.Mix$$, never, boolean>>().to(beNever);
  });

  it("should return `readonly any[]` if the array type is `any`", () => {
    expect<Arr.Mix<any, boolean>>().to(equal<readonly any[]>);
    expect<Call1<Arr.Mix$<boolean>, any>>().to(equal<readonly any[]>);
    expect<Call1<MixInto$<any>, boolean>>().to(equal<readonly any[]>);
    expect<Call2<Arr.Mix$$, any, boolean>>().to(equal<readonly any[]>);
  });

  it("should accept only array or tuple types", () => {
    // @ts-expect-error
    expect<Arr.Mix<boolean, string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Mix$<string>, boolean>>().to(error);
    // @ts-expect-error
    expect<Call1<MixInto$<boolean>, string>>().to(error);
    // @ts-expect-error
    expect<Call2<Arr.Mix$$, boolean, string>>().to(error);

    // @ts-expect-error
    expect<Arr.Mix<unknown, number>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Mix$<number>, unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<MixInto$<unknown>, number>>().to(error);
    // @ts-expect-error
    expect<Call2<Arr.Mix$$, unknown, number>>().to(error);
  });
});
