import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.Array", () => {
  it("should be of correct signature", () => {
    expect<Arr.Array$>().to(beOfSig<<A>(a: A) => A[]>);
  });

  it("should return `A[]` for any type `A`", () => {
    expect<Arr.Array<unknown>>().to(equal<unknown[]>);
    expect<Call1<Arr.Array$, unknown>>().to(equal<unknown[]>);

    expect<Arr.Array<string>>().to(equal<string[]>);
    expect<Call1<Arr.Array$, string>>().to(equal<string[]>);

    expect<Arr.Array<{}>>().to(equal<{}[]>);
    expect<Call1<Arr.Array$, {}>>().to(equal<{}[]>);

    expect<Arr.Array<{ a: string }>>().to(equal<{ a: string }[]>);
    expect<Call1<Arr.Array$, { a: string }>>().to(equal<{ a: string }[]>);

    expect<Arr.Array<{ a: string }[]>>().to(equal<{ a: string }[][]>);
    expect<Call1<Arr.Array$, { a: string }[]>>().to(equal<{ a: string }[][]>);
  });

  it("should handle union types", () => {
    expect<Arr.Array<"foo" | number>>().to(equal<("foo" | number)[]>);
    expect<Call1<Arr.Array$, "foo" | number>>().to(equal<("foo" | number)[]>);
  });

  it("should handle `never` type", () => {
    expect<Arr.Array<never>>().to(equal<never[]>);
    expect<Call1<Arr.Array$, never>>().to(equal<never[]>);
  });

  it("should handle `any` type", () => {
    expect<Arr.Array<any>>().to(equal<any[]>);
    expect<Call1<Arr.Array$, any>>().to(equal<any[]>);
  });
});
