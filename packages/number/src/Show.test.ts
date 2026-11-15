import type {} from "@tyda/number";
import type { Show } from "@tyda/typeclass";
import type { Call1 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

describe("Show<number>", () => {
  it("should show `number`s", () => {
    expect<Show.Show<42>>().to(equal<"42">);
    expect<Call1<Show.Show$, 42>>().to(equal<"42">);

    expect<Show.Show<0>>().to(equal<"0">);
    expect<Call1<Show.Show$, 0>>().to(equal<"0">);

    expect<Show.Show<3.14>>().to(equal<"3.14">);
    expect<Call1<Show.Show$, 3.14>>().to(equal<"3.14">);

    expect<Show.Show<-2.718>>().to(equal<"-2.718">);
    expect<Call1<Show.Show$, -2.718>>().to(equal<"-2.718">);
  });

  it('should return `"number"` for `number`', () => {
    expect<Show.Show<number>>().to(equal<"number">);
    expect<Call1<Show.Show$, number>>().to(equal<"number">);
  });
});
