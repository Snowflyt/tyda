import type { Pipe } from "hkt-core";
import { beNever, equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.Elem", () => {
  expect<Arr.Elem<readonly string[]>>().to(equal<string>);
  expect<Arr.Elem<(number | boolean)[]>>().to(equal<number | boolean>);
  expect<Arr.Elem<[]>>().to(beNever);
  expect<Arr.Elem<[1, 2, 3]>>().to(equal<1 | 2 | 3>);
});

test("Arr.Elem$", () => {
  expect<Pipe<readonly string[], Arr.Elem$>>().to(equal<string>);
  expect<Pipe<(number | boolean)[], Arr.Elem$>>().to(equal<number | boolean>);
  expect<Pipe<[], Arr.Elem$>>().to(beNever);
  expect<Pipe<[1, 2, 3], Arr.Elem$>>().to(equal<1 | 2 | 3>);
});
