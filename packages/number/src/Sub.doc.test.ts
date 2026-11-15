import type { Num } from "@tyda/number";
import { equal, expect, test } from "typroof";

test("Num.Sub", () => {
  expect<Num.Sub<42, 8>>().to(equal<34>);
  expect<Num.Sub<4356, 832>>().to(equal<3524>);
  expect<Num.Sub<4356.791, 832.329>>().to(equal<3524.462>);
  expect<Num.Sub<4356.791, -832.329>>().to(equal<5189.12>);
});
