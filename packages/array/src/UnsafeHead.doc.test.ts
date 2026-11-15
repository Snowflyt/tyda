import type { Pipe } from "hkt-core";
import { beNever, equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.UnsafeHead", () => {
  expect<Arr.UnsafeHead<[string, number, boolean]>>().to(equal<string>);
  expect<Arr.UnsafeHead<readonly [1, 2, 3]>>().to(equal<1>);
  expect<Arr.UnsafeHead<["foo"]>>().to(equal<"foo">);
  expect<Arr.UnsafeHead<[]>>().to(equal<never>);
  expect<Arr.UnsafeHead<string[]>>().to(equal<string>);
  expect<Arr.UnsafeHead<[string?]>>().to(equal<string>);
  expect<Arr.UnsafeHead<[string?, number?]>>().to(equal<string | number>);
  expect<Arr.UnsafeHead<[string?, ...number[]]>>().to(equal<string | number>);
  expect<Arr.UnsafeHead<[...string[], number]>>().to(equal<string | number>);
});

test("Arr.UnsafeHead$", () => {
  expect<Pipe<readonly [string, number, boolean], Arr.UnsafeHead$>>().to(equal<string>);
  expect<Pipe<readonly [1, 2, 3], Arr.UnsafeHead$>>().to(equal<1>);
  expect<Pipe<readonly ["foo"], Arr.UnsafeHead$>>().to(equal<"foo">);
  expect<Pipe<readonly [], Arr.UnsafeHead$>>().to(beNever);
  expect<Pipe<string[], Arr.UnsafeHead$>>().to(equal<string>);
  expect<Pipe<readonly [string?], Arr.UnsafeHead$>>().to(equal<string>);
  expect<Pipe<readonly [string?, number?], Arr.UnsafeHead$>>().to(equal<string | number>);
  expect<Pipe<readonly [string?, ...number[]], Arr.UnsafeHead$>>().to(equal<string | number>);
  expect<Pipe<readonly [...string[], number], Arr.UnsafeHead$>>().to(equal<string | number>);
});
