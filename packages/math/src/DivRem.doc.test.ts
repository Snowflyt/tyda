import { equal, expect, test } from "typroof";

import type { DivRem } from "./DivRem";

test("DivRem", () => {
  expect<DivRem<42, 3>>().to(equal<readonly [14, 0]>);
  expect<DivRem<4356, 832>>().to(equal<readonly [5, 196]>);
  expect<DivRem<-4356.791, 832.329>>().to(equal<readonly [-5, -195.146]>);
  expect<DivRem<832.329, -56.791>>().to(equal<readonly [-14, 37.255]>);
});
