import type { Pipe } from "hkt-core";
import { beFalse, beTrue, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.IsReadonly", () => {
  expect<Arr.IsReadonly<string[]>>().to(beFalse);
  expect<Arr.IsReadonly<readonly number[]>>().to(beTrue);
  expect<Arr.IsReadonly<["foo", "bar"]>>().to(beFalse);
  expect<Arr.IsReadonly<readonly [42, 1337, ...string[]]>>().to(beTrue);
});

test("Arr.IsReadonly$", () => {
  expect<Pipe<string[], Arr.IsReadonly$>>().to(beFalse);
  expect<Pipe<readonly number[], Arr.IsReadonly$>>().to(beTrue);
  expect<Pipe<["foo", "bar"], Arr.IsReadonly$>>().to(beFalse);
  expect<Pipe<readonly [42, 1337, ...string[]], Arr.IsReadonly$>>().to(beTrue);
});
