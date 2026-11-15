import { describe, equal, expect, it } from "typroof";

import type { _Parse } from "./_Parse";
import type { _Stringify } from "./_Stringify";
import type { _SubUnsigned } from "./_SubUnsigned";

describe("_SubUnsigned", () => {
  it("should subtract two single-digit unsigned decimals", () => {
    expect<_Stringify<_SubUnsigned<_Parse<"0">, _Parse<"0">>>>().to(equal<"0">);

    expect<_Stringify<_SubUnsigned<_Parse<"1">, _Parse<"0">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"1">, _Parse<"1">>>>().to(equal<"0">);

    expect<_Stringify<_SubUnsigned<_Parse<"2">, _Parse<"0">>>>().to(equal<"2">);
    expect<_Stringify<_SubUnsigned<_Parse<"2">, _Parse<"1">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"2">, _Parse<"2">>>>().to(equal<"0">);

    expect<_Stringify<_SubUnsigned<_Parse<"3">, _Parse<"0">>>>().to(equal<"3">);
    expect<_Stringify<_SubUnsigned<_Parse<"3">, _Parse<"1">>>>().to(equal<"2">);
    expect<_Stringify<_SubUnsigned<_Parse<"3">, _Parse<"2">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"3">, _Parse<"3">>>>().to(equal<"0">);

    expect<_Stringify<_SubUnsigned<_Parse<"4">, _Parse<"0">>>>().to(equal<"4">);
    expect<_Stringify<_SubUnsigned<_Parse<"4">, _Parse<"1">>>>().to(equal<"3">);
    expect<_Stringify<_SubUnsigned<_Parse<"4">, _Parse<"2">>>>().to(equal<"2">);
    expect<_Stringify<_SubUnsigned<_Parse<"4">, _Parse<"3">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"4">, _Parse<"4">>>>().to(equal<"0">);

    expect<_Stringify<_SubUnsigned<_Parse<"5">, _Parse<"0">>>>().to(equal<"5">);
    expect<_Stringify<_SubUnsigned<_Parse<"5">, _Parse<"1">>>>().to(equal<"4">);
    expect<_Stringify<_SubUnsigned<_Parse<"5">, _Parse<"2">>>>().to(equal<"3">);
    expect<_Stringify<_SubUnsigned<_Parse<"5">, _Parse<"3">>>>().to(equal<"2">);
    expect<_Stringify<_SubUnsigned<_Parse<"5">, _Parse<"4">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"5">, _Parse<"5">>>>().to(equal<"0">);

    expect<_Stringify<_SubUnsigned<_Parse<"6">, _Parse<"0">>>>().to(equal<"6">);
    expect<_Stringify<_SubUnsigned<_Parse<"6">, _Parse<"1">>>>().to(equal<"5">);
    expect<_Stringify<_SubUnsigned<_Parse<"6">, _Parse<"2">>>>().to(equal<"4">);
    expect<_Stringify<_SubUnsigned<_Parse<"6">, _Parse<"3">>>>().to(equal<"3">);
    expect<_Stringify<_SubUnsigned<_Parse<"6">, _Parse<"4">>>>().to(equal<"2">);
    expect<_Stringify<_SubUnsigned<_Parse<"6">, _Parse<"5">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"6">, _Parse<"6">>>>().to(equal<"0">);

    expect<_Stringify<_SubUnsigned<_Parse<"7">, _Parse<"0">>>>().to(equal<"7">);
    expect<_Stringify<_SubUnsigned<_Parse<"7">, _Parse<"1">>>>().to(equal<"6">);
    expect<_Stringify<_SubUnsigned<_Parse<"7">, _Parse<"2">>>>().to(equal<"5">);
    expect<_Stringify<_SubUnsigned<_Parse<"7">, _Parse<"3">>>>().to(equal<"4">);
    expect<_Stringify<_SubUnsigned<_Parse<"7">, _Parse<"4">>>>().to(equal<"3">);
    expect<_Stringify<_SubUnsigned<_Parse<"7">, _Parse<"5">>>>().to(equal<"2">);
    expect<_Stringify<_SubUnsigned<_Parse<"7">, _Parse<"6">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"7">, _Parse<"7">>>>().to(equal<"0">);

    expect<_Stringify<_SubUnsigned<_Parse<"8">, _Parse<"0">>>>().to(equal<"8">);
    expect<_Stringify<_SubUnsigned<_Parse<"8">, _Parse<"1">>>>().to(equal<"7">);
    expect<_Stringify<_SubUnsigned<_Parse<"8">, _Parse<"2">>>>().to(equal<"6">);
    expect<_Stringify<_SubUnsigned<_Parse<"8">, _Parse<"3">>>>().to(equal<"5">);
    expect<_Stringify<_SubUnsigned<_Parse<"8">, _Parse<"4">>>>().to(equal<"4">);
    expect<_Stringify<_SubUnsigned<_Parse<"8">, _Parse<"5">>>>().to(equal<"3">);
    expect<_Stringify<_SubUnsigned<_Parse<"8">, _Parse<"6">>>>().to(equal<"2">);
    expect<_Stringify<_SubUnsigned<_Parse<"8">, _Parse<"7">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"8">, _Parse<"8">>>>().to(equal<"0">);

    expect<_Stringify<_SubUnsigned<_Parse<"9">, _Parse<"0">>>>().to(equal<"9">);
    expect<_Stringify<_SubUnsigned<_Parse<"9">, _Parse<"1">>>>().to(equal<"8">);
    expect<_Stringify<_SubUnsigned<_Parse<"9">, _Parse<"2">>>>().to(equal<"7">);
    expect<_Stringify<_SubUnsigned<_Parse<"9">, _Parse<"3">>>>().to(equal<"6">);
    expect<_Stringify<_SubUnsigned<_Parse<"9">, _Parse<"4">>>>().to(equal<"5">);
    expect<_Stringify<_SubUnsigned<_Parse<"9">, _Parse<"5">>>>().to(equal<"4">);
    expect<_Stringify<_SubUnsigned<_Parse<"9">, _Parse<"6">>>>().to(equal<"3">);
    expect<_Stringify<_SubUnsigned<_Parse<"9">, _Parse<"7">>>>().to(equal<"2">);
    expect<_Stringify<_SubUnsigned<_Parse<"9">, _Parse<"8">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"9">, _Parse<"9">>>>().to(equal<"0">);
  });

  it("should handle borrowing correctly", () => {
    expect<_Stringify<_SubUnsigned<_Parse<"10">, _Parse<"1">>>>().to(equal<"9">);
    expect<_Stringify<_SubUnsigned<_Parse<"17">, _Parse<"8">>>>().to(equal<"9">);
    expect<_Stringify<_SubUnsigned<_Parse<"27">, _Parse<"9">>>>().to(equal<"18">);
    expect<_Stringify<_SubUnsigned<_Parse<"42">, _Parse<"27">>>>().to(equal<"15">);
    expect<_Stringify<_SubUnsigned<_Parse<"101">, _Parse<"2">>>>().to(equal<"99">);
    expect<_Stringify<_SubUnsigned<_Parse<"100">, _Parse<"1">>>>().to(equal<"99">);
    expect<_Stringify<_SubUnsigned<_Parse<"100">, _Parse<"57">>>>().to(equal<"43">);
    expect<_Stringify<_SubUnsigned<_Parse<"178">, _Parse<"79">>>>().to(equal<"99">);
    expect<_Stringify<_SubUnsigned<_Parse<"200">, _Parse<"1">>>>().to(equal<"199">);
    expect<_Stringify<_SubUnsigned<_Parse<"200">, _Parse<"125">>>>().to(equal<"75">);
    expect<_Stringify<_SubUnsigned<_Parse<"300">, _Parse<"199">>>>().to(equal<"101">);
    expect<_Stringify<_SubUnsigned<_Parse<"1000">, _Parse<"1">>>>().to(equal<"999">);
    expect<_Stringify<_SubUnsigned<_Parse<"1000">, _Parse<"999">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"1234">, _Parse<"567">>>>().to(equal<"667">);
    expect<_Stringify<_SubUnsigned<_Parse<"4356">, _Parse<"832">>>>().to(equal<"3524">);
    expect<_Stringify<_SubUnsigned<_Parse<"5000">, _Parse<"4321">>>>().to(equal<"679">);
    expect<_Stringify<_SubUnsigned<_Parse<"10000">, _Parse<"9999">>>>().to(equal<"1">);
    expect<_Stringify<_SubUnsigned<_Parse<"123.45">, _Parse<"23.45">>>>().to(equal<"100.00">);
    expect<_Stringify<_SubUnsigned<_Parse<"123.45">, _Parse<"67.89">>>>().to(equal<"55.56">);
    expect<_Stringify<_SubUnsigned<_Parse<"123.45">, _Parse<"67">>>>().to(equal<"56.45">);
    expect<_Stringify<_SubUnsigned<_Parse<"123">, _Parse<"67.88">>>>().to(equal<"55.12">);
  });
});
