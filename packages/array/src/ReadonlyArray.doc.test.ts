import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.ReadonlyArray", () => {
  expect<Arr.ReadonlyArray<number>>().to(equal<readonly number[]>);
  expect<Arr.ReadonlyArray<42 | string>>().to(equal<readonly (42 | string)[]>);
});

test("Arr.ReadonlyArray$", () => {
  expect<Pipe<number, Arr.ReadonlyArray$>>().to(equal<readonly number[]>);
  expect<Pipe<42 | string, Arr.ReadonlyArray$>>().to(equal<readonly (42 | string)[]>);
});
