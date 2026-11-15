import { describe, equal, expect, it } from "typroof";

import type { _SubNat } from "./_SubNat";

describe("_SubNat", () => {
  it("should subtract two single-digit natural numbers", () => {
    expect<_SubNat<"0", "0">>().to(equal<"0">);

    expect<_SubNat<"1", "0">>().to(equal<"1">);
    expect<_SubNat<"1", "1">>().to(equal<"0">);

    expect<_SubNat<"2", "0">>().to(equal<"2">);
    expect<_SubNat<"2", "1">>().to(equal<"1">);
    expect<_SubNat<"2", "2">>().to(equal<"0">);

    expect<_SubNat<"3", "0">>().to(equal<"3">);
    expect<_SubNat<"3", "1">>().to(equal<"2">);
    expect<_SubNat<"3", "2">>().to(equal<"1">);
    expect<_SubNat<"3", "3">>().to(equal<"0">);

    expect<_SubNat<"4", "0">>().to(equal<"4">);
    expect<_SubNat<"4", "1">>().to(equal<"3">);
    expect<_SubNat<"4", "2">>().to(equal<"2">);
    expect<_SubNat<"4", "3">>().to(equal<"1">);
    expect<_SubNat<"4", "4">>().to(equal<"0">);

    expect<_SubNat<"5", "0">>().to(equal<"5">);
    expect<_SubNat<"5", "1">>().to(equal<"4">);
    expect<_SubNat<"5", "2">>().to(equal<"3">);
    expect<_SubNat<"5", "3">>().to(equal<"2">);
    expect<_SubNat<"5", "4">>().to(equal<"1">);
    expect<_SubNat<"5", "5">>().to(equal<"0">);

    expect<_SubNat<"6", "0">>().to(equal<"6">);
    expect<_SubNat<"6", "1">>().to(equal<"5">);
    expect<_SubNat<"6", "2">>().to(equal<"4">);
    expect<_SubNat<"6", "3">>().to(equal<"3">);
    expect<_SubNat<"6", "4">>().to(equal<"2">);
    expect<_SubNat<"6", "5">>().to(equal<"1">);
    expect<_SubNat<"6", "6">>().to(equal<"0">);

    expect<_SubNat<"7", "0">>().to(equal<"7">);
    expect<_SubNat<"7", "1">>().to(equal<"6">);
    expect<_SubNat<"7", "2">>().to(equal<"5">);
    expect<_SubNat<"7", "3">>().to(equal<"4">);
    expect<_SubNat<"7", "4">>().to(equal<"3">);
    expect<_SubNat<"7", "5">>().to(equal<"2">);
    expect<_SubNat<"7", "6">>().to(equal<"1">);
    expect<_SubNat<"7", "7">>().to(equal<"0">);

    expect<_SubNat<"8", "0">>().to(equal<"8">);
    expect<_SubNat<"8", "1">>().to(equal<"7">);
    expect<_SubNat<"8", "2">>().to(equal<"6">);
    expect<_SubNat<"8", "3">>().to(equal<"5">);
    expect<_SubNat<"8", "4">>().to(equal<"4">);
    expect<_SubNat<"8", "5">>().to(equal<"3">);
    expect<_SubNat<"8", "6">>().to(equal<"2">);
    expect<_SubNat<"8", "7">>().to(equal<"1">);
    expect<_SubNat<"8", "8">>().to(equal<"0">);

    expect<_SubNat<"9", "0">>().to(equal<"9">);
    expect<_SubNat<"9", "1">>().to(equal<"8">);
    expect<_SubNat<"9", "2">>().to(equal<"7">);
    expect<_SubNat<"9", "3">>().to(equal<"6">);
    expect<_SubNat<"9", "4">>().to(equal<"5">);
    expect<_SubNat<"9", "5">>().to(equal<"4">);
    expect<_SubNat<"9", "6">>().to(equal<"3">);
    expect<_SubNat<"9", "7">>().to(equal<"2">);
    expect<_SubNat<"9", "8">>().to(equal<"1">);
    expect<_SubNat<"9", "9">>().to(equal<"0">);
  });

  it("should handle borrowing correctly", () => {
    expect<_SubNat<"10", "1">>().to(equal<"9">);
    expect<_SubNat<"17", "8">>().to(equal<"9">);
    expect<_SubNat<"27", "9">>().to(equal<"18">);
    expect<_SubNat<"42", "27">>().to(equal<"15">);
    expect<_SubNat<"101", "2">>().to(equal<"99">);
    expect<_SubNat<"100", "1">>().to(equal<"99">);
    expect<_SubNat<"100", "57">>().to(equal<"43">);
    expect<_SubNat<"178", "79">>().to(equal<"99">);
    expect<_SubNat<"200", "1">>().to(equal<"199">);
    expect<_SubNat<"200", "125">>().to(equal<"75">);
    expect<_SubNat<"300", "199">>().to(equal<"101">);
    expect<_SubNat<"1000", "1">>().to(equal<"999">);
    expect<_SubNat<"1000", "999">>().to(equal<"1">);
    expect<_SubNat<"1234", "567">>().to(equal<"667">);
    expect<_SubNat<"4356", "832">>().to(equal<"3524">);
    expect<_SubNat<"5000", "4321">>().to(equal<"679">);
    expect<_SubNat<"10000", "9999">>().to(equal<"1">);
  });
});
