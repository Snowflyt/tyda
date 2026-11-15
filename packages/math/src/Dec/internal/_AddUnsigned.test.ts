import { describe, equal, expect, it } from "typroof";

import type { _AddUnsigned } from "./_AddUnsigned";
import type { _Parse } from "./_Parse";
import type { _Stringify } from "./_Stringify";

describe("_AddUnsigned", () => {
  it("should add two unsigned decimals", () => {
    expect<_Stringify<_AddUnsigned<_Parse<"123.45">, _Parse<"67.89">>>>().to(equal<"191.34">);
    expect<_Stringify<_AddUnsigned<_Parse<"0.1">, _Parse<"0.032">>>>().to(equal<"0.132">);
    expect<_Stringify<_AddUnsigned<_Parse<"0.00456">, _Parse<"1.23">>>>().to(equal<"1.23456">);
    expect<_Stringify<_AddUnsigned<_Parse<"0.05">, _Parse<"0.05">>>>().to(equal<"0.10">);
    expect<_Stringify<_AddUnsigned<_Parse<"0.0001">, _Parse<"0.00002">>>>().to(equal<"0.00012">);
    expect<_Stringify<_AddUnsigned<_Parse<"1000">, _Parse<"2500">>>>().to(equal<"3500">);
    expect<_Stringify<_AddUnsigned<_Parse<"15.345">, _Parse<"17">>>>().to(equal<"32.345">);
    expect<_Stringify<_AddUnsigned<_Parse<"4561">, _Parse<"39.9">>>>().to(equal<"4600.9">);
  });

  it("should add zeroes correctly", () => {
    expect<_Stringify<_AddUnsigned<_Parse<"0">, _Parse<"0">>>>().to(equal<"0">);
    expect<_Stringify<_AddUnsigned<_Parse<"0.0">, _Parse<"0.00">>>>().to(equal<"0.00">);
    expect<_Stringify<_AddUnsigned<_Parse<"0.0">, _Parse<"0">>>>().to(equal<"0.0">);
    expect<_Stringify<_AddUnsigned<_Parse<"0">, _Parse<"0.000">>>>().to(equal<"0.000">);
  });
});
