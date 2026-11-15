import { equal, expect, test } from "typroof";

import type { Rem } from "./Rem";

test("Rem", () => {
  expect<Rem<42, 3>>().to(equal<0>);
  expect<Rem<4356, 832>>().to(equal<196>);
  expect<Rem<-4356.791, 832.329>>().to(equal<-195.146>);
  expect<Rem<832.329, -56.791>>().to(equal<37.255>);
});
