import { equal, expect, test } from "typroof";

import type { Inc } from "./Inc";

test("Inc", () => {
  expect<Inc<3>>().to(equal<4>);
  expect<Inc<-1>>().to(equal<0>);
  expect<Inc<479>>().to(equal<480>);
  expect<Inc<2.718>>().to(equal<3.718>);
  expect<Inc<-0.5>>().to(equal<0.5>);
  expect<Inc<-3.14>>().to(equal<-2.14>);
});
