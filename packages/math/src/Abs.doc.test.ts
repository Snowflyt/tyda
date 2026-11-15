import { equal, expect, test } from "typroof";

import type { Abs } from "./Abs";

test("Abs", () => {
  expect<Abs<3>>().to(equal<3>);
  expect<Abs<-3>>().to(equal<3>);
  expect<Abs<0>>().to(equal<0>);
});
