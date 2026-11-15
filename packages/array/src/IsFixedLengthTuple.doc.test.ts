import type { Pipe } from "hkt-core";
import { beFalse, beTrue, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.IsFixedLengthTuple", () => {
  expect<Arr.IsFixedLengthTuple<string[]>>().to(beFalse);
  expect<Arr.IsFixedLengthTuple<readonly number[]>>().to(beFalse);
  expect<Arr.IsFixedLengthTuple<["foo", "bar"]>>().to(beTrue);
  expect<Arr.IsFixedLengthTuple<readonly [42, 1337, ...string[]]>>().to(beFalse);
});

test("Arr.IsFixedLengthTuple$", () => {
  expect<Pipe<string[], Arr.IsFixedLengthTuple$>>().to(beFalse);
  expect<Pipe<readonly number[], Arr.IsFixedLengthTuple$>>().to(beFalse);
  expect<Pipe<["foo", "bar"], Arr.IsFixedLengthTuple$>>().to(beTrue);
  expect<Pipe<readonly [42, 1337, ...string[]], Arr.IsFixedLengthTuple$>>().to(beFalse);
});
