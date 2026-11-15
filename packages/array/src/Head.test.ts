import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beAny, beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.Head", () => {
  it("should be of correct signature", () => {
    expect<Arr.Head$>().to(beOfSig<<A>(self: readonly [A, ...unknown[]]) => A>);
  });

  it("should get the first element of a non-empty tuple", () => {
    expect<Arr.Head<[string, number, boolean]>>().to(equal<string>);
    expect<Arr.Head<readonly [string, number, boolean]>>().to(equal<string>);
    expect<Call1<Arr.Head$, [string, number, boolean]>>().to(equal<string>);
    expect<Call1<Arr.Head$, readonly [string, number, boolean]>>().to(equal<string>);

    expect<Arr.Head<[1, 2, 3]>>().to(equal<1>);
    expect<Arr.Head<readonly [1, 2, 3]>>().to(equal<1>);
    expect<Call1<Arr.Head$, [1, 2, 3]>>().to(equal<1>);
    expect<Call1<Arr.Head$, readonly [1, 2, 3]>>().to(equal<1>);

    expect<Arr.Head<["foo"]>>().to(equal<"foo">);
    expect<Arr.Head<readonly ["foo"]>>().to(equal<"foo">);
    expect<Call1<Arr.Head$, ["foo"]>>().to(equal<"foo">);
    expect<Call1<Arr.Head$, readonly ["foo"]>>().to(equal<"foo">);
  });

  it("should handle union of tuples", () => {
    expect<Arr.Head<[1, 2] | [true, false]>>().to(equal<1 | true>);
    expect<Arr.Head<readonly [1, 2] | [true, false]>>().to(equal<1 | true>);
    expect<Arr.Head<[1, 2] | readonly [true, false]>>().to(equal<1 | true>);
    expect<Arr.Head<readonly [1, 2] | readonly [true, false]>>().to(equal<1 | true>);
    expect<Call1<Arr.Head$, [1, 2] | [true, false]>>().to(equal<1 | true>);
    expect<Call1<Arr.Head$, readonly [1, 2] | [true, false]>>().to(equal<1 | true>);
    expect<Call1<Arr.Head$, [1, 2] | readonly [true, false]>>().to(equal<1 | true>);
    expect<Call1<Arr.Head$, readonly [1, 2] | readonly [true, false]>>().to(equal<1 | true>);

    expect<Arr.Head<["foo"] | [42]>>().to(equal<"foo" | 42>);
    expect<Arr.Head<readonly ["foo"] | [42]>>().to(equal<"foo" | 42>);
    expect<Arr.Head<["foo"] | readonly [42]>>().to(equal<"foo" | 42>);
    expect<Arr.Head<readonly ["foo"] | readonly [42]>>().to(equal<"foo" | 42>);
    expect<Call1<Arr.Head$, ["foo"] | [42]>>().to(equal<"foo" | 42>);
    expect<Call1<Arr.Head$, readonly ["foo"] | [42]>>().to(equal<"foo" | 42>);
    expect<Call1<Arr.Head$, ["foo"] | readonly [42]>>().to(equal<"foo" | 42>);
    expect<Call1<Arr.Head$, readonly ["foo"] | readonly [42]>>().to(equal<"foo" | 42>);
  });

  it("should return `never` for `never`", () => {
    expect<Arr.Head<never>>().to(beNever);
    expect<Call1<Arr.Head$, never>>().to(beNever);
  });

  it("should return `any` for `any`", () => {
    expect<Arr.Head<any>>().to(beAny);
    expect<Call1<Arr.Head$, any>>().to(beAny);
  });

  it("should accept only non-empty tuples", () => {
    // @ts-expect-error
    expect<Arr.Head<[]>>().to(error);
    // @ts-expect-error
    expect<Arr.Head<readonly []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Head$, []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Head$, readonly []>>().to(error);

    // @ts-expect-error
    expect<Arr.Head<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Head$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.Head<string[]>>().to(error);
    // @ts-expect-error
    expect<Arr.Head<readonly string[]>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Head$, string[]>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Head$, readonly string[]>>().to(error);

    // @ts-expect-error
    expect<Arr.Head<["foo"] | []>>().to(error);
    // @ts-expect-error
    expect<Arr.Head<readonly ["foo"] | []>>().to(error);
    // @ts-expect-error
    expect<Arr.Head<["foo"] | readonly []>>().to(error);
    // @ts-expect-error
    expect<Arr.Head<readonly ["foo"] | readonly []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Head$, ["foo"] | []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Head$, readonly ["foo"] | []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Head$, ["foo"] | readonly []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Head$, readonly ["foo"] | readonly []>>().to(error);
  });
});
