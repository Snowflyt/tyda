import type { Call2, Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Str } from ".";

test("Str.RemoveSuffix", () => {
  expect<Str.RemoveSuffix<"hello world", "world">>().to(equal<"hello ">);
  expect<Str.RemoveSuffix<"hello world", "hello">>().to(equal<"hello world">);
  expect<Str.RemoveSuffix<"typescript", "script">>().to(equal<"type">);
  expect<Str.RemoveSuffix<"typescript", "">>().to(equal<"typescript">);
  expect<Str.RemoveSuffix<"", "">>().to(equal<"">);
});

test("Str.RemoveSuffix$", () => {
  expect<Pipe<"hello world", Str.RemoveSuffix$<"world">>>().to(equal<"hello ">);
  expect<Pipe<"hello world", Str.RemoveSuffix$<"hello">>>().to(equal<"hello world">);
  expect<Pipe<"typescript", Str.RemoveSuffix$<"script">>>().to(equal<"type">);
  expect<Pipe<"hello", Str.RemoveSuffix$<"">>>().to(equal<"hello">);
  expect<Pipe<"", Str.RemoveSuffix$<"">>>().to(equal<"">);
});

test("Str.RemoveSuffix$$", () => {
  expect<Call2<Str.RemoveSuffix$$, "hello world", "world">>().to(equal<"hello ">);
  expect<Call2<Str.RemoveSuffix$$, "hello world", "hello">>().to(equal<"hello world">);
  expect<Call2<Str.RemoveSuffix$$, "typescript", "script">>().to(equal<"type">);
  expect<Call2<Str.RemoveSuffix$$, "hello", "">>().to(equal<"hello">);
  expect<Call2<Str.RemoveSuffix$$, "", "">>().to(equal<"">);
});
