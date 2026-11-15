import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.Array", () => {
  expect<Arr.Array<number>>().to(equal<number[]>);
  expect<Arr.Array<42 | string>>().to(equal<(42 | string)[]>);
});

test("Arr.Array$", () => {
  expect<Pipe<number, Arr.Array$>>().to(equal<number[]>);
  expect<Pipe<42 | string, Arr.Array$>>().to(equal<(42 | string)[]>);
});
