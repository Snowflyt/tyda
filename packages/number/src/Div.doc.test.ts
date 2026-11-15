import type { Num } from "@tyda/number";
import { equal, expect, test } from "typroof";

test("Num.Div", () => {
  expect<Num.Div<42, 3>>().to(equal<14>);
  expect<Num.Div<4356, 832>>().to(equal<5.235576923076923>);
  expect<Num.Div<4356.791, 832.329>>().to(equal<5.234457768502599>);
  expect<Num.Div<832.329, -4356.791>>().to(equal<-0.1910417552735488>);
});
