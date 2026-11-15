import { equal, expect, test } from "typroof";

import type { Mul } from "./Mul";

test("Mul", () => {
  expect<Mul<42, 3>>().to(equal<126>);
  expect<Mul<4356, 832>>().to(equal<3624192>);
  expect<Mul<4356.791, 832.329>>().to(equal<3626283.496239>);
  expect<Mul<832.329, -4356.791>>().to(equal<-3626283.496239>);
});
