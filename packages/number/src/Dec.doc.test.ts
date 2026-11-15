import type { Num } from "@tyda/number";
import { equal, expect, test } from "typroof";

test("Num.Dec", () => {
  expect<Num.Dec<3>>().to(equal<2>);
  expect<Num.Dec<0>>().to(equal<-1>);
  expect<Num.Dec<480>>().to(equal<479>);
  expect<Num.Dec<3.14>>().to(equal<2.14>);
  expect<Num.Dec<0.718>>().to(equal<-0.282>);
  expect<Num.Dec<-2.718>>().to(equal<-3.718>);
});
