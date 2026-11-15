import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.UnsafeHead", () => {
  it("should be of correct signature", () => {
    expect<Arr.UnsafeHead$>().to(beOfSig<<A>(self: readonly A[]) => A>);
  });

  it("should get the first element of a non-empty tuple", () => {
    expect<Arr.UnsafeHead<[string, number, boolean]>>().to(equal<string>);
    expect<Arr.UnsafeHead<readonly [string, number, boolean]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, [string, number, boolean]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, readonly [string, number, boolean]>>().to(equal<string>);

    expect<Arr.UnsafeHead<[1, 2, 3]>>().to(equal<1>);
    expect<Arr.UnsafeHead<readonly [1, 2, 3]>>().to(equal<1>);
    expect<Call1<Arr.UnsafeHead$, [1, 2, 3]>>().to(equal<1>);
    expect<Call1<Arr.UnsafeHead$, readonly [1, 2, 3]>>().to(equal<1>);

    expect<Arr.UnsafeHead<["foo"]>>().to(equal<"foo">);
    expect<Arr.UnsafeHead<readonly ["foo"]>>().to(equal<"foo">);
    expect<Call1<Arr.UnsafeHead$, ["foo"]>>().to(equal<"foo">);
    expect<Call1<Arr.UnsafeHead$, readonly ["foo"]>>().to(equal<"foo">);
  });

  it("should return `None` for empty tuple", () => {
    expect<Arr.UnsafeHead<[]>>().to(beNever);
    expect<Arr.UnsafeHead<readonly []>>().to(beNever);
    expect<Call1<Arr.UnsafeHead$, []>>().to(beNever);
    expect<Call1<Arr.UnsafeHead$, readonly []>>().to(beNever);
  });

  it("should handle union of tuples", () => {
    expect<Arr.UnsafeHead<[1, 2] | [true, false]>>().to(equal<1 | true>);
    expect<Arr.UnsafeHead<readonly [1, 2] | [true, false]>>().to(equal<1 | true>);
    expect<Arr.UnsafeHead<[1, 2] | readonly [true, false]>>().to(equal<1 | true>);
    expect<Arr.UnsafeHead<readonly [1, 2] | readonly [true, false]>>().to(equal<1 | true>);
    expect<Call1<Arr.UnsafeHead$, [1, 2] | [true, false]>>().to(equal<1 | true>);
    expect<Call1<Arr.UnsafeHead$, readonly [1, 2] | [true, false]>>().to(equal<1 | true>);
    expect<Call1<Arr.UnsafeHead$, [1, 2] | readonly [true, false]>>().to(equal<1 | true>);
    expect<Call1<Arr.UnsafeHead$, readonly [1, 2] | readonly [true, false]>>().to(equal<1 | true>);

    expect<Arr.UnsafeHead<["foo"] | [42]>>().to(equal<"foo" | 42>);
    expect<Arr.UnsafeHead<readonly ["foo"] | [42]>>().to(equal<"foo" | 42>);
    expect<Arr.UnsafeHead<["foo"] | readonly [42]>>().to(equal<"foo" | 42>);
    expect<Arr.UnsafeHead<readonly ["foo"] | readonly [42]>>().to(equal<"foo" | 42>);
    expect<Call1<Arr.UnsafeHead$, ["foo"] | [42]>>().to(equal<"foo" | 42>);
    expect<Call1<Arr.UnsafeHead$, readonly ["foo"] | [42]>>().to(equal<"foo" | 42>);
    expect<Call1<Arr.UnsafeHead$, ["foo"] | readonly [42]>>().to(equal<"foo" | 42>);
    expect<Call1<Arr.UnsafeHead$, readonly ["foo"] | readonly [42]>>().to(equal<"foo" | 42>);

    expect<Arr.UnsafeHead<[] | [string]>>().to(equal<string>);
    expect<Arr.UnsafeHead<readonly [] | [string]>>().to(equal<string>);
    expect<Arr.UnsafeHead<[] | readonly [string]>>().to(equal<string>);
    expect<Arr.UnsafeHead<readonly [] | readonly [string]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, [] | [string]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, readonly [] | [string]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, [] | readonly [string]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, readonly [] | readonly [string]>>().to(equal<string>);
  });

  it("should return `A` for array", () => {
    expect<Arr.UnsafeHead<string[]>>().to(equal<string>);
    expect<Arr.UnsafeHead<readonly string[]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, string[]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, readonly string[]>>().to(equal<string>);

    expect<Arr.UnsafeHead<[...number[]]>>().to(equal<number>);
    expect<Arr.UnsafeHead<readonly [...number[]]>>().to(equal<number>);
    expect<Call1<Arr.UnsafeHead$, [...number[]]>>().to(equal<number>);
    expect<Call1<Arr.UnsafeHead$, readonly [...number[]]>>().to(equal<number>);
  });

  it("should handle tuples with only optional elements", () => {
    expect<Arr.UnsafeHead<[string?]>>().to(equal<string>);
    expect<Arr.UnsafeHead<readonly [string?]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, [string?]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, readonly [string?]>>().to(equal<string>);

    expect<Arr.UnsafeHead<[string?, number?]>>().to(equal<string | number>);
    expect<Arr.UnsafeHead<readonly [string?, number?]>>().to(equal<string | number>);
    expect<Call1<Arr.UnsafeHead$, [string?, number?]>>().to(equal<string | number>);
    expect<Call1<Arr.UnsafeHead$, readonly [string?, number?]>>().to(equal<string | number>);

    expect<Arr.UnsafeHead<[string?, boolean?, number?]>>().to(equal<string | boolean | number>);
    expect<Arr.UnsafeHead<readonly [string?, boolean?, number?]>>().to(
      equal<string | boolean | number>,
    );
    expect<Call1<Arr.UnsafeHead$, [string?, boolean?, number?]>>().to(
      equal<string | boolean | number>,
    );
    expect<Call1<Arr.UnsafeHead$, readonly [string?, boolean?, number?]>>().to(
      equal<string | boolean | number>,
    );
  });

  it("should distinguish between optional elements and elements that can be undefined", () => {
    expect<Arr.UnsafeHead<[string | undefined]>>().to(equal<string | undefined>);
    expect<Arr.UnsafeHead<readonly [string | undefined]>>().to(equal<string | undefined>);
    expect<Call1<Arr.UnsafeHead$, [string | undefined]>>().to(equal<string | undefined>);
    expect<Call1<Arr.UnsafeHead$, readonly [string | undefined]>>().to(equal<string | undefined>);

    expect<Arr.UnsafeHead<[(string | undefined)?]>>().to(equal<string | undefined>);
    expect<Arr.UnsafeHead<readonly [(string | undefined)?]>>().to(equal<string | undefined>);
    expect<Call1<Arr.UnsafeHead$, [(string | undefined)?]>>().to(equal<string | undefined>);
    expect<Call1<Arr.UnsafeHead$, readonly [(string | undefined)?]>>().to(
      equal<string | undefined>,
    );

    expect<Arr.UnsafeHead<[string?]>>().to(equal<string>);
    expect<Arr.UnsafeHead<readonly [string?]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, [string?]>>().to(equal<string>);
    expect<Call1<Arr.UnsafeHead$, readonly [string?]>>().to(equal<string>);
  });

  it("should handle tuples with leading optional elements and rest elements", () => {
    expect<Arr.UnsafeHead<[string?, ...number[]]>>().to(equal<string | number>);
    expect<Arr.UnsafeHead<readonly [string?, ...number[]]>>().to(equal<string | number>);
    expect<Call1<Arr.UnsafeHead$, [string?, ...number[]]>>().to(equal<string | number>);
    expect<Call1<Arr.UnsafeHead$, readonly [string?, ...number[]]>>().to(equal<string | number>);

    expect<Arr.UnsafeHead<[string?, boolean?, ...number[]]>>().to(equal<string | boolean | number>);
    expect<Arr.UnsafeHead<readonly [string?, boolean?, ...number[]]>>().to(
      equal<string | boolean | number>,
    );
    expect<Call1<Arr.UnsafeHead$, [string?, boolean?, ...number[]]>>().to(
      equal<string | boolean | number>,
    );
    expect<Call1<Arr.UnsafeHead$, readonly [string?, boolean?, ...number[]]>>().to(
      equal<string | boolean | number>,
    );
  });

  it("should handle tuples with leading rest elements", () => {
    expect<Arr.UnsafeHead<[...string[], number]>>().to(equal<string | number>);
    expect<Arr.UnsafeHead<readonly [...string[], number]>>().to(equal<string | number>);
    expect<Call1<Arr.UnsafeHead$, [...string[], number]>>().to(equal<string | number>);
    expect<Call1<Arr.UnsafeHead$, readonly [...string[], number]>>().to(equal<string | number>);

    expect<Arr.UnsafeHead<[...string[], number, boolean]>>().to(equal<string | number>);
    expect<Arr.UnsafeHead<readonly [...string[], number, boolean]>>().to(equal<string | number>);
    expect<Call1<Arr.UnsafeHead$, [...string[], number, boolean]>>().to(equal<string | number>);
    expect<Call1<Arr.UnsafeHead$, readonly [...string[], number, boolean]>>().to(
      equal<string | number>,
    );
  });

  it("should return `never` for `never`", () => {
    expect<Arr.UnsafeHead<never>>().to(beNever);
    expect<Call1<Arr.UnsafeHead$, never>>().to(beNever);
  });

  it("should return `any` for `any`", () => {
    expect<Arr.UnsafeHead<any>>().to(equal<any>);
    expect<Call1<Arr.UnsafeHead$, any>>().to(equal<any>);
  });

  it("should accept only arrays", () => {
    // @ts-expect-error
    expect<Arr.UnsafeHead<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.UnsafeHead$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.UnsafeHead<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.UnsafeHead$, unknown>>().to(error);
  });
});
