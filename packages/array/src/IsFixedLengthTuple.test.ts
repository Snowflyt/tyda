import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beFalse, beNever, beTrue, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.IsFixedLengthTuple", () => {
  it("should be of correct signature", () => {
    expect<Arr.IsFixedLengthTuple$>().to(beOfSig<(self: readonly unknown[]) => boolean>);
  });

  it("should return `true` for fixed length tuples", () => {
    expect<Arr.IsFixedLengthTuple<[1, 2, 3]>>().to(beTrue);
    expect<Arr.IsFixedLengthTuple<readonly [1, 2, 3]>>().to(beTrue);
    expect<Call1<Arr.IsFixedLengthTuple$, [1, 2, 3]>>().to(beTrue);
    expect<Call1<Arr.IsFixedLengthTuple$, readonly [1, 2, 3]>>().to(beTrue);

    expect<Arr.IsFixedLengthTuple<["foo", 42]>>().to(beTrue);
    expect<Arr.IsFixedLengthTuple<readonly ["foo", 42]>>().to(beTrue);
    expect<Call1<Arr.IsFixedLengthTuple$, ["foo", 42]>>().to(beTrue);
    expect<Call1<Arr.IsFixedLengthTuple$, readonly ["foo", 42]>>().to(beTrue);

    expect<Arr.IsFixedLengthTuple<[boolean]>>().to(beTrue);
    expect<Arr.IsFixedLengthTuple<readonly [boolean]>>().to(beTrue);
    expect<Call1<Arr.IsFixedLengthTuple$, [boolean]>>().to(beTrue);
    expect<Call1<Arr.IsFixedLengthTuple$, readonly [boolean]>>().to(beTrue);

    expect<Arr.IsFixedLengthTuple<[]>>().to(beTrue);
    expect<Arr.IsFixedLengthTuple<readonly []>>().to(beTrue);
    expect<Call1<Arr.IsFixedLengthTuple$, []>>().to(beTrue);
    expect<Call1<Arr.IsFixedLengthTuple$, readonly []>>().to(beTrue);
  });

  it("should return `false` for non-fixed length tuples", () => {
    expect<Arr.IsFixedLengthTuple<[1, 2, ...number[]]>>().to(beFalse);
    expect<Arr.IsFixedLengthTuple<readonly [1, 2, ...number[]]>>().to(beFalse);
    expect<Call1<Arr.IsFixedLengthTuple$, [1, 2, ...number[]]>>().to(beFalse);
    expect<Call1<Arr.IsFixedLengthTuple$, readonly [1, 2, ...number[]]>>().to(beFalse);

    expect<Arr.IsFixedLengthTuple<[42, ...("foo" | true)[]]>>().to(beFalse);
    expect<Arr.IsFixedLengthTuple<readonly [42, ...(readonly ("foo" | true)[])]>>().to(beFalse);
    expect<Call1<Arr.IsFixedLengthTuple$, [42, ...("foo" | true)[]]>>().to(beFalse);
    expect<Call1<Arr.IsFixedLengthTuple$, readonly [42, ...(readonly ("foo" | true)[])]>>().to(
      beFalse,
    );
  });

  it("should return `false` for non-tuples", () => {
    expect<Arr.IsFixedLengthTuple<string[]>>().to(beFalse);
    expect<Arr.IsFixedLengthTuple<readonly string[]>>().to(beFalse);
    expect<Call1<Arr.IsFixedLengthTuple$, string[]>>().to(beFalse);
    expect<Call1<Arr.IsFixedLengthTuple$, readonly string[]>>().to(beFalse);

    expect<Arr.IsFixedLengthTuple<("foo" | true)[]>>().to(beFalse);
    expect<Arr.IsFixedLengthTuple<readonly ("foo" | true)[]>>().to(beFalse);
    expect<Call1<Arr.IsFixedLengthTuple$, ("foo" | true)[]>>().to(beFalse);
    expect<Call1<Arr.IsFixedLengthTuple$, readonly ("foo" | true)[]>>().to(beFalse);
  });

  it("should return `boolean` for mixed fixed length tuples and non-fixed length ones", () => {
    expect<Arr.IsFixedLengthTuple<[1, 2, ...number[]] | [1, 2, 3]>>().to(equal<boolean>);
    expect<Arr.IsFixedLengthTuple<readonly [1, 2, ...number[]] | readonly [1, 2, 3]>>().to(
      equal<boolean>,
    );
    expect<Call1<Arr.IsFixedLengthTuple$, [1, 2, ...number[]] | [1, 2, 3]>>().to(equal<boolean>);
    expect<Call1<Arr.IsFixedLengthTuple$, readonly [1, 2, ...number[]] | readonly [1, 2, 3]>>().to(
      equal<boolean>,
    );

    expect<Arr.IsFixedLengthTuple<number[] | [1, 2, 3]>>().to(equal<boolean>);
    expect<Arr.IsFixedLengthTuple<readonly number[] | [1, 2, 3]>>().to(equal<boolean>);
    expect<Call1<Arr.IsFixedLengthTuple$, number[] | [1, 2, 3]>>().to(equal<boolean>);
    expect<Call1<Arr.IsFixedLengthTuple$, readonly number[] | [1, 2, 3]>>().to(equal<boolean>);
  });

  it("should return `never` for `never`", () => {
    expect<Arr.IsFixedLengthTuple<never>>().to(beNever);
    expect<Call1<Arr.IsFixedLengthTuple$, never>>().to(beNever);
  });

  it("should return `boolean` for `any`", () => {
    expect<Arr.IsFixedLengthTuple<any>>().to(equal<boolean>);
    expect<Call1<Arr.IsFixedLengthTuple$, any>>().to(equal<boolean>);
  });

  it("should accept only array or tuple types", () => {
    // @ts-expect-error
    expect<Arr.IsFixedLengthTuple<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsFixedLengthTuple$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.IsFixedLengthTuple<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsFixedLengthTuple$, unknown>>().to(error);

    // @ts-expect-error
    expect<Arr.IsFixedLengthTuple<{}>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsFixedLengthTuple$, {}>>().to(error);
  });
});
