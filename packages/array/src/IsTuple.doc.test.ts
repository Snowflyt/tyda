import type { Pipe } from "hkt-core";
import { beFalse, beTrue, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.IsTuple", () => {
  expect<Arr.IsTuple<string[]>>().to(beFalse);
  expect<Arr.IsTuple<readonly number[]>>().to(beFalse);
  expect<Arr.IsTuple<["foo", "bar"]>>().to(beTrue);
  expect<Arr.IsTuple<readonly [42, 1337, ...string[]]>>().to(beTrue);
  expect<Arr.IsTuple<readonly [...string[]]>>().to(beFalse);
  expect<Arr.IsTuple<[...(number | string)[]]>>().to(beFalse);
  expect<Arr.IsTuple<[]>>().to(beTrue);
});

test("Arr.IsTuple$", () => {
  expect<Pipe<string[], Arr.IsTuple$>>().to(beFalse);
  expect<Pipe<readonly number[], Arr.IsTuple$>>().to(beFalse);
  expect<Pipe<["foo", "bar"], Arr.IsTuple$>>().to(beTrue);
  expect<Pipe<readonly [42, 1337, ...string[]], Arr.IsTuple$>>().to(beTrue);
  expect<Pipe<readonly [...string[]], Arr.IsTuple$>>().to(beFalse);
  expect<Pipe<[...(number | string)[]], Arr.IsTuple$>>().to(beFalse);
  expect<Pipe<[], Arr.IsTuple$>>().to(beTrue);
});
