import type {} from "@tyda/boolean";
import type { Either, Left, Right } from "@tyda/core";
import type {} from "@tyda/number";
import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, RetType } from "hkt-core";
import { describe, equal, error, expect, it, strictCover } from "typroof";

import type { FromStr } from ".";

describe("FromStr.FromStr", () => {
  it("should be of correct signature", () => {
    expect<FromStr.FromStr$<number>>().to(beOfSig<(s: string) => Either<string, number>>);
    expect<FromStr.FromStr$<boolean>>().to(beOfSig<(s: string) => Either<string, boolean>>);
    expect<FromStr.FromStr$<number | boolean>>().to(
      beOfSig<(s: string) => Either<string, number> | Either<string, boolean>>,
    );
    expect<RetType<FromStr.FromStr$<any>>>().to(
      strictCover<Either<string, number> | Either<string, boolean>>,
    );
  });

  it("should convert strings to the expected types", () => {
    expect<FromStr.FromStr<number, "42">>().to(equal<Right<42>>);
    expect<Call1<FromStr.FromStr$<number>, "42">>().to(equal<Right<42>>);

    expect<FromStr.FromStr<number, "-3.14">>().to(equal<Right<-3.14>>);
    expect<Call1<FromStr.FromStr$<number>, "-3.14">>().to(equal<Right<-3.14>>);

    expect<FromStr.FromStr<number, "number">>().to(equal<Right<number>>);
    expect<Call1<FromStr.FromStr$<number>, "number">>().to(equal<Right<number>>);

    expect<FromStr.FromStr<boolean, "true">>().to(equal<Right<true>>);
    expect<Call1<FromStr.FromStr$<boolean>, "true">>().to(equal<Right<true>>);

    expect<FromStr.FromStr<boolean, "false">>().to(equal<Right<false>>);
    expect<Call1<FromStr.FromStr$<boolean>, "false">>().to(equal<Right<false>>);

    expect<FromStr.FromStr<boolean, "boolean">>().to(equal<Right<boolean>>);
    expect<Call1<FromStr.FromStr$<boolean>, "boolean">>().to(equal<Right<boolean>>);
  });

  it('should convert `"any"` to `any`', () => {
    expect<FromStr.FromStr<number, "any">>().to(equal<Right<any>>);
    expect<Call1<FromStr.FromStr$<number>, "any">>().to(equal<Right<any>>);

    expect<FromStr.FromStr<boolean, "any">>().to(equal<Right<any>>);
    expect<Call1<FromStr.FromStr$<boolean>, "any">>().to(equal<Right<any>>);

    expect<FromStr.FromStr<number | boolean, "any">>().to(equal<Right<any>>);
    expect<Call1<FromStr.FromStr$<number | boolean>, "any">>().to(equal<Right<any>>);

    expect<FromStr.FromStr<any, "any">>().to(equal<Right<any>>);
    expect<Call1<FromStr.FromStr$<any>, "any">>().to(equal<Right<any>>);
  });

  it("should error on invalid strings", () => {
    expect<FromStr.FromStr<number, "foo">>().to(equal<Left<"Cannot convert 'foo' to number">>);
    expect<Call1<FromStr.FromStr$<number>, "foo">>().to(
      equal<Left<"Cannot convert 'foo' to number">>,
    );

    expect<FromStr.FromStr<boolean, "foo">>().to(equal<Left<"Cannot convert 'foo' to boolean">>);
    expect<Call1<FromStr.FromStr$<boolean>, "foo">>().to(
      equal<Left<"Cannot convert 'foo' to boolean">>,
    );
  });

  it("should return all successful conversions for unions of `T`s", () => {
    expect<FromStr.FromStr<number | boolean, "42">>().to(equal<Right<42>>);
    expect<Call1<FromStr.FromStr$<number | boolean>, "42">>().to(equal<Right<42>>);

    expect<FromStr.FromStr<number | boolean, "true">>().to(equal<Right<true>>);
    expect<Call1<FromStr.FromStr$<number | boolean>, "true">>().to(equal<Right<true>>);

    expect<FromStr.FromStr<number | boolean, "false">>().to(equal<Right<false>>);
    expect<Call1<FromStr.FromStr$<number | boolean>, "false">>().to(equal<Right<false>>);

    expect<FromStr.FromStr<number | boolean, "number">>().to(equal<Right<number>>);
    expect<Call1<FromStr.FromStr$<number | boolean>, "number">>().to(equal<Right<number>>);
  });

  it("should return all errors for unions of `T`s if no successful conversion exists", () => {
    expect<FromStr.FromStr<number | boolean, "foo">>().to(
      equal<Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">>,
    );
    expect<Call1<FromStr.FromStr$<number | boolean>, "foo">>().to(
      equal<Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">>,
    );
  });

  it("should handle unions of `S`s", () => {
    expect<FromStr.FromStr<number, "42" | "-3.14">>().to(equal<Right<42> | Right<-3.14>>);
    expect<Call1<FromStr.FromStr$<number>, "42" | "-3.14">>().to(equal<Right<42> | Right<-3.14>>);

    expect<FromStr.FromStr<number, "foo" | "-3.14">>().to(
      equal<Left<"Cannot convert 'foo' to number"> | Right<-3.14>>,
    );
    expect<Call1<FromStr.FromStr$<number>, "foo" | "-3.14">>().to(
      equal<Left<"Cannot convert 'foo' to number"> | Right<-3.14>>,
    );

    expect<FromStr.FromStr<boolean, "true" | "false">>().to(equal<Right<true> | Right<false>>);
    expect<Call1<FromStr.FromStr$<boolean>, "true" | "false">>().to(
      equal<Right<true> | Right<false>>,
    );

    expect<FromStr.FromStr<number | boolean, "42" | "true">>().to(equal<Right<42> | Right<true>>);
    expect<Call1<FromStr.FromStr$<number | boolean>, "42" | "true">>().to(
      equal<Right<42> | Right<true>>,
    );

    expect<FromStr.FromStr<number | boolean, "foo" | "42">>().to(
      equal<
        Right<42> | Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">
      >,
    );
    expect<Call1<FromStr.FromStr$<number | boolean>, "foo" | "42">>().to(
      equal<
        Right<42> | Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">
      >,
    );
  });

  it("should return `never` if either `T` or `S` is `never`", () => {
    expect<FromStr.FromStr<never, "42">>().to(equal<never>);
    expect<Call1<FromStr.FromStr$<never>, "42">>().to(equal<never>);

    expect<FromStr.FromStr<number, never>>().to(equal<never>);
    expect<Call1<FromStr.FromStr$<number>, never>>().to(equal<never>);

    expect<FromStr.FromStr<never, never>>().to(equal<never>);
    expect<Call1<FromStr.FromStr$<never>, never>>().to(equal<never>);
  });

  it("should return all successful conversions if `T` is `any`", () => {
    expect<FromStr.FromStr<any, "42">>().to(equal<Right<42>>);
    expect<Call1<FromStr.FromStr$<any>, "42">>().to(equal<Right<42>>);

    expect<FromStr.FromStr<any, "true">>().to(equal<Right<true>>);
    expect<Call1<FromStr.FromStr$<any>, "true">>().to(equal<Right<true>>);

    expect<FromStr.FromStr<any, "any">>().to(equal<Right<any>>);
    expect<Call1<FromStr.FromStr$<any>, "any">>().to(equal<Right<any>>);
  });

  it("should return all possible return types if `S` is `any` or `string`", () => {
    expect<FromStr.FromStr<number, any>>().to(equal<Either<string, number>>);
    expect<Call1<FromStr.FromStr$<number>, any>>().to(equal<Either<string, number>>);
    expect<FromStr.FromStr<number, string>>().to(equal<Either<string, number>>);
    expect<Call1<FromStr.FromStr$<number>, string>>().to(equal<Either<string, number>>);

    expect<FromStr.FromStr<boolean, any>>().to(equal<Either<string, boolean>>);
    expect<Call1<FromStr.FromStr$<boolean>, any>>().to(equal<Either<string, boolean>>);
    expect<FromStr.FromStr<boolean, string>>().to(equal<Either<string, boolean>>);
    expect<Call1<FromStr.FromStr$<boolean>, string>>().to(equal<Either<string, boolean>>);

    expect<FromStr.FromStr<number | boolean, any>>().to(
      equal<Either<string, number> | Either<string, boolean>>,
    );
    expect<Call1<FromStr.FromStr$<number | boolean>, any>>().to(
      equal<Either<string, number> | Either<string, boolean>>,
    );
    expect<FromStr.FromStr<number | boolean, string>>().to(
      equal<Either<string, number> | Either<string, boolean>>,
    );
    expect<Call1<FromStr.FromStr$<number | boolean>, string>>().to(
      equal<Either<string, number> | Either<string, boolean>>,
    );

    expect<FromStr.FromStr<any, any>>().to(
      strictCover<Either<string, number> | Either<string, boolean>>,
    );
    expect<Call1<FromStr.FromStr$<any>, any>>().to(
      strictCover<Either<string, number> | Either<string, boolean>>,
    );
    expect<FromStr.FromStr<any, string>>().to(
      strictCover<Either<string, number> | Either<string, boolean>>,
    );
    expect<Call1<FromStr.FromStr$<any>, string>>().to(
      strictCover<Either<string, number> | Either<string, boolean>>,
    );
  });

  it("should accept only `FromStr`s and `string`s", () => {
    // @ts-expect-error
    expect<FromStr.FromStr<() => void, "foo">>().to(error);
    // @ts-expect-error
    expect<Call1<FromStr.FromStr$<() => void>, "foo">>().to(error);

    // @ts-expect-error
    expect<FromStr.FromStr<number, unknown>>().to(error);
    // @ts-expect-error
    expect<Call1<FromStr.FromStr$<number>, unknown>>().to(error);

    // @ts-expect-error
    expect<FromStr.FromStr<{}, 42>>().to(error);
    // @ts-expect-error
    expect<Call1<FromStr.FromStr$<{}>, 42>>().to(error);
  });
});
