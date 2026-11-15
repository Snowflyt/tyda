import type {} from "@tyda/string";
import type { Show } from "@tyda/typeclass";
import type { Call1 } from "hkt-core";
import { describe, equal, expect, it } from "typroof";

describe("Show<string>", () => {
  it("should convert string to its quoted form", () => {
    expect<Show.Show<"foo">>().to(equal<"'foo'">);
    expect<Call1<Show.Show$, "foo">>().to(equal<"'foo'">);

    expect<Show.Show<"">>().to(equal<"''">);
    expect<Call1<Show.Show$, "">>().to(equal<"''">);

    expect<Show.Show<"hello world!">>().to(equal<"'hello world!'">);
    expect<Call1<Show.Show$, "hello world!">>().to(equal<"'hello world!'">);
  });

  it('should return `"string"` for `string`', () => {
    expect<Show.Show<string>>().to(equal<"string">);
    expect<Call1<Show.Show$, string>>().to(equal<"string">);
  });
});
