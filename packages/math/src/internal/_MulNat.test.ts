import { describe, equal, expect, it } from "typroof";

import type { _MulNat } from "./_MulNat";

describe("_MulNat", () => {
  it("should multiply two single-digit natural numbers", () => {
    expect<_MulNat<"0", "0">>().to(equal<"0">);
    expect<_MulNat<"0", "1">>().to(equal<"0">);
    expect<_MulNat<"0", "2">>().to(equal<"0">);
    expect<_MulNat<"0", "3">>().to(equal<"0">);
    expect<_MulNat<"0", "4">>().to(equal<"0">);
    expect<_MulNat<"0", "5">>().to(equal<"0">);
    expect<_MulNat<"0", "6">>().to(equal<"0">);
    expect<_MulNat<"0", "7">>().to(equal<"0">);
    expect<_MulNat<"0", "8">>().to(equal<"0">);
    expect<_MulNat<"0", "9">>().to(equal<"0">);

    expect<_MulNat<"1", "0">>().to(equal<"0">);
    expect<_MulNat<"1", "1">>().to(equal<"1">);
    expect<_MulNat<"1", "2">>().to(equal<"2">);
    expect<_MulNat<"1", "3">>().to(equal<"3">);
    expect<_MulNat<"1", "4">>().to(equal<"4">);
    expect<_MulNat<"1", "5">>().to(equal<"5">);
    expect<_MulNat<"1", "6">>().to(equal<"6">);
    expect<_MulNat<"1", "7">>().to(equal<"7">);
    expect<_MulNat<"1", "8">>().to(equal<"8">);
    expect<_MulNat<"1", "9">>().to(equal<"9">);

    expect<_MulNat<"2", "0">>().to(equal<"0">);
    expect<_MulNat<"2", "1">>().to(equal<"2">);
    expect<_MulNat<"2", "2">>().to(equal<"4">);
    expect<_MulNat<"2", "3">>().to(equal<"6">);
    expect<_MulNat<"2", "4">>().to(equal<"8">);
    expect<_MulNat<"2", "5">>().to(equal<"10">);
    expect<_MulNat<"2", "6">>().to(equal<"12">);
    expect<_MulNat<"2", "7">>().to(equal<"14">);
    expect<_MulNat<"2", "8">>().to(equal<"16">);
    expect<_MulNat<"2", "9">>().to(equal<"18">);

    expect<_MulNat<"3", "0">>().to(equal<"0">);
    expect<_MulNat<"3", "1">>().to(equal<"3">);
    expect<_MulNat<"3", "2">>().to(equal<"6">);
    expect<_MulNat<"3", "3">>().to(equal<"9">);
    expect<_MulNat<"3", "4">>().to(equal<"12">);
    expect<_MulNat<"3", "5">>().to(equal<"15">);
    expect<_MulNat<"3", "6">>().to(equal<"18">);
    expect<_MulNat<"3", "7">>().to(equal<"21">);
    expect<_MulNat<"3", "8">>().to(equal<"24">);
    expect<_MulNat<"3", "9">>().to(equal<"27">);

    expect<_MulNat<"4", "0">>().to(equal<"0">);
    expect<_MulNat<"4", "1">>().to(equal<"4">);
    expect<_MulNat<"4", "2">>().to(equal<"8">);
    expect<_MulNat<"4", "3">>().to(equal<"12">);
    expect<_MulNat<"4", "4">>().to(equal<"16">);
    expect<_MulNat<"4", "5">>().to(equal<"20">);
    expect<_MulNat<"4", "6">>().to(equal<"24">);
    expect<_MulNat<"4", "7">>().to(equal<"28">);
    expect<_MulNat<"4", "8">>().to(equal<"32">);
    expect<_MulNat<"4", "9">>().to(equal<"36">);

    expect<_MulNat<"5", "0">>().to(equal<"0">);
    expect<_MulNat<"5", "1">>().to(equal<"5">);
    expect<_MulNat<"5", "2">>().to(equal<"10">);
    expect<_MulNat<"5", "3">>().to(equal<"15">);
    expect<_MulNat<"5", "4">>().to(equal<"20">);
    expect<_MulNat<"5", "5">>().to(equal<"25">);
    expect<_MulNat<"5", "6">>().to(equal<"30">);
    expect<_MulNat<"5", "7">>().to(equal<"35">);
    expect<_MulNat<"5", "8">>().to(equal<"40">);
    expect<_MulNat<"5", "9">>().to(equal<"45">);

    expect<_MulNat<"6", "0">>().to(equal<"0">);
    expect<_MulNat<"6", "1">>().to(equal<"6">);
    expect<_MulNat<"6", "2">>().to(equal<"12">);
    expect<_MulNat<"6", "3">>().to(equal<"18">);
    expect<_MulNat<"6", "4">>().to(equal<"24">);
    expect<_MulNat<"6", "5">>().to(equal<"30">);
    expect<_MulNat<"6", "6">>().to(equal<"36">);
    expect<_MulNat<"6", "7">>().to(equal<"42">);
    expect<_MulNat<"6", "8">>().to(equal<"48">);
    expect<_MulNat<"6", "9">>().to(equal<"54">);

    expect<_MulNat<"7", "0">>().to(equal<"0">);
    expect<_MulNat<"7", "1">>().to(equal<"7">);
    expect<_MulNat<"7", "2">>().to(equal<"14">);
    expect<_MulNat<"7", "3">>().to(equal<"21">);
    expect<_MulNat<"7", "4">>().to(equal<"28">);
    expect<_MulNat<"7", "5">>().to(equal<"35">);
    expect<_MulNat<"7", "6">>().to(equal<"42">);
    expect<_MulNat<"7", "7">>().to(equal<"49">);
    expect<_MulNat<"7", "8">>().to(equal<"56">);
    expect<_MulNat<"7", "9">>().to(equal<"63">);

    expect<_MulNat<"8", "0">>().to(equal<"0">);
    expect<_MulNat<"8", "1">>().to(equal<"8">);
    expect<_MulNat<"8", "2">>().to(equal<"16">);
    expect<_MulNat<"8", "3">>().to(equal<"24">);
    expect<_MulNat<"8", "4">>().to(equal<"32">);
    expect<_MulNat<"8", "5">>().to(equal<"40">);
    expect<_MulNat<"8", "6">>().to(equal<"48">);
    expect<_MulNat<"8", "7">>().to(equal<"56">);
    expect<_MulNat<"8", "8">>().to(equal<"64">);
    expect<_MulNat<"8", "9">>().to(equal<"72">);

    expect<_MulNat<"9", "0">>().to(equal<"0">);
    expect<_MulNat<"9", "1">>().to(equal<"9">);
    expect<_MulNat<"9", "2">>().to(equal<"18">);
    expect<_MulNat<"9", "3">>().to(equal<"27">);
    expect<_MulNat<"9", "4">>().to(equal<"36">);
    expect<_MulNat<"9", "5">>().to(equal<"45">);
    expect<_MulNat<"9", "6">>().to(equal<"54">);
    expect<_MulNat<"9", "7">>().to(equal<"63">);
    expect<_MulNat<"9", "8">>().to(equal<"72">);
    expect<_MulNat<"9", "9">>().to(equal<"81">);
  });

  it("should multiply 0 with any natural number", () => {
    expect<_MulNat<"0", "12345">>().to(equal<"0">);
    expect<_MulNat<"67890", "0">>().to(equal<"0">);
    expect<_MulNat<"0", "99999">>().to(equal<"0">);
    expect<_MulNat<"100000", "0">>().to(equal<"0">);
  });

  it("should handle carry-over correctly", () => {
    expect<_MulNat<"15", "27">>().to(equal<"405">);
    expect<_MulNat<"50", "8">>().to(equal<"400">);
    expect<_MulNat<"58", "64">>().to(equal<"3712">);
    expect<_MulNat<"99", "99">>().to(equal<"9801">);
    expect<_MulNat<"4356", "832">>().to(equal<"3624192">);
  });
});
