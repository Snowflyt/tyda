import { describe, equal, expect, it } from "typroof";

import type { _AddNat } from "./_AddNat";

describe("_AddNat", () => {
  it("should add two single-digit natural numbers", () => {
    expect<_AddNat<"0", "0">>().to(equal<"0">);
    expect<_AddNat<"0", "1">>().to(equal<"1">);
    expect<_AddNat<"0", "2">>().to(equal<"2">);
    expect<_AddNat<"0", "3">>().to(equal<"3">);
    expect<_AddNat<"0", "4">>().to(equal<"4">);
    expect<_AddNat<"0", "5">>().to(equal<"5">);
    expect<_AddNat<"0", "6">>().to(equal<"6">);
    expect<_AddNat<"0", "7">>().to(equal<"7">);
    expect<_AddNat<"0", "8">>().to(equal<"8">);
    expect<_AddNat<"0", "9">>().to(equal<"9">);

    expect<_AddNat<"1", "0">>().to(equal<"1">);
    expect<_AddNat<"1", "1">>().to(equal<"2">);
    expect<_AddNat<"1", "2">>().to(equal<"3">);
    expect<_AddNat<"1", "3">>().to(equal<"4">);
    expect<_AddNat<"1", "4">>().to(equal<"5">);
    expect<_AddNat<"1", "5">>().to(equal<"6">);
    expect<_AddNat<"1", "6">>().to(equal<"7">);
    expect<_AddNat<"1", "7">>().to(equal<"8">);
    expect<_AddNat<"1", "8">>().to(equal<"9">);
    expect<_AddNat<"1", "9">>().to(equal<"10">);

    expect<_AddNat<"2", "0">>().to(equal<"2">);
    expect<_AddNat<"2", "1">>().to(equal<"3">);
    expect<_AddNat<"2", "2">>().to(equal<"4">);
    expect<_AddNat<"2", "3">>().to(equal<"5">);
    expect<_AddNat<"2", "4">>().to(equal<"6">);
    expect<_AddNat<"2", "5">>().to(equal<"7">);
    expect<_AddNat<"2", "6">>().to(equal<"8">);
    expect<_AddNat<"2", "7">>().to(equal<"9">);
    expect<_AddNat<"2", "8">>().to(equal<"10">);
    expect<_AddNat<"2", "9">>().to(equal<"11">);

    expect<_AddNat<"3", "0">>().to(equal<"3">);
    expect<_AddNat<"3", "1">>().to(equal<"4">);
    expect<_AddNat<"3", "2">>().to(equal<"5">);
    expect<_AddNat<"3", "3">>().to(equal<"6">);
    expect<_AddNat<"3", "4">>().to(equal<"7">);
    expect<_AddNat<"3", "5">>().to(equal<"8">);
    expect<_AddNat<"3", "6">>().to(equal<"9">);
    expect<_AddNat<"3", "7">>().to(equal<"10">);
    expect<_AddNat<"3", "8">>().to(equal<"11">);
    expect<_AddNat<"3", "9">>().to(equal<"12">);

    expect<_AddNat<"4", "0">>().to(equal<"4">);
    expect<_AddNat<"4", "1">>().to(equal<"5">);
    expect<_AddNat<"4", "2">>().to(equal<"6">);
    expect<_AddNat<"4", "3">>().to(equal<"7">);
    expect<_AddNat<"4", "4">>().to(equal<"8">);
    expect<_AddNat<"4", "5">>().to(equal<"9">);
    expect<_AddNat<"4", "6">>().to(equal<"10">);
    expect<_AddNat<"4", "7">>().to(equal<"11">);
    expect<_AddNat<"4", "8">>().to(equal<"12">);
    expect<_AddNat<"4", "9">>().to(equal<"13">);

    expect<_AddNat<"5", "0">>().to(equal<"5">);
    expect<_AddNat<"5", "1">>().to(equal<"6">);
    expect<_AddNat<"5", "2">>().to(equal<"7">);
    expect<_AddNat<"5", "3">>().to(equal<"8">);
    expect<_AddNat<"5", "4">>().to(equal<"9">);
    expect<_AddNat<"5", "5">>().to(equal<"10">);
    expect<_AddNat<"5", "6">>().to(equal<"11">);
    expect<_AddNat<"5", "7">>().to(equal<"12">);
    expect<_AddNat<"5", "8">>().to(equal<"13">);
    expect<_AddNat<"5", "9">>().to(equal<"14">);

    expect<_AddNat<"6", "0">>().to(equal<"6">);
    expect<_AddNat<"6", "1">>().to(equal<"7">);
    expect<_AddNat<"6", "2">>().to(equal<"8">);
    expect<_AddNat<"6", "3">>().to(equal<"9">);
    expect<_AddNat<"6", "4">>().to(equal<"10">);
    expect<_AddNat<"6", "5">>().to(equal<"11">);
    expect<_AddNat<"6", "6">>().to(equal<"12">);
    expect<_AddNat<"6", "7">>().to(equal<"13">);
    expect<_AddNat<"6", "8">>().to(equal<"14">);
    expect<_AddNat<"6", "9">>().to(equal<"15">);

    expect<_AddNat<"7", "0">>().to(equal<"7">);
    expect<_AddNat<"7", "1">>().to(equal<"8">);
    expect<_AddNat<"7", "2">>().to(equal<"9">);
    expect<_AddNat<"7", "3">>().to(equal<"10">);
    expect<_AddNat<"7", "4">>().to(equal<"11">);
    expect<_AddNat<"7", "5">>().to(equal<"12">);
    expect<_AddNat<"7", "6">>().to(equal<"13">);
    expect<_AddNat<"7", "7">>().to(equal<"14">);
    expect<_AddNat<"7", "8">>().to(equal<"15">);
    expect<_AddNat<"7", "9">>().to(equal<"16">);

    expect<_AddNat<"8", "0">>().to(equal<"8">);
    expect<_AddNat<"8", "1">>().to(equal<"9">);
    expect<_AddNat<"8", "2">>().to(equal<"10">);
    expect<_AddNat<"8", "3">>().to(equal<"11">);
    expect<_AddNat<"8", "4">>().to(equal<"12">);
    expect<_AddNat<"8", "5">>().to(equal<"13">);
    expect<_AddNat<"8", "6">>().to(equal<"14">);
    expect<_AddNat<"8", "7">>().to(equal<"15">);
    expect<_AddNat<"8", "8">>().to(equal<"16">);
    expect<_AddNat<"8", "9">>().to(equal<"17">);

    expect<_AddNat<"9", "0">>().to(equal<"9">);
    expect<_AddNat<"9", "1">>().to(equal<"10">);
    expect<_AddNat<"9", "2">>().to(equal<"11">);
    expect<_AddNat<"9", "3">>().to(equal<"12">);
    expect<_AddNat<"9", "4">>().to(equal<"13">);
    expect<_AddNat<"9", "5">>().to(equal<"14">);
    expect<_AddNat<"9", "6">>().to(equal<"15">);
    expect<_AddNat<"9", "7">>().to(equal<"16">);
    expect<_AddNat<"9", "8">>().to(equal<"17">);
    expect<_AddNat<"9", "9">>().to(equal<"18">);
  });

  it("should handle carry-over correctly", () => {
    expect<_AddNat<"15", "27">>().to(equal<"42">);
    expect<_AddNat<"99", "1">>().to(equal<"100">);
    expect<_AddNat<"99", "2">>().to(equal<"101">);
    expect<_AddNat<"58", "64">>().to(equal<"122">);
    expect<_AddNat<"4356", "832">>().to(equal<"5188">);
  });
});
