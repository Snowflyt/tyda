import { equal, expect, test } from "typroof";

import type { Sub } from "./Sub";

test("Sub", () => {
  expect<Sub<42, 8>>().to(equal<34>);
  expect<Sub<4356, 832>>().to(equal<3524>);
  expect<Sub<4356.791, 832.329>>().to(equal<3524.462>);
  expect<Sub<4356.791, -832.329>>().to(equal<5189.12>);
});
