import type {} from "@tyda/boolean";
import type { Show } from "@tyda/typeclass";
import type { Call1 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

describe("Show<boolean>", () => {
  it("should show `boolean`s", () => {
    expect<Show.Show<true>>().to(equal<"true">);
    expect<Call1<Show.Show$, true>>().to(equal<"true">);

    expect<Show.Show<false>>().to(equal<"false">);
    expect<Call1<Show.Show$, false>>().to(equal<"false">);
  });

  it('should return `"boolean"` for `boolean`', () => {
    expect<Show.Show<boolean>>().to(equal<"boolean">);
    expect<Call1<Show.Show$, boolean>>().to(equal<"boolean">);
  });
});
