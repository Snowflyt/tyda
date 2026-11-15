import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.Tail", () => {
  it("should be of correct signature", () => {
    expect<Arr.Tail$>().to(beOfSig<<A>(self: readonly [unknown, ...A[]]) => readonly A[]>);
  });

  it("should get the first element of a non-empty tuple", () => {
    expect<Arr.Tail<[string, number, boolean]>>().to(equal<[number, boolean]>);
    expect<Arr.Tail<readonly [string, number, boolean]>>().to(equal<readonly [number, boolean]>);
    expect<Call1<Arr.Tail$, [string, number, boolean]>>().to(equal<[number, boolean]>);
    expect<Call1<Arr.Tail$, readonly [string, number, boolean]>>().to(
      equal<readonly [number, boolean]>,
    );

    expect<Arr.Tail<[1, 2, 3]>>().to(equal<[2, 3]>);
    expect<Arr.Tail<readonly [1, 2, 3]>>().to(equal<readonly [2, 3]>);
    expect<Call1<Arr.Tail$, [1, 2, 3]>>().to(equal<[2, 3]>);
    expect<Call1<Arr.Tail$, readonly [1, 2, 3]>>().to(equal<readonly [2, 3]>);

    expect<Arr.Tail<["foo"]>>().to(equal<[]>);
    expect<Arr.Tail<readonly ["foo"]>>().to(equal<readonly []>);
    expect<Call1<Arr.Tail$, ["foo"]>>().to(equal<[]>);
    expect<Call1<Arr.Tail$, readonly ["foo"]>>().to(equal<readonly []>);
  });

  it("should handle union of tuples", () => {
    expect<Arr.Tail<[1, 2] | [true, false]>>().to(equal<[2] | [false]>);
    expect<Arr.Tail<readonly [1, 2] | [true, false]>>().to(equal<readonly [2] | [false]>);
    expect<Arr.Tail<[1, 2] | readonly [true, false]>>().to(equal<[2] | readonly [false]>);
    expect<Arr.Tail<readonly [1, 2] | readonly [true, false]>>().to(
      equal<readonly [2] | readonly [false]>,
    );
    expect<Call1<Arr.Tail$, [1, 2] | [true, false]>>().to(equal<[2] | [false]>);
    expect<Call1<Arr.Tail$, readonly [1, 2] | [true, false]>>().to(equal<readonly [2] | [false]>);
    expect<Call1<Arr.Tail$, [1, 2] | readonly [true, false]>>().to(equal<[2] | readonly [false]>);
    expect<Call1<Arr.Tail$, readonly [1, 2] | readonly [true, false]>>().to(
      equal<readonly [2] | readonly [false]>,
    );

    expect<Arr.Tail<["foo"] | [42]>>().to(equal<[]>);
    expect<Arr.Tail<readonly ["foo"] | [42]>>().to(equal<readonly [] | []>);
    expect<Arr.Tail<["foo"] | readonly [42]>>().to(equal<[] | readonly []>);
    expect<Arr.Tail<readonly ["foo"] | readonly [42]>>().to(equal<readonly []>);
    expect<Call1<Arr.Tail$, ["foo"] | [42]>>().to(equal<[]>);
    expect<Call1<Arr.Tail$, readonly ["foo"] | [42]>>().to(equal<readonly [] | []>);
    expect<Call1<Arr.Tail$, ["foo"] | readonly [42]>>().to(equal<[] | readonly []>);
    expect<Call1<Arr.Tail$, readonly ["foo"] | readonly [42]>>().to(equal<readonly []>);

    expect<Arr.Tail<["foo"] | [42, 43]>>().to(equal<[] | [43]>);
    expect<Arr.Tail<readonly ["foo"] | [42, 43]>>().to(equal<readonly [] | [43]>);
    expect<Arr.Tail<["foo"] | readonly [42, 43]>>().to(equal<[] | readonly [43]>);
    expect<Arr.Tail<readonly ["foo"] | readonly [42, 43]>>().to(equal<readonly [] | readonly [43]>);
    expect<Call1<Arr.Tail$, ["foo"] | [42, 43]>>().to(equal<[] | [43]>);
    expect<Call1<Arr.Tail$, readonly ["foo"] | [42, 43]>>().to(equal<readonly [] | [43]>);
    expect<Call1<Arr.Tail$, ["foo"] | readonly [42, 43]>>().to(equal<[] | readonly [43]>);
    expect<Call1<Arr.Tail$, readonly ["foo"] | readonly [42, 43]>>().to(
      equal<readonly [] | readonly [43]>,
    );
  });

  it("should return `never` for `never`", () => {
    expect<Arr.Tail<never>>().to(beNever);
    expect<Call1<Arr.Tail$, never>>().to(beNever);
  });

  it("should return `readonly any[]` for `any`", () => {
    expect<Arr.Tail<any>>().to(equal<readonly any[]>);
    expect<Call1<Arr.Tail$, any>>().to(equal<readonly any[]>);
  });

  it("should accept only non-empty tuples", () => {
    // @ts-expect-error
    expect<Arr.Tail<[]>>().to(error);
    // @ts-expect-error
    expect<Arr.Tail<readonly []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Tail$, []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Tail$, readonly []>>().to(error);

    // @ts-expect-error
    expect<Arr.Tail<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Tail$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.Tail<string[]>>().to(error);
    // @ts-expect-error
    expect<Arr.Tail<readonly string[]>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Tail$, string[]>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Tail$, readonly string[]>>().to(error);

    // @ts-expect-error
    expect<Arr.Tail<["foo"] | []>>().to(error);
    // @ts-expect-error
    expect<Arr.Tail<readonly ["foo"] | []>>().to(error);
    // @ts-expect-error
    expect<Arr.Tail<["foo"] | readonly []>>().to(error);
    // @ts-expect-error
    expect<Arr.Tail<readonly ["foo"] | readonly []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Tail$, ["foo"] | []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Tail$, readonly ["foo"] | []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Tail$, ["foo"] | readonly []>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Tail$, readonly ["foo"] | readonly []>>().to(error);
  });
});
