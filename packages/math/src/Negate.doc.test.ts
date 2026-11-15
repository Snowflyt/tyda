import { equal, expect, test } from "typroof";

import type { Negate } from "./Negate";

test("Negate", () => {
  expect<Negate<3>>().to(equal<-3>);
  expect<Negate<-3.14>>().to(equal<3.14>);
  expect<Negate<0>>().to(equal<0>);
});
