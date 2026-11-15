import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.Mutate", () => {
  expect<Arr.Mutate<string[], number>>().to(equal<number[]>);
  expect<Arr.Mutate<readonly number[], "foo">>().to(equal<readonly "foo"[]>);
});

test("Arr.Mutate", () => {
  expect<Pipe<string[], Arr.Mutate$<number>>>().to(equal<number[]>);
  expect<Pipe<readonly number[], Arr.Mutate$<"foo">>>().to(equal<readonly "foo"[]>);
});
