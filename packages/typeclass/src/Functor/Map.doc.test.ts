import type { Arr } from "@tyda/array";
import type { None, Some } from "@tyda/core";
import type { Num } from "@tyda/number";
import type { Call2, Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Functor } from ".";

test("Functor.Map", () => {
  expect<Functor.Map<[1, 2, 3], Num.Inc$>>().to(equal<[2, 3, 4]>);
  expect<Functor.Map<Some<3.14>, Num.Inc$>>().to(equal<Some<4.14>>);
  expect<Functor.Map<None, Arr.Of1$>>().to(equal<None>);
});

test("Functor.Map$", () => {
  expect<Pipe<[1, 2, 3], Functor.Map$<Num.Inc$>>>().to(equal<[2, 3, 4]>);
  expect<Pipe<Some<3.14>, Functor.Map$<Num.Inc$>>>().to(equal<Some<4.14>>);
  expect<Pipe<None, Functor.Map$<Arr.Of1$>>>().to(equal<None>);
});

test("Functor.Map$$", () => {
  expect<Call2<Functor.Map$$, [1, 2, 3], Num.Inc$>>().to(equal<[2, 3, 4]>);
  expect<Call2<Functor.Map$$, Some<3.14>, Num.Inc$>>().to(equal<Some<4.14>>);
  expect<Call2<Functor.Map$$, None, Arr.Of1$>>().to(equal<None>);
});
