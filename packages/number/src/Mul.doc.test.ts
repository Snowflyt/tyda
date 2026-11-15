import type { Num } from "@tyda/number";
import { equal, expect, test } from "typroof";

test("Num.Mul", () => {
  expect<Num.Mul<42, 3>>().to(equal<126>);
  expect<Num.Mul<4356, 832>>().to(equal<3624192>);
  expect<Num.Mul<4356.791, 832.329>>().to(equal<3626283.496239>);
  expect<Num.Mul<832.329, -4356.791>>().to(equal<-3626283.496239>);
});
