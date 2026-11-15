import { describe, equal, expect, it } from "typroof";

import type { _AddFloat } from "./_AddFloat";

describe("_AddFloat", () => {
  it("should add two positive integers", () => {
    expect<_AddFloat<"0", "0">>().to(equal<"0">);
    expect<_AddFloat<"3", "3">>().to(equal<"6">);
    expect<_AddFloat<"2", "5">>().to(equal<"7">);
    expect<_AddFloat<"5", "2">>().to(equal<"7">);
  });

  it("should add two negative integers", () => {
    expect<_AddFloat<"-3", "-3">>().to(equal<"-6">);
    expect<_AddFloat<"-2", "-5">>().to(equal<"-7">);
    expect<_AddFloat<"-5", "-2">>().to(equal<"-7">);
  });

  it("should add a positive and a negative integer", () => {
    expect<_AddFloat<"0", "-1">>().to(equal<"-1">);
    expect<_AddFloat<"3", "-3">>().to(equal<"0">);
    expect<_AddFloat<"2", "-5">>().to(equal<"-3">);
    expect<_AddFloat<"5", "-2">>().to(equal<"3">);
  });

  it("should add a negative and a positive integer", () => {
    expect<_AddFloat<"-3", "3">>().to(equal<"0">);
    expect<_AddFloat<"-2", "5">>().to(equal<"3">);
    expect<_AddFloat<"-5", "2">>().to(equal<"-3">);
  });

  it("should add a positive integer and a positive float", () => {
    expect<_AddFloat<"0", "0.75">>().to(equal<"0.75">);
    expect<_AddFloat<"0", "3.14">>().to(equal<"3.14">);
    expect<_AddFloat<"3", "2.718">>().to(equal<"5.718">);
    expect<_AddFloat<"29", "2.718">>().to(equal<"31.718">);
  });

  it("should add a negative integer and a negative float", () => {
    expect<_AddFloat<"-1", "-0.25">>().to(equal<"-1.25">);
    expect<_AddFloat<"-3", "-3.14">>().to(equal<"-6.14">);
    expect<_AddFloat<"-3", "-2.718">>().to(equal<"-5.718">);
    expect<_AddFloat<"-29", "-2.718">>().to(equal<"-31.718">);
  });

  it("should add a positive integer and a negative float", () => {
    expect<_AddFloat<"1", "-0.25">>().to(equal<"0.75">);
    expect<_AddFloat<"3", "-3.14">>().to(equal<"-0.14">);
    expect<_AddFloat<"3", "-2.718">>().to(equal<"0.282">);
    expect<_AddFloat<"21", "-2.718">>().to(equal<"18.282">);
  });

  it("should add a negative integer and a positive float", () => {
    expect<_AddFloat<"-1", "0.25">>().to(equal<"-0.75">);
    expect<_AddFloat<"-3", "3.14">>().to(equal<"0.14">);
    expect<_AddFloat<"-3", "2.718">>().to(equal<"-0.282">);
    expect<_AddFloat<"-21", "2.718">>().to(equal<"-18.282">);
  });

  it("should add a positive float and a positive integer", () => {
    expect<_AddFloat<"0.75", "0">>().to(equal<"0.75">);
    expect<_AddFloat<"3.14", "0">>().to(equal<"3.14">);
    expect<_AddFloat<"2.718", "3">>().to(equal<"5.718">);
    expect<_AddFloat<"2.718", "29">>().to(equal<"31.718">);
  });

  it("should add a negative float and a negative integer", () => {
    expect<_AddFloat<"-0.25", "-1">>().to(equal<"-1.25">);
    expect<_AddFloat<"-3.14", "-3">>().to(equal<"-6.14">);
    expect<_AddFloat<"-2.718", "-3">>().to(equal<"-5.718">);
    expect<_AddFloat<"-2.718", "-29">>().to(equal<"-31.718">);
  });

  it("should add a positive float and a negative integer", () => {
    expect<_AddFloat<"0.25", "-1">>().to(equal<"-0.75">);
    expect<_AddFloat<"3.14", "-3">>().to(equal<"0.14">);
    expect<_AddFloat<"2.718", "-3">>().to(equal<"-0.282">);
    expect<_AddFloat<"2.718", "-21">>().to(equal<"-18.282">);
  });

  it("should add a negative float and a positive integer", () => {
    expect<_AddFloat<"-0.25", "1">>().to(equal<"0.75">);
    expect<_AddFloat<"-3.14", "3">>().to(equal<"-0.14">);
    expect<_AddFloat<"-2.718", "3">>().to(equal<"0.282">);
    expect<_AddFloat<"-2.718", "21">>().to(equal<"18.282">);
  });

  it("should add two positive floats", () => {
    expect<_AddFloat<"0.5", "0.25">>().to(equal<"0.75">);
    expect<_AddFloat<"3.14", "2.86">>().to(equal<"6">);
    expect<_AddFloat<"2.718", "3.599">>().to(equal<"6.317">);
    expect<_AddFloat<"4356.791", "832.329">>().to(equal<"5189.12">);
  });

  it("should add two negative floats", () => {
    expect<_AddFloat<"-0.5", "-0.25">>().to(equal<"-0.75">);
    expect<_AddFloat<"-3.14", "-2.86">>().to(equal<"-6">);
    expect<_AddFloat<"-2.718", "-3.599">>().to(equal<"-6.317">);
    expect<_AddFloat<"-4356.791", "-832.329">>().to(equal<"-5189.12">);
  });

  it("should add a positive and a negative float", () => {
    expect<_AddFloat<"0.5", "-0.25">>().to(equal<"0.25">);
    expect<_AddFloat<"3.14", "-2.86">>().to(equal<"0.28">);
    expect<_AddFloat<"2.718", "-3.599">>().to(equal<"-0.881">);
    expect<_AddFloat<"4356.791", "-832.329">>().to(equal<"3524.462">);
  });

  it("should add a negative and a positive float", () => {
    expect<_AddFloat<"-0.5", "0.25">>().to(equal<"-0.25">);
    expect<_AddFloat<"-3.14", "2.86">>().to(equal<"-0.28">);
    expect<_AddFloat<"-2.718", "3.599">>().to(equal<"0.881">);
    expect<_AddFloat<"-4356.791", "832.329">>().to(equal<"-3524.462">);
  });
});
