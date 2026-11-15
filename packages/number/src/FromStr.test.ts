import type { Left, Right } from "@tyda/core";
import type { FromStr } from "@tyda/typeclass";
import type { Call1 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

describe("FromStr<number>", () => {
  it("should convert strings to `number`s", () => {
    expect<FromStr.FromStr<number, "42">>().to(equal<Right<42>>);
    expect<Call1<FromStr.FromStr$<number>, "42">>().to(equal<Right<42>>);

    expect<FromStr.FromStr<number, "0">>().to(equal<Right<0>>);
    expect<Call1<FromStr.FromStr$<number>, "0">>().to(equal<Right<0>>);

    expect<FromStr.FromStr<number, "3.14">>().to(equal<Right<3.14>>);
    expect<Call1<FromStr.FromStr$<number>, "3.14">>().to(equal<Right<3.14>>);

    expect<FromStr.FromStr<number, "-2.718">>().to(equal<Right<-2.718>>);
    expect<Call1<FromStr.FromStr$<number>, "-2.718">>().to(equal<Right<-2.718>>);
  });

  it('should convert `"number"` to `number`', () => {
    expect<FromStr.FromStr<number, "number">>().to(equal<Right<number>>);
    expect<Call1<FromStr.FromStr$<number>, "number">>().to(equal<Right<number>>);
  });

  it("should error on invalid strings", () => {
    expect<FromStr.FromStr<number, "foo">>().to(equal<Left<"Cannot convert 'foo' to number">>);
    expect<Call1<FromStr.FromStr$<number>, "foo">>().to(
      equal<Left<"Cannot convert 'foo' to number">>,
    );
  });
});
