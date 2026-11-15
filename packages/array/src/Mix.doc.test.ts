import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.Mix", () => {
  expect<Arr.Mix<string[], number>>().to(equal<(string | number)[]>);
  expect<Arr.Mix<readonly number[], "foo">>().to(equal<readonly (number | "foo")[]>);
});

test("Arr.Mix$", () => {
  expect<Pipe<string[], Arr.Mix$<number>>>().to(equal<(string | number)[]>);
  expect<Pipe<readonly number[], Arr.Mix$<"foo">>>().to(equal<readonly (number | "foo")[]>);
});
