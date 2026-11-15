import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beFalse, beNever, beTrue, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.IsTuple", () => {
  it("should be of correct signature", () => {
    expect<Arr.IsTuple$>().to(beOfSig<(self: readonly unknown[]) => boolean>);
  });

  it("should return `true` for tuples", () => {
    expect<Arr.IsTuple<["foo", "bar"]>>().to(beTrue);
    expect<Arr.IsTuple<readonly ["foo", "bar"]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, ["foo", "bar"]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly ["foo", "bar"]>>().to(beTrue);

    expect<Arr.IsTuple<["foo", 42]>>().to(beTrue);
    expect<Arr.IsTuple<readonly ["foo", 42]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, ["foo", 42]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly ["foo", 42]>>().to(beTrue);

    expect<Arr.IsTuple<[boolean]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [boolean]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [boolean]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [boolean]>>().to(beTrue);

    expect<Arr.IsTuple<[1, 2, ...number[]]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [1, 2, ...number[]]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [1, 2, ...number[]]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [1, 2, ...number[]]>>().to(beTrue);

    expect<Arr.IsTuple<[42, ...("foo" | true)[]]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [42, ...(readonly ("foo" | true)[])]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [42, ...("foo" | true)[]]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [42, ...(readonly ("foo" | true)[])]>>().to(beTrue);

    expect<Arr.IsTuple<[1, 2, ...number[]] | ["foo", "bar"]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [1, 2, ...number[]] | readonly ["foo", "bar"]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [1, 2, ...number[]] | ["foo", "bar"]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [1, 2, ...number[]] | readonly ["foo", "bar"]>>().to(
      beTrue,
    );

    expect<Arr.IsTuple<[]>>().to(beTrue);
    expect<Arr.IsTuple<readonly []>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, []>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly []>>().to(beTrue);
  });

  it("should return `false` for non-tuples", () => {
    expect<Arr.IsTuple<string[]>>().to(beFalse);
    expect<Arr.IsTuple<readonly string[]>>().to(beFalse);
    expect<Call1<Arr.IsTuple$, string[]>>().to(beFalse);
    expect<Call1<Arr.IsTuple$, readonly string[]>>().to(beFalse);

    expect<Arr.IsTuple<[...string[]]>>().to(beFalse);
    expect<Arr.IsTuple<readonly [...string[]]>>().to(beFalse);
    expect<Call1<Arr.IsTuple$, [...string[]]>>().to(beFalse);
    expect<Call1<Arr.IsTuple$, readonly [...string[]]>>().to(beFalse);

    expect<Arr.IsTuple<("foo" | true)[]>>().to(beFalse);
    expect<Arr.IsTuple<readonly ("foo" | true)[]>>().to(beFalse);
    expect<Call1<Arr.IsTuple$, ("foo" | true)[]>>().to(beFalse);
    expect<Call1<Arr.IsTuple$, readonly ("foo" | true)[]>>().to(beFalse);

    expect<Arr.IsTuple<[...("foo" | true)[]]>>().to(beFalse);
    expect<Arr.IsTuple<readonly [...("foo" | true)[]]>>().to(beFalse);
    expect<Call1<Arr.IsTuple$, [...("foo" | true)[]]>>().to(beFalse);
    expect<Call1<Arr.IsTuple$, readonly [...("foo" | true)[]]>>().to(beFalse);
  });

  it("should return `boolean` for mixed tuples and non-tuples", () => {
    expect<Arr.IsTuple<number[] | ["foo", "bar"]>>().to(equal<boolean>);
    expect<Arr.IsTuple<readonly number[] | ["foo", "bar"]>>().to(equal<boolean>);
    expect<Call1<Arr.IsTuple$, number[] | ["foo", "bar"]>>().to(equal<boolean>);
    expect<Call1<Arr.IsTuple$, readonly number[] | ["foo", "bar"]>>().to(equal<boolean>);
  });

  it("should handle tuples with optional elements", () => {
    expect<Arr.IsTuple<[string?]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [string?]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [string?]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [string?]>>().to(beTrue);

    expect<Arr.IsTuple<[string?, number?]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [string?, number?]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [string?, number?]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [string?, number?]>>().to(beTrue);

    expect<Arr.IsTuple<[string, number?]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [string, number?]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [string, number?]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [string, number?]>>().to(beTrue);
  });

  it("should handle tuples with rest elements", () => {
    expect<Arr.IsTuple<[string, ...number[]]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [string, ...number[]]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [string, ...number[]]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [string, ...number[]]>>().to(beTrue);

    expect<Arr.IsTuple<[...string[], number, boolean]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [...string[], number, boolean]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [...string[], number, boolean]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [...string[], number, boolean]>>().to(beTrue);
  });

  it("should handle tuples with mixed optional and rest elements", () => {
    expect<Arr.IsTuple<[string?, ...number[]]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [string?, ...number[]]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [string?, ...number[]]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [string?, ...number[]]>>().to(beTrue);

    expect<Arr.IsTuple<[string, boolean?, ...number[]]>>().to(beTrue);
    expect<Arr.IsTuple<readonly [string, boolean?, ...number[]]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, [string, boolean?, ...number[]]>>().to(beTrue);
    expect<Call1<Arr.IsTuple$, readonly [string, boolean?, ...number[]]>>().to(beTrue);
  });

  it("should return `never` for `never`", () => {
    expect<Arr.IsTuple<never>>().to(beNever);
    expect<Call1<Arr.IsTuple$, never>>().to(beNever);
  });

  it("should return `boolean` for `any`", () => {
    expect<Arr.IsTuple<any>>().to(equal<boolean>);
    expect<Call1<Arr.IsTuple$, any>>().to(equal<boolean>);
  });

  it("should accept only array or tuple types", () => {
    // @ts-expect-error
    expect<Arr.IsTuple<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsTuple$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.IsTuple<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsTuple$, unknown>>().to(error);

    // @ts-expect-error
    expect<Arr.IsTuple<{}>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsTuple$, {}>>().to(error);
  });
});
