import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.Tail", () => {
  expect<Arr.Tail<[string, number, boolean]>>().to(equal<[number, boolean]>);
  expect<Arr.Tail<readonly [1, 2, 3]>>().to(equal<readonly [2, 3]>);
  expect<Arr.Tail<["foo"]>>().to(equal<[]>);
});

test("Arr.Tail$", () => {
  expect<Pipe<[string, number, boolean], Arr.Tail$>>().to(equal<[number, boolean]>);
  expect<Pipe<readonly [1, 2, 3], Arr.Tail$>>().to(equal<readonly [2, 3]>);
  expect<Pipe<["foo"], Arr.Tail$>>().to(equal<[]>);
});
