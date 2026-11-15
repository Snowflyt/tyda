import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1 } from "hkt-core";
import { beAny, beNever, describe, equal, error, expect, it } from "typroof";

import type { Arr } from ".";

describe("Arr.Elem", () => {
  it("should be of correct signature", () => {
    expect<Arr.Elem$>().to(beOfSig<<A>(self: readonly A[]) => A>);
  });

  it("should get the element type of an array", () => {
    expect<Arr.Elem<number[]>>().to(equal<number>);
    expect<Call1<Arr.Elem$, number[]>>().to(equal<number>);

    expect<Arr.Elem<readonly string[]>>().to(equal<string>);
    expect<Call1<Arr.Elem$, readonly string[]>>().to(equal<string>);

    expect<Arr.Elem<readonly (string | number)[]>>().to(equal<string | number>);
    expect<Call1<Arr.Elem$, readonly (string | number)[]>>().to(equal<string | number>);

    expect<Arr.Elem<number[][]>>().to(equal<number[]>);
    expect<Call1<Arr.Elem$, number[][]>>().to(equal<number[]>);

    expect<Arr.Elem<readonly number[][]>>().to(equal<number[]>);
    expect<Call1<Arr.Elem$, readonly number[][]>>().to(equal<number[]>);

    expect<Arr.Elem<readonly (readonly (string | number)[])[]>>().to(
      equal<readonly (string | number)[]>,
    );
    expect<Call1<Arr.Elem$, readonly (readonly (string | number)[])[]>>().to(
      equal<readonly (string | number)[]>,
    );
  });

  it("should get the element type of a tuple", () => {
    expect<Arr.Elem<[1, 2, 3]>>().to(equal<1 | 2 | 3>);
    expect<Call1<Arr.Elem$, [1, 2, 3]>>().to(equal<1 | 2 | 3>);

    expect<Arr.Elem<readonly [1, 2, "foo"]>>().to(equal<1 | 2 | "foo">);
    expect<Call1<Arr.Elem$, readonly [1, 2, "foo"]>>().to(equal<1 | 2 | "foo">);

    expect<Arr.Elem<readonly [1, 2, readonly [3, 4]]>>().to(equal<1 | 2 | readonly [3, 4]>);
    expect<Call1<Arr.Elem$, readonly [1, 2, readonly [3, 4]]>>().to(equal<1 | 2 | readonly [3, 4]>);
  });

  it("should handle union of arrays", () => {
    expect<Arr.Elem<string[] | number[]>>().to(equal<string | number>);
    expect<Call1<Arr.Elem$, string[] | number[]>>().to(equal<string | number>);

    expect<Arr.Elem<readonly string[] | readonly boolean[]>>().to(equal<string | boolean>);
    expect<Call1<Arr.Elem$, readonly string[] | readonly boolean[]>>().to(equal<string | boolean>);
  });

  it("should handle union of tuples", () => {
    expect<Arr.Elem<[1, 2] | [true, false]>>().to(equal<1 | 2 | true | false>);
    expect<Call1<Arr.Elem$, [1, 2] | [true, false]>>().to(equal<1 | 2 | true | false>);

    expect<Arr.Elem<readonly ["foo"] | readonly [42]>>().to(equal<"foo" | 42>);
    expect<Call1<Arr.Elem$, readonly ["foo"] | readonly [42]>>().to(equal<"foo" | 42>);
  });

  it("should handle union of arrays and tuples", () => {
    expect<Arr.Elem<string[] | [1, 2, 3]>>().to(equal<string | 1 | 2 | 3>);
    expect<Call1<Arr.Elem$, string[] | [1, 2, 3]>>().to(equal<string | 1 | 2 | 3>);

    expect<Arr.Elem<readonly number[] | readonly [true, false]>>().to(equal<number | true | false>);
    expect<Call1<Arr.Elem$, readonly number[] | readonly [true, false]>>().to(
      equal<number | true | false>,
    );
  });

  it("should return `never` for `never`", () => {
    expect<Arr.Elem<never>>().to(beNever);
    expect<Call1<Arr.Elem$, never>>().to(beNever);
  });

  it("should return `any` for `any`", () => {
    expect<Arr.Elem<any>>().to(beAny);
    expect<Call1<Arr.Elem$, any>>().to(beAny);
  });

  it("should accept only array or tuple types", () => {
    // @ts-expect-error
    expect<Arr.Elem<string>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Elem$, string>>().to(error);

    // @ts-expect-error
    expect<Arr.Elem<unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Arr.Elem$, unknown>>().to(error);
  });
});
