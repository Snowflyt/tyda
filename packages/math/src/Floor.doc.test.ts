import { equal, expect, test } from "typroof";

import type { Floor } from "./Floor";

test("Floor", () => {
  expect<Floor<3>>().to(equal<3>);
  expect<Floor<3.14>>().to(equal<3>);
  expect<Floor<-2.718>>().to(equal<-3>);
});
