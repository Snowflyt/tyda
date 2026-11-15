import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.TailOrEmpty", () => {
  expect<Arr.TailOrEmpty<[string, number, boolean]>>().to(equal<[number, boolean]>);
  expect<Arr.TailOrEmpty<readonly [1, 2, 3]>>().to(equal<readonly [2, 3]>);
  expect<Arr.TailOrEmpty<["foo"]>>().to(equal<[]>);
  expect<Arr.TailOrEmpty<[]>>().to(equal<[]>);
  expect<Arr.TailOrEmpty<string[]>>().to(equal<string[]>);
  expect<Arr.TailOrEmpty<[string?]>>().to(equal<[]>);
  expect<Arr.TailOrEmpty<[string?, number?]>>().to(equal<[number?]>);
  expect<Arr.TailOrEmpty<[string?, ...number[]]>>().to(equal<number[]>);
  expect<Arr.TailOrEmpty<[...string[], number, boolean]>>().to(
    equal<[...string[], number, boolean] | [boolean]>,
  );
});

test("Arr.TailOrEmpty$", () => {
  expect<Pipe<[string, number, boolean], Arr.TailOrEmpty$>>().to(equal<[number, boolean]>);
  expect<Pipe<readonly [1, 2, 3], Arr.TailOrEmpty$>>().to(equal<readonly [2, 3]>);
  expect<Pipe<["foo"], Arr.TailOrEmpty$>>().to(equal<[]>);
  expect<Pipe<[], Arr.TailOrEmpty$>>().to(equal<[]>);
  expect<Pipe<string[], Arr.TailOrEmpty$>>().to(equal<string[]>);
  expect<Pipe<[string?], Arr.TailOrEmpty$>>().to(equal<[]>);
  expect<Pipe<[string?, number?], Arr.TailOrEmpty$>>().to(equal<[number?]>);
  expect<Pipe<[string?, ...number[]], Arr.TailOrEmpty$>>().to(equal<number[]>);
  expect<Pipe<[...string[], number, boolean], Arr.TailOrEmpty$>>().to(
    equal<[...string[], number, boolean] | [boolean]>,
  );
});
