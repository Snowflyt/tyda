import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.Of1", () => {
  it("should be of correct signature", () => {
    expect<Arr.Of1$>().to(beOfSig<<A>(a: A) => readonly [A]>);
  });

  it("should return `readonly A[]` for any type `A`", () => {
    expect<Arr.Of1<unknown>>().to(equal<readonly [unknown]>);
    expect<Call1<Arr.Of1$, unknown>>().to(equal<readonly [unknown]>);

    expect<Arr.Of1<{}>>().to(equal<readonly [{}]>);
    expect<Call1<Arr.Of1$, {}>>().to(equal<readonly [{}]>);

    expect<Arr.Of1<string>>().to(equal<readonly [string]>);
    expect<Call1<Arr.Of1$, string>>().to(equal<readonly [string]>);

    expect<Arr.Of1<{ a: string }>>().to(equal<readonly [{ a: string }]>);
    expect<Call1<Arr.Of1$, { a: string }>>().to(equal<readonly [{ a: string }]>);

    expect<Arr.Of1<{ a: string }[]>>().to(equal<readonly [{ a: string }[]]>);
    expect<Call1<Arr.Of1$, { a: string }[]>>().to(equal<readonly [{ a: string }[]]>);
  });

  it("should handle union types", () => {
    expect<Arr.Of1<"foo" | number>>().to(equal<readonly ["foo" | number]>);
    expect<Call1<Arr.Of1$, "foo" | number>>().to(equal<readonly ["foo" | number]>);
  });

  it("should handle `never` type", () => {
    expect<Arr.Of1<never>>().to(equal<readonly [never]>);
    expect<Call1<Arr.Of1$, never>>().to(equal<readonly [never]>);
  });

  it("should handle `any` type", () => {
    expect<Arr.Of1<any>>().to(equal<readonly [any]>);
    expect<Call1<Arr.Of1$, any>>().to(equal<readonly [any]>);
  });
});
