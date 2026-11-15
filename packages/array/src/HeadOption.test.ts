import type { None, Option, Some } from "@tyda/core";
import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.HeadOption", () => {
  it("should be of correct signature", () => {
    expect<Arr.HeadOption$>().to(beOfSig<<A>(self: readonly A[]) => Option<A>>);
  });

  it("should get the first element of a non-empty tuple", () => {
    expect<Arr.HeadOption<[string, number, boolean]>>().to(equal<Some<string>>);
    expect<Arr.HeadOption<readonly [string, number, boolean]>>().to(equal<Some<string>>);
    expect<Call1<Arr.HeadOption$, [string, number, boolean]>>().to(equal<Some<string>>);
    expect<Call1<Arr.HeadOption$, readonly [string, number, boolean]>>().to(equal<Some<string>>);

    expect<Arr.HeadOption<[1, 2, 3]>>().to(equal<Some<1>>);
    expect<Arr.HeadOption<readonly [1, 2, 3]>>().to(equal<Some<1>>);
    expect<Call1<Arr.HeadOption$, [1, 2, 3]>>().to(equal<Some<1>>);
    expect<Call1<Arr.HeadOption$, readonly [1, 2, 3]>>().to(equal<Some<1>>);

    expect<Arr.HeadOption<["foo"]>>().to(equal<Some<"foo">>);
    expect<Arr.HeadOption<readonly ["foo"]>>().to(equal<Some<"foo">>);
    expect<Call1<Arr.HeadOption$, ["foo"]>>().to(equal<Some<"foo">>);
    expect<Call1<Arr.HeadOption$, readonly ["foo"]>>().to(equal<Some<"foo">>);
  });

  it("should return `None` for empty tuple", () => {
    expect<Arr.HeadOption<[]>>().to(equal<None>);
    expect<Arr.HeadOption<readonly []>>().to(equal<None>);
    expect<Call1<Arr.HeadOption$, []>>().to(equal<None>);
    expect<Call1<Arr.HeadOption$, readonly []>>().to(equal<None>);
  });

  it("should handle union of tuples", () => {
    expect<Arr.HeadOption<[1, 2] | [true, false]>>().to(equal<Some<1> | Some<true>>);
    expect<Arr.HeadOption<readonly [1, 2] | [true, false]>>().to(equal<Some<1> | Some<true>>);
    expect<Arr.HeadOption<[1, 2] | readonly [true, false]>>().to(equal<Some<1> | Some<true>>);
    expect<Arr.HeadOption<readonly [1, 2] | readonly [true, false]>>().to(
      equal<Some<1> | Some<true>>,
    );
    expect<Call1<Arr.HeadOption$, [1, 2] | [true, false]>>().to(equal<Some<1> | Some<true>>);
    expect<Call1<Arr.HeadOption$, readonly [1, 2] | [true, false]>>().to(
      equal<Some<1> | Some<true>>,
    );
    expect<Call1<Arr.HeadOption$, [1, 2] | readonly [true, false]>>().to(
      equal<Some<1> | Some<true>>,
    );
    expect<Call1<Arr.HeadOption$, readonly [1, 2] | readonly [true, false]>>().to(
      equal<Some<1> | Some<true>>,
    );

    expect<Arr.HeadOption<["foo"] | [42]>>().to(equal<Some<"foo"> | Some<42>>);
    expect<Arr.HeadOption<readonly ["foo"] | [42]>>().to(equal<Some<"foo"> | Some<42>>);
    expect<Arr.HeadOption<["foo"] | readonly [42]>>().to(equal<Some<"foo"> | Some<42>>);
    expect<Arr.HeadOption<readonly ["foo"] | readonly [42]>>().to(equal<Some<"foo"> | Some<42>>);
    expect<Call1<Arr.HeadOption$, ["foo"] | [42]>>().to(equal<Some<"foo"> | Some<42>>);
    expect<Call1<Arr.HeadOption$, readonly ["foo"] | [42]>>().to(equal<Some<"foo"> | Some<42>>);
    expect<Call1<Arr.HeadOption$, ["foo"] | readonly [42]>>().to(equal<Some<"foo"> | Some<42>>);
    expect<Call1<Arr.HeadOption$, readonly ["foo"] | readonly [42]>>().to(
      equal<Some<"foo"> | Some<42>>,
    );

    expect<Arr.HeadOption<[] | [string]>>().to(equal<None | Some<string>>);
    expect<Arr.HeadOption<readonly [] | [string]>>().to(equal<None | Some<string>>);
    expect<Arr.HeadOption<[] | readonly [string]>>().to(equal<None | Some<string>>);
    expect<Arr.HeadOption<readonly [] | readonly [string]>>().to(equal<None | Some<string>>);
    expect<Call1<Arr.HeadOption$, [] | [string]>>().to(equal<None | Some<string>>);
    expect<Call1<Arr.HeadOption$, readonly [] | [string]>>().to(equal<None | Some<string>>);
    expect<Call1<Arr.HeadOption$, [] | readonly [string]>>().to(equal<None | Some<string>>);
    expect<Call1<Arr.HeadOption$, readonly [] | readonly [string]>>().to(
      equal<None | Some<string>>,
    );
  });

  it("should return `Option<A>` for array", () => {
    expect<Arr.HeadOption<string[]>>().to(equal<Option<string>>);
    expect<Arr.HeadOption<readonly string[]>>().to(equal<Option<string>>);
    expect<Call1<Arr.HeadOption$, string[]>>().to(equal<Option<string>>);
    expect<Call1<Arr.HeadOption$, readonly string[]>>().to(equal<Option<string>>);

    expect<Arr.HeadOption<[...number[]]>>().to(equal<Option<number>>);
    expect<Arr.HeadOption<readonly [...number[]]>>().to(equal<Option<number>>);
    expect<Call1<Arr.HeadOption$, [...number[]]>>().to(equal<Option<number>>);
    expect<Call1<Arr.HeadOption$, readonly [...number[]]>>().to(equal<Option<number>>);
  });

  it("should handle tuples with only optional elements", () => {
    expect<Arr.HeadOption<[string?]>>().to(equal<Some<string> | None>);
    expect<Arr.HeadOption<readonly [string?]>>().to(equal<Some<string> | None>);
    expect<Call1<Arr.HeadOption$, [string?]>>().to(equal<Some<string> | None>);
    expect<Call1<Arr.HeadOption$, readonly [string?]>>().to(equal<Some<string> | None>);

    expect<Arr.HeadOption<[string?, number?]>>().to(equal<Some<string> | Some<number> | None>);
    expect<Arr.HeadOption<readonly [string?, number?]>>().to(
      equal<Some<string> | Some<number> | None>,
    );
    expect<Call1<Arr.HeadOption$, [string?, number?]>>().to(
      equal<Some<string> | Some<number> | None>,
    );
    expect<Call1<Arr.HeadOption$, readonly [string?, number?]>>().to(
      equal<Some<string> | Some<number> | None>,
    );

    expect<Arr.HeadOption<[string?, boolean?, number?]>>().to(
      equal<Some<string> | Some<boolean> | Some<number> | None>,
    );
    expect<Arr.HeadOption<readonly [string?, boolean?, number?]>>().to(
      equal<Some<string> | Some<boolean> | Some<number> | None>,
    );
    expect<Call1<Arr.HeadOption$, [string?, boolean?, number?]>>().to(
      equal<Some<string> | Some<boolean> | Some<number> | None>,
    );
    expect<Call1<Arr.HeadOption$, readonly [string?, boolean?, number?]>>().to(
      equal<Some<string> | Some<boolean> | Some<number> | None>,
    );
  });

  it("should distinguish between optional elements and elements that can be undefined", () => {
    expect<Arr.HeadOption<[string | undefined]>>().to(equal<Some<string | undefined>>);
    expect<Arr.HeadOption<readonly [string | undefined]>>().to(equal<Some<string | undefined>>);
    expect<Call1<Arr.HeadOption$, [string | undefined]>>().to(equal<Some<string | undefined>>);
    expect<Call1<Arr.HeadOption$, readonly [string | undefined]>>().to(
      equal<Some<string | undefined>>,
    );

    expect<Arr.HeadOption<[(string | undefined)?]>>().to(equal<Some<string | undefined> | None>);
    expect<Arr.HeadOption<readonly [(string | undefined)?]>>().to(
      equal<Some<string | undefined> | None>,
    );
    expect<Call1<Arr.HeadOption$, [(string | undefined)?]>>().to(
      equal<Some<string | undefined> | None>,
    );
    expect<Call1<Arr.HeadOption$, readonly [(string | undefined)?]>>().to(
      equal<Some<string | undefined> | None>,
    );

    expect<Arr.HeadOption<[string?]>>().to(equal<Some<string> | None>);
    expect<Arr.HeadOption<readonly [string?]>>().to(equal<Some<string> | None>);
    expect<Call1<Arr.HeadOption$, [string?]>>().to(equal<Some<string> | None>);
    expect<Call1<Arr.HeadOption$, readonly [string?]>>().to(equal<Some<string> | None>);
  });

  it("should handle tuples with leading optional elements and rest elements", () => {
    expect<Arr.HeadOption<[string?, ...number[]]>>().to(equal<Some<string> | Option<number>>);
    expect<Arr.HeadOption<readonly [string?, ...number[]]>>().to(
      equal<Some<string> | Option<number>>,
    );
    expect<Call1<Arr.HeadOption$, [string?, ...number[]]>>().to(
      equal<Some<string> | Option<number>>,
    );
    expect<Call1<Arr.HeadOption$, readonly [string?, ...number[]]>>().to(
      equal<Some<string> | Option<number>>,
    );

    expect<Arr.HeadOption<[string?, boolean?, ...number[]]>>().to(
      equal<Some<string> | Some<boolean> | Option<number>>,
    );
    expect<Arr.HeadOption<readonly [string?, boolean?, ...number[]]>>().to(
      equal<Some<string> | Some<boolean> | Option<number>>,
    );
    expect<Call1<Arr.HeadOption$, [string?, boolean?, ...number[]]>>().to(
      equal<Some<string> | Some<boolean> | Option<number>>,
    );
    expect<Call1<Arr.HeadOption$, readonly [string?, boolean?, ...number[]]>>().to(
      equal<Some<string> | Some<boolean> | Option<number>>,
    );
  });

  it("should handle tuples with leading rest elements", () => {
    expect<Arr.HeadOption<[...string[], number]>>().to(equal<Some<string> | Some<number>>);
    expect<Arr.HeadOption<readonly [...string[], number]>>().to(equal<Some<string> | Some<number>>);
    expect<Call1<Arr.HeadOption$, [...string[], number]>>().to(equal<Some<string> | Some<number>>);
    expect<Call1<Arr.HeadOption$, readonly [...string[], number]>>().to(
      equal<Some<string> | Some<number>>,
    );

    expect<Arr.HeadOption<[...string[], number, boolean]>>().to(equal<Some<string> | Some<number>>);
    expect<Arr.HeadOption<readonly [...string[], number, boolean]>>().to(
      equal<Some<string> | Some<number>>,
    );
    expect<Call1<Arr.HeadOption$, [...string[], number, boolean]>>().to(
      equal<Some<string> | Some<number>>,
    );
    expect<Call1<Arr.HeadOption$, readonly [...string[], number, boolean]>>().to(
      equal<Some<string> | Some<number>>,
    );
  });

  it("should return `never` for `never`", () => {
    expect<Arr.HeadOption<never>>().to(beNever);
    expect<Call1<Arr.HeadOption$, never>>().to(beNever);
  });

  it("should return `Option<any>` for `any`", () => {
    expect<Arr.HeadOption<any>>().to(equal<Option<any>>);
    expect<Call1<Arr.HeadOption$, any>>().to(equal<Option<any>>);
  });

  it("should accept only arrays", () => {
    // @ts-expect-error
    expect<Arr.HeadOption<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.HeadOption$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.HeadOption<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.HeadOption$, unknown>>().to(error);
  });
});
