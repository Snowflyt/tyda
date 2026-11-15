import type {} from "@tyda/bigint";
import type { Show } from "@tyda/typeclass";
import type { Call1 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

describe("Show<bigint>", () => {
  it("should show `bigint`s", () => {
    expect<Show.Show<42n>>().to(equal<"42n">);
    expect<Call1<Show.Show$, 42n>>().to(equal<"42n">);

    expect<Show.Show<-9007199254741991n>>().to(equal<"-9007199254741991n">);
    expect<Call1<Show.Show$, -9007199254741991n>>().to(equal<"-9007199254741991n">);
  });

  it('should return `"bigint"` for `bigint`', () => {
    expect<Show.Show<bigint>>().to(equal<"bigint">);
    expect<Call1<Show.Show$, bigint>>().to(equal<"bigint">);
  });
});
