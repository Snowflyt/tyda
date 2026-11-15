import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beFalse, beNever, beTrue, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.IsReadonly", () => {
  it("should be of correct signature", () => {
    expect<Arr.IsReadonly$>().to(beOfSig<(self: readonly unknown[]) => boolean>);
  });

  it("should return `true` for readonly arrays or tuples", () => {
    expect<Arr.IsReadonly<readonly string[]>>().to(beTrue);
    expect<Call1<Arr.IsReadonly$, readonly string[]>>().to(beTrue);

    expect<Arr.IsReadonly<readonly (string | number)[]>>().to(beTrue);
    expect<Call1<Arr.IsReadonly$, readonly (string | number)[]>>().to(beTrue);

    expect<Arr.IsReadonly<readonly never[]>>().to(beTrue);
    expect<Call1<Arr.IsReadonly$, readonly never[]>>().to(beTrue);

    expect<Arr.IsReadonly<readonly any[]>>().to(beTrue);
    expect<Call1<Arr.IsReadonly$, readonly any[]>>().to(beTrue);

    expect<Arr.IsReadonly<readonly {}[]>>().to(beTrue);
    expect<Call1<Arr.IsReadonly$, readonly {}[]>>().to(beTrue);

    expect<Arr.IsReadonly<readonly { a: string }[]>>().to(beTrue);
    expect<Call1<Arr.IsReadonly$, readonly { a: string }[]>>().to(beTrue);

    expect<Arr.IsReadonly<readonly { a: string }[][]>>().to(beTrue);
    expect<Call1<Arr.IsReadonly$, readonly { a: string }[][]>>().to(beTrue);
  });

  it("should return `false` for non-readonly arrays or tuples", () => {
    expect<Arr.IsReadonly<string[]>>().to(beFalse);
    expect<Call1<Arr.IsReadonly$, string[]>>().to(beFalse);

    expect<Arr.IsReadonly<(string | number)[]>>().to(beFalse);
    expect<Call1<Arr.IsReadonly$, (string | number)[]>>().to(beFalse);

    expect<Arr.IsReadonly<never[]>>().to(beFalse);
    expect<Call1<Arr.IsReadonly$, never[]>>().to(beFalse);

    expect<Arr.IsReadonly<any[]>>().to(beFalse);
    expect<Call1<Arr.IsReadonly$, any[]>>().to(beFalse);

    expect<Arr.IsReadonly<{}[]>>().to(beFalse);
    expect<Call1<Arr.IsReadonly$, {}[]>>().to(beFalse);

    expect<Arr.IsReadonly<{ a: string }[]>>().to(beFalse);
    expect<Call1<Arr.IsReadonly$, { a: string }[]>>().to(beFalse);

    expect<Arr.IsReadonly<{ a: string }[][]>>().to(beFalse);
    expect<Call1<Arr.IsReadonly$, { a: string }[][]>>().to(beFalse);
  });

  it("should return `boolean` for mixed readonly and non-readonly arrays or tuples", () => {
    expect<Arr.IsReadonly<(string | number)[] | readonly string[]>>().to(equal<boolean>);
    expect<Call1<Arr.IsReadonly$, (string | number)[] | readonly string[]>>().to(equal<boolean>);

    expect<Arr.IsReadonly<number[] | readonly number[]>>().to(equal<boolean>);
    expect<Call1<Arr.IsReadonly$, number[] | readonly number[]>>().to(equal<boolean>);
  });

  it("should return `never` for `never`", () => {
    expect<Arr.IsReadonly<never>>().to(beNever);
    expect<Call1<Arr.IsReadonly$, never>>().to(beNever);
  });

  it("should return `boolean` for `any`", () => {
    expect<Arr.IsReadonly<any>>().to(equal<boolean>);
    expect<Call1<Arr.IsReadonly$, any>>().to(equal<boolean>);
  });

  it("should accept only array or tuple types", () => {
    // @ts-expect-error
    expect<Arr.IsReadonly<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsReadonly$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.IsReadonly<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsReadonly$, unknown>>().to(error);

    // @ts-expect-error
    expect<Arr.IsReadonly<{}>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.IsReadonly$, {}>>().to(error);
  });
});
