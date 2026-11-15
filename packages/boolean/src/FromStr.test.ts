import type { Left, Right } from "@tyda/core";
import type { FromStr } from "@tyda/typeclass";
import type { Call1 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

describe("FromStr<boolean>", () => {
  it("should convert strings to `boolean`s", () => {
    expect<FromStr.FromStr<boolean, "true">>().to(equal<Right<true>>);
    expect<Call1<FromStr.FromStr$<boolean>, "true">>().to(equal<Right<true>>);

    expect<FromStr.FromStr<boolean, "false">>().to(equal<Right<false>>);
    expect<Call1<FromStr.FromStr$<boolean>, "false">>().to(equal<Right<false>>);

    expect<FromStr.FromStr<boolean, "boolean">>().to(equal<Right<boolean>>);
    expect<Call1<FromStr.FromStr$<boolean>, "boolean">>().to(equal<Right<boolean>>);
  });

  it("should error on invalid strings", () => {
    expect<FromStr.FromStr<boolean, "foo">>().to(equal<Left<"Cannot convert 'foo' to boolean">>);
    expect<Call1<FromStr.FromStr$<boolean>, "foo">>().to(
      equal<Left<"Cannot convert 'foo' to boolean">>,
    );
  });
});
