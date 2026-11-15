import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.ReadonlyArray", () => {
  it("should be of correct signature", () => {
    expect<Arr.ReadonlyArray$>().to(beOfSig<<A>(a: A) => readonly A[]>);
  });

  it("should return `readonly A[]` for any type `A`", () => {
    expect<Arr.ReadonlyArray<unknown>>().to(equal<readonly unknown[]>);
    expect<Call1<Arr.ReadonlyArray$, unknown>>().to(equal<readonly unknown[]>);

    expect<Arr.ReadonlyArray<{}>>().to(equal<readonly {}[]>);
    expect<Call1<Arr.ReadonlyArray$, {}>>().to(equal<readonly {}[]>);

    expect<Arr.ReadonlyArray<string>>().to(equal<readonly string[]>);
    expect<Call1<Arr.ReadonlyArray$, string>>().to(equal<readonly string[]>);

    expect<Arr.ReadonlyArray<{ a: string }>>().to(equal<readonly { a: string }[]>);
    expect<Call1<Arr.ReadonlyArray$, { a: string }>>().to(equal<readonly { a: string }[]>);

    expect<Arr.ReadonlyArray<{ a: string }[]>>().to(equal<readonly { a: string }[][]>);
    expect<Call1<Arr.ReadonlyArray$, { a: string }[]>>().to(equal<readonly { a: string }[][]>);
  });

  it("should handle union types", () => {
    expect<Arr.ReadonlyArray<"foo" | number>>().to(equal<readonly ("foo" | number)[]>);
    expect<Call1<Arr.ReadonlyArray$, "foo" | number>>().to(equal<readonly ("foo" | number)[]>);
  });

  it("should handle `never` type", () => {
    expect<Arr.ReadonlyArray<never>>().to(equal<readonly never[]>);
    expect<Call1<Arr.ReadonlyArray$, never>>().to(equal<readonly never[]>);
  });

  it("should handle `any` type", () => {
    expect<Arr.ReadonlyArray<any>>().to(equal<readonly any[]>);
    expect<Call1<Arr.ReadonlyArray$, any>>().to(equal<readonly any[]>);
  });
});
