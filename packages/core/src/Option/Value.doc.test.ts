import type { Pipe } from "hkt-core";
import { beNever, equal, expect, test } from "typroof";

import type { None, Option, Some } from ".";

test("Option.Value", () => {
  expect<Option.Value<Option<string>>>().to(equal<string>);
  expect<Option.Value<Some<number>>>().to(equal<number>);
  expect<Option.Value<None>>().to(beNever);
});

test("Option.Value$", () => {
  expect<Pipe<Option<string>, Option.Value$>>().to(equal<string>);
  expect<Pipe<Some<number>, Option.Value$>>().to(equal<number>);
  expect<Pipe<None, Option.Value$>>().to(beNever);
});
