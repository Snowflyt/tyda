import type { Call2, Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Str } from ".";

test("Str.RemovePrefix", () => {
  expect<Str.RemovePrefix<"hello world", "hello">>().to(equal<" world">);
  expect<Str.RemovePrefix<"hello world", "world">>().to(equal<"hello world">);
  expect<Str.RemovePrefix<"typescript", "type">>().to(equal<"script">);
  expect<Str.RemovePrefix<"typescript", "">>().to(equal<"typescript">);
  expect<Str.RemovePrefix<"", "">>().to(equal<"">);
});

test("Str.RemovePrefix$", () => {
  expect<Pipe<"hello world", Str.RemovePrefix$<"hello">>>().to(equal<" world">);
  expect<Pipe<"hello world", Str.RemovePrefix$<"world">>>().to(equal<"hello world">);
  expect<Pipe<"typescript", Str.RemovePrefix$<"type">>>().to(equal<"script">);
  expect<Pipe<"hello", Str.RemovePrefix$<"">>>().to(equal<"hello">);
  expect<Pipe<"", Str.RemovePrefix$<"">>>().to(equal<"">);
});

test("Str.RemovePrefix$$", () => {
  expect<Call2<Str.RemovePrefix$$, "hello world", "hello">>().to(equal<" world">);
  expect<Call2<Str.RemovePrefix$$, "hello world", "world">>().to(equal<"hello world">);
  expect<Call2<Str.RemovePrefix$$, "typescript", "type">>().to(equal<"script">);
  expect<Call2<Str.RemovePrefix$$, "hello", "">>().to(equal<"hello">);
  expect<Call2<Str.RemovePrefix$$, "", "">>().to(equal<"">);
});
