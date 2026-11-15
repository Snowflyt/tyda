import type { Arr } from "@tyda/array";
import type { Num } from "@tyda/number";
import type { Call2, Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { None, Option, Some } from ".";

test("Option.Map", () => {
  expect<Option.Map<Some<42>, Num.Inc$>>().to(equal<Some<43>>);
  expect<Option.Map<None, Arr.Of1$>>().to(equal<None>);
  expect<Option.Map<Option<3.14>, Num.Inc$>>().to(equal<Option<4.14>>);
});

test("Option.Map$", () => {
  expect<Pipe<Some<42>, Option.Map$<Num.Inc$>>>().to(equal<Some<43>>);
  expect<Pipe<None, Option.Map$<Arr.Of1$>>>().to(equal<None>);
  expect<Pipe<Option<3.14>, Option.Map$<Num.Inc$>>>().to(equal<Option<4.14>>);
});

test("Option.Map$$", () => {
  expect<Call2<Option.Map$$, Some<42>, Num.Inc$>>().to(equal<Some<43>>);
  expect<Call2<Option.Map$$, None, Arr.Of1$>>().to(equal<None>);
  expect<Call2<Option.Map$$, Option<3.14>, Num.Inc$>>().to(equal<Option<4.14>>);
});
