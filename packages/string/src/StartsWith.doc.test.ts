import type { Call2, Pipe } from "hkt-core";
import { beFalse, beTrue, expect, test } from "typroof";

import type { Str } from ".";

test("Str.StartsWith", () => {
  expect<Str.StartsWith<"hello world", "hello">>().to(beTrue);
  expect<Str.StartsWith<"hello world", "world">>().to(beFalse);
  expect<Str.StartsWith<"typescript", "type">>().to(beTrue);
  expect<Str.StartsWith<"typescript", "">>().to(beTrue);
  expect<Str.StartsWith<"", "">>().to(beTrue);
});

test("Str.StartsWith$", () => {
  expect<Pipe<"hello world", Str.StartsWith$<"hello">>>().to(beTrue);
  expect<Pipe<"hello world", Str.StartsWith$<"world">>>().to(beFalse);
  expect<Pipe<"typescript", Str.StartsWith$<"type">>>().to(beTrue);
  expect<Pipe<"hello", Str.StartsWith$<"">>>().to(beTrue);
  expect<Pipe<"", Str.StartsWith$<"">>>().to(beTrue);
});

test("Str.StartsWith$$", () => {
  expect<Call2<Str.StartsWith$$, "hello world", "hello">>().to(beTrue);
  expect<Call2<Str.StartsWith$$, "hello world", "world">>().to(beFalse);
  expect<Call2<Str.StartsWith$$, "typescript", "type">>().to(beTrue);
  expect<Call2<Str.StartsWith$$, "hello", "">>().to(beTrue);
  expect<Call2<Str.StartsWith$$, "", "">>().to(beTrue);
});
