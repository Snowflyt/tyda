import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.UnsafeTail", () => {
  it("should be of correct signature", () => {
    expect<Arr.UnsafeTail$>().to(beOfSig<<A>(self: readonly A[]) => readonly A[]>);
  });

  it("should get the first element of a non-empty tuple", () => {
    expect<Arr.UnsafeTail<[string, number, boolean]>>().to(equal<[number, boolean]>);
    expect<Arr.UnsafeTail<readonly [string, number, boolean]>>().to(
      equal<readonly [number, boolean]>,
    );
    expect<Call1<Arr.UnsafeTail$, [string, number, boolean]>>().to(equal<[number, boolean]>);
    expect<Call1<Arr.UnsafeTail$, readonly [string, number, boolean]>>().to(
      equal<readonly [number, boolean]>,
    );

    expect<Arr.UnsafeTail<[1, 2, 3]>>().to(equal<[2, 3]>);
    expect<Arr.UnsafeTail<readonly [1, 2, 3]>>().to(equal<readonly [2, 3]>);
    expect<Call1<Arr.UnsafeTail$, [1, 2, 3]>>().to(equal<[2, 3]>);
    expect<Call1<Arr.UnsafeTail$, readonly [1, 2, 3]>>().to(equal<readonly [2, 3]>);

    expect<Arr.UnsafeTail<["foo"]>>().to(equal<[]>);
    expect<Arr.UnsafeTail<readonly ["foo"]>>().to(equal<readonly []>);
    expect<Call1<Arr.UnsafeTail$, ["foo"]>>().to(equal<[]>);
    expect<Call1<Arr.UnsafeTail$, readonly ["foo"]>>().to(equal<readonly []>);
  });

  it("should return `None` for empty tuple", () => {
    expect<Arr.UnsafeTail<[]>>().to(beNever);
    expect<Arr.UnsafeTail<readonly []>>().to(beNever);
    expect<Call1<Arr.UnsafeTail$, []>>().to(beNever);
    expect<Call1<Arr.UnsafeTail$, readonly []>>().to(beNever);
  });

  it("should handle union of tuples", () => {
    expect<Arr.UnsafeTail<[1, 2] | [true, false]>>().to(equal<[2] | [false]>);
    expect<Arr.UnsafeTail<readonly [1, 2] | [true, false]>>().to(equal<readonly [2] | [false]>);
    expect<Arr.UnsafeTail<[1, 2] | readonly [true, false]>>().to(equal<[2] | readonly [false]>);
    expect<Arr.UnsafeTail<readonly [1, 2] | readonly [true, false]>>().to(
      equal<readonly [2] | readonly [false]>,
    );
    expect<Call1<Arr.UnsafeTail$, [1, 2] | [true, false]>>().to(equal<[2] | [false]>);
    expect<Call1<Arr.UnsafeTail$, readonly [1, 2] | [true, false]>>().to(
      equal<readonly [2] | [false]>,
    );
    expect<Call1<Arr.UnsafeTail$, [1, 2] | readonly [true, false]>>().to(
      equal<[2] | readonly [false]>,
    );
    expect<Call1<Arr.UnsafeTail$, readonly [1, 2] | readonly [true, false]>>().to(
      equal<readonly [2] | readonly [false]>,
    );

    expect<Arr.UnsafeTail<["foo"] | [42]>>().to(equal<[]>);
    expect<Arr.UnsafeTail<readonly ["foo"] | [42]>>().to(equal<readonly [] | []>);
    expect<Arr.UnsafeTail<["foo"] | readonly [42]>>().to(equal<[] | readonly []>);
    expect<Arr.UnsafeTail<readonly ["foo"] | readonly [42]>>().to(equal<readonly []>);
    expect<Call1<Arr.UnsafeTail$, ["foo"] | [42]>>().to(equal<[]>);
    expect<Call1<Arr.UnsafeTail$, readonly ["foo"] | [42]>>().to(equal<readonly [] | []>);
    expect<Call1<Arr.UnsafeTail$, ["foo"] | readonly [42]>>().to(equal<[] | readonly []>);
    expect<Call1<Arr.UnsafeTail$, readonly ["foo"] | readonly [42]>>().to(equal<readonly []>);

    expect<Arr.UnsafeTail<[] | [string]>>().to(equal<[]>);
    expect<Arr.UnsafeTail<readonly [] | [string]>>().to(equal<[]>);
    expect<Arr.UnsafeTail<[] | readonly [string]>>().to(equal<readonly []>);
    expect<Arr.UnsafeTail<readonly [] | readonly [string]>>().to(equal<readonly []>);
    expect<Call1<Arr.UnsafeTail$, [] | [string]>>().to(equal<[]>);
    expect<Call1<Arr.UnsafeTail$, readonly [] | [string]>>().to(equal<[]>);
    expect<Call1<Arr.UnsafeTail$, [] | readonly [string]>>().to(equal<readonly []>);
    expect<Call1<Arr.UnsafeTail$, readonly [] | readonly [string]>>().to(equal<readonly []>);
  });

  it("should return `A` for array", () => {
    expect<Arr.UnsafeTail<string[]>>().to(equal<string[]>);
    expect<Arr.UnsafeTail<readonly string[]>>().to(equal<readonly string[]>);
    expect<Call1<Arr.UnsafeTail$, string[]>>().to(equal<string[]>);
    expect<Call1<Arr.UnsafeTail$, readonly string[]>>().to(equal<readonly string[]>);

    expect<Arr.UnsafeTail<[...number[]]>>().to(equal<number[]>);
    expect<Arr.UnsafeTail<readonly [...number[]]>>().to(equal<readonly number[]>);
    expect<Call1<Arr.UnsafeTail$, [...number[]]>>().to(equal<number[]>);
    expect<Call1<Arr.UnsafeTail$, readonly [...number[]]>>().to(equal<readonly number[]>);
  });

  it("should handle tuples with only optional elements", () => {
    expect<Arr.UnsafeTail<[string?]>>().to(equal<[]>);
    expect<Arr.UnsafeTail<readonly [string?]>>().to(equal<readonly []>);
    expect<Call1<Arr.UnsafeTail$, [string?]>>().to(equal<[]>);
    expect<Call1<Arr.UnsafeTail$, readonly [string?]>>().to(equal<readonly []>);

    expect<Arr.UnsafeTail<[string?, number?]>>().to(equal<[number?]>);
    expect<Arr.UnsafeTail<readonly [string?, number?]>>().to(equal<readonly [number?]>);
    expect<Call1<Arr.UnsafeTail$, [string?, number?]>>().to(equal<[number?]>);
    expect<Call1<Arr.UnsafeTail$, readonly [string?, number?]>>().to(equal<readonly [number?]>);

    expect<Arr.UnsafeTail<[string?, boolean?, number?]>>().to(equal<[boolean?, number?]>);
    expect<Arr.UnsafeTail<readonly [string?, boolean?, number?]>>().to(
      equal<readonly [boolean?, number?]>,
    );
    expect<Call1<Arr.UnsafeTail$, [string?, boolean?, number?]>>().to(equal<[boolean?, number?]>);
    expect<Call1<Arr.UnsafeTail$, readonly [string?, boolean?, number?]>>().to(
      equal<readonly [boolean?, number?]>,
    );
  });

  it("should distinguish between optional elements and elements that can be undefined", () => {
    expect<Arr.UnsafeTail<[string | undefined]>>().to(equal<[]>);
    expect<Arr.UnsafeTail<readonly [string | undefined]>>().to(equal<readonly []>);
    expect<Call1<Arr.UnsafeTail$, [string | undefined]>>().to(equal<[]>);
    expect<Call1<Arr.UnsafeTail$, readonly [string | undefined]>>().to(equal<readonly []>);

    expect<Arr.UnsafeTail<[(string | undefined)?]>>().to(equal<[]>);
    expect<Arr.UnsafeTail<readonly [(string | undefined)?]>>().to(equal<readonly []>);
    expect<Call1<Arr.UnsafeTail$, [(string | undefined)?]>>().to(equal<[]>);
    expect<Call1<Arr.UnsafeTail$, readonly [(string | undefined)?]>>().to(equal<readonly []>);

    expect<Arr.UnsafeTail<[string?]>>().to(equal<[]>);
    expect<Arr.UnsafeTail<readonly [string?]>>().to(equal<readonly []>);
    expect<Call1<Arr.UnsafeTail$, [string?]>>().to(equal<[]>);
    expect<Call1<Arr.UnsafeTail$, readonly [string?]>>().to(equal<readonly []>);
  });

  it("should handle tuples with leading optional elements and rest elements", () => {
    expect<Arr.UnsafeTail<[string?, ...number[]]>>().to(equal<number[]>);
    expect<Arr.UnsafeTail<readonly [string?, ...number[]]>>().to(equal<readonly number[]>);
    expect<Call1<Arr.UnsafeTail$, [string?, ...number[]]>>().to(equal<number[]>);
    expect<Call1<Arr.UnsafeTail$, readonly [string?, ...number[]]>>().to(equal<readonly number[]>);

    expect<Arr.UnsafeTail<[string?, boolean?, ...number[]]>>().to(equal<[boolean?, ...number[]]>);
    expect<Arr.UnsafeTail<readonly [string?, boolean?, ...number[]]>>().to(
      equal<readonly [boolean?, ...number[]]>,
    );
    expect<Call1<Arr.UnsafeTail$, [string?, boolean?, ...number[]]>>().to(
      equal<[boolean?, ...number[]]>,
    );
    expect<Call1<Arr.UnsafeTail$, readonly [string?, boolean?, ...number[]]>>().to(
      equal<readonly [boolean?, ...number[]]>,
    );
  });

  it("should handle tuples with leading rest elements", () => {
    expect<Arr.UnsafeTail<[...string[], number]>>().to(equal<[...string[], number] | []>);
    expect<Arr.UnsafeTail<readonly [...string[], number]>>().to(
      equal<readonly [...string[], number] | readonly []>,
    );
    expect<Call1<Arr.UnsafeTail$, [...string[], number]>>().to(equal<[...string[], number] | []>);
    expect<Call1<Arr.UnsafeTail$, readonly [...string[], number]>>().to(
      equal<readonly [...string[], number] | readonly []>,
    );

    expect<Arr.UnsafeTail<[...string[], number, boolean]>>().to(
      equal<[...string[], number, boolean] | [boolean]>,
    );
    expect<Arr.UnsafeTail<readonly [...string[], number, boolean]>>().to(
      equal<readonly [...string[], number, boolean] | readonly [boolean]>,
    );
    expect<Call1<Arr.UnsafeTail$, [...string[], number, boolean]>>().to(
      equal<[...string[], number, boolean] | [boolean]>,
    );
    expect<Call1<Arr.UnsafeTail$, readonly [...string[], number, boolean]>>().to(
      equal<readonly [...string[], number, boolean] | readonly [boolean]>,
    );
  });

  it("should return `never` for `never`", () => {
    expect<Arr.UnsafeTail<never>>().to(beNever);
    expect<Call1<Arr.UnsafeTail$, never>>().to(beNever);
  });

  it("should return `readonly any[]` for `any`", () => {
    expect<Arr.UnsafeTail<any>>().to(equal<readonly any[]>);
    expect<Call1<Arr.UnsafeTail$, any>>().to(equal<readonly any[]>);
  });

  it("should accept only arrays", () => {
    // @ts-expect-error
    expect<Arr.UnsafeTail<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.UnsafeTail$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.UnsafeTail<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.UnsafeTail$, unknown>>().to(error);
  });
});
