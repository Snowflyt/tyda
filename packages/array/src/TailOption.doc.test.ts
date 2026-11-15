import type { None, Option, Some } from "@tyda/core";
import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.TailOption", () => {
  expect<Arr.TailOption<[string, number, boolean]>>().to(equal<Some<[number, boolean]>>);
  expect<Arr.TailOption<readonly [1, 2, 3]>>().to(equal<Some<readonly [2, 3]>>);
  expect<Arr.TailOption<["foo"]>>().to(equal<Some<[]>>);
  expect<Arr.TailOption<[]>>().to(equal<None>);
  expect<Arr.TailOption<string[]>>().to(equal<Option<string[]>>);
  expect<Arr.TailOption<[string?]>>().to(equal<Some<[]> | None>);
  expect<Arr.TailOption<[string?, number?]>>().to(equal<Some<[number?]> | None>);
  expect<Arr.TailOption<[string?, ...number[]]>>().to(equal<Option<number[]>>);
  expect<Arr.TailOption<[...string[], number, boolean]>>().to(
    equal<Some<[...string[], number, boolean]> | Some<[boolean]>>,
  );
});

test("Arr.TailOption$", () => {
  expect<Pipe<[string, number, boolean], Arr.TailOption$>>().to(equal<Some<[number, boolean]>>);
  expect<Pipe<readonly [1, 2, 3], Arr.TailOption$>>().to(equal<Some<readonly [2, 3]>>);
  expect<Pipe<["foo"], Arr.TailOption$>>().to(equal<Some<[]>>);
  expect<Pipe<[], Arr.TailOption$>>().to(equal<None>);
  expect<Pipe<string[], Arr.TailOption$>>().to(equal<Option<string[]>>);
  expect<Pipe<[string?], Arr.TailOption$>>().to(equal<Some<[]> | None>);
  expect<Pipe<[string?, number?], Arr.TailOption$>>().to(equal<Some<[number?]> | None>);
  expect<Pipe<[string?, ...number[]], Arr.TailOption$>>().to(equal<Option<number[]>>);
  expect<Pipe<[...string[], number, boolean], Arr.TailOption$>>().to(
    equal<Some<[...string[], number, boolean]> | Some<[boolean]>>,
  );
});
