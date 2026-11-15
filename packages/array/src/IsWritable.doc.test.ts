import type { TypeIs, TypeIsNot } from "@tyda/core";
import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.IsWritable", () => {
  expect<Arr.IsWritable<string[]>>().to(equal<TypeIs<unknown[]>>);
  expect<Arr.IsWritable<readonly number[]>>().to(equal<TypeIsNot<unknown[]>>);
  expect<Arr.IsWritable<["foo", "bar"]>>().to(equal<TypeIs<unknown[]>>);
  expect<Arr.IsWritable<readonly [42, 1337, ...string[]]>>().to(equal<TypeIsNot<unknown[]>>);
});

test("Arr.IsWritable$", () => {
  expect<Pipe<string[], Arr.IsWritable$>>().to(equal<TypeIs<unknown[]>>);
  expect<Pipe<readonly number[], Arr.IsWritable$>>().to(equal<TypeIsNot<unknown[]>>);
  expect<Pipe<["foo", "bar"], Arr.IsWritable$>>().to(equal<TypeIs<unknown[]>>);
  expect<Pipe<readonly [42, 1337, ...string[]], Arr.IsWritable$>>().to(equal<TypeIsNot<unknown[]>>);
});
