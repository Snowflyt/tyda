import { describe, equal, expect, it } from "typroof";

import type { _MulUnsigned } from "./_MulUnsigned";
import type { _Parse } from "./_Parse";
import type { _Stringify } from "./_Stringify";

describe("_MulUnsigned", () => {
  it("should multiply two unsigned decimals", () => {
    expect<_Stringify<_MulUnsigned<_Parse<"123.45">, _Parse<"67.89">>>>().to(equal<"8381.0205">);
    expect<_Stringify<_MulUnsigned<_Parse<"0.1">, _Parse<"0.032">>>>().to(equal<"0.0032">);
    expect<_Stringify<_MulUnsigned<_Parse<"0.00456">, _Parse<"1.23">>>>().to(equal<"0.0056088">);
    expect<_Stringify<_MulUnsigned<_Parse<"0.0001">, _Parse<"0.00002">>>>().to(
      equal<"0.000000002">,
    );
    expect<_Stringify<_MulUnsigned<_Parse<"1000">, _Parse<"2500">>>>().to(equal<"2500000">);
    expect<_Stringify<_MulUnsigned<_Parse<"15.345">, _Parse<"17">>>>().to(equal<"260.865">);
    expect<_Stringify<_MulUnsigned<_Parse<"4561">, _Parse<"39.9">>>>().to(equal<"181983.9">);
    expect<_Stringify<_MulUnsigned<_Parse<"12">, _Parse<"12">>>>().to(equal<"144">);
  });

  it("should multiply zeroes correctly", () => {
    expect<_Stringify<_MulUnsigned<_Parse<"0">, _Parse<"0">>>>().to(equal<"0">);
    expect<_Stringify<_MulUnsigned<_Parse<"0.0">, _Parse<"0.00">>>>().to(equal<"0.000">);
    expect<_Stringify<_MulUnsigned<_Parse<"0.0">, _Parse<"0">>>>().to(equal<"0.0">);
    expect<_Stringify<_MulUnsigned<_Parse<"0">, _Parse<"0.000">>>>().to(equal<"0.000">);
  });
});
