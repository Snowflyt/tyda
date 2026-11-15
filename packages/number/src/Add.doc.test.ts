import type { Num } from "@tyda/number";
import { equal, expect, test } from "typroof";

test("Num.Add", () => {
  expect<Num.Add<42, 8>>().to(equal<50>);
  expect<Num.Add<4356, 832>>().to(equal<5188>);
  expect<Num.Add<4356.791, 832.329>>().to(equal<5189.12>);
  expect<Num.Add<832.329, -4356.791>>().to(equal<-3524.462>);
});
