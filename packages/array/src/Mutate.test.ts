import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, Call2, PartialApply } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

type MutateInto$<Self extends readonly unknown[]> = PartialApply<Arr.Mutate$$, [Self]>;

describe("Arr.Mutate", () => {
  it("should be of correct signature", () => {
    expect<Arr.Mutate$<string>>().to(beOfSig<(self: readonly unknown[]) => readonly string[]>);
    expect<Arr.Mutate$<number>>().to(beOfSig<(self: readonly unknown[]) => readonly number[]>);
    expect<MutateInto$<string[]>>().to(beOfSig<<B>(b: B) => readonly B[]>);
    expect<MutateInto$<readonly number[]>>().to(beOfSig<<B>(b: B) => readonly B[]>);
    expect<Arr.Mutate$$>().to(beOfSig<<B>(self: readonly unknown[], b: B) => readonly B[]>);
  });

  it("should mutate element type of an array", () => {
    expect<Arr.Mutate<string[], number>>().to(equal<number[]>);
    expect<Call1<Arr.Mutate$<number>, string[]>>().to(equal<number[]>);
    expect<Call1<MutateInto$<string[]>, number>>().to(equal<number[]>);
    expect<Call2<Arr.Mutate$$, string[], number>>().to(equal<number[]>);

    expect<Arr.Mutate<readonly number[], string>>().to(equal<readonly string[]>);
    expect<Call1<Arr.Mutate$<string>, readonly number[]>>().to(equal<readonly string[]>);
    expect<Call1<MutateInto$<readonly number[]>, string>>().to(equal<readonly string[]>);
    expect<Call2<Arr.Mutate$$, readonly number[], string>>().to(equal<readonly string[]>);

    expect<Arr.Mutate<number[], "foo">>().to(equal<"foo"[]>);
    expect<Call1<Arr.Mutate$<"foo">, number[]>>().to(equal<"foo"[]>);
    expect<Call1<MutateInto$<number[]>, "foo">>().to(equal<"foo"[]>);
    expect<Call2<Arr.Mutate$$, number[], "foo">>().to(equal<"foo"[]>);

    expect<Arr.Mutate<(string | number)[], boolean | "foo">>().to(equal<(boolean | "foo")[]>);
    expect<Call1<Arr.Mutate$<boolean | "foo">, (string | number)[]>>().to(
      equal<(boolean | "foo")[]>,
    );
    expect<Call1<MutateInto$<(string | number)[]>, boolean | "foo">>().to(
      equal<(boolean | "foo")[]>,
    );
    expect<Call2<Arr.Mutate$$, (string | number)[], boolean | "foo">>().to(
      equal<(boolean | "foo")[]>,
    );

    expect<Arr.Mutate<{}[], boolean>>().to(equal<boolean[]>);
    expect<Call1<Arr.Mutate$<boolean>, {}[]>>().to(equal<boolean[]>);
    expect<Call1<MutateInto$<{}[]>, boolean>>().to(equal<boolean[]>);
    expect<Call2<Arr.Mutate$$, {}[], boolean>>().to(equal<boolean[]>);

    expect<Arr.Mutate<never[], boolean>>().to(equal<boolean[]>);
    expect<Call1<Arr.Mutate$<boolean>, never[]>>().to(equal<boolean[]>);
    expect<Call1<MutateInto$<never[]>, boolean>>().to(equal<boolean[]>);
    expect<Call2<Arr.Mutate$$, never[], boolean>>().to(equal<boolean[]>);

    expect<Arr.Mutate<any[], boolean>>().to(equal<boolean[]>);
    expect<Call1<Arr.Mutate$<boolean>, any[]>>().to(equal<boolean[]>);
    expect<Call1<MutateInto$<any[]>, boolean>>().to(equal<boolean[]>);
    expect<Call2<Arr.Mutate$$, any[], boolean>>().to(equal<boolean[]>);

    expect<Arr.Mutate<readonly string[], any>>().to(equal<readonly any[]>);
    expect<Call1<Arr.Mutate$<any>, readonly string[]>>().to(equal<readonly any[]>);
    expect<Call1<MutateInto$<readonly string[]>, any>>().to(equal<readonly any[]>);
    expect<Call2<Arr.Mutate$$, readonly string[], any>>().to(equal<readonly any[]>);

    expect<Arr.Mutate<{ a?: string; b: number; c: readonly string[] }[], never>>().to(
      equal<never[]>,
    );
    expect<Call1<Arr.Mutate$<never>, { a?: string; b: number; c: readonly string[] }[]>>().to(
      equal<never[]>,
    );
    expect<Call1<MutateInto$<{ a?: string; b: number; c: readonly string[] }[]>, never>>().to(
      equal<never[]>,
    );
    expect<Call2<Arr.Mutate$$, { a?: string; b: number; c: readonly string[] }[], never>>().to(
      equal<never[]>,
    );

    expect<Arr.Mutate<boolean[], unknown>>().to(equal<unknown[]>);
    expect<Call1<Arr.Mutate$<unknown>, boolean[]>>().to(equal<unknown[]>);
    expect<Call1<MutateInto$<boolean[]>, unknown>>().to(equal<unknown[]>);
    expect<Call2<Arr.Mutate$$, boolean[], unknown>>().to(equal<unknown[]>);
  });

  it("should work for mixed readonly and non-readonly arrays or tuples", () => {
    expect<Arr.Mutate<(string | number)[] | readonly string[], boolean | "foo">>().to(
      equal<(boolean | "foo")[] | readonly (boolean | "foo")[]>,
    );
    expect<Call1<Arr.Mutate$<boolean | "foo">, (string | number)[] | readonly string[]>>().to(
      equal<(boolean | "foo")[] | readonly (boolean | "foo")[]>,
    );
    expect<Call1<MutateInto$<(string | number)[] | readonly string[]>, boolean | "foo">>().to(
      equal<(boolean | "foo")[] | readonly (boolean | "foo")[]>,
    );
    expect<Call2<Arr.Mutate$$, (string | number)[] | readonly string[], boolean | "foo">>().to(
      equal<(boolean | "foo")[] | readonly (boolean | "foo")[]>,
    );
  });

  it("should do nothing for empty tuples", () => {
    expect<Arr.Mutate<[], string>>().to(equal<[]>);
    expect<Call1<Arr.Mutate$<string>, []>>().to(equal<[]>);
    expect<Call1<MutateInto$<[]>, string>>().to(equal<[]>);
    expect<Call2<Arr.Mutate$$, [], string>>().to(equal<[]>);

    expect<Arr.Mutate<readonly [], string>>().to(equal<readonly []>);
    expect<Call1<Arr.Mutate$<string>, readonly []>>().to(equal<readonly []>);
    expect<Call1<MutateInto$<readonly []>, string>>().to(equal<readonly []>);
    expect<Call2<Arr.Mutate$$, readonly [], string>>().to(equal<readonly []>);
  });

  it("should return `never` if the array type is `never`", () => {
    expect<Arr.Mutate<never, boolean>>().to(beNever);
    expect<Call1<Arr.Mutate$<boolean>, never>>().to(beNever);
    expect<Call1<MutateInto$<never>, boolean>>().to(beNever);
    expect<Call2<Arr.Mutate$$, never, boolean>>().to(beNever);
  });

  it("should return the mutated array type if the array type is `any`", () => {
    expect<Arr.Mutate<any, boolean>>().to(equal<readonly boolean[]>);
    expect<Call1<Arr.Mutate$<boolean>, any>>().to(equal<readonly boolean[]>);
    expect<Call1<MutateInto$<any>, boolean>>().to(equal<readonly boolean[]>);
    expect<Call2<Arr.Mutate$$, any, boolean>>().to(equal<readonly boolean[]>);
  });

  it("should accept only array or tuple types", () => {
    // @ts-expect-error
    expect<Arr.Mutate<boolean, string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Mutate$<string>, boolean>>().to(error);
    // @ts-expect-error
    expect<Call1<MutateInto$<boolean>, string>>().to(error);
    // @ts-expect-error
    expect<Call2<Arr.Mutate$$, boolean, string>>().to(error);

    // @ts-expect-error
    expect<Arr.Mutate<number, unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Mutate$<unknown>, number>>().to(error);
    // @ts-expect-error
    expect<Call1<MutateInto$<number>, unknown>>().to(error);
    // @ts-expect-error
    expect<Call2<Arr.Mutate$$, number, unknown>>().to(error);
  });
});
