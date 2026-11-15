import type { Pipe } from "hkt-core";
import { beNever, equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.UnsafeTail", () => {
  expect<Arr.UnsafeTail<[string, number, boolean]>>().to(equal<[number, boolean]>);
  expect<Arr.UnsafeTail<readonly [1, 2, 3]>>().to(equal<readonly [2, 3]>);
  expect<Arr.UnsafeTail<["foo"]>>().to(equal<[]>);
  expect<Arr.UnsafeTail<[]>>().to(beNever);
  expect<Arr.UnsafeTail<string[]>>().to(equal<string[]>);
  expect<Arr.UnsafeTail<[string?]>>().to(equal<[]>);
  expect<Arr.UnsafeTail<[string?, number?]>>().to(equal<[number?]>);
  expect<Arr.UnsafeTail<[string?, ...number[]]>>().to(equal<number[]>);
  expect<Arr.UnsafeTail<[...string[], number, boolean]>>().to(
    equal<[...string[], number, boolean] | [boolean]>,
  );
});

test("Arr.UnsafeTail$", () => {
  expect<Pipe<[string, number, boolean], Arr.UnsafeTail$>>().to(equal<[number, boolean]>);
  expect<Pipe<readonly [1, 2, 3], Arr.UnsafeTail$>>().to(equal<readonly [2, 3]>);
  expect<Pipe<["foo"], Arr.UnsafeTail$>>().to(equal<[]>);
  expect<Pipe<[], Arr.UnsafeTail$>>().to(beNever);
  expect<Pipe<string[], Arr.UnsafeTail$>>().to(equal<string[]>);
  expect<Pipe<[string?], Arr.UnsafeTail$>>().to(equal<[]>);
  expect<Pipe<[string?, number?], Arr.UnsafeTail$>>().to(equal<[number?]>);
  expect<Pipe<[string?, ...number[]], Arr.UnsafeTail$>>().to(equal<number[]>);
  expect<Pipe<[...string[], number, boolean], Arr.UnsafeTail$>>().to(
    equal<[...string[], number, boolean] | [boolean]>,
  );
});
