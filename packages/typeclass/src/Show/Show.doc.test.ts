import type { Option, Some } from "@tyda/core";
import type {} from "@tyda/number";
import type {} from "@tyda/string";
import type {} from "@tyda/boolean";
import { beOneOf } from "@tyda/typroof-plugin";
import type { Pipe } from "hkt-core";
import { equal, expect, test } from "typroof";

import type { Show } from ".";

test("Show.Show", () => {
  expect<Show.Show<42>>().to(equal<"42">);
  expect<Show.Show<Some<"foo">>>().to(equal<"Some<'foo'>">);
  expect<Show.Show<Option<Some<true | 42>> | "bar">>().to(
    beOneOf<
      "Option<Some<true | 42>> | 'bar'",
      "'bar' | Option<Some<true | 42>>",
      "Option<Some<42 | true>> | 'bar'",
      "'bar' | Option<Some<42 | true>>"
    >,
  );
});

test("Show.Show$", () => {
  expect<Pipe<42, Show.Show$>>().to(equal<"42">);
  expect<Pipe<Some<"foo">, Show.Show$>>().to(equal<"Some<'foo'>">);
  expect<Pipe<Option<Some<true | 42>> | "bar", Show.Show$>>().to(
    beOneOf<
      "Option<Some<true | 42>> | 'bar'",
      "'bar' | Option<Some<true | 42>>",
      "Option<Some<42 | true>> | 'bar'",
      "'bar' | Option<Some<42 | true>>"
    >,
  );
});
