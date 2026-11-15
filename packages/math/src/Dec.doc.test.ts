import { equal, expect, test } from "typroof";

import type { Dec } from "./Dec";

test("Dec", () => {
  expect<Dec<3>>().to(equal<2>);
  expect<Dec<0>>().to(equal<-1>);
  expect<Dec<480>>().to(equal<479>);
  expect<Dec<3.14>>().to(equal<2.14>);
  expect<Dec<0.718>>().to(equal<-0.282>);
  expect<Dec<-2.718>>().to(equal<-3.718>);
});
