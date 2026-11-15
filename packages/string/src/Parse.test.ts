import type {} from "@tyda/boolean";
import type { Either, Left, Right } from "@tyda/core";
import type {} from "@tyda/number";
import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, RetType } from "hkt-core";
import { describe, equal, error, expect, it, strictCover } from "typroof";

import type { Str } from ".";

describe("Str.Parse", () => {
  it("should be of correct signature", () => {
    expect<Str.Parse$<number>>().to(beOfSig<(self: string) => Either<string, number>>);
    expect<Str.Parse$<boolean>>().to(beOfSig<(self: string) => Either<string, boolean>>);
    expect<Str.Parse$<number | boolean>>().to(
      beOfSig<(self: string) => Either<string, number> | Either<string, boolean>>,
    );
    expect<RetType<Str.Parse$<any>>>().to(
      strictCover<Either<string, number> | Either<string, boolean>>,
    );
  });

  it("should convert strings to the expected types", () => {
    expect<Str.Parse<number, "42">>().to(equal<Right<42>>);
    expect<Call1<Str.Parse$<number>, "42">>().to(equal<Right<42>>);

    expect<Str.Parse<number, "-3.14">>().to(equal<Right<-3.14>>);
    expect<Call1<Str.Parse$<number>, "-3.14">>().to(equal<Right<-3.14>>);

    expect<Str.Parse<number, "number">>().to(equal<Right<number>>);
    expect<Call1<Str.Parse$<number>, "number">>().to(equal<Right<number>>);

    expect<Str.Parse<boolean, "true">>().to(equal<Right<true>>);
    expect<Call1<Str.Parse$<boolean>, "true">>().to(equal<Right<true>>);

    expect<Str.Parse<boolean, "false">>().to(equal<Right<false>>);
    expect<Call1<Str.Parse$<boolean>, "false">>().to(equal<Right<false>>);

    expect<Str.Parse<boolean, "boolean">>().to(equal<Right<boolean>>);
    expect<Call1<Str.Parse$<boolean>, "boolean">>().to(equal<Right<boolean>>);
  });

  it('should convert `"any"` to `any`', () => {
    expect<Str.Parse<number, "any">>().to(equal<Right<any>>);
    expect<Call1<Str.Parse$<number>, "any">>().to(equal<Right<any>>);

    expect<Str.Parse<boolean, "any">>().to(equal<Right<any>>);
    expect<Call1<Str.Parse$<boolean>, "any">>().to(equal<Right<any>>);

    expect<Str.Parse<number | boolean, "any">>().to(equal<Right<any>>);
    expect<Call1<Str.Parse$<number | boolean>, "any">>().to(equal<Right<any>>);

    expect<Str.Parse<any, "any">>().to(equal<Right<any>>);
    expect<Call1<Str.Parse$<any>, "any">>().to(equal<Right<any>>);
  });

  it("should error on invalid strings", () => {
    expect<Str.Parse<number, "foo">>().to(equal<Left<"Cannot convert 'foo' to number">>);
    expect<Call1<Str.Parse$<number>, "foo">>().to(equal<Left<"Cannot convert 'foo' to number">>);

    expect<Str.Parse<boolean, "foo">>().to(equal<Left<"Cannot convert 'foo' to boolean">>);
    expect<Call1<Str.Parse$<boolean>, "foo">>().to(equal<Left<"Cannot convert 'foo' to boolean">>);
  });

  it("should return all successful conversions for unions of `T`s", () => {
    expect<Str.Parse<number | boolean, "42">>().to(equal<Right<42>>);
    expect<Call1<Str.Parse$<number | boolean>, "42">>().to(equal<Right<42>>);

    expect<Str.Parse<number | boolean, "true">>().to(equal<Right<true>>);
    expect<Call1<Str.Parse$<number | boolean>, "true">>().to(equal<Right<true>>);

    expect<Str.Parse<number | boolean, "false">>().to(equal<Right<false>>);
    expect<Call1<Str.Parse$<number | boolean>, "false">>().to(equal<Right<false>>);

    expect<Str.Parse<number | boolean, "number">>().to(equal<Right<number>>);
    expect<Call1<Str.Parse$<number | boolean>, "number">>().to(equal<Right<number>>);
  });

  it("should return all errors for unions of `T`s if no successful conversion exists", () => {
    expect<Str.Parse<number | boolean, "foo">>().to(
      equal<Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">>,
    );
    expect<Call1<Str.Parse$<number | boolean>, "foo">>().to(
      equal<Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">>,
    );
  });

  it("should handle unions of `S`s", () => {
    expect<Str.Parse<number, "42" | "-3.14">>().to(equal<Right<42> | Right<-3.14>>);
    expect<Call1<Str.Parse$<number>, "42" | "-3.14">>().to(equal<Right<42> | Right<-3.14>>);

    expect<Str.Parse<number, "foo" | "-3.14">>().to(
      equal<Left<"Cannot convert 'foo' to number"> | Right<-3.14>>,
    );
    expect<Call1<Str.Parse$<number>, "foo" | "-3.14">>().to(
      equal<Left<"Cannot convert 'foo' to number"> | Right<-3.14>>,
    );

    expect<Str.Parse<boolean, "true" | "false">>().to(equal<Right<true> | Right<false>>);
    expect<Call1<Str.Parse$<boolean>, "true" | "false">>().to(equal<Right<true> | Right<false>>);

    expect<Str.Parse<number | boolean, "42" | "true">>().to(equal<Right<42> | Right<true>>);
    expect<Call1<Str.Parse$<number | boolean>, "42" | "true">>().to(equal<Right<42> | Right<true>>);

    expect<Str.Parse<number | boolean, "foo" | "42">>().to(
      equal<
        Right<42> | Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">
      >,
    );
    expect<Call1<Str.Parse$<number | boolean>, "foo" | "42">>().to(
      equal<
        Right<42> | Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">
      >,
    );
  });

  it("should return `never` if either `T` or `S` is `never`", () => {
    expect<Str.Parse<never, "42">>().to(equal<never>);
    expect<Call1<Str.Parse$<never>, "42">>().to(equal<never>);

    expect<Str.Parse<number, never>>().to(equal<never>);
    expect<Call1<Str.Parse$<number>, never>>().to(equal<never>);

    expect<Str.Parse<never, never>>().to(equal<never>);
    expect<Call1<Str.Parse$<never>, never>>().to(equal<never>);
  });

  it("should return all successful conversions if `T` is `any`", () => {
    expect<Str.Parse<any, "42">>().to(equal<Right<42>>);
    expect<Call1<Str.Parse$<any>, "42">>().to(equal<Right<42>>);

    expect<Str.Parse<any, "true">>().to(equal<Right<true>>);
    expect<Call1<Str.Parse$<any>, "true">>().to(equal<Right<true>>);

    expect<Str.Parse<any, "any">>().to(equal<Right<any>>);
    expect<Call1<Str.Parse$<any>, "any">>().to(equal<Right<any>>);
  });

  it("should return all possible return types if `S` is `any` or `string`", () => {
    expect<Str.Parse<number, any>>().to(equal<Either<string, number>>);
    expect<Call1<Str.Parse$<number>, any>>().to(equal<Either<string, number>>);
    expect<Str.Parse<number, string>>().to(equal<Either<string, number>>);
    expect<Call1<Str.Parse$<number>, string>>().to(equal<Either<string, number>>);

    expect<Str.Parse<boolean, any>>().to(equal<Either<string, boolean>>);
    expect<Call1<Str.Parse$<boolean>, any>>().to(equal<Either<string, boolean>>);
    expect<Str.Parse<boolean, string>>().to(equal<Either<string, boolean>>);
    expect<Call1<Str.Parse$<boolean>, string>>().to(equal<Either<string, boolean>>);

    expect<Str.Parse<number | boolean, any>>().to(
      equal<Either<string, number> | Either<string, boolean>>,
    );
    expect<Call1<Str.Parse$<number | boolean>, any>>().to(
      equal<Either<string, number> | Either<string, boolean>>,
    );
    expect<Str.Parse<number | boolean, string>>().to(
      equal<Either<string, number> | Either<string, boolean>>,
    );
    expect<Call1<Str.Parse$<number | boolean>, string>>().to(
      equal<Either<string, number> | Either<string, boolean>>,
    );

    expect<Str.Parse<any, any>>().to(strictCover<Either<string, number> | Either<string, boolean>>);
    expect<Call1<Str.Parse$<any>, any>>().to(
      strictCover<Either<string, number> | Either<string, boolean>>,
    );
    expect<Str.Parse<any, string>>().to(
      strictCover<Either<string, number> | Either<string, boolean>>,
    );
    expect<Call1<Str.Parse$<any>, string>>().to(
      strictCover<Either<string, number> | Either<string, boolean>>,
    );
  });

  it("should accept only `FromStr`s and `string`s", () => {
    // @ts-expect-error
    expect<Str.Parse<() => void, "foo">>().to(error);
    // @ts-expect-error
    expect<Call1<Str.Parse$<() => void>, "foo">>().to(error);

    // @ts-expect-error
    expect<Str.Parse<number, unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<Str.Parse$<number>, unknown>>().to(error);

    // @ts-expect-error
    expect<Str.Parse<{}, 42>>().to(error);
    // @ts-expect-error
    expect<Call1<Str.Parse$<{}>, 42>>().to(error);
  });
});
