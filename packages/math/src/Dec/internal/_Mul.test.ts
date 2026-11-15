import { describe, equal, expect, it } from "typroof";

import type { _Mul } from "./_Mul";
import type { _Parse } from "./_Parse";
import type { _Stringify } from "./_Stringify";

describe("_Mul", () => {
  it("should multiply two positive integers", () => {
    expect<_Stringify<_Mul<_Parse<"0">, _Parse<"0">>>>().to(equal<"0">);
    expect<_Stringify<_Mul<_Parse<"3">, _Parse<"3">>>>().to(equal<"9">);
    expect<_Stringify<_Mul<_Parse<"2">, _Parse<"5">>>>().to(equal<"10">);
    expect<_Stringify<_Mul<_Parse<"5">, _Parse<"2">>>>().to(equal<"10">);
  });

  it("should multiply two negative integers", () => {
    expect<_Stringify<_Mul<_Parse<"-3">, _Parse<"-3">>>>().to(equal<"9">);
    expect<_Stringify<_Mul<_Parse<"-2">, _Parse<"-5">>>>().to(equal<"10">);
    expect<_Stringify<_Mul<_Parse<"-5">, _Parse<"-2">>>>().to(equal<"10">);
  });

  it("should multiply a positive and a negative integer", () => {
    expect<_Stringify<_Mul<_Parse<"0">, _Parse<"-1">>>>().to(equal<"-0">);
    expect<_Stringify<_Mul<_Parse<"3">, _Parse<"-3">>>>().to(equal<"-9">);
    expect<_Stringify<_Mul<_Parse<"2">, _Parse<"-5">>>>().to(equal<"-10">);
    expect<_Stringify<_Mul<_Parse<"5">, _Parse<"-2">>>>().to(equal<"-10">);
  });

  it("should multiply a negative and a positive integer", () => {
    expect<_Stringify<_Mul<_Parse<"-3">, _Parse<"3">>>>().to(equal<"-9">);
    expect<_Stringify<_Mul<_Parse<"-2">, _Parse<"5">>>>().to(equal<"-10">);
    expect<_Stringify<_Mul<_Parse<"-5">, _Parse<"2">>>>().to(equal<"-10">);
  });

  it("should multiply a positive integer and a positive float", () => {
    expect<_Stringify<_Mul<_Parse<"0">, _Parse<"0.75">>>>().to(equal<"0.00">);
    expect<_Stringify<_Mul<_Parse<"0">, _Parse<"3.14">>>>().to(equal<"0.00">);
    expect<_Stringify<_Mul<_Parse<"3">, _Parse<"2.718">>>>().to(equal<"8.154">);
    expect<_Stringify<_Mul<_Parse<"29">, _Parse<"2.718">>>>().to(equal<"78.822">);
  });

  it("should multiply a negative integer and a negative float", () => {
    expect<_Stringify<_Mul<_Parse<"-1">, _Parse<"-0.25">>>>().to(equal<"0.25">);
    expect<_Stringify<_Mul<_Parse<"-3">, _Parse<"-3.14">>>>().to(equal<"9.42">);
    expect<_Stringify<_Mul<_Parse<"-3">, _Parse<"-2.718">>>>().to(equal<"8.154">);
    expect<_Stringify<_Mul<_Parse<"-29">, _Parse<"-2.718">>>>().to(equal<"78.822">);
  });

  it("should multiply a positive integer and a negative float", () => {
    expect<_Stringify<_Mul<_Parse<"1">, _Parse<"-0.25">>>>().to(equal<"-0.25">);
    expect<_Stringify<_Mul<_Parse<"3">, _Parse<"-3.14">>>>().to(equal<"-9.42">);
    expect<_Stringify<_Mul<_Parse<"3">, _Parse<"-2.718">>>>().to(equal<"-8.154">);
    expect<_Stringify<_Mul<_Parse<"21">, _Parse<"-2.718">>>>().to(equal<"-57.078">);
  });

  it("should multiply a negative integer and a positive float", () => {
    expect<_Stringify<_Mul<_Parse<"-1">, _Parse<"0.25">>>>().to(equal<"-0.25">);
    expect<_Stringify<_Mul<_Parse<"-3">, _Parse<"3.14">>>>().to(equal<"-9.42">);
    expect<_Stringify<_Mul<_Parse<"-3">, _Parse<"2.718">>>>().to(equal<"-8.154">);
    expect<_Stringify<_Mul<_Parse<"-21">, _Parse<"2.718">>>>().to(equal<"-57.078">);
  });

  it("should multiply a positive float and a positive integer", () => {
    expect<_Stringify<_Mul<_Parse<"0.75">, _Parse<"0">>>>().to(equal<"0.00">);
    expect<_Stringify<_Mul<_Parse<"3.14">, _Parse<"0">>>>().to(equal<"0.00">);
    expect<_Stringify<_Mul<_Parse<"2.718">, _Parse<"3">>>>().to(equal<"8.154">);
    expect<_Stringify<_Mul<_Parse<"2.718">, _Parse<"29">>>>().to(equal<"78.822">);
  });

  it("should multiply a negative float and a negative integer", () => {
    expect<_Stringify<_Mul<_Parse<"-0.25">, _Parse<"-1">>>>().to(equal<"0.25">);
    expect<_Stringify<_Mul<_Parse<"-3.14">, _Parse<"-3">>>>().to(equal<"9.42">);
    expect<_Stringify<_Mul<_Parse<"-2.718">, _Parse<"-3">>>>().to(equal<"8.154">);
    expect<_Stringify<_Mul<_Parse<"-2.718">, _Parse<"-29">>>>().to(equal<"78.822">);
  });

  it("should multiply a positive float and a negative integer", () => {
    expect<_Stringify<_Mul<_Parse<"0.25">, _Parse<"-1">>>>().to(equal<"-0.25">);
    expect<_Stringify<_Mul<_Parse<"3.14">, _Parse<"-3">>>>().to(equal<"-9.42">);
    expect<_Stringify<_Mul<_Parse<"2.718">, _Parse<"-3">>>>().to(equal<"-8.154">);
    expect<_Stringify<_Mul<_Parse<"2.718">, _Parse<"-21">>>>().to(equal<"-57.078">);
  });

  it("should multiply a negative float and a positive integer", () => {
    expect<_Stringify<_Mul<_Parse<"-0.25">, _Parse<"1">>>>().to(equal<"-0.25">);
    expect<_Stringify<_Mul<_Parse<"-3.14">, _Parse<"3">>>>().to(equal<"-9.42">);
    expect<_Stringify<_Mul<_Parse<"-2.718">, _Parse<"3">>>>().to(equal<"-8.154">);
    expect<_Stringify<_Mul<_Parse<"-2.718">, _Parse<"21">>>>().to(equal<"-57.078">);
  });

  it("should multiply two positive floats", () => {
    expect<_Stringify<_Mul<_Parse<"0.5">, _Parse<"0.25">>>>().to(equal<"0.125">);
    expect<_Stringify<_Mul<_Parse<"3.14">, _Parse<"2.86">>>>().to(equal<"8.9804">);
    expect<_Stringify<_Mul<_Parse<"2.718">, _Parse<"3.599">>>>().to(equal<"9.782082">);
    expect<_Stringify<_Mul<_Parse<"4356.791">, _Parse<"832.329">>>>().to(equal<"3626283.496239">);
  });

  it("should multiply two negative floats", () => {
    expect<_Stringify<_Mul<_Parse<"-0.5">, _Parse<"-0.25">>>>().to(equal<"0.125">);
    expect<_Stringify<_Mul<_Parse<"-3.14">, _Parse<"-2.86">>>>().to(equal<"8.9804">);
    expect<_Stringify<_Mul<_Parse<"-2.718">, _Parse<"-3.599">>>>().to(equal<"9.782082">);
    expect<_Stringify<_Mul<_Parse<"-4356.791">, _Parse<"-832.329">>>>().to(equal<"3626283.496239">);
  });

  it("should multiply a positive and a negative float", () => {
    expect<_Stringify<_Mul<_Parse<"0.5">, _Parse<"-0.25">>>>().to(equal<"-0.125">);
    expect<_Stringify<_Mul<_Parse<"3.14">, _Parse<"-2.86">>>>().to(equal<"-8.9804">);
    expect<_Stringify<_Mul<_Parse<"2.718">, _Parse<"-3.599">>>>().to(equal<"-9.782082">);
    expect<_Stringify<_Mul<_Parse<"4356.791">, _Parse<"-832.329">>>>().to(equal<"-3626283.496239">);
  });

  it("should multiply a negative and a positive float", () => {
    expect<_Stringify<_Mul<_Parse<"-0.5">, _Parse<"0.25">>>>().to(equal<"-0.125">);
    expect<_Stringify<_Mul<_Parse<"-3.14">, _Parse<"2.86">>>>().to(equal<"-8.9804">);
    expect<_Stringify<_Mul<_Parse<"-2.718">, _Parse<"3.599">>>>().to(equal<"-9.782082">);
    expect<_Stringify<_Mul<_Parse<"-4356.791">, _Parse<"832.329">>>>().to(equal<"-3626283.496239">);
  });
});
