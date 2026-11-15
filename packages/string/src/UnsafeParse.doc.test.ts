import type {} from "@tyda/boolean";
import type {} from "@tyda/number";
import type { Pipe } from "hkt-core";
import { beNever, equal, expect, test } from "typroof";

import type { Str } from ".";

test("Str.UnsafeParse", () => {
  expect<Str.UnsafeParse<number, "42">>().to(equal<42>);
  expect<Str.UnsafeParse<number, "-3.14">>().to(equal<-3.14>);
  expect<Str.UnsafeParse<boolean, "true">>().to(equal<true>);
  expect<Str.UnsafeParse<number, "foo">>().to(beNever);

  expect<Str.UnsafeParse<number | boolean, "42">>().to(equal<42>);
  expect<Str.UnsafeParse<number | boolean, "42" | "false">>().to(equal<42 | false>);
  expect<Str.UnsafeParse<number | boolean, "foo">>().to(beNever);
  expect<Str.UnsafeParse<number | boolean, "42" | "foo">>().to(equal<42>);

  expect<Str.UnsafeParse<any, "42">>().to(equal<42>);
  expect<Str.UnsafeParse<any, "true">>().to(equal<true>);
  expect<Str.UnsafeParse<any, "foo">>().to(beNever);
});

test("Str.UnsafeParse$", () => {
  expect<Pipe<"42", Str.UnsafeParse$<number>>>().to(equal<42>);
  expect<Pipe<"-3.14", Str.UnsafeParse$<number>>>().to(equal<-3.14>);
  expect<Pipe<"true", Str.UnsafeParse$<boolean>>>().to(equal<true>);
  expect<Pipe<"foo", Str.UnsafeParse$<number>>>().to(beNever);

  expect<Pipe<"42", Str.UnsafeParse$<number | boolean>>>().to(equal<42>);
  expect<Pipe<"42" | "false", Str.UnsafeParse$<number | boolean>>>().to(equal<42 | false>);
  expect<Pipe<"foo", Str.UnsafeParse$<number | boolean>>>().to(beNever);
  expect<Pipe<"42" | "foo", Str.UnsafeParse$<number | boolean>>>().to(equal<42>);

  expect<Pipe<"42", Str.UnsafeParse$<any>>>().to(equal<42>);
  expect<Pipe<"true", Str.UnsafeParse$<any>>>().to(equal<true>);
  expect<Pipe<"foo", Str.UnsafeParse$<any>>>().to(beNever);
});
