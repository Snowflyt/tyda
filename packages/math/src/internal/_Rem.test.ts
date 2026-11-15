import { describe, equal, expect, it } from "typroof";

import type { _Rem } from "./_Rem";

describe("_Rem", () => {
  it("should return `NaN` if either dividend or divisor is `NaN`", () => {
    expect<_Rem<"NaN", "42">>().to(equal<"NaN">);
    expect<_Rem<"NaN", "0">>().to(equal<"NaN">);
    expect<_Rem<"NaN", "-0">>().to(equal<"NaN">);
    expect<_Rem<"NaN", "-42">>().to(equal<"NaN">);
    expect<_Rem<"42", "NaN">>().to(equal<"NaN">);
    expect<_Rem<"0", "NaN">>().to(equal<"NaN">);
    expect<_Rem<"-0", "NaN">>().to(equal<"NaN">);
    expect<_Rem<"-42", "NaN">>().to(equal<"NaN">);
    expect<_Rem<"NaN", "NaN">>().to(equal<"NaN">);
  });

  it("should return `NaN` if both dividend and divisor are `±Infinity`", () => {
    expect<_Rem<"Infinity", "Infinity">>().to(equal<"NaN">);
    expect<_Rem<"Infinity", "-Infinity">>().to(equal<"NaN">);
    expect<_Rem<"-Infinity", "Infinity">>().to(equal<"NaN">);
    expect<_Rem<"-Infinity", "-Infinity">>().to(equal<"NaN">);
  });

  it("should return `dividend` if divisor is `±Infinity` and dividend is not `±Infinity`", () => {
    expect<_Rem<"42", "Infinity">>().to(equal<"42">);
    expect<_Rem<"0", "Infinity">>().to(equal<"0">);
    expect<_Rem<"-0", "Infinity">>().to(equal<"-0">);
    expect<_Rem<"-42", "Infinity">>().to(equal<"-42">);
    expect<_Rem<"42", "-Infinity">>().to(equal<"42">);
    expect<_Rem<"0", "-Infinity">>().to(equal<"0">);
    expect<_Rem<"-0", "-Infinity">>().to(equal<"-0">);
    expect<_Rem<"-42", "-Infinity">>().to(equal<"-42">);
  });

  it("should return `NaN` if dividend is `±Infinity` and divisor is not `±Infinity`", () => {
    expect<_Rem<"Infinity", "42">>().to(equal<"NaN">);
    expect<_Rem<"Infinity", "0">>().to(equal<"NaN">);
    expect<_Rem<"Infinity", "-0">>().to(equal<"NaN">);
    expect<_Rem<"Infinity", "-42">>().to(equal<"NaN">);
    expect<_Rem<"-Infinity", "42">>().to(equal<"NaN">);
    expect<_Rem<"-Infinity", "0">>().to(equal<"NaN">);
    expect<_Rem<"-Infinity", "-0">>().to(equal<"NaN">);
    expect<_Rem<"-Infinity", "-42">>().to(equal<"NaN">);
  });

  it("should return `NaN` if both dividend and divisor are `±0`", () => {
    expect<_Rem<"0", "0">>().to(equal<"NaN">);
    expect<_Rem<"0", "-0">>().to(equal<"NaN">);
    expect<_Rem<"-0", "0">>().to(equal<"NaN">);
    expect<_Rem<"-0", "-0">>().to(equal<"NaN">);
  });

  it("should return `NaN` if divisor is `±0` and dividend is not `±0`", () => {
    expect<_Rem<"0.1", "0">>().to(equal<"NaN">);
    expect<_Rem<"0.1", "-0">>().to(equal<"NaN">);
    expect<_Rem<"0.034", "0">>().to(equal<"NaN">);
    expect<_Rem<"0.034", "-0">>().to(equal<"NaN">);
    expect<_Rem<"5", "0">>().to(equal<"NaN">);
    expect<_Rem<"5", "-0">>().to(equal<"NaN">);
    expect<_Rem<"42", "0">>().to(equal<"NaN">);
    expect<_Rem<"42", "-0">>().to(equal<"NaN">);
    expect<_Rem<"-0.1", "0">>().to(equal<"NaN">);
    expect<_Rem<"-0.1", "-0">>().to(equal<"NaN">);
    expect<_Rem<"-0.034", "0">>().to(equal<"NaN">);
    expect<_Rem<"-0.034", "-0">>().to(equal<"NaN">);
    expect<_Rem<"-5", "0">>().to(equal<"NaN">);
    expect<_Rem<"-5", "-0">>().to(equal<"NaN">);
    expect<_Rem<"-42", "0">>().to(equal<"NaN">);
    expect<_Rem<"-42", "-0">>().to(equal<"NaN">);
  });

  it("should return `±0` if dividend is `±0` and divisor is not `±0`", () => {
    expect<_Rem<"0", "3">>().to(equal<"0">);
    expect<_Rem<"-0", "3">>().to(equal<"-0">);
    expect<_Rem<"0", "-3">>().to(equal<"0">);
    expect<_Rem<"-0", "-3">>().to(equal<"-0">);
    expect<_Rem<"0", "0.75">>().to(equal<"0">);
    expect<_Rem<"-0", "0.75">>().to(equal<"-0">);
    expect<_Rem<"0", "0.0034">>().to(equal<"0">);
    expect<_Rem<"-0", "0.0034">>().to(equal<"-0">);
    expect<_Rem<"0", "-0.75">>().to(equal<"0">);
    expect<_Rem<"-0", "-0.75">>().to(equal<"-0">);
    expect<_Rem<"0", "-0.0034">>().to(equal<"0">);
    expect<_Rem<"-0", "-0.0034">>().to(equal<"-0">);
  });

  it("should divide two single-digit natural numbers and return the correct remainder", () => {
    expect<_Rem<"1", "1">>().to(equal<"0">);
    expect<_Rem<"1", "2">>().to(equal<"1">);
    expect<_Rem<"1", "3">>().to(equal<"1">);
    expect<_Rem<"1", "4">>().to(equal<"1">);
    expect<_Rem<"1", "5">>().to(equal<"1">);
    expect<_Rem<"1", "6">>().to(equal<"1">);
    expect<_Rem<"1", "7">>().to(equal<"1">);
    expect<_Rem<"1", "8">>().to(equal<"1">);
    expect<_Rem<"1", "9">>().to(equal<"1">);

    expect<_Rem<"2", "1">>().to(equal<"0">);
    expect<_Rem<"2", "2">>().to(equal<"0">);
    expect<_Rem<"2", "3">>().to(equal<"2">);
    expect<_Rem<"2", "4">>().to(equal<"2">);
    expect<_Rem<"2", "5">>().to(equal<"2">);
    expect<_Rem<"2", "6">>().to(equal<"2">);
    expect<_Rem<"2", "7">>().to(equal<"2">);
    expect<_Rem<"2", "8">>().to(equal<"2">);
    expect<_Rem<"2", "9">>().to(equal<"2">);

    expect<_Rem<"3", "1">>().to(equal<"0">);
    expect<_Rem<"3", "2">>().to(equal<"1">);
    expect<_Rem<"3", "3">>().to(equal<"0">);
    expect<_Rem<"3", "4">>().to(equal<"3">);
    expect<_Rem<"3", "5">>().to(equal<"3">);
    expect<_Rem<"3", "6">>().to(equal<"3">);
    expect<_Rem<"3", "7">>().to(equal<"3">);
    expect<_Rem<"3", "8">>().to(equal<"3">);
    expect<_Rem<"3", "9">>().to(equal<"3">);

    expect<_Rem<"4", "1">>().to(equal<"0">);
    expect<_Rem<"4", "2">>().to(equal<"0">);
    expect<_Rem<"4", "3">>().to(equal<"1">);
    expect<_Rem<"4", "4">>().to(equal<"0">);
    expect<_Rem<"4", "5">>().to(equal<"4">);
    expect<_Rem<"4", "6">>().to(equal<"4">);
    expect<_Rem<"4", "7">>().to(equal<"4">);
    expect<_Rem<"4", "8">>().to(equal<"4">);
    expect<_Rem<"4", "9">>().to(equal<"4">);

    expect<_Rem<"5", "1">>().to(equal<"0">);
    expect<_Rem<"5", "2">>().to(equal<"1">);
    expect<_Rem<"5", "3">>().to(equal<"2">);
    expect<_Rem<"5", "4">>().to(equal<"1">);
    expect<_Rem<"5", "5">>().to(equal<"0">);
    expect<_Rem<"5", "6">>().to(equal<"5">);
    expect<_Rem<"5", "7">>().to(equal<"5">);
    expect<_Rem<"5", "8">>().to(equal<"5">);
    expect<_Rem<"5", "9">>().to(equal<"5">);

    expect<_Rem<"6", "1">>().to(equal<"0">);
    expect<_Rem<"6", "2">>().to(equal<"0">);
    expect<_Rem<"6", "3">>().to(equal<"0">);
    expect<_Rem<"6", "4">>().to(equal<"2">);
    expect<_Rem<"6", "5">>().to(equal<"1">);
    expect<_Rem<"6", "6">>().to(equal<"0">);
    expect<_Rem<"6", "7">>().to(equal<"6">);
    expect<_Rem<"6", "8">>().to(equal<"6">);
    expect<_Rem<"6", "9">>().to(equal<"6">);

    expect<_Rem<"7", "1">>().to(equal<"0">);
    expect<_Rem<"7", "2">>().to(equal<"1">);
    expect<_Rem<"7", "3">>().to(equal<"1">);
    expect<_Rem<"7", "4">>().to(equal<"3">);
    expect<_Rem<"7", "5">>().to(equal<"2">);
    expect<_Rem<"7", "6">>().to(equal<"1">);
    expect<_Rem<"7", "7">>().to(equal<"0">);
    expect<_Rem<"7", "8">>().to(equal<"7">);
    expect<_Rem<"7", "9">>().to(equal<"7">);

    expect<_Rem<"8", "1">>().to(equal<"0">);
    expect<_Rem<"8", "2">>().to(equal<"0">);
    expect<_Rem<"8", "3">>().to(equal<"2">);
    expect<_Rem<"8", "4">>().to(equal<"0">);
    expect<_Rem<"8", "5">>().to(equal<"3">);
    expect<_Rem<"8", "6">>().to(equal<"2">);
    expect<_Rem<"8", "7">>().to(equal<"1">);
    expect<_Rem<"8", "8">>().to(equal<"0">);
    expect<_Rem<"8", "9">>().to(equal<"8">);

    expect<_Rem<"9", "1">>().to(equal<"0">);
    expect<_Rem<"9", "2">>().to(equal<"1">);
    expect<_Rem<"9", "3">>().to(equal<"0">);
    expect<_Rem<"9", "4">>().to(equal<"1">);
    expect<_Rem<"9", "5">>().to(equal<"4">);
    expect<_Rem<"9", "6">>().to(equal<"3">);
    expect<_Rem<"9", "7">>().to(equal<"2">);
    expect<_Rem<"9", "8">>().to(equal<"1">);
    expect<_Rem<"9", "9">>().to(equal<"0">);
  });

  it("should divide two positive integers and return the correct remainder", () => {
    expect<_Rem<"3", "3">>().to(equal<"0">);
    expect<_Rem<"2", "5">>().to(equal<"2">);
    expect<_Rem<"5", "2">>().to(equal<"1">);
    expect<_Rem<"1", "3">>().to(equal<"1">);
    expect<_Rem<"64", "5">>().to(equal<"4">);
    expect<_Rem<"64", "17">>().to(equal<"13">);
    expect<_Rem<"100", "3">>().to(equal<"1">);
    expect<_Rem<"1000", "7">>().to(equal<"6">);
    expect<_Rem<"1000", "427">>().to(equal<"146">);
  });

  it("should divide two negative integers and return the correct remainder", () => {
    expect<_Rem<"-3", "-3">>().to(equal<"-0">);
    expect<_Rem<"-2", "-5">>().to(equal<"-2">);
    expect<_Rem<"-5", "-2">>().to(equal<"-1">);
    expect<_Rem<"-1", "-3">>().to(equal<"-1">);
    expect<_Rem<"-64", "-5">>().to(equal<"-4">);
    expect<_Rem<"-64", "-17">>().to(equal<"-13">);
    expect<_Rem<"-100", "-3">>().to(equal<"-1">);
    expect<_Rem<"-1000", "-7">>().to(equal<"-6">);
    expect<_Rem<"-1000", "-427">>().to(equal<"-146">);
  });

  it("should divide a positive and a negative integer and return the correct remainder", () => {
    expect<_Rem<"3", "-3">>().to(equal<"0">);
    expect<_Rem<"2", "-5">>().to(equal<"2">);
    expect<_Rem<"5", "-2">>().to(equal<"1">);
    expect<_Rem<"1", "-3">>().to(equal<"1">);
    expect<_Rem<"64", "-5">>().to(equal<"4">);
    expect<_Rem<"64", "-17">>().to(equal<"13">);
    expect<_Rem<"100", "-3">>().to(equal<"1">);
    expect<_Rem<"1000", "-7">>().to(equal<"6">);
    expect<_Rem<"1000", "-427">>().to(equal<"146">);
  });

  it("should divide a negative and a positive integer and return the correct remainder", () => {
    expect<_Rem<"-3", "3">>().to(equal<"-0">);
    expect<_Rem<"-2", "5">>().to(equal<"-2">);
    expect<_Rem<"-5", "2">>().to(equal<"-1">);
    expect<_Rem<"-1", "3">>().to(equal<"-1">);
    expect<_Rem<"-64", "5">>().to(equal<"-4">);
    expect<_Rem<"-64", "17">>().to(equal<"-13">);
    expect<_Rem<"-100", "3">>().to(equal<"-1">);
    expect<_Rem<"-1000", "7">>().to(equal<"-6">);
    expect<_Rem<"-1000", "427">>().to(equal<"-146">);
  });

  it("should divide a positive integer and a positive float and return the correct remainder", () => {
    expect<_Rem<"1", "0.0025">>().to(equal<"0">);
    expect<_Rem<"1", "0.07">>().to(equal<"0.02">);
    expect<_Rem<"1", "0.25">>().to(equal<"0">);
    expect<_Rem<"1", "0.75">>().to(equal<"0.25">);
    expect<_Rem<"2", "3.14">>().to(equal<"2">);
    expect<_Rem<"3", "2.718">>().to(equal<"0.282">);
    expect<_Rem<"29", "2.718">>().to(equal<"1.82">);
    expect<_Rem<"9949", "25.67">>().to(equal<"14.71">);
  });

  it("should divide a negative integer and a negative float and return the correct remainder", () => {
    expect<_Rem<"-1", "-0.0025">>().to(equal<"-0">);
    expect<_Rem<"-1", "-0.07">>().to(equal<"-0.02">);
    expect<_Rem<"-1", "-0.25">>().to(equal<"-0">);
    expect<_Rem<"-1", "-0.75">>().to(equal<"-0.25">);
    expect<_Rem<"-2", "-3.14">>().to(equal<"-2">);
    expect<_Rem<"-3", "-2.718">>().to(equal<"-0.282">);
    expect<_Rem<"-29", "-2.718">>().to(equal<"-1.82">);
    expect<_Rem<"-9949", "-25.67">>().to(equal<"-14.71">);
  });

  it("should divide a positive integer and a negative float and return the correct remainder", () => {
    expect<_Rem<"1", "-0.0025">>().to(equal<"0">);
    expect<_Rem<"1", "-0.07">>().to(equal<"0.02">);
    expect<_Rem<"1", "-0.25">>().to(equal<"0">);
    expect<_Rem<"1", "-0.75">>().to(equal<"0.25">);
    expect<_Rem<"2", "-3.14">>().to(equal<"2">);
    expect<_Rem<"3", "-2.718">>().to(equal<"0.282">);
    expect<_Rem<"21", "-2.718">>().to(equal<"1.974">);
    expect<_Rem<"9949", "-25.67">>().to(equal<"14.71">);
  });

  it("should divide a negative integer and a positive float and return the correct remainder", () => {
    expect<_Rem<"-1", "0.0025">>().to(equal<"-0">);
    expect<_Rem<"-1", "0.07">>().to(equal<"-0.02">);
    expect<_Rem<"-1", "0.25">>().to(equal<"-0">);
    expect<_Rem<"-1", "0.75">>().to(equal<"-0.25">);
    expect<_Rem<"-2", "3.14">>().to(equal<"-2">);
    expect<_Rem<"-3", "2.718">>().to(equal<"-0.282">);
    expect<_Rem<"-21", "2.718">>().to(equal<"-1.974">);
    expect<_Rem<"-9949", "25.67">>().to(equal<"-14.71">);
  });

  it("should divide a positive float and a positive integer and return the correct remainder", () => {
    expect<_Rem<"0.0025", "2">>().to(equal<"0.0025">);
    expect<_Rem<"0.07", "3">>().to(equal<"0.07">);
    expect<_Rem<"0.25", "2">>().to(equal<"0.25">);
    expect<_Rem<"0.75", "3">>().to(equal<"0.75">);
    expect<_Rem<"3.14", "2">>().to(equal<"1.14">);
    expect<_Rem<"2.718", "3">>().to(equal<"2.718">);
    expect<_Rem<"2.718", "29">>().to(equal<"2.718">);
    expect<_Rem<"4356.791", "832">>().to(equal<"196.791">);
  });

  it("should divide a negative float and a negative integer and return the correct remainder", () => {
    expect<_Rem<"-0.0025", "-2">>().to(equal<"-0.0025">);
    expect<_Rem<"-0.07", "-3">>().to(equal<"-0.07">);
    expect<_Rem<"-0.25", "-2">>().to(equal<"-0.25">);
    expect<_Rem<"-0.75", "-3">>().to(equal<"-0.75">);
    expect<_Rem<"-3.14", "-2">>().to(equal<"-1.14">);
    expect<_Rem<"-2.718", "-3">>().to(equal<"-2.718">);
    expect<_Rem<"-2.718", "-29">>().to(equal<"-2.718">);
    expect<_Rem<"-4356.791", "-832">>().to(equal<"-196.791">);
  });

  it("should divide a positive float and a negative integer and return the correct remainder", () => {
    expect<_Rem<"0.0025", "-2">>().to(equal<"0.0025">);
    expect<_Rem<"0.07", "-3">>().to(equal<"0.07">);
    expect<_Rem<"0.25", "-2">>().to(equal<"0.25">);
    expect<_Rem<"0.75", "-3">>().to(equal<"0.75">);
    expect<_Rem<"3.14", "-2">>().to(equal<"1.14">);
    expect<_Rem<"2.718", "-3">>().to(equal<"2.718">);
    expect<_Rem<"21.0", "-2">>().to(equal<"1">);
    expect<_Rem<"4356.791", "-832">>().to(equal<"196.791">);
  });

  it("should divide a negative float and a positive integer and return the correct remainder", () => {
    expect<_Rem<"-0.0025", "2">>().to(equal<"-0.0025">);
    expect<_Rem<"-0.07", "3">>().to(equal<"-0.07">);
    expect<_Rem<"-0.25", "2">>().to(equal<"-0.25">);
    expect<_Rem<"-0.75", "3">>().to(equal<"-0.75">);
    expect<_Rem<"-3.14", "2">>().to(equal<"-1.14">);
    expect<_Rem<"-2.718", "3">>().to(equal<"-2.718">);
    expect<_Rem<"-21.0", "2">>().to(equal<"-1">);
    expect<_Rem<"-4356.791", "832">>().to(equal<"-196.791">);
  });

  it("should divide two positive floats and return the correct remainder", () => {
    expect<_Rem<"0.0025", "0.25">>().to(equal<"0.0025">);
    expect<_Rem<"0.34", "0.0026">>().to(equal<"0.002">);
    expect<_Rem<"0.5", "0.25">>().to(equal<"0">);
    expect<_Rem<"3.14", "2.86">>().to(equal<"0.28">);
    expect<_Rem<"2.718", "3.599">>().to(equal<"2.718">);
    expect<_Rem<"129.07", "0.02718">>().to(equal<"0.01936">);
    expect<_Rem<"4356.791", "832.329">>().to(equal<"195.146">);
  });

  it("should divide two negative floats and return the correct remainder", () => {
    expect<_Rem<"-0.0025", "-0.25">>().to(equal<"-0.0025">);
    expect<_Rem<"-0.34", "-0.0026">>().to(equal<"-0.002">);
    expect<_Rem<"-0.5", "-0.25">>().to(equal<"-0">);
    expect<_Rem<"-3.14", "-2.86">>().to(equal<"-0.28">);
    expect<_Rem<"-2.718", "-3.599">>().to(equal<"-2.718">);
    expect<_Rem<"-129.07", "-0.02718">>().to(equal<"-0.01936">);
    expect<_Rem<"-4356.791", "-832.329">>().to(equal<"-195.146">);
  });

  it("should divide a positive and a negative float and return the correct remainder", () => {
    expect<_Rem<"0.0025", "-0.25">>().to(equal<"0.0025">);
    expect<_Rem<"0.34", "-0.0026">>().to(equal<"0.002">);
    expect<_Rem<"0.5", "-0.25">>().to(equal<"0">);
    expect<_Rem<"3.14", "-2.86">>().to(equal<"0.28">);
    expect<_Rem<"2.718", "-3.599">>().to(equal<"2.718">);
    expect<_Rem<"129.07", "-0.02718">>().to(equal<"0.01936">);
    expect<_Rem<"4356.791", "-832.329">>().to(equal<"195.146">);
  });

  it("should divide a negative and a positive float and return the correct remainder", () => {
    expect<_Rem<"-0.0025", "0.25">>().to(equal<"-0.0025">);
    expect<_Rem<"-0.34", "0.0026">>().to(equal<"-0.002">);
    expect<_Rem<"-0.5", "0.25">>().to(equal<"-0">);
    expect<_Rem<"-3.14", "2.86">>().to(equal<"-0.28">);
    expect<_Rem<"-2.718", "3.599">>().to(equal<"-2.718">);
    expect<_Rem<"-129.07", "0.02718">>().to(equal<"-0.01936">);
    expect<_Rem<"-4356.791", "832.329">>().to(equal<"-195.146">);
  });
});
