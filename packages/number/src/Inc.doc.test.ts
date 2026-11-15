import type { Num } from "@tyda/number";
import { equal, expect, test } from "typroof";

test("Num.Inc", () => {
  expect<Num.Inc<3>>().to(equal<4>);
  expect<Num.Inc<-1>>().to(equal<0>);
  expect<Num.Inc<479>>().to(equal<480>);
  expect<Num.Inc<2.718>>().to(equal<3.718>);
  expect<Num.Inc<-0.5>>().to(equal<0.5>);
  expect<Num.Inc<-3.14>>().to(equal<-2.14>);
});
