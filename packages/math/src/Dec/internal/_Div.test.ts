import { describe, equal, expect, it } from "typroof";

import type { _Div } from "./_Div";
import type { _Parse } from "./_Parse";
import type { _Stringify } from "./_Stringify";

describe("_Div", () => {
  it("should return `NaN` if either dividend or divisor is `NaN`", () => {
    expect<_Stringify<_Div<_Parse<"NaN">, _Parse<"42">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"NaN">, _Parse<"0">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"NaN">, _Parse<"-0">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"NaN">, _Parse<"-42">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"42">, _Parse<"NaN">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"NaN">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"NaN">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"-42">, _Parse<"NaN">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"NaN">, _Parse<"NaN">>>>().to(equal<"NaN">);
  });

  it("should return `NaN` if both dividend and divisor are `±Infinity`", () => {
    expect<_Stringify<_Div<_Parse<"Infinity">, _Parse<"Infinity">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"Infinity">, _Parse<"-Infinity">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"-Infinity">, _Parse<"Infinity">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"-Infinity">, _Parse<"-Infinity">>>>().to(equal<"NaN">);
  });

  it("should return `±0` if divisor is `±Infinity` and dividend is not `±Infinity`", () => {
    expect<_Stringify<_Div<_Parse<"42">, _Parse<"Infinity">>>>().to(equal<"0">);
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"Infinity">>>>().to(equal<"0">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"Infinity">>>>().to(equal<"-0">);
    expect<_Stringify<_Div<_Parse<"-42">, _Parse<"Infinity">>>>().to(equal<"-0">);
    expect<_Stringify<_Div<_Parse<"42">, _Parse<"-Infinity">>>>().to(equal<"-0">);
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"-Infinity">>>>().to(equal<"-0">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"-Infinity">>>>().to(equal<"0">);
    expect<_Stringify<_Div<_Parse<"-42">, _Parse<"-Infinity">>>>().to(equal<"0">);
  });

  it("should return `±Infinity` if dividend is `±Infinity` and divisor is not `±Infinity`", () => {
    expect<_Stringify<_Div<_Parse<"Infinity">, _Parse<"42">>>>().to(equal<"Infinity">);
    expect<_Stringify<_Div<_Parse<"Infinity">, _Parse<"0">>>>().to(equal<"Infinity">);
    expect<_Stringify<_Div<_Parse<"Infinity">, _Parse<"-0">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"Infinity">, _Parse<"-42">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"-Infinity">, _Parse<"42">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"-Infinity">, _Parse<"0">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"-Infinity">, _Parse<"-0">>>>().to(equal<"Infinity">);
    expect<_Stringify<_Div<_Parse<"-Infinity">, _Parse<"-42">>>>().to(equal<"Infinity">);
  });

  it("should return `NaN` if both dividend and divisor are `±0`", () => {
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"0">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"-0">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"0">>>>().to(equal<"NaN">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"-0">>>>().to(equal<"NaN">);
  });

  it("should return `±Infinity` if divisor is `±0` and dividend is not `±0`", () => {
    expect<_Stringify<_Div<_Parse<"0.1">, _Parse<"0">>>>().to(equal<"Infinity">);
    expect<_Stringify<_Div<_Parse<"0.1">, _Parse<"-0">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"0.034">, _Parse<"0">>>>().to(equal<"Infinity">);
    expect<_Stringify<_Div<_Parse<"0.034">, _Parse<"-0">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"5">, _Parse<"0">>>>().to(equal<"Infinity">);
    expect<_Stringify<_Div<_Parse<"5">, _Parse<"-0">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"42">, _Parse<"0">>>>().to(equal<"Infinity">);
    expect<_Stringify<_Div<_Parse<"42">, _Parse<"-0">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"-0.1">, _Parse<"0">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"-0.1">, _Parse<"-0">>>>().to(equal<"Infinity">);
    expect<_Stringify<_Div<_Parse<"-0.034">, _Parse<"0">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"-0.034">, _Parse<"-0">>>>().to(equal<"Infinity">);
    expect<_Stringify<_Div<_Parse<"-5">, _Parse<"0">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"-5">, _Parse<"-0">>>>().to(equal<"Infinity">);
    expect<_Stringify<_Div<_Parse<"-42">, _Parse<"0">>>>().to(equal<"-Infinity">);
    expect<_Stringify<_Div<_Parse<"-42">, _Parse<"-0">>>>().to(equal<"Infinity">);
  });

  it("should return `±0` if dividend is `±0` and divisor is not `±0`", () => {
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"3">>>>().to(equal<"0">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"3">>>>().to(equal<"-0">);
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"-3">>>>().to(equal<"-0">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"-3">>>>().to(equal<"0">);
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"0.75">>>>().to(equal<"0">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"0.75">>>>().to(equal<"-0">);
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"0.0034">>>>().to(equal<"0">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"0.0034">>>>().to(equal<"-0">);
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"-0.75">>>>().to(equal<"-0">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"-0.75">>>>().to(equal<"0">);
    expect<_Stringify<_Div<_Parse<"0">, _Parse<"-0.0034">>>>().to(equal<"-0">);
    expect<_Stringify<_Div<_Parse<"-0">, _Parse<"-0.0034">>>>().to(equal<"0">);
  });

  it("should divide two positive integers", () => {
    expect<_Stringify<_Div<_Parse<"3">, _Parse<"3">>>>().to(equal<"1">);
    expect<_Stringify<_Div<_Parse<"2">, _Parse<"5">>>>().to(equal<"0.4">);
    expect<_Stringify<_Div<_Parse<"5">, _Parse<"2">>>>().to(equal<"2.5">);
    expect<_Stringify<_Div<_Parse<"1">, _Parse<"3">>>>().to(equal<"0.33333333333333333">);
    expect<_Stringify<_Div<_Parse<"64">, _Parse<"5">>>>().to(equal<"12.8">);
    expect<_Stringify<_Div<_Parse<"64">, _Parse<"17">>>>().to(equal<"3.7647058823529412">);
    expect<_Stringify<_Div<_Parse<"100">, _Parse<"3">>>>().to(equal<"33.333333333333333">);
    expect<_Stringify<_Div<_Parse<"1000">, _Parse<"7">>>>().to(equal<"142.85714285714286">);
    expect<_Stringify<_Div<_Parse<"1000">, _Parse<"427">>>>().to(equal<"2.3419203747072600">);
  });

  it("should divide two negative integers", () => {
    expect<_Stringify<_Div<_Parse<"-3">, _Parse<"-3">>>>().to(equal<"1">);
    expect<_Stringify<_Div<_Parse<"-2">, _Parse<"-5">>>>().to(equal<"0.4">);
    expect<_Stringify<_Div<_Parse<"-5">, _Parse<"-2">>>>().to(equal<"2.5">);
    expect<_Stringify<_Div<_Parse<"-1">, _Parse<"-3">>>>().to(equal<"0.33333333333333333">);
    expect<_Stringify<_Div<_Parse<"-64">, _Parse<"-5">>>>().to(equal<"12.8">);
    expect<_Stringify<_Div<_Parse<"-64">, _Parse<"-17">>>>().to(equal<"3.7647058823529412">);
    expect<_Stringify<_Div<_Parse<"-100">, _Parse<"-3">>>>().to(equal<"33.333333333333333">);
    expect<_Stringify<_Div<_Parse<"-1000">, _Parse<"-7">>>>().to(equal<"142.85714285714286">);
    expect<_Stringify<_Div<_Parse<"-1000">, _Parse<"-427">>>>().to(equal<"2.3419203747072600">);
  });

  it("should divide a positive and a negative integer", () => {
    expect<_Stringify<_Div<_Parse<"3">, _Parse<"-3">>>>().to(equal<"-1">);
    expect<_Stringify<_Div<_Parse<"2">, _Parse<"-5">>>>().to(equal<"-0.4">);
    expect<_Stringify<_Div<_Parse<"5">, _Parse<"-2">>>>().to(equal<"-2.5">);
    expect<_Stringify<_Div<_Parse<"1">, _Parse<"-3">>>>().to(equal<"-0.33333333333333333">);
    expect<_Stringify<_Div<_Parse<"64">, _Parse<"-5">>>>().to(equal<"-12.8">);
    expect<_Stringify<_Div<_Parse<"64">, _Parse<"-17">>>>().to(equal<"-3.7647058823529412">);
    expect<_Stringify<_Div<_Parse<"100">, _Parse<"-3">>>>().to(equal<"-33.333333333333333">);
    expect<_Stringify<_Div<_Parse<"1000">, _Parse<"-7">>>>().to(equal<"-142.85714285714286">);
    expect<_Stringify<_Div<_Parse<"1000">, _Parse<"-427">>>>().to(equal<"-2.3419203747072600">);
  });

  it("should divide a negative and a positive integer", () => {
    expect<_Stringify<_Div<_Parse<"-3">, _Parse<"3">>>>().to(equal<"-1">);
    expect<_Stringify<_Div<_Parse<"-2">, _Parse<"5">>>>().to(equal<"-0.4">);
    expect<_Stringify<_Div<_Parse<"-5">, _Parse<"2">>>>().to(equal<"-2.5">);
    expect<_Stringify<_Div<_Parse<"-1">, _Parse<"3">>>>().to(equal<"-0.33333333333333333">);
    expect<_Stringify<_Div<_Parse<"-64">, _Parse<"5">>>>().to(equal<"-12.8">);
    expect<_Stringify<_Div<_Parse<"-64">, _Parse<"17">>>>().to(equal<"-3.7647058823529412">);
    expect<_Stringify<_Div<_Parse<"-100">, _Parse<"3">>>>().to(equal<"-33.333333333333333">);
    expect<_Stringify<_Div<_Parse<"-1000">, _Parse<"7">>>>().to(equal<"-142.85714285714286">);
    expect<_Stringify<_Div<_Parse<"-1000">, _Parse<"427">>>>().to(equal<"-2.3419203747072600">);
  });

  it("should divide a positive integer and a positive float", () => {
    expect<_Stringify<_Div<_Parse<"1">, _Parse<"0.0025">>>>().to(equal<"400">);
    expect<_Stringify<_Div<_Parse<"1">, _Parse<"0.07">>>>().to(equal<"14.285714285714286">);
    expect<_Stringify<_Div<_Parse<"1">, _Parse<"0.25">>>>().to(equal<"4">);
    expect<_Stringify<_Div<_Parse<"1">, _Parse<"0.75">>>>().to(equal<"1.33333333333333333">);
    expect<_Stringify<_Div<_Parse<"2">, _Parse<"3.14">>>>().to(equal<"0.6369426751592356">);
    expect<_Stringify<_Div<_Parse<"3">, _Parse<"2.718">>>>().to(equal<"1.103752759381898">);
    expect<_Stringify<_Div<_Parse<"29">, _Parse<"2.718">>>>().to(equal<"10.66961000735835">);
    expect<_Stringify<_Div<_Parse<"9949">, _Parse<"25.67">>>>().to(equal<"387.57304246201792">);
  });

  it("should divide a negative integer and a negative float", () => {
    expect<_Stringify<_Div<_Parse<"-1">, _Parse<"-0.0025">>>>().to(equal<"400">);
    expect<_Stringify<_Div<_Parse<"-1">, _Parse<"-0.07">>>>().to(equal<"14.285714285714286">);
    expect<_Stringify<_Div<_Parse<"-1">, _Parse<"-0.25">>>>().to(equal<"4">);
    expect<_Stringify<_Div<_Parse<"-1">, _Parse<"-0.75">>>>().to(equal<"1.33333333333333333">);
    expect<_Stringify<_Div<_Parse<"-2">, _Parse<"-3.14">>>>().to(equal<"0.6369426751592356">);
    expect<_Stringify<_Div<_Parse<"-3">, _Parse<"-2.718">>>>().to(equal<"1.103752759381898">);
    expect<_Stringify<_Div<_Parse<"-29">, _Parse<"-2.718">>>>().to(equal<"10.66961000735835">);
    expect<_Stringify<_Div<_Parse<"-9949">, _Parse<"-25.67">>>>().to(equal<"387.57304246201792">);
  });

  it("should divide a positive integer and a negative float", () => {
    expect<_Stringify<_Div<_Parse<"1">, _Parse<"-0.0025">>>>().to(equal<"-400">);
    expect<_Stringify<_Div<_Parse<"1">, _Parse<"-0.07">>>>().to(equal<"-14.285714285714286">);
    expect<_Stringify<_Div<_Parse<"1">, _Parse<"-0.25">>>>().to(equal<"-4">);
    expect<_Stringify<_Div<_Parse<"1">, _Parse<"-0.75">>>>().to(equal<"-1.33333333333333333">);
    expect<_Stringify<_Div<_Parse<"2">, _Parse<"-3.14">>>>().to(equal<"-0.6369426751592356">);
    expect<_Stringify<_Div<_Parse<"3">, _Parse<"-2.718">>>>().to(equal<"-1.103752759381898">);
    expect<_Stringify<_Div<_Parse<"21">, _Parse<"-2.718">>>>().to(equal<"-7.726269315673289">);
    expect<_Stringify<_Div<_Parse<"9949">, _Parse<"-25.67">>>>().to(equal<"-387.57304246201792">);
  });

  it("should divide a negative integer and a positive float", () => {
    expect<_Stringify<_Div<_Parse<"-1">, _Parse<"0.0025">>>>().to(equal<"-400">);
    expect<_Stringify<_Div<_Parse<"-1">, _Parse<"0.07">>>>().to(equal<"-14.285714285714286">);
    expect<_Stringify<_Div<_Parse<"-1">, _Parse<"0.25">>>>().to(equal<"-4">);
    expect<_Stringify<_Div<_Parse<"-1">, _Parse<"0.75">>>>().to(equal<"-1.33333333333333333">);
    expect<_Stringify<_Div<_Parse<"-2">, _Parse<"3.14">>>>().to(equal<"-0.6369426751592356">);
    expect<_Stringify<_Div<_Parse<"-3">, _Parse<"2.718">>>>().to(equal<"-1.103752759381898">);
    expect<_Stringify<_Div<_Parse<"-21">, _Parse<"2.718">>>>().to(equal<"-7.726269315673289">);
    expect<_Stringify<_Div<_Parse<"-9949">, _Parse<"25.67">>>>().to(equal<"-387.57304246201792">);
  });

  it("should divide a positive float and a positive integer", () => {
    expect<_Stringify<_Div<_Parse<"0.0025">, _Parse<"2">>>>().to(equal<"0.00125">);
    expect<_Stringify<_Div<_Parse<"0.07">, _Parse<"3">>>>().to(equal<"0.02333333333333333">);
    expect<_Stringify<_Div<_Parse<"0.25">, _Parse<"2">>>>().to(equal<"0.125">);
    expect<_Stringify<_Div<_Parse<"0.75">, _Parse<"3">>>>().to(equal<"0.25">);
    expect<_Stringify<_Div<_Parse<"3.14">, _Parse<"2">>>>().to(equal<"1.57">);
    expect<_Stringify<_Div<_Parse<"2.718">, _Parse<"3">>>>().to(equal<"0.906">);
    expect<_Stringify<_Div<_Parse<"2.718">, _Parse<"29">>>>().to(equal<"0.09372413793103448">);
    expect<_Stringify<_Div<_Parse<"4356.791">, _Parse<"832">>>>().to(equal<"5.236527644230769">);
  });

  it("should divide a negative float and a negative integer", () => {
    expect<_Stringify<_Div<_Parse<"-0.0025">, _Parse<"-2">>>>().to(equal<"0.00125">);
    expect<_Stringify<_Div<_Parse<"-0.07">, _Parse<"-3">>>>().to(equal<"0.02333333333333333">);
    expect<_Stringify<_Div<_Parse<"-0.25">, _Parse<"-2">>>>().to(equal<"0.125">);
    expect<_Stringify<_Div<_Parse<"-0.75">, _Parse<"-3">>>>().to(equal<"0.25">);
    expect<_Stringify<_Div<_Parse<"-3.14">, _Parse<"-2">>>>().to(equal<"1.57">);
    expect<_Stringify<_Div<_Parse<"-2.718">, _Parse<"-3">>>>().to(equal<"0.906">);
    expect<_Stringify<_Div<_Parse<"-2.718">, _Parse<"-29">>>>().to(equal<"0.09372413793103448">);
    expect<_Stringify<_Div<_Parse<"-4356.791">, _Parse<"-832">>>>().to(equal<"5.236527644230769">);
  });

  it("should divide a positive float and a negative integer", () => {
    expect<_Stringify<_Div<_Parse<"0.0025">, _Parse<"-2">>>>().to(equal<"-0.00125">);
    expect<_Stringify<_Div<_Parse<"0.07">, _Parse<"-3">>>>().to(equal<"-0.02333333333333333">);
    expect<_Stringify<_Div<_Parse<"0.25">, _Parse<"-2">>>>().to(equal<"-0.125">);
    expect<_Stringify<_Div<_Parse<"0.75">, _Parse<"-3">>>>().to(equal<"-0.25">);
    expect<_Stringify<_Div<_Parse<"3.14">, _Parse<"-2">>>>().to(equal<"-1.57">);
    expect<_Stringify<_Div<_Parse<"2.718">, _Parse<"-3">>>>().to(equal<"-0.906">);
    expect<_Stringify<_Div<_Parse<"21.0">, _Parse<"-2">>>>().to(equal<"-10.5">);
    expect<_Stringify<_Div<_Parse<"4356.791">, _Parse<"-832">>>>().to(equal<"-5.236527644230769">);
  });

  it("should divide a negative float and a positive integer", () => {
    expect<_Stringify<_Div<_Parse<"-0.0025">, _Parse<"2">>>>().to(equal<"-0.00125">);
    expect<_Stringify<_Div<_Parse<"-0.07">, _Parse<"3">>>>().to(equal<"-0.02333333333333333">);
    expect<_Stringify<_Div<_Parse<"-0.25">, _Parse<"2">>>>().to(equal<"-0.125">);
    expect<_Stringify<_Div<_Parse<"-0.75">, _Parse<"3">>>>().to(equal<"-0.25">);
    expect<_Stringify<_Div<_Parse<"-3.14">, _Parse<"2">>>>().to(equal<"-1.57">);
    expect<_Stringify<_Div<_Parse<"-2.718">, _Parse<"3">>>>().to(equal<"-0.906">);
    expect<_Stringify<_Div<_Parse<"-21.0">, _Parse<"2">>>>().to(equal<"-10.5">);
    expect<_Stringify<_Div<_Parse<"-4356.791">, _Parse<"832">>>>().to(equal<"-5.236527644230769">);
  });

  it("should divide two positive floats", () => {
    expect<_Stringify<_Div<_Parse<"0.0025">, _Parse<"0.25">>>>().to(equal<"0.01">);
    expect<_Stringify<_Div<_Parse<"0.34">, _Parse<"0.0026">>>>().to(equal<"130.7692307692307">);
    expect<_Stringify<_Div<_Parse<"0.5">, _Parse<"0.25">>>>().to(equal<"2">);
    expect<_Stringify<_Div<_Parse<"3.14">, _Parse<"2.86">>>>().to(equal<"1.097902097902097">);
    expect<_Stringify<_Div<_Parse<"2.718">, _Parse<"3.599">>>>().to(equal<"0.7552097804945818">);
    expect<_Stringify<_Div<_Parse<"129.07">, _Parse<"0.02718">>>>().to(equal<"4748.712288447387">);
    expect<_Stringify<_Div<_Parse<"4356.791">, _Parse<"832.329">>>>().to(
      equal<"5.234457768502599">,
    );
  });

  it("should divide two negative floats", () => {
    expect<_Stringify<_Div<_Parse<"-0.0025">, _Parse<"-0.25">>>>().to(equal<"0.01">);
    expect<_Stringify<_Div<_Parse<"-0.34">, _Parse<"-0.0026">>>>().to(equal<"130.7692307692307">);
    expect<_Stringify<_Div<_Parse<"-0.5">, _Parse<"-0.25">>>>().to(equal<"2">);
    expect<_Stringify<_Div<_Parse<"-3.14">, _Parse<"-2.86">>>>().to(equal<"1.097902097902097">);
    expect<_Stringify<_Div<_Parse<"-2.718">, _Parse<"-3.599">>>>().to(equal<"0.7552097804945818">);
    expect<_Stringify<_Div<_Parse<"-129.07">, _Parse<"-0.02718">>>>().to(
      equal<"4748.712288447387">,
    );
    expect<_Stringify<_Div<_Parse<"-4356.791">, _Parse<"-832.329">>>>().to(
      equal<"5.234457768502599">,
    );
  });

  it("should divide a positive and a negative float", () => {
    expect<_Stringify<_Div<_Parse<"0.0025">, _Parse<"-0.25">>>>().to(equal<"-0.01">);
    expect<_Stringify<_Div<_Parse<"0.34">, _Parse<"-0.0026">>>>().to(equal<"-130.7692307692307">);
    expect<_Stringify<_Div<_Parse<"0.5">, _Parse<"-0.25">>>>().to(equal<"-2">);
    expect<_Stringify<_Div<_Parse<"3.14">, _Parse<"-2.86">>>>().to(equal<"-1.097902097902097">);
    expect<_Stringify<_Div<_Parse<"2.718">, _Parse<"-3.599">>>>().to(equal<"-0.7552097804945818">);
    expect<_Stringify<_Div<_Parse<"129.07">, _Parse<"-0.02718">>>>().to(
      equal<"-4748.712288447387">,
    );
    expect<_Stringify<_Div<_Parse<"4356.791">, _Parse<"-832.329">>>>().to(
      equal<"-5.234457768502599">,
    );
  });

  it("should divide a negative and a positive float", () => {
    expect<_Stringify<_Div<_Parse<"-0.0025">, _Parse<"0.25">>>>().to(equal<"-0.01">);
    expect<_Stringify<_Div<_Parse<"-0.34">, _Parse<"0.0026">>>>().to(equal<"-130.7692307692307">);
    expect<_Stringify<_Div<_Parse<"-0.5">, _Parse<"0.25">>>>().to(equal<"-2">);
    expect<_Stringify<_Div<_Parse<"-3.14">, _Parse<"2.86">>>>().to(equal<"-1.097902097902097">);
    expect<_Stringify<_Div<_Parse<"-2.718">, _Parse<"3.599">>>>().to(equal<"-0.7552097804945818">);
    expect<_Stringify<_Div<_Parse<"-129.07">, _Parse<"0.02718">>>>().to(
      equal<"-4748.712288447387">,
    );
    expect<_Stringify<_Div<_Parse<"-4356.791">, _Parse<"832.329">>>>().to(
      equal<"-5.234457768502599">,
    );
  });
});
