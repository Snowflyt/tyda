import { describe, equal, expect, it } from "typroof";

import type { _DivFloat } from "./_DivFloat";

describe("_DivFloat", () => {
  it("should return `NaN` if either dividend or divisor is `NaN`", () => {
    expect<_DivFloat<"NaN", "42">>().to(equal<"NaN">);
    expect<_DivFloat<"NaN", "0">>().to(equal<"NaN">);
    expect<_DivFloat<"NaN", "-0">>().to(equal<"NaN">);
    expect<_DivFloat<"NaN", "-42">>().to(equal<"NaN">);
    expect<_DivFloat<"42", "NaN">>().to(equal<"NaN">);
    expect<_DivFloat<"0", "NaN">>().to(equal<"NaN">);
    expect<_DivFloat<"-0", "NaN">>().to(equal<"NaN">);
    expect<_DivFloat<"-42", "NaN">>().to(equal<"NaN">);
    expect<_DivFloat<"NaN", "NaN">>().to(equal<"NaN">);
  });

  it("should return `NaN` if both dividend and divisor are `±Infinity`", () => {
    expect<_DivFloat<"Infinity", "Infinity">>().to(equal<"NaN">);
    expect<_DivFloat<"Infinity", "-Infinity">>().to(equal<"NaN">);
    expect<_DivFloat<"-Infinity", "Infinity">>().to(equal<"NaN">);
    expect<_DivFloat<"-Infinity", "-Infinity">>().to(equal<"NaN">);
  });

  it("should return `±0` if divisor is `±Infinity` and dividend is not `±Infinity`", () => {
    expect<_DivFloat<"42", "Infinity">>().to(equal<"0">);
    expect<_DivFloat<"0", "Infinity">>().to(equal<"0">);
    expect<_DivFloat<"-0", "Infinity">>().to(equal<"-0">);
    expect<_DivFloat<"-42", "Infinity">>().to(equal<"-0">);
    expect<_DivFloat<"42", "-Infinity">>().to(equal<"-0">);
    expect<_DivFloat<"0", "-Infinity">>().to(equal<"-0">);
    expect<_DivFloat<"-0", "-Infinity">>().to(equal<"0">);
    expect<_DivFloat<"-42", "-Infinity">>().to(equal<"0">);
  });

  it("should return `±Infinity` if dividend is `±Infinity` and divisor is not `±Infinity`", () => {
    expect<_DivFloat<"Infinity", "42">>().to(equal<"Infinity">);
    expect<_DivFloat<"Infinity", "0">>().to(equal<"Infinity">);
    expect<_DivFloat<"Infinity", "-0">>().to(equal<"-Infinity">);
    expect<_DivFloat<"Infinity", "-42">>().to(equal<"-Infinity">);
    expect<_DivFloat<"-Infinity", "42">>().to(equal<"-Infinity">);
    expect<_DivFloat<"-Infinity", "0">>().to(equal<"-Infinity">);
    expect<_DivFloat<"-Infinity", "-0">>().to(equal<"Infinity">);
    expect<_DivFloat<"-Infinity", "-42">>().to(equal<"Infinity">);
  });

  it("should return `NaN` if both dividend and divisor are `±0`", () => {
    expect<_DivFloat<"0", "0">>().to(equal<"NaN">);
    expect<_DivFloat<"0", "-0">>().to(equal<"NaN">);
    expect<_DivFloat<"-0", "0">>().to(equal<"NaN">);
    expect<_DivFloat<"-0", "-0">>().to(equal<"NaN">);
  });

  it("should return `±Infinity` if divisor is `±0` and dividend is not `±0`", () => {
    expect<_DivFloat<"0.1", "0">>().to(equal<"Infinity">);
    expect<_DivFloat<"0.1", "-0">>().to(equal<"-Infinity">);
    expect<_DivFloat<"0.034", "0">>().to(equal<"Infinity">);
    expect<_DivFloat<"0.034", "-0">>().to(equal<"-Infinity">);
    expect<_DivFloat<"5", "0">>().to(equal<"Infinity">);
    expect<_DivFloat<"5", "-0">>().to(equal<"-Infinity">);
    expect<_DivFloat<"42", "0">>().to(equal<"Infinity">);
    expect<_DivFloat<"42", "-0">>().to(equal<"-Infinity">);
    expect<_DivFloat<"-0.1", "0">>().to(equal<"-Infinity">);
    expect<_DivFloat<"-0.1", "-0">>().to(equal<"Infinity">);
    expect<_DivFloat<"-0.034", "0">>().to(equal<"-Infinity">);
    expect<_DivFloat<"-0.034", "-0">>().to(equal<"Infinity">);
    expect<_DivFloat<"-5", "0">>().to(equal<"-Infinity">);
    expect<_DivFloat<"-5", "-0">>().to(equal<"Infinity">);
    expect<_DivFloat<"-42", "0">>().to(equal<"-Infinity">);
    expect<_DivFloat<"-42", "-0">>().to(equal<"Infinity">);
  });

  it("should return `±0` if dividend is `±0` and divisor is not `±0`", () => {
    expect<_DivFloat<"0", "3">>().to(equal<"0">);
    expect<_DivFloat<"-0", "3">>().to(equal<"-0">);
    expect<_DivFloat<"0", "-3">>().to(equal<"-0">);
    expect<_DivFloat<"-0", "-3">>().to(equal<"0">);
    expect<_DivFloat<"0", "0.75">>().to(equal<"0">);
    expect<_DivFloat<"-0", "0.75">>().to(equal<"-0">);
    expect<_DivFloat<"0", "0.0034">>().to(equal<"0">);
    expect<_DivFloat<"-0", "0.0034">>().to(equal<"-0">);
    expect<_DivFloat<"0", "-0.75">>().to(equal<"-0">);
    expect<_DivFloat<"-0", "-0.75">>().to(equal<"0">);
    expect<_DivFloat<"0", "-0.0034">>().to(equal<"-0">);
    expect<_DivFloat<"-0", "-0.0034">>().to(equal<"0">);
  });

  it("should divide two positive integers", () => {
    expect<_DivFloat<"3", "3">>().to(equal<"1">);
    expect<_DivFloat<"2", "5">>().to(equal<"0.4">);
    expect<_DivFloat<"5", "2">>().to(equal<"2.5">);
    expect<_DivFloat<"1", "3">>().to(equal<"0.3333333333333333">);
    expect<_DivFloat<"64", "5">>().to(equal<"12.8">);
    expect<_DivFloat<"64", "17">>().to(equal<"3.764705882352941">);
    expect<_DivFloat<"100", "3">>().to(equal<"33.33333333333333">);
    expect<_DivFloat<"1000", "7">>().to(equal<"142.8571428571428">);
    expect<_DivFloat<"1000", "427">>().to(equal<"2.341920374707259">);
  });

  it("should divide two negative integers", () => {
    expect<_DivFloat<"-3", "-3">>().to(equal<"1">);
    expect<_DivFloat<"-2", "-5">>().to(equal<"0.4">);
    expect<_DivFloat<"-5", "-2">>().to(equal<"2.5">);
    expect<_DivFloat<"-1", "-3">>().to(equal<"0.3333333333333333">);
    expect<_DivFloat<"-64", "-5">>().to(equal<"12.8">);
    expect<_DivFloat<"-64", "-17">>().to(equal<"3.764705882352941">);
    expect<_DivFloat<"-100", "-3">>().to(equal<"33.33333333333333">);
    expect<_DivFloat<"-1000", "-7">>().to(equal<"142.8571428571428">);
    expect<_DivFloat<"-1000", "-427">>().to(equal<"2.341920374707259">);
  });

  it("should divide a positive and a negative integer", () => {
    expect<_DivFloat<"3", "-3">>().to(equal<"-1">);
    expect<_DivFloat<"2", "-5">>().to(equal<"-0.4">);
    expect<_DivFloat<"5", "-2">>().to(equal<"-2.5">);
    expect<_DivFloat<"1", "-3">>().to(equal<"-0.3333333333333333">);
    expect<_DivFloat<"64", "-5">>().to(equal<"-12.8">);
    expect<_DivFloat<"64", "-17">>().to(equal<"-3.764705882352941">);
    expect<_DivFloat<"100", "-3">>().to(equal<"-33.33333333333333">);
    expect<_DivFloat<"1000", "-7">>().to(equal<"-142.8571428571428">);
    expect<_DivFloat<"1000", "-427">>().to(equal<"-2.341920374707259">);
  });

  it("should divide a negative and a positive integer", () => {
    expect<_DivFloat<"-3", "3">>().to(equal<"-1">);
    expect<_DivFloat<"-2", "5">>().to(equal<"-0.4">);
    expect<_DivFloat<"-5", "2">>().to(equal<"-2.5">);
    expect<_DivFloat<"-1", "3">>().to(equal<"-0.3333333333333333">);
    expect<_DivFloat<"-64", "5">>().to(equal<"-12.8">);
    expect<_DivFloat<"-64", "17">>().to(equal<"-3.764705882352941">);
    expect<_DivFloat<"-100", "3">>().to(equal<"-33.33333333333333">);
    expect<_DivFloat<"-1000", "7">>().to(equal<"-142.8571428571428">);
    expect<_DivFloat<"-1000", "427">>().to(equal<"-2.341920374707259">);
  });

  it("should divide a positive integer and a positive float", () => {
    expect<_DivFloat<"1", "0.0025">>().to(equal<"400">);
    expect<_DivFloat<"1", "0.07">>().to(equal<"14.285714285714285">);
    expect<_DivFloat<"1", "0.25">>().to(equal<"4">);
    expect<_DivFloat<"1", "0.75">>().to(equal<"1.3333333333333333">);
    expect<_DivFloat<"2", "3.14">>().to(equal<"0.6369426751592356">);
    expect<_DivFloat<"3", "2.718">>().to(equal<"1.103752759381898">);
    expect<_DivFloat<"29", "2.718">>().to(equal<"10.66961000735835">);
    expect<_DivFloat<"9949", "25.67">>().to(equal<"387.5730424620179">);
  });

  it("should divide a negative integer and a negative float", () => {
    expect<_DivFloat<"-1", "-0.0025">>().to(equal<"400">);
    expect<_DivFloat<"-1", "-0.07">>().to(equal<"14.285714285714285">);
    expect<_DivFloat<"-1", "-0.25">>().to(equal<"4">);
    expect<_DivFloat<"-1", "-0.75">>().to(equal<"1.3333333333333333">);
    expect<_DivFloat<"-2", "-3.14">>().to(equal<"0.6369426751592356">);
    expect<_DivFloat<"-3", "-2.718">>().to(equal<"1.103752759381898">);
    expect<_DivFloat<"-29", "-2.718">>().to(equal<"10.66961000735835">);
    expect<_DivFloat<"-9949", "-25.67">>().to(equal<"387.5730424620179">);
  });

  it("should divide a positive integer and a negative float", () => {
    expect<_DivFloat<"1", "-0.0025">>().to(equal<"-400">);
    expect<_DivFloat<"1", "-0.07">>().to(equal<"-14.285714285714285">);
    expect<_DivFloat<"1", "-0.25">>().to(equal<"-4">);
    expect<_DivFloat<"1", "-0.75">>().to(equal<"-1.3333333333333333">);
    expect<_DivFloat<"2", "-3.14">>().to(equal<"-0.6369426751592356">);
    expect<_DivFloat<"3", "-2.718">>().to(equal<"-1.103752759381898">);
    expect<_DivFloat<"21", "-2.718">>().to(equal<"-7.726269315673289">);
    expect<_DivFloat<"9949", "-25.67">>().to(equal<"-387.5730424620179">);
  });

  it("should divide a negative integer and a positive float", () => {
    expect<_DivFloat<"-1", "0.0025">>().to(equal<"-400">);
    expect<_DivFloat<"-1", "0.07">>().to(equal<"-14.285714285714285">);
    expect<_DivFloat<"-1", "0.25">>().to(equal<"-4">);
    expect<_DivFloat<"-1", "0.75">>().to(equal<"-1.3333333333333333">);
    expect<_DivFloat<"-2", "3.14">>().to(equal<"-0.6369426751592356">);
    expect<_DivFloat<"-3", "2.718">>().to(equal<"-1.103752759381898">);
    expect<_DivFloat<"-21", "2.718">>().to(equal<"-7.726269315673289">);
    expect<_DivFloat<"-9949", "25.67">>().to(equal<"-387.5730424620179">);
  });

  it("should divide a positive float and a positive integer", () => {
    expect<_DivFloat<"0.0025", "2">>().to(equal<"0.00125">);
    expect<_DivFloat<"0.07", "3">>().to(equal<"0.02333333333333333">);
    expect<_DivFloat<"0.25", "2">>().to(equal<"0.125">);
    expect<_DivFloat<"0.75", "3">>().to(equal<"0.25">);
    expect<_DivFloat<"3.14", "2">>().to(equal<"1.57">);
    expect<_DivFloat<"2.718", "3">>().to(equal<"0.906">);
    expect<_DivFloat<"2.718", "29">>().to(equal<"0.09372413793103448">);
    expect<_DivFloat<"4356.791", "832">>().to(equal<"5.236527644230769">);
  });

  it("should divide a negative float and a negative integer", () => {
    expect<_DivFloat<"-0.0025", "-2">>().to(equal<"0.00125">);
    expect<_DivFloat<"-0.07", "-3">>().to(equal<"0.02333333333333333">);
    expect<_DivFloat<"-0.25", "-2">>().to(equal<"0.125">);
    expect<_DivFloat<"-0.75", "-3">>().to(equal<"0.25">);
    expect<_DivFloat<"-3.14", "-2">>().to(equal<"1.57">);
    expect<_DivFloat<"-2.718", "-3">>().to(equal<"0.906">);
    expect<_DivFloat<"-2.718", "-29">>().to(equal<"0.09372413793103448">);
    expect<_DivFloat<"-4356.791", "-832">>().to(equal<"5.236527644230769">);
  });

  it("should divide a positive float and a negative integer", () => {
    expect<_DivFloat<"0.0025", "-2">>().to(equal<"-0.00125">);
    expect<_DivFloat<"0.07", "-3">>().to(equal<"-0.02333333333333333">);
    expect<_DivFloat<"0.25", "-2">>().to(equal<"-0.125">);
    expect<_DivFloat<"0.75", "-3">>().to(equal<"-0.25">);
    expect<_DivFloat<"3.14", "-2">>().to(equal<"-1.57">);
    expect<_DivFloat<"2.718", "-3">>().to(equal<"-0.906">);
    expect<_DivFloat<"21.0", "-2">>().to(equal<"-10.5">);
    expect<_DivFloat<"4356.791", "-832">>().to(equal<"-5.236527644230769">);
  });

  it("should divide a negative float and a positive integer", () => {
    expect<_DivFloat<"-0.0025", "2">>().to(equal<"-0.00125">);
    expect<_DivFloat<"-0.07", "3">>().to(equal<"-0.02333333333333333">);
    expect<_DivFloat<"-0.25", "2">>().to(equal<"-0.125">);
    expect<_DivFloat<"-0.75", "3">>().to(equal<"-0.25">);
    expect<_DivFloat<"-3.14", "2">>().to(equal<"-1.57">);
    expect<_DivFloat<"-2.718", "3">>().to(equal<"-0.906">);
    expect<_DivFloat<"-21.0", "2">>().to(equal<"-10.5">);
    expect<_DivFloat<"-4356.791", "832">>().to(equal<"-5.236527644230769">);
  });

  it("should divide two positive floats", () => {
    expect<_DivFloat<"0.0025", "0.25">>().to(equal<"0.01">);
    expect<_DivFloat<"0.34", "0.0026">>().to(equal<"130.7692307692307">);
    expect<_DivFloat<"0.5", "0.25">>().to(equal<"2">);
    expect<_DivFloat<"3.14", "2.86">>().to(equal<"1.097902097902097">);
    expect<_DivFloat<"2.718", "3.599">>().to(equal<"0.7552097804945818">);
    expect<_DivFloat<"129.07", "0.02718">>().to(equal<"4748.712288447387">);
    expect<_DivFloat<"4356.791", "832.329">>().to(equal<"5.234457768502599">);
  });

  it("should divide two negative floats", () => {
    expect<_DivFloat<"-0.0025", "-0.25">>().to(equal<"0.01">);
    expect<_DivFloat<"-0.34", "-0.0026">>().to(equal<"130.7692307692307">);
    expect<_DivFloat<"-0.5", "-0.25">>().to(equal<"2">);
    expect<_DivFloat<"-3.14", "-2.86">>().to(equal<"1.097902097902097">);
    expect<_DivFloat<"-2.718", "-3.599">>().to(equal<"0.7552097804945818">);
    expect<_DivFloat<"-129.07", "-0.02718">>().to(equal<"4748.712288447387">);
    expect<_DivFloat<"-4356.791", "-832.329">>().to(equal<"5.234457768502599">);
  });

  it("should divide a positive and a negative float", () => {
    expect<_DivFloat<"0.0025", "-0.25">>().to(equal<"-0.01">);
    expect<_DivFloat<"0.34", "-0.0026">>().to(equal<"-130.7692307692307">);
    expect<_DivFloat<"0.5", "-0.25">>().to(equal<"-2">);
    expect<_DivFloat<"3.14", "-2.86">>().to(equal<"-1.097902097902097">);
    expect<_DivFloat<"2.718", "-3.599">>().to(equal<"-0.7552097804945818">);
    expect<_DivFloat<"129.07", "-0.02718">>().to(equal<"-4748.712288447387">);
    expect<_DivFloat<"4356.791", "-832.329">>().to(equal<"-5.234457768502599">);
  });

  it("should divide a negative and a positive float", () => {
    expect<_DivFloat<"-0.0025", "0.25">>().to(equal<"-0.01">);
    expect<_DivFloat<"-0.34", "0.0026">>().to(equal<"-130.7692307692307">);
    expect<_DivFloat<"-0.5", "0.25">>().to(equal<"-2">);
    expect<_DivFloat<"-3.14", "2.86">>().to(equal<"-1.097902097902097">);
    expect<_DivFloat<"-2.718", "3.599">>().to(equal<"-0.7552097804945818">);
    expect<_DivFloat<"-129.07", "0.02718">>().to(equal<"-4748.712288447387">);
    expect<_DivFloat<"-4356.791", "832.329">>().to(equal<"-5.234457768502599">);
  });
});
