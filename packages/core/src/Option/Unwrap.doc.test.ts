import type { Pipe } from "hkt-core";
import { beNever, equal, expect, test } from "typroof";

import type { None, Option, Some } from ".";

test("Option.Unwrap", () => {
  expect<Option.Unwrap<Some<42>>>().to(equal<42>);
  expect<Option.Unwrap<None>>().to(beNever);
  expect<Option.Unwrap<Option<number>>>().to(equal<number>);
});

test("Option.Unwrap$", () => {
  expect<Pipe<Some<42>, Option.Unwrap$>>().to(equal<42>);
  expect<Pipe<None, Option.Unwrap$>>().to(beNever);
  expect<Pipe<Option<number>, Option.Unwrap$>>().to(equal<number>);
});
