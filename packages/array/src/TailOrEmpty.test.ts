import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.TailOrEmpty", () => {
  it("should be of correct signature", () => {
    expect<Arr.TailOrEmpty$>().to(beOfSig<<A>(self: readonly A[]) => readonly A[]>);
  });

  it("should get the first element of a non-empty tuple", () => {
    expect<Arr.TailOrEmpty<[string, number, boolean]>>().to(equal<[number, boolean]>);
    expect<Arr.TailOrEmpty<readonly [string, number, boolean]>>().to(
      equal<readonly [number, boolean]>,
    );
    expect<Call1<Arr.TailOrEmpty$, [string, number, boolean]>>().to(equal<[number, boolean]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [string, number, boolean]>>().to(
      equal<readonly [number, boolean]>,
    );

    expect<Arr.TailOrEmpty<[1, 2, 3]>>().to(equal<[2, 3]>);
    expect<Arr.TailOrEmpty<readonly [1, 2, 3]>>().to(equal<readonly [2, 3]>);
    expect<Call1<Arr.TailOrEmpty$, [1, 2, 3]>>().to(equal<[2, 3]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [1, 2, 3]>>().to(equal<readonly [2, 3]>);

    expect<Arr.TailOrEmpty<["foo"]>>().to(equal<[]>);
    expect<Arr.TailOrEmpty<readonly ["foo"]>>().to(equal<readonly []>);
    expect<Call1<Arr.TailOrEmpty$, ["foo"]>>().to(equal<[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly ["foo"]>>().to(equal<readonly []>);
  });

  it("should return `None` for empty tuple", () => {
    expect<Arr.TailOrEmpty<[]>>().to(equal<[]>);
    expect<Arr.TailOrEmpty<readonly []>>().to(equal<readonly []>);
    expect<Call1<Arr.TailOrEmpty$, []>>().to(equal<[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly []>>().to(equal<readonly []>);
  });

  it("should handle union of tuples", () => {
    expect<Arr.TailOrEmpty<[1, 2] | [true, false]>>().to(equal<[2] | [false]>);
    expect<Arr.TailOrEmpty<readonly [1, 2] | [true, false]>>().to(equal<readonly [2] | [false]>);
    expect<Arr.TailOrEmpty<[1, 2] | readonly [true, false]>>().to(equal<[2] | readonly [false]>);
    expect<Arr.TailOrEmpty<readonly [1, 2] | readonly [true, false]>>().to(
      equal<readonly [2] | readonly [false]>,
    );
    expect<Call1<Arr.TailOrEmpty$, [1, 2] | [true, false]>>().to(equal<[2] | [false]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [1, 2] | [true, false]>>().to(
      equal<readonly [2] | [false]>,
    );
    expect<Call1<Arr.TailOrEmpty$, [1, 2] | readonly [true, false]>>().to(
      equal<[2] | readonly [false]>,
    );
    expect<Call1<Arr.TailOrEmpty$, readonly [1, 2] | readonly [true, false]>>().to(
      equal<readonly [2] | readonly [false]>,
    );

    expect<Arr.TailOrEmpty<["foo"] | [42]>>().to(equal<[]>);
    expect<Arr.TailOrEmpty<readonly ["foo"] | [42]>>().to(equal<readonly [] | []>);
    expect<Arr.TailOrEmpty<["foo"] | readonly [42]>>().to(equal<[] | readonly []>);
    expect<Arr.TailOrEmpty<readonly ["foo"] | readonly [42]>>().to(equal<readonly []>);
    expect<Call1<Arr.TailOrEmpty$, ["foo"] | [42]>>().to(equal<[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly ["foo"] | [42]>>().to(equal<readonly [] | []>);
    expect<Call1<Arr.TailOrEmpty$, ["foo"] | readonly [42]>>().to(equal<[] | readonly []>);
    expect<Call1<Arr.TailOrEmpty$, readonly ["foo"] | readonly [42]>>().to(equal<readonly []>);

    expect<Arr.TailOrEmpty<[] | [string]>>().to(equal<[]>);
    expect<Arr.TailOrEmpty<readonly [] | [string]>>().to(equal<readonly [] | []>);
    expect<Arr.TailOrEmpty<[] | readonly [string]>>().to(equal<[] | readonly []>);
    expect<Arr.TailOrEmpty<readonly [] | readonly [string]>>().to(equal<readonly []>);
    expect<Call1<Arr.TailOrEmpty$, [] | [string]>>().to(equal<[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [] | [string]>>().to(equal<readonly [] | []>);
    expect<Call1<Arr.TailOrEmpty$, [] | readonly [string]>>().to(equal<[] | readonly []>);
    expect<Call1<Arr.TailOrEmpty$, readonly [] | readonly [string]>>().to(equal<readonly []>);
  });

  it("should return `A` for array", () => {
    expect<Arr.TailOrEmpty<string[]>>().to(equal<string[]>);
    expect<Arr.TailOrEmpty<readonly string[]>>().to(equal<readonly string[]>);
    expect<Call1<Arr.TailOrEmpty$, string[]>>().to(equal<string[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly string[]>>().to(equal<readonly string[]>);

    expect<Arr.TailOrEmpty<[...number[]]>>().to(equal<number[]>);
    expect<Arr.TailOrEmpty<readonly [...number[]]>>().to(equal<readonly number[]>);
    expect<Call1<Arr.TailOrEmpty$, [...number[]]>>().to(equal<number[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [...number[]]>>().to(equal<readonly number[]>);
  });

  it("should handle tuples with only optional elements", () => {
    expect<Arr.TailOrEmpty<[string?]>>().to(equal<[]>);
    expect<Arr.TailOrEmpty<readonly [string?]>>().to(equal<readonly []>);
    expect<Call1<Arr.TailOrEmpty$, [string?]>>().to(equal<[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [string?]>>().to(equal<readonly []>);

    expect<Arr.TailOrEmpty<[string?, number?]>>().to(equal<[number?]>);
    expect<Arr.TailOrEmpty<readonly [string?, number?]>>().to(equal<readonly [number?]>);
    expect<Call1<Arr.TailOrEmpty$, [string?, number?]>>().to(equal<[number?]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [string?, number?]>>().to(equal<readonly [number?]>);

    expect<Arr.TailOrEmpty<[string?, boolean?, number?]>>().to(equal<[boolean?, number?]>);
    expect<Arr.TailOrEmpty<readonly [string?, boolean?, number?]>>().to(
      equal<readonly [boolean?, number?]>,
    );
    expect<Call1<Arr.TailOrEmpty$, [string?, boolean?, number?]>>().to(equal<[boolean?, number?]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [string?, boolean?, number?]>>().to(
      equal<readonly [boolean?, number?]>,
    );
  });

  it("should distinguish between optional elements and elements that can be undefined", () => {
    expect<Arr.TailOrEmpty<[string | undefined]>>().to(equal<[]>);
    expect<Arr.TailOrEmpty<readonly [string | undefined]>>().to(equal<readonly []>);
    expect<Call1<Arr.TailOrEmpty$, [string | undefined]>>().to(equal<[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [string | undefined]>>().to(equal<readonly []>);

    expect<Arr.TailOrEmpty<[(string | undefined)?]>>().to(equal<[]>);
    expect<Arr.TailOrEmpty<readonly [(string | undefined)?]>>().to(equal<readonly []>);
    expect<Call1<Arr.TailOrEmpty$, [(string | undefined)?]>>().to(equal<[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [(string | undefined)?]>>().to(equal<readonly []>);

    expect<Arr.TailOrEmpty<[string?]>>().to(equal<[]>);
    expect<Arr.TailOrEmpty<readonly [string?]>>().to(equal<readonly []>);
    expect<Call1<Arr.TailOrEmpty$, [string?]>>().to(equal<[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [string?]>>().to(equal<readonly []>);
  });

  it("should handle tuples with leading optional elements and rest elements", () => {
    expect<Arr.TailOrEmpty<[string?, ...number[]]>>().to(equal<number[]>);
    expect<Arr.TailOrEmpty<readonly [string?, ...number[]]>>().to(equal<readonly number[]>);
    expect<Call1<Arr.TailOrEmpty$, [string?, ...number[]]>>().to(equal<number[]>);
    expect<Call1<Arr.TailOrEmpty$, readonly [string?, ...number[]]>>().to(equal<readonly number[]>);

    expect<Arr.TailOrEmpty<[string?, boolean?, ...number[]]>>().to(equal<[boolean?, ...number[]]>);
    expect<Arr.TailOrEmpty<readonly [string?, boolean?, ...number[]]>>().to(
      equal<readonly [boolean?, ...number[]]>,
    );
    expect<Call1<Arr.TailOrEmpty$, [string?, boolean?, ...number[]]>>().to(
      equal<[boolean?, ...number[]]>,
    );
    expect<Call1<Arr.TailOrEmpty$, readonly [string?, boolean?, ...number[]]>>().to(
      equal<readonly [boolean?, ...number[]]>,
    );
  });

  it("should handle tuples with leading rest elements", () => {
    expect<Arr.TailOrEmpty<[...string[], number]>>().to(equal<[...string[], number] | []>);
    expect<Arr.TailOrEmpty<readonly [...string[], number]>>().to(
      equal<readonly [...string[], number] | readonly []>,
    );
    expect<Call1<Arr.TailOrEmpty$, [...string[], number]>>().to(equal<[...string[], number] | []>);
    expect<Call1<Arr.TailOrEmpty$, readonly [...string[], number]>>().to(
      equal<readonly [...string[], number] | readonly []>,
    );

    expect<Arr.TailOrEmpty<[...string[], number, boolean]>>().to(
      equal<[...string[], number, boolean] | [boolean]>,
    );
    expect<Arr.TailOrEmpty<readonly [...string[], number, boolean]>>().to(
      equal<readonly [...string[], number, boolean] | readonly [boolean]>,
    );
    expect<Call1<Arr.TailOrEmpty$, [...string[], number, boolean]>>().to(
      equal<[...string[], number, boolean] | [boolean]>,
    );
    expect<Call1<Arr.TailOrEmpty$, readonly [...string[], number, boolean]>>().to(
      equal<readonly [...string[], number, boolean] | readonly [boolean]>,
    );
  });

  it("should return `never` for `never`", () => {
    expect<Arr.TailOrEmpty<never>>().to(beNever);
    expect<Call1<Arr.TailOrEmpty$, never>>().to(beNever);
  });

  it("should return `readonly any[]` for `any`", () => {
    expect<Arr.TailOrEmpty<any>>().to(equal<readonly any[]>);
    expect<Call1<Arr.TailOrEmpty$, any>>().to(equal<readonly any[]>);
  });

  it("should accept only arrays", () => {
    // @ts-expect-error
    expect<Arr.TailOrEmpty<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.TailOrEmpty$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.TailOrEmpty<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.TailOrEmpty$, unknown>>().to(error);
  });
});
