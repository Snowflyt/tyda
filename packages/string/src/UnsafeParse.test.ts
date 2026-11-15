import type {} from "@tyda/boolean";
import type {} from "@tyda/number";
import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, RetType } from "hkt-core";
import { beNever, describe, equal, error, expect, it, strictCover } from "typroof";

import type { Str } from ".";

describe("Str.UnsafeParse", () => {
  it("should be of correct signature", () => {
    expect<Str.UnsafeParse$<number>>().to(beOfSig<(self: string) => number>);
    expect<Str.UnsafeParse$<boolean>>().to(beOfSig<(self: string) => boolean>);
    expect<Str.UnsafeParse$<number | boolean>>().to(beOfSig<(self: string) => number | boolean>);
    expect<RetType<Str.UnsafeParse$<any>>>().to(strictCover<number | boolean>);
  });

  it("should convert strings to the expected types", () => {
    expect<Str.UnsafeParse<number, "42">>().to(equal<42>);
    expect<Call1<Str.UnsafeParse$<number>, "42">>().to(equal<42>);

    expect<Str.UnsafeParse<number, "-3.14">>().to(equal<-3.14>);
    expect<Call1<Str.UnsafeParse$<number>, "-3.14">>().to(equal<-3.14>);

    expect<Str.UnsafeParse<number, "number">>().to(equal<number>);
    expect<Call1<Str.UnsafeParse$<number>, "number">>().to(equal<number>);

    expect<Str.UnsafeParse<boolean, "true">>().to(equal<true>);
    expect<Call1<Str.UnsafeParse$<boolean>, "true">>().to(equal<true>);

    expect<Str.UnsafeParse<boolean, "false">>().to(equal<false>);
    expect<Call1<Str.UnsafeParse$<boolean>, "false">>().to(equal<false>);

    expect<Str.UnsafeParse<boolean, "boolean">>().to(equal<boolean>);
    expect<Call1<Str.UnsafeParse$<boolean>, "boolean">>().to(equal<boolean>);
  });

  it('should convert `"any"` to `any`', () => {
    expect<Str.UnsafeParse<number, "any">>().to(equal<any>);
    expect<Call1<Str.UnsafeParse$<number>, "any">>().to(equal<any>);

    expect<Str.UnsafeParse<boolean, "any">>().to(equal<any>);
    expect<Call1<Str.UnsafeParse$<boolean>, "any">>().to(equal<any>);

    expect<Str.UnsafeParse<number | boolean, "any">>().to(equal<any>);
    expect<Call1<Str.UnsafeParse$<number | boolean>, "any">>().to(equal<any>);

    expect<Str.UnsafeParse<any, "any">>().to(equal<any>);
    expect<Call1<Str.UnsafeParse$<any>, "any">>().to(equal<any>);
  });

  it("should return `never` on invalid strings", () => {
    expect<Str.UnsafeParse<number, "foo">>().to(beNever);
    expect<Call1<Str.UnsafeParse$<number>, "foo">>().to(beNever);

    expect<Str.UnsafeParse<boolean, "foo">>().to(beNever);
    expect<Call1<Str.UnsafeParse$<boolean>, "foo">>().to(beNever);
  });

  it("should return all successful conversions for unions of `T`s", () => {
    expect<Str.UnsafeParse<number | boolean, "42">>().to(equal<42>);
    expect<Call1<Str.UnsafeParse$<number | boolean>, "42">>().to(equal<42>);

    expect<Str.UnsafeParse<number | boolean, "true">>().to(equal<true>);
    expect<Call1<Str.UnsafeParse$<number | boolean>, "true">>().to(equal<true>);

    expect<Str.UnsafeParse<number | boolean, "false">>().to(equal<false>);
    expect<Call1<Str.UnsafeParse$<number | boolean>, "false">>().to(equal<false>);

    expect<Str.UnsafeParse<number | boolean, "number">>().to(equal<number>);
    expect<Call1<Str.UnsafeParse$<number | boolean>, "number">>().to(equal<number>);
  });

  it("should return `never` for unions of `T`s if no successful conversion exists", () => {
    expect<Str.UnsafeParse<number | boolean, "foo">>().to(beNever);
    expect<Call1<Str.UnsafeParse$<number | boolean>, "foo">>().to(beNever);
  });

  it("should handle unions of `S`s", () => {
    expect<Str.UnsafeParse<number, "42" | "-3.14">>().to(equal<42 | -3.14>);
    expect<Call1<Str.UnsafeParse$<number>, "42" | "-3.14">>().to(equal<42 | -3.14>);

    expect<Str.UnsafeParse<number, "foo" | "-3.14">>().to(equal<-3.14>);
    expect<Call1<Str.UnsafeParse$<number>, "foo" | "-3.14">>().to(equal<-3.14>);

    expect<Str.UnsafeParse<boolean, "true" | "false">>().to(equal<true | false>);
    expect<Call1<Str.UnsafeParse$<boolean>, "true" | "false">>().to(equal<true | false>);

    expect<Str.UnsafeParse<number | boolean, "42" | "true">>().to(equal<42 | true>);
    expect<Call1<Str.UnsafeParse$<number | boolean>, "42" | "true">>().to(equal<42 | true>);

    expect<Str.UnsafeParse<number | boolean, "foo" | "42">>().to(equal<42>);
    expect<Call1<Str.UnsafeParse$<number | boolean>, "foo" | "42">>().to(equal<42>);
  });

  it("should return `never` if either `T` or `S` is `never`", () => {
    expect<Str.UnsafeParse<never, "42">>().to(equal<never>);
    expect<Call1<Str.UnsafeParse$<never>, "42">>().to(equal<never>);

    expect<Str.UnsafeParse<number, never>>().to(equal<never>);
    expect<Call1<Str.UnsafeParse$<number>, never>>().to(equal<never>);

    expect<Str.UnsafeParse<never, never>>().to(equal<never>);
    expect<Call1<Str.UnsafeParse$<never>, never>>().to(equal<never>);
  });

  it("should return all successful conversions if `T` is `any`", () => {
    expect<Str.UnsafeParse<any, "42">>().to(equal<42>);
    expect<Call1<Str.UnsafeParse$<any>, "42">>().to(equal<42>);

    expect<Str.UnsafeParse<any, "true">>().to(equal<true>);
    expect<Call1<Str.UnsafeParse$<any>, "true">>().to(equal<true>);

    expect<Str.UnsafeParse<any, "any">>().to(equal<any>);
    expect<Call1<Str.UnsafeParse$<any>, "any">>().to(equal<any>);
  });

  it("should return all possible return types if `S` is `any` or `string`", () => {
    expect<Str.UnsafeParse<number, any>>().to(equal<number>);
    expect<Call1<Str.UnsafeParse$<number>, any>>().to(equal<number>);
    expect<Str.UnsafeParse<number, string>>().to(equal<number>);
    expect<Call1<Str.UnsafeParse$<number>, string>>().to(equal<number>);

    expect<Str.UnsafeParse<boolean, any>>().to(equal<boolean>);
    expect<Call1<Str.UnsafeParse$<boolean>, any>>().to(equal<boolean>);
    expect<Str.UnsafeParse<boolean, string>>().to(equal<boolean>);
    expect<Call1<Str.UnsafeParse$<boolean>, string>>().to(equal<boolean>);

    expect<Str.UnsafeParse<number | boolean, any>>().to(equal<number | boolean>);
    expect<Call1<Str.UnsafeParse$<number | boolean>, any>>().to(equal<number | boolean>);
    expect<Str.UnsafeParse<number | boolean, string>>().to(equal<number | boolean>);
    expect<Call1<Str.UnsafeParse$<number | boolean>, string>>().to(equal<number | boolean>);

    expect<Str.UnsafeParse<any, any>>().to(strictCover<number | boolean>);
    expect<Call1<Str.UnsafeParse$<any>, any>>().to(strictCover<number | boolean>);
    expect<Str.UnsafeParse<any, string>>().to(strictCover<number | boolean>);
    expect<Call1<Str.UnsafeParse$<any>, string>>().to(strictCover<number | boolean>);
  });

  it("should accept only `FromStr`s and `string`s", () => {
    // @ts-expect-error
    expect<Str.UnsafeParse<() => void, "foo">>().to(error);
    // @ts-expect-error
    expect<Call1<Str.UnsafeParse$<() => void>, "foo">>().to(error);

    // @ts-expect-error
    expect<Str.UnsafeParse<number, unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Str.UnsafeParse$<number>, unknown>>().to(error);

    // @ts-expect-error
    expect<Str.UnsafeParse<{}, 42>>().to(error);
    // @ts-expect-error
    expect<Call1<Str.UnsafeParse$<{}>, 42>>().to(error);
  });
});
