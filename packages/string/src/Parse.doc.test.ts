import type {} from "@tyda/boolean";
import type { Left, Right } from "@tyda/core";
import type {} from "@tyda/number";
import type { Pipe } from "hkt-core";
import { equal, expect, strictCover, test } from "typroof";

import type { Str } from ".";

test("Str.Parse", () => {
  expect<Str.Parse<number, "42">>().to(equal<Right<42>>);
  expect<Str.Parse<number, "-3.14">>().to(equal<Right<-3.14>>);
  expect<Str.Parse<boolean, "true">>().to(equal<Right<true>>);
  expect<Str.Parse<number, "foo">>().to(equal<Left<"Cannot convert 'foo' to number">>);

  expect<Str.Parse<number | boolean, "42">>().to(equal<Right<42>>);
  expect<Str.Parse<number | boolean, "42" | "false">>().to(equal<Right<42> | Right<false>>);
  expect<Str.Parse<number | boolean, "foo">>().to(
    equal<Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">>,
  );
  expect<Str.Parse<number | boolean, "42" | "foo">>().to(
    equal<
      Right<42> | Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">
    >,
  );

  expect<Str.Parse<any, "42">>().to(equal<Right<42>>);
  expect<Str.Parse<any, "true">>().to(equal<Right<true>>);
  expect<Str.Parse<any, "foo">>().to(
    strictCover<Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">>,
  );
});

test("Str.Parse$", () => {
  expect<Pipe<"42", Str.Parse$<number>>>().to(equal<Right<42>>);
  expect<Pipe<"-3.14", Str.Parse$<number>>>().to(equal<Right<-3.14>>);
  expect<Pipe<"true", Str.Parse$<boolean>>>().to(equal<Right<true>>);
  expect<Pipe<"foo", Str.Parse$<number>>>().to(equal<Left<"Cannot convert 'foo' to number">>);

  expect<Pipe<"42", Str.Parse$<number | boolean>>>().to(equal<Right<42>>);
  expect<Pipe<"42" | "false", Str.Parse$<number | boolean>>>().to(equal<Right<42> | Right<false>>);
  expect<Pipe<"foo", Str.Parse$<number | boolean>>>().to(
    equal<Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">>,
  );
  expect<Pipe<"42" | "foo", Str.Parse$<number | boolean>>>().to(
    equal<
      Right<42> | Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">
    >,
  );

  expect<Pipe<"42", Str.Parse$<any>>>().to(equal<Right<42>>);
  expect<Pipe<"true", Str.Parse$<any>>>().to(equal<Right<true>>);
  expect<Pipe<"foo", Str.Parse$<any>>>().to(
    strictCover<Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">>,
  );
});
