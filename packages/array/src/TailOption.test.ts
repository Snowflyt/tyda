import type { None, Option, Some } from "@tyda/core";
import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.TailOption", () => {
  it("should be of correct signature", () => {
    expect<Arr.TailOption$>().to(beOfSig<<A>(self: readonly A[]) => Option<readonly A[]>>);
  });

  it("should get the first element of a non-empty tuple", () => {
    expect<Arr.TailOption<[string, number, boolean]>>().to(equal<Some<[number, boolean]>>);
    expect<Arr.TailOption<readonly [string, number, boolean]>>().to(
      equal<Some<readonly [number, boolean]>>,
    );
    expect<Call1<Arr.TailOption$, [string, number, boolean]>>().to(equal<Some<[number, boolean]>>);
    expect<Call1<Arr.TailOption$, readonly [string, number, boolean]>>().to(
      equal<Some<readonly [number, boolean]>>,
    );

    expect<Arr.TailOption<[1, 2, 3]>>().to(equal<Some<[2, 3]>>);
    expect<Arr.TailOption<readonly [1, 2, 3]>>().to(equal<Some<readonly [2, 3]>>);
    expect<Call1<Arr.TailOption$, [1, 2, 3]>>().to(equal<Some<[2, 3]>>);
    expect<Call1<Arr.TailOption$, readonly [1, 2, 3]>>().to(equal<Some<readonly [2, 3]>>);

    expect<Arr.TailOption<["foo"]>>().to(equal<Some<[]>>);
    expect<Arr.TailOption<readonly ["foo"]>>().to(equal<Some<readonly []>>);
    expect<Call1<Arr.TailOption$, ["foo"]>>().to(equal<Some<[]>>);
    expect<Call1<Arr.TailOption$, readonly ["foo"]>>().to(equal<Some<readonly []>>);
  });

  it("should return `None` for empty tuple", () => {
    expect<Arr.TailOption<[]>>().to(equal<None>);
    expect<Arr.TailOption<readonly []>>().to(equal<None>);
    expect<Call1<Arr.TailOption$, []>>().to(equal<None>);
    expect<Call1<Arr.TailOption$, readonly []>>().to(equal<None>);
  });

  it("should handle union of tuples", () => {
    expect<Arr.TailOption<[1, 2] | [true, false]>>().to(equal<Some<[2]> | Some<[false]>>);
    expect<Arr.TailOption<readonly [1, 2] | [true, false]>>().to(
      equal<Some<readonly [2]> | Some<[false]>>,
    );
    expect<Arr.TailOption<[1, 2] | readonly [true, false]>>().to(
      equal<Some<[2]> | Some<readonly [false]>>,
    );
    expect<Arr.TailOption<readonly [1, 2] | readonly [true, false]>>().to(
      equal<Some<readonly [2]> | Some<readonly [false]>>,
    );
    expect<Call1<Arr.TailOption$, [1, 2] | [true, false]>>().to(equal<Some<[2]> | Some<[false]>>);
    expect<Call1<Arr.TailOption$, readonly [1, 2] | [true, false]>>().to(
      equal<Some<readonly [2]> | Some<[false]>>,
    );
    expect<Call1<Arr.TailOption$, [1, 2] | readonly [true, false]>>().to(
      equal<Some<[2]> | Some<readonly [false]>>,
    );
    expect<Call1<Arr.TailOption$, readonly [1, 2] | readonly [true, false]>>().to(
      equal<Some<readonly [2]> | Some<readonly [false]>>,
    );

    expect<Arr.TailOption<["foo"] | [42]>>().to(equal<Some<[]>>);
    expect<Arr.TailOption<readonly ["foo"] | [42]>>().to(equal<Some<readonly []> | Some<[]>>);
    expect<Arr.TailOption<["foo"] | readonly [42]>>().to(equal<Some<[]> | Some<readonly []>>);
    expect<Arr.TailOption<readonly ["foo"] | readonly [42]>>().to(equal<Some<readonly []>>);
    expect<Call1<Arr.TailOption$, ["foo"] | [42]>>().to(equal<Some<[]>>);
    expect<Call1<Arr.TailOption$, readonly ["foo"] | [42]>>().to(
      equal<Some<readonly []> | Some<[]>>,
    );
    expect<Call1<Arr.TailOption$, ["foo"] | readonly [42]>>().to(
      equal<Some<[]> | Some<readonly []>>,
    );
    expect<Call1<Arr.TailOption$, readonly ["foo"] | readonly [42]>>().to(equal<Some<readonly []>>);

    expect<Arr.TailOption<[] | [string]>>().to(equal<None | Some<[]>>);
    expect<Arr.TailOption<readonly [] | [string]>>().to(equal<None | Some<[]>>);
    expect<Arr.TailOption<[] | readonly [string]>>().to(equal<None | Some<readonly []>>);
    expect<Arr.TailOption<readonly [] | readonly [string]>>().to(equal<None | Some<readonly []>>);
    expect<Call1<Arr.TailOption$, [] | [string]>>().to(equal<None | Some<[]>>);
    expect<Call1<Arr.TailOption$, readonly [] | [string]>>().to(equal<None | Some<[]>>);
    expect<Call1<Arr.TailOption$, [] | readonly [string]>>().to(equal<None | Some<readonly []>>);
    expect<Call1<Arr.TailOption$, readonly [] | readonly [string]>>().to(
      equal<None | Some<readonly []>>,
    );
  });

  it("should return `Option<A>` for array", () => {
    expect<Arr.TailOption<string[]>>().to(equal<Option<string[]>>);
    expect<Arr.TailOption<readonly string[]>>().to(equal<Option<readonly string[]>>);
    expect<Call1<Arr.TailOption$, string[]>>().to(equal<Option<string[]>>);
    expect<Call1<Arr.TailOption$, readonly string[]>>().to(equal<Option<readonly string[]>>);

    expect<Arr.TailOption<[...number[]]>>().to(equal<Option<number[]>>);
    expect<Arr.TailOption<readonly [...number[]]>>().to(equal<Option<readonly number[]>>);
    expect<Call1<Arr.TailOption$, [...number[]]>>().to(equal<Option<number[]>>);
    expect<Call1<Arr.TailOption$, readonly [...number[]]>>().to(equal<Option<readonly number[]>>);
  });

  it("should handle tuples with only optional elements", () => {
    expect<Arr.TailOption<[string?]>>().to(equal<Some<[]> | None>);
    expect<Arr.TailOption<readonly [string?]>>().to(equal<Some<readonly []> | None>);
    expect<Call1<Arr.TailOption$, [string?]>>().to(equal<Some<[]> | None>);
    expect<Call1<Arr.TailOption$, readonly [string?]>>().to(equal<Some<readonly []> | None>);

    expect<Arr.TailOption<[string?, number?]>>().to(equal<Some<[number?]> | None>);
    expect<Arr.TailOption<readonly [string?, number?]>>().to(
      equal<Some<readonly [number?]> | None>,
    );
    expect<Call1<Arr.TailOption$, [string?, number?]>>().to(equal<Some<[number?]> | None>);
    expect<Call1<Arr.TailOption$, readonly [string?, number?]>>().to(
      equal<Some<readonly [number?]> | None>,
    );

    expect<Arr.TailOption<[string?, boolean?, number?]>>().to(
      equal<Some<[boolean?, number?]> | None>,
    );
    expect<Arr.TailOption<readonly [string?, boolean?, number?]>>().to(
      equal<Some<readonly [boolean?, number?]> | None>,
    );
    expect<Call1<Arr.TailOption$, [string?, boolean?, number?]>>().to(
      equal<Some<[boolean?, number?]> | None>,
    );
    expect<Call1<Arr.TailOption$, readonly [string?, boolean?, number?]>>().to(
      equal<Some<readonly [boolean?, number?]> | None>,
    );
  });

  it("should distinguish between optional elements and elements that can be undefined", () => {
    expect<Arr.TailOption<[string | undefined]>>().to(equal<Some<[]>>);
    expect<Arr.TailOption<readonly [string | undefined]>>().to(equal<Some<readonly []>>);
    expect<Call1<Arr.TailOption$, [string | undefined]>>().to(equal<Some<[]>>);
    expect<Call1<Arr.TailOption$, readonly [string | undefined]>>().to(equal<Some<readonly []>>);

    expect<Arr.TailOption<[(string | undefined)?]>>().to(equal<Some<[]> | None>);
    expect<Arr.TailOption<readonly [(string | undefined)?]>>().to(equal<Some<readonly []> | None>);
    expect<Call1<Arr.TailOption$, [(string | undefined)?]>>().to(equal<Some<[]> | None>);
    expect<Call1<Arr.TailOption$, readonly [(string | undefined)?]>>().to(
      equal<Some<readonly []> | None>,
    );

    expect<Arr.TailOption<[string?]>>().to(equal<Some<[]> | None>);
    expect<Arr.TailOption<readonly [string?]>>().to(equal<Some<readonly []> | None>);
    expect<Call1<Arr.TailOption$, [string?]>>().to(equal<Some<[]> | None>);
    expect<Call1<Arr.TailOption$, readonly [string?]>>().to(equal<Some<readonly []> | None>);
  });

  it("should handle tuples with leading optional elements and rest elements", () => {
    expect<Arr.TailOption<[string?, ...number[]]>>().to(equal<Option<number[]>>);
    expect<Arr.TailOption<readonly [string?, ...number[]]>>().to(equal<Option<readonly number[]>>);
    expect<Call1<Arr.TailOption$, [string?, ...number[]]>>().to(equal<Option<number[]>>);
    expect<Call1<Arr.TailOption$, readonly [string?, ...number[]]>>().to(
      equal<Option<readonly number[]>>,
    );

    expect<Arr.TailOption<[string?, boolean?, ...number[]]>>().to(
      equal<Option<[boolean?, ...number[]]>>,
    );
    expect<Arr.TailOption<readonly [string?, boolean?, ...number[]]>>().to(
      equal<Option<readonly [boolean?, ...number[]]>>,
    );
    expect<Call1<Arr.TailOption$, [string?, boolean?, ...number[]]>>().to(
      equal<Option<[boolean?, ...number[]]>>,
    );
    expect<Call1<Arr.TailOption$, readonly [string?, boolean?, ...number[]]>>().to(
      equal<Option<readonly [boolean?, ...number[]]>>,
    );
  });

  it("should handle tuples with leading rest elements", () => {
    expect<Arr.TailOption<[...string[], number]>>().to(
      equal<Some<[...string[], number]> | Some<[]>>,
    );
    expect<Arr.TailOption<readonly [...string[], number]>>().to(
      equal<Some<readonly [...string[], number]> | Some<readonly []>>,
    );
    expect<Call1<Arr.TailOption$, [...string[], number]>>().to(
      equal<Some<[...string[], number]> | Some<[]>>,
    );
    expect<Call1<Arr.TailOption$, readonly [...string[], number]>>().to(
      equal<Some<readonly [...string[], number]> | Some<readonly []>>,
    );

    expect<Arr.TailOption<[...string[], number, boolean]>>().to(
      equal<Some<[...string[], number, boolean]> | Some<[boolean]>>,
    );
    expect<Arr.TailOption<readonly [...string[], number, boolean]>>().to(
      equal<Some<readonly [...string[], number, boolean]> | Some<readonly [boolean]>>,
    );
    expect<Call1<Arr.TailOption$, [...string[], number, boolean]>>().to(
      equal<Some<[...string[], number, boolean]> | Some<[boolean]>>,
    );
    expect<Call1<Arr.TailOption$, readonly [...string[], number, boolean]>>().to(
      equal<Some<readonly [...string[], number, boolean]> | Some<readonly [boolean]>>,
    );
  });

  it("should return `never` for `never`", () => {
    expect<Arr.TailOption<never>>().to(beNever);
    expect<Call1<Arr.TailOption$, never>>().to(beNever);
  });

  it("should return `Option<readonly any[]>` for `any`", () => {
    expect<Arr.TailOption<any>>().to(equal<Option<readonly any[]>>);
    expect<Call1<Arr.TailOption$, any>>().to(equal<Option<readonly any[]>>);
  });

  it("should accept only arrays", () => {
    // @ts-expect-error
    expect<Arr.TailOption<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.TailOption$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.TailOption<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.TailOption$, unknown>>().to(error);
  });
});
