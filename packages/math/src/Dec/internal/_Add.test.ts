import { describe, equal, expect, it } from "typroof";

import type { _Add } from "./_Add";
import type { _Parse } from "./_Parse";
import type { _Stringify } from "./_Stringify";

describe("_Add", () => {
  it("should add two positive integers", () => {
    expect<_Stringify<_Add<_Parse<"0">, _Parse<"0">>>>().to(equal<"0">);
    expect<_Stringify<_Add<_Parse<"3">, _Parse<"3">>>>().to(equal<"6">);
    expect<_Stringify<_Add<_Parse<"2">, _Parse<"5">>>>().to(equal<"7">);
    expect<_Stringify<_Add<_Parse<"5">, _Parse<"2">>>>().to(equal<"7">);
  });

  it("should add two negative integers", () => {
    expect<_Stringify<_Add<_Parse<"-3">, _Parse<"-3">>>>().to(equal<"-6">);
    expect<_Stringify<_Add<_Parse<"-2">, _Parse<"-5">>>>().to(equal<"-7">);
    expect<_Stringify<_Add<_Parse<"-5">, _Parse<"-2">>>>().to(equal<"-7">);
  });

  it("should add a positive and a negative integer", () => {
    expect<_Stringify<_Add<_Parse<"0">, _Parse<"-1">>>>().to(equal<"-1">);
    expect<_Stringify<_Add<_Parse<"3">, _Parse<"-3">>>>().to(equal<"0">);
    expect<_Stringify<_Add<_Parse<"2">, _Parse<"-5">>>>().to(equal<"-3">);
    expect<_Stringify<_Add<_Parse<"5">, _Parse<"-2">>>>().to(equal<"3">);
  });

  it("should add a negative and a positive integer", () => {
    expect<_Stringify<_Add<_Parse<"-3">, _Parse<"3">>>>().to(equal<"0">);
    expect<_Stringify<_Add<_Parse<"-2">, _Parse<"5">>>>().to(equal<"3">);
    expect<_Stringify<_Add<_Parse<"-5">, _Parse<"2">>>>().to(equal<"-3">);
  });

  it("should add a positive integer and a positive float", () => {
    expect<_Stringify<_Add<_Parse<"0">, _Parse<"0.75">>>>().to(equal<"0.75">);
    expect<_Stringify<_Add<_Parse<"0">, _Parse<"3.14">>>>().to(equal<"3.14">);
    expect<_Stringify<_Add<_Parse<"3">, _Parse<"2.718">>>>().to(equal<"5.718">);
    expect<_Stringify<_Add<_Parse<"29">, _Parse<"2.718">>>>().to(equal<"31.718">);
  });

  it("should add a negative integer and a negative float", () => {
    expect<_Stringify<_Add<_Parse<"-1">, _Parse<"-0.25">>>>().to(equal<"-1.25">);
    expect<_Stringify<_Add<_Parse<"-3">, _Parse<"-3.14">>>>().to(equal<"-6.14">);
    expect<_Stringify<_Add<_Parse<"-3">, _Parse<"-2.718">>>>().to(equal<"-5.718">);
    expect<_Stringify<_Add<_Parse<"-29">, _Parse<"-2.718">>>>().to(equal<"-31.718">);
  });

  it("should add a positive integer and a negative float", () => {
    expect<_Stringify<_Add<_Parse<"1">, _Parse<"-0.25">>>>().to(equal<"0.75">);
    expect<_Stringify<_Add<_Parse<"3">, _Parse<"-3.14">>>>().to(equal<"-0.14">);
    expect<_Stringify<_Add<_Parse<"3">, _Parse<"-2.718">>>>().to(equal<"0.282">);
    expect<_Stringify<_Add<_Parse<"21">, _Parse<"-2.718">>>>().to(equal<"18.282">);
  });

  it("should add a negative integer and a positive float", () => {
    expect<_Stringify<_Add<_Parse<"-1">, _Parse<"0.25">>>>().to(equal<"-0.75">);
    expect<_Stringify<_Add<_Parse<"-3">, _Parse<"3.14">>>>().to(equal<"0.14">);
    expect<_Stringify<_Add<_Parse<"-3">, _Parse<"2.718">>>>().to(equal<"-0.282">);
    expect<_Stringify<_Add<_Parse<"-21">, _Parse<"2.718">>>>().to(equal<"-18.282">);
  });

  it("should add a positive float and a positive integer", () => {
    expect<_Stringify<_Add<_Parse<"0.75">, _Parse<"0">>>>().to(equal<"0.75">);
    expect<_Stringify<_Add<_Parse<"3.14">, _Parse<"0">>>>().to(equal<"3.14">);
    expect<_Stringify<_Add<_Parse<"2.718">, _Parse<"3">>>>().to(equal<"5.718">);
    expect<_Stringify<_Add<_Parse<"2.718">, _Parse<"29">>>>().to(equal<"31.718">);
  });

  it("should add a negative float and a negative integer", () => {
    expect<_Stringify<_Add<_Parse<"-0.25">, _Parse<"-1">>>>().to(equal<"-1.25">);
    expect<_Stringify<_Add<_Parse<"-3.14">, _Parse<"-3">>>>().to(equal<"-6.14">);
    expect<_Stringify<_Add<_Parse<"-2.718">, _Parse<"-3">>>>().to(equal<"-5.718">);
    expect<_Stringify<_Add<_Parse<"-2.718">, _Parse<"-29">>>>().to(equal<"-31.718">);
  });

  it("should add a positive float and a negative integer", () => {
    expect<_Stringify<_Add<_Parse<"0.25">, _Parse<"-1">>>>().to(equal<"-0.75">);
    expect<_Stringify<_Add<_Parse<"3.14">, _Parse<"-3">>>>().to(equal<"0.14">);
    expect<_Stringify<_Add<_Parse<"2.718">, _Parse<"-3">>>>().to(equal<"-0.282">);
    expect<_Stringify<_Add<_Parse<"2.718">, _Parse<"-21">>>>().to(equal<"-18.282">);
  });

  it("should add a negative float and a positive integer", () => {
    expect<_Stringify<_Add<_Parse<"-0.25">, _Parse<"1">>>>().to(equal<"0.75">);
    expect<_Stringify<_Add<_Parse<"-3.14">, _Parse<"3">>>>().to(equal<"-0.14">);
    expect<_Stringify<_Add<_Parse<"-2.718">, _Parse<"3">>>>().to(equal<"0.282">);
    expect<_Stringify<_Add<_Parse<"-2.718">, _Parse<"21">>>>().to(equal<"18.282">);
  });

  it("should add two positive floats", () => {
    expect<_Stringify<_Add<_Parse<"0.5">, _Parse<"0.25">>>>().to(equal<"0.75">);
    expect<_Stringify<_Add<_Parse<"3.14">, _Parse<"2.86">>>>().to(equal<"6.00">);
    expect<_Stringify<_Add<_Parse<"2.718">, _Parse<"3.599">>>>().to(equal<"6.317">);
    expect<_Stringify<_Add<_Parse<"4356.791">, _Parse<"832.329">>>>().to(equal<"5189.120">);
  });

  it("should add two negative floats", () => {
    expect<_Stringify<_Add<_Parse<"-0.5">, _Parse<"-0.25">>>>().to(equal<"-0.75">);
    expect<_Stringify<_Add<_Parse<"-3.14">, _Parse<"-2.86">>>>().to(equal<"-6.00">);
    expect<_Stringify<_Add<_Parse<"-2.718">, _Parse<"-3.599">>>>().to(equal<"-6.317">);
    expect<_Stringify<_Add<_Parse<"-4356.791">, _Parse<"-832.329">>>>().to(equal<"-5189.120">);
  });

  it("should add a positive and a negative float", () => {
    expect<_Stringify<_Add<_Parse<"0.5">, _Parse<"-0.25">>>>().to(equal<"0.25">);
    expect<_Stringify<_Add<_Parse<"3.14">, _Parse<"-2.86">>>>().to(equal<"0.28">);
    expect<_Stringify<_Add<_Parse<"2.718">, _Parse<"-3.599">>>>().to(equal<"-0.881">);
    expect<_Stringify<_Add<_Parse<"4356.791">, _Parse<"-832.329">>>>().to(equal<"3524.462">);
  });

  it("should add a negative and a positive float", () => {
    expect<_Stringify<_Add<_Parse<"-0.5">, _Parse<"0.25">>>>().to(equal<"-0.25">);
    expect<_Stringify<_Add<_Parse<"-3.14">, _Parse<"2.86">>>>().to(equal<"-0.28">);
    expect<_Stringify<_Add<_Parse<"-2.718">, _Parse<"3.599">>>>().to(equal<"0.881">);
    expect<_Stringify<_Add<_Parse<"-4356.791">, _Parse<"832.329">>>>().to(equal<"-3524.462">);
  });
});
