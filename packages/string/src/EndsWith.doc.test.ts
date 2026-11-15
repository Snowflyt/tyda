import type { Call2, Pipe } from "hkt-core";
import { beFalse, beTrue, expect, test } from "typroof";

import type { Str } from ".";

test("Str.EndsWith", () => {
  expect<Str.EndsWith<"hello world", "world">>().to(beTrue);
  expect<Str.EndsWith<"hello world", "hello">>().to(beFalse);
  expect<Str.EndsWith<"typescript", "script">>().to(beTrue);
  expect<Str.EndsWith<"typescript", "">>().to(beTrue);
  expect<Str.EndsWith<"", "">>().to(beTrue);
});

test("Str.EndsWith$", () => {
  expect<Pipe<"hello world", Str.EndsWith$<"world">>>().to(beTrue);
  expect<Pipe<"hello world", Str.EndsWith$<"hello">>>().to(beFalse);
  expect<Pipe<"typescript", Str.EndsWith$<"script">>>().to(beTrue);
  expect<Pipe<"hello", Str.EndsWith$<"">>>().to(beTrue);
  expect<Pipe<"", Str.EndsWith$<"">>>().to(beTrue);
});

test("Str.EndsWith$$", () => {
  expect<Call2<Str.EndsWith$$, "hello world", "world">>().to(beTrue);
  expect<Call2<Str.EndsWith$$, "hello world", "hello">>().to(beFalse);
  expect<Call2<Str.EndsWith$$, "typescript", "script">>().to(beTrue);
  expect<Call2<Str.EndsWith$$, "hello", "">>().to(beTrue);
  expect<Call2<Str.EndsWith$$, "", "">>().to(beTrue);
});
