import { equal, expect, test } from "typroof";

import type { Add } from "./Add";

test("Add", () => {
  expect<Add<42, 8>>().to(equal<50>);
  expect<Add<4356, 832>>().to(equal<5188>);
  expect<Add<4356.791, 832.329>>().to(equal<5189.12>);
  expect<Add<832.329, -4356.791>>().to(equal<-3524.462>);
});
