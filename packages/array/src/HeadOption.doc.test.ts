import type { None, Option, Some } from "@tyda/core";
import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Arr } from ".";

test("Arr.HeadOption", () => {
  expect<Arr.HeadOption<[string, number, boolean]>>().to(equal<Some<string>>);
  expect<Arr.HeadOption<readonly [1, 2, 3]>>().to(equal<Some<1>>);
  expect<Arr.HeadOption<["foo"]>>().to(equal<Some<"foo">>);
  expect<Arr.HeadOption<[]>>().to(equal<None>);
  expect<Arr.HeadOption<string[]>>().to(equal<Option<string>>);
  expect<Arr.HeadOption<[string?]>>().to(equal<Some<string> | None>);
  expect<Arr.HeadOption<[string?, number?]>>().to(equal<Some<string> | Some<number> | None>);
  expect<Arr.HeadOption<[string?, ...number[]]>>().to(equal<Some<string> | Option<number>>);
  expect<Arr.HeadOption<[...string[], number, boolean]>>().to(equal<Some<string> | Some<number>>);
});

test("Arr.HeadOption$", () => {
  expect<Pipe<readonly [string, number, boolean], Arr.HeadOption$>>().to(equal<Some<string>>);
  expect<Pipe<readonly [1, 2, 3], Arr.HeadOption$>>().to(equal<Some<1>>);
  expect<Pipe<readonly ["foo"], Arr.HeadOption$>>().to(equal<Some<"foo">>);
  expect<Pipe<readonly [], Arr.HeadOption$>>().to(equal<None>);
  expect<Pipe<string[], Arr.HeadOption$>>().to(equal<Option<string>>);
  expect<Pipe<readonly [string?], Arr.HeadOption$>>().to(equal<Some<string> | None>);
  expect<Pipe<readonly [string?, number?], Arr.HeadOption$>>().to(
    equal<Some<string> | Some<number> | None>,
  );
  expect<Pipe<readonly [string?, ...number[]], Arr.HeadOption$>>().to(
    equal<Some<string> | Option<number>>,
  );
  expect<Pipe<readonly [...string[], number, boolean], Arr.HeadOption$>>().to(
    equal<Some<string> | Some<number>>,
  );
});
