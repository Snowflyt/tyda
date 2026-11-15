import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.Of1", () => {
  expect<Arr.Of1<42>>().to(equal<readonly [42]>);
  expect<Arr.Of1<number | string>>().to(equal<readonly [number | string]>);
});

test("Arr.Of1$", () => {
  expect<Pipe<42, Arr.Of1$>>().to(equal<readonly [42]>);
  expect<Pipe<number | string, Arr.Of1$>>().to(equal<readonly [number | string]>);
});
