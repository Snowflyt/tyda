import type { TypeGuard, TypeIs, TypeIsNot } from "@tyda/core";
import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.IsWritable", () => {
  it("should be of correct signature", () => {
    expect<Arr.IsWritable$>().to(beOfSig<(self: readonly unknown[]) => TypeGuard<unknown[]>>);
  });

  it("should return `true` for non-readonly arrays or tuples", () => {
    expect<Arr.IsWritable<string[]>>().to(equal<TypeIs<unknown[]>>);
    expect<Call1<Arr.IsWritable$, string[]>>().to(equal<TypeIs<unknown[]>>);

    expect<Arr.IsWritable<(string | number)[]>>().to(equal<TypeIs<unknown[]>>);
    expect<Call1<Arr.IsWritable$, (string | number)[]>>().to(equal<TypeIs<unknown[]>>);

    expect<Arr.IsWritable<never[]>>().to(equal<TypeIs<unknown[]>>);
    expect<Call1<Arr.IsWritable$, never[]>>().to(equal<TypeIs<unknown[]>>);

    expect<Arr.IsWritable<any[]>>().to(equal<TypeIs<unknown[]>>);
    expect<Call1<Arr.IsWritable$, any[]>>().to(equal<TypeIs<unknown[]>>);

    expect<Arr.IsWritable<{}[]>>().to(equal<TypeIs<unknown[]>>);
    expect<Call1<Arr.IsWritable$, {}[]>>().to(equal<TypeIs<unknown[]>>);

    expect<Arr.IsWritable<{ a: string }[]>>().to(equal<TypeIs<unknown[]>>);
    expect<Call1<Arr.IsWritable$, { a: string }[]>>().to(equal<TypeIs<unknown[]>>);

    expect<Arr.IsWritable<{ a: string }[][]>>().to(equal<TypeIs<unknown[]>>);
    expect<Call1<Arr.IsWritable$, { a: string }[][]>>().to(equal<TypeIs<unknown[]>>);
  });

  it("should return `false` for readonly arrays or tuples", () => {
    expect<Arr.IsWritable<readonly string[]>>().to(equal<TypeIsNot<unknown[]>>);
    expect<Call1<Arr.IsWritable$, readonly string[]>>().to(equal<TypeIsNot<unknown[]>>);

    expect<Arr.IsWritable<readonly (string | number)[]>>().to(equal<TypeIsNot<unknown[]>>);
    expect<Call1<Arr.IsWritable$, readonly (string | number)[]>>().to(equal<TypeIsNot<unknown[]>>);

    expect<Arr.IsWritable<readonly never[]>>().to(equal<TypeIsNot<unknown[]>>);
    expect<Call1<Arr.IsWritable$, readonly never[]>>().to(equal<TypeIsNot<unknown[]>>);

    expect<Arr.IsWritable<readonly any[]>>().to(equal<TypeIsNot<unknown[]>>);
    expect<Call1<Arr.IsWritable$, readonly any[]>>().to(equal<TypeIsNot<unknown[]>>);

    expect<Arr.IsWritable<readonly {}[]>>().to(equal<TypeIsNot<unknown[]>>);
    expect<Call1<Arr.IsWritable$, readonly {}[]>>().to(equal<TypeIsNot<unknown[]>>);

    expect<Arr.IsWritable<readonly { a: string }[]>>().to(equal<TypeIsNot<unknown[]>>);
    expect<Call1<Arr.IsWritable$, readonly { a: string }[]>>().to(equal<TypeIsNot<unknown[]>>);

    expect<Arr.IsWritable<readonly { a: string }[][]>>().to(equal<TypeIsNot<unknown[]>>);
    expect<Call1<Arr.IsWritable$, readonly { a: string }[][]>>().to(equal<TypeIsNot<unknown[]>>);
  });

  it("should return `boolean` for mixed readonly and non-readonly arrays or tuples", () => {
    expect<Arr.IsWritable<(string | number)[] | readonly string[]>>().to(
      equal<TypeGuard<unknown[]>>,
    );
    expect<Call1<Arr.IsWritable$, (string | number)[] | readonly string[]>>().to(
      equal<TypeGuard<unknown[]>>,
    );

    expect<Arr.IsWritable<number[] | readonly number[]>>().to(equal<TypeGuard<unknown[]>>);
    expect<Call1<Arr.IsWritable$, number[] | readonly number[]>>().to(equal<TypeGuard<unknown[]>>);
  });

  it("should return `never` for `never`", () => {
    expect<Arr.IsWritable<never>>().to(beNever);
    expect<Call1<Arr.IsWritable$, never>>().to(beNever);
  });

  it("should return `boolean` for `any`", () => {
    expect<Arr.IsWritable<any>>().to(equal<TypeGuard<unknown[]>>);
    expect<Call1<Arr.IsWritable$, any>>().to(equal<TypeGuard<unknown[]>>);
  });

  it("should accept only array or tuple types", () => {
    // @ts-expect-error
    expect<Arr.IsWritable<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsWritable$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.IsWritable<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsWritable$, unknown>>().to(error);

    // @ts-expect-error
    expect<Arr.IsWritable<{}>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsWritable$, {}>>().to(error);
  });
});
