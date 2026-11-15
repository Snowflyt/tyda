import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.Head", () => {
  expect<Arr.Head<[string, number, boolean]>>().to(equal<string>);
  expect<Arr.Head<readonly [1, 2, 3]>>().to(equal<1>);
  expect<Arr.Head<["foo"]>>().to(equal<"foo">);
});

test("Arr.Head$", () => {
  expect<Pipe<[string, number, boolean], Arr.Head$>>().to(equal<string>);
  expect<Pipe<readonly [1, 2, 3], Arr.Head$>>().to(equal<1>);
  expect<Pipe<["foo"], Arr.Head$>>().to(equal<"foo">);
});
