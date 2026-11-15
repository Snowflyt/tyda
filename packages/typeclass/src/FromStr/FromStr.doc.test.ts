import type {} from "@tyda/boolean";
import type { Left, Right } from "@tyda/core";
import type {} from "@tyda/number";
import type { Pipe } from "hkt-core";
import { equal, expect, strictCover, test } from "typroof";

import type { FromStr } from ".";

test("FromStr.FromStr", () => {
  expect<FromStr.FromStr<number, "42">>().to(equal<Right<42>>);
  expect<FromStr.FromStr<number, "-3.14">>().to(equal<Right<-3.14>>);
  expect<FromStr.FromStr<boolean, "true">>().to(equal<Right<true>>);
  expect<FromStr.FromStr<number, "foo">>().to(equal<Left<"Cannot convert 'foo' to number">>);

  expect<FromStr.FromStr<any, "42">>().to(equal<Right<42>>);
  expect<FromStr.FromStr<any, "true">>().to(equal<Right<true>>);
  expect<FromStr.FromStr<any, "foo">>().to(
    strictCover<Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">>,
  );
});

test("FromStr.FromStr$", () => {
  expect<Pipe<"42", FromStr.FromStr$<number>>>().to(equal<Right<42>>);
  expect<Pipe<"-3.14", FromStr.FromStr$<number>>>().to(equal<Right<-3.14>>);
  expect<Pipe<"true", FromStr.FromStr$<boolean>>>().to(equal<Right<true>>);
  expect<Pipe<"foo", FromStr.FromStr$<number>>>().to(equal<Left<"Cannot convert 'foo' to number">>);

  expect<Pipe<"42", FromStr.FromStr$<any>>>().to(equal<Right<42>>);
  expect<Pipe<"true", FromStr.FromStr$<any>>>().to(equal<Right<true>>);
  expect<Pipe<"foo", FromStr.FromStr$<any>>>().to(
    strictCover<Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">>,
  );
});
