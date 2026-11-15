import { equal, expect, test } from "typroof";

import type { Trunc } from "./Trunc";

test("Trunc", () => {
  expect<Trunc<13.37>>().to(equal<13>);
  expect<Trunc<42.849>>().to(equal<42>);
  expect<Trunc<0.1234>>().to(equal<0>);
  expect<Trunc<-0.123>>().to(equal<0>);
});
