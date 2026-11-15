import { equal, expect, test } from "typroof";

import type { Div } from "./Div";

test("Div", () => {
  expect<Div<42, 3>>().to(equal<14>);
  expect<Div<4356, 832>>().to(equal<5.235576923076923>);
  expect<Div<4356.791, 832.329>>().to(equal<5.234457768502599>);
  expect<Div<832.329, -4356.791>>().to(equal<-0.1910417552735488>);
});
