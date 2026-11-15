import { describe, equal, expect, it } from "typroof";

import type { _SubFloat } from "./_SubFloat";

describe("_SubFloat", () => {
  it("should subtract two positive integers", () => {
    expect<_SubFloat<"0", "0">>().to(equal<"0">);
    expect<_SubFloat<"3", "3">>().to(equal<"0">);
    expect<_SubFloat<"2", "5">>().to(equal<"-3">);
    expect<_SubFloat<"5", "2">>().to(equal<"3">);
  });

  it("should subtract two negative integers", () => {
    expect<_SubFloat<"-3", "-3">>().to(equal<"0">);
    expect<_SubFloat<"-2", "-5">>().to(equal<"3">);
    expect<_SubFloat<"-5", "-2">>().to(equal<"-3">);
  });

  it("should subtract a positive and a negative integer", () => {
    expect<_SubFloat<"0", "-1">>().to(equal<"1">);
    expect<_SubFloat<"3", "-3">>().to(equal<"6">);
    expect<_SubFloat<"2", "-5">>().to(equal<"7">);
    expect<_SubFloat<"5", "-2">>().to(equal<"7">);
  });

  it("should subtract a negative and a positive integer", () => {
    expect<_SubFloat<"-3", "3">>().to(equal<"-6">);
    expect<_SubFloat<"-2", "5">>().to(equal<"-7">);
    expect<_SubFloat<"-5", "2">>().to(equal<"-7">);
  });

  it("should subtract a positive integer and a positive float", () => {
    expect<_SubFloat<"0", "0.75">>().to(equal<"-0.75">);
    expect<_SubFloat<"0", "3.14">>().to(equal<"-3.14">);
    expect<_SubFloat<"3", "2.718">>().to(equal<"0.282">);
    expect<_SubFloat<"29", "2.718">>().to(equal<"26.282">);
  });

  it("should subtract a negative integer and a negative float", () => {
    expect<_SubFloat<"-1", "-0.25">>().to(equal<"-0.75">);
    expect<_SubFloat<"-3", "-3.14">>().to(equal<"0.14">);
    expect<_SubFloat<"-3", "-2.718">>().to(equal<"-0.282">);
    expect<_SubFloat<"-29", "-2.718">>().to(equal<"-26.282">);
  });

  it("should subtract a positive integer and a negative float", () => {
    expect<_SubFloat<"1", "-0.25">>().to(equal<"1.25">);
    expect<_SubFloat<"3", "-3.14">>().to(equal<"6.14">);
    expect<_SubFloat<"3", "-2.718">>().to(equal<"5.718">);
    expect<_SubFloat<"21", "-2.718">>().to(equal<"23.718">);
  });

  it("should subtract a negative integer and a positive float", () => {
    expect<_SubFloat<"-1", "0.25">>().to(equal<"-1.25">);
    expect<_SubFloat<"-3", "3.14">>().to(equal<"-6.14">);
    expect<_SubFloat<"-3", "2.718">>().to(equal<"-5.718">);
    expect<_SubFloat<"-21", "2.718">>().to(equal<"-23.718">);
  });

  it("should subtract a positive float and a positive integer", () => {
    expect<_SubFloat<"0.75", "0">>().to(equal<"0.75">);
    expect<_SubFloat<"3.14", "0">>().to(equal<"3.14">);
    expect<_SubFloat<"2.718", "3">>().to(equal<"-0.282">);
    expect<_SubFloat<"2.718", "29">>().to(equal<"-26.282">);
  });

  it("should subtract a negative float and a negative integer", () => {
    expect<_SubFloat<"-0.25", "-1">>().to(equal<"0.75">);
    expect<_SubFloat<"-3.14", "-3">>().to(equal<"-0.14">);
    expect<_SubFloat<"-2.718", "-3">>().to(equal<"0.282">);
    expect<_SubFloat<"-2.718", "-29">>().to(equal<"26.282">);
  });

  it("should subtract a positive float and a negative integer", () => {
    expect<_SubFloat<"0.25", "-1">>().to(equal<"1.25">);
    expect<_SubFloat<"3.14", "-3">>().to(equal<"6.14">);
    expect<_SubFloat<"2.718", "-3">>().to(equal<"5.718">);
    expect<_SubFloat<"2.718", "-21">>().to(equal<"23.718">);
  });

  it("should subtract a negative float and a positive integer", () => {
    expect<_SubFloat<"-0.25", "1">>().to(equal<"-1.25">);
    expect<_SubFloat<"-3.14", "3">>().to(equal<"-6.14">);
    expect<_SubFloat<"-2.718", "3">>().to(equal<"-5.718">);
    expect<_SubFloat<"-2.718", "21">>().to(equal<"-23.718">);
  });

  it("should subtract two positive floats", () => {
    expect<_SubFloat<"0.5", "0.25">>().to(equal<"0.25">);
    expect<_SubFloat<"3.14", "2.86">>().to(equal<"0.28">);
    expect<_SubFloat<"2.718", "3.599">>().to(equal<"-0.881">);
    expect<_SubFloat<"4356.791", "832.329">>().to(equal<"3524.462">);
  });

  it("should subtract two negative floats", () => {
    expect<_SubFloat<"-0.5", "-0.25">>().to(equal<"-0.25">);
    expect<_SubFloat<"-3.14", "-2.86">>().to(equal<"-0.28">);
    expect<_SubFloat<"-2.718", "-3.599">>().to(equal<"0.881">);
    expect<_SubFloat<"-4356.791", "-832.329">>().to(equal<"-3524.462">);
  });

  it("should subtract a positive and a negative float", () => {
    expect<_SubFloat<"0.5", "-0.25">>().to(equal<"0.75">);
    expect<_SubFloat<"3.14", "-2.86">>().to(equal<"6">);
    expect<_SubFloat<"2.718", "-3.599">>().to(equal<"6.317">);
    expect<_SubFloat<"4356.791", "-832.329">>().to(equal<"5189.12">);
  });

  it("should subtract a negative and a positive float", () => {
    expect<_SubFloat<"-0.5", "0.25">>().to(equal<"-0.75">);
    expect<_SubFloat<"-3.14", "2.86">>().to(equal<"-6">);
    expect<_SubFloat<"-2.718", "3.599">>().to(equal<"-6.317">);
    expect<_SubFloat<"-4356.791", "832.329">>().to(equal<"-5189.12">);
  });
});
