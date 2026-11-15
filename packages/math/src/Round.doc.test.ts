import { equal, expect, test } from "typroof";

import type { Round } from "./Round";

test("Round", () => {
  expect<Round<3>>().to(equal<3>);
  expect<Round<3.14>>().to(equal<3>);
  expect<Round<3.5>>().to(equal<4>);
  expect<Round<-2.718>>().to(equal<-3>);
});
