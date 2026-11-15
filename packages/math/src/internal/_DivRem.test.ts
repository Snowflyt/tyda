import { describe, equal, expect, it } from "typroof";

import type { _DivRem } from "./_DivRem";

describe("_DivRem", () => {
  it("should return `readonly [NaN, NaN]` if either dividend or divisor is `NaN`", () => {
    expect<_DivRem<"NaN", "42">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"NaN", "0">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"NaN", "-0">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"NaN", "-42">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"42", "NaN">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"0", "NaN">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"-0", "NaN">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"-42", "NaN">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"NaN", "NaN">>().to(equal<readonly ["NaN", "NaN"]>);
  });

  it("should return `readonly [NaN, NaN]` if both dividend and divisor are `±Infinity`", () => {
    expect<_DivRem<"Infinity", "Infinity">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"Infinity", "-Infinity">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"-Infinity", "Infinity">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"-Infinity", "-Infinity">>().to(equal<readonly ["NaN", "NaN"]>);
  });

  it("should return `readonly [±0, dividend]` if divisor is `±Infinity` and dividend is not `±Infinity`", () => {
    expect<_DivRem<"42", "Infinity">>().to(equal<readonly ["0", "42"]>);
    expect<_DivRem<"0", "Infinity">>().to(equal<readonly ["0", "0"]>);
    expect<_DivRem<"-0", "Infinity">>().to(equal<readonly ["0", "-0"]>);
    expect<_DivRem<"-42", "Infinity">>().to(equal<readonly ["0", "-42"]>);
    expect<_DivRem<"42", "-Infinity">>().to(equal<readonly ["-0", "42"]>);
    expect<_DivRem<"0", "-Infinity">>().to(equal<readonly ["-0", "0"]>);
    expect<_DivRem<"-0", "-Infinity">>().to(equal<readonly ["-0", "-0"]>);
    expect<_DivRem<"-42", "-Infinity">>().to(equal<readonly ["-0", "-42"]>);
  });

  it("should return `readonly [NaN, NaN]` if dividend is `±Infinity` and divisor is not `±Infinity`", () => {
    expect<_DivRem<"Infinity", "42">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"Infinity", "0">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"Infinity", "-0">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"Infinity", "-42">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"-Infinity", "42">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"-Infinity", "0">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"-Infinity", "-0">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"-Infinity", "-42">>().to(equal<readonly ["NaN", "NaN"]>);
  });

  it("should return `readonly [NaN, NaN]` if both dividend and divisor are `±0`", () => {
    expect<_DivRem<"0", "0">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"0", "-0">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"-0", "0">>().to(equal<readonly ["NaN", "NaN"]>);
    expect<_DivRem<"-0", "-0">>().to(equal<readonly ["NaN", "NaN"]>);
  });

  it("should return `readonly [±Infinity, NaN]` if divisor is `±0` and dividend is not `±0`", () => {
    expect<_DivRem<"0.1", "0">>().to(equal<readonly ["Infinity", "NaN"]>);
    expect<_DivRem<"0.1", "-0">>().to(equal<readonly ["-Infinity", "NaN"]>);
    expect<_DivRem<"0.034", "0">>().to(equal<readonly ["Infinity", "NaN"]>);
    expect<_DivRem<"0.034", "-0">>().to(equal<readonly ["-Infinity", "NaN"]>);
    expect<_DivRem<"5", "0">>().to(equal<readonly ["Infinity", "NaN"]>);
    expect<_DivRem<"5", "-0">>().to(equal<readonly ["-Infinity", "NaN"]>);
    expect<_DivRem<"42", "0">>().to(equal<readonly ["Infinity", "NaN"]>);
    expect<_DivRem<"42", "-0">>().to(equal<readonly ["-Infinity", "NaN"]>);
    expect<_DivRem<"-0.1", "0">>().to(equal<readonly ["-Infinity", "NaN"]>);
    expect<_DivRem<"-0.1", "-0">>().to(equal<readonly ["Infinity", "NaN"]>);
    expect<_DivRem<"-0.034", "0">>().to(equal<readonly ["-Infinity", "NaN"]>);
    expect<_DivRem<"-0.034", "-0">>().to(equal<readonly ["Infinity", "NaN"]>);
    expect<_DivRem<"-5", "0">>().to(equal<readonly ["-Infinity", "NaN"]>);
    expect<_DivRem<"-5", "-0">>().to(equal<readonly ["Infinity", "NaN"]>);
    expect<_DivRem<"-42", "0">>().to(equal<readonly ["-Infinity", "NaN"]>);
    expect<_DivRem<"-42", "-0">>().to(equal<readonly ["Infinity", "NaN"]>);
  });

  it("should return `readonly [±0, ±0]` if dividend is `±0` and divisor is not `±0`", () => {
    expect<_DivRem<"0", "3">>().to(equal<readonly ["0", "0"]>);
    expect<_DivRem<"-0", "3">>().to(equal<readonly ["-0", "-0"]>);
    expect<_DivRem<"0", "-3">>().to(equal<readonly ["-0", "0"]>);
    expect<_DivRem<"-0", "-3">>().to(equal<readonly ["0", "-0"]>);
    expect<_DivRem<"0", "0.75">>().to(equal<readonly ["0", "0"]>);
    expect<_DivRem<"-0", "0.75">>().to(equal<readonly ["-0", "-0"]>);
    expect<_DivRem<"0", "0.0034">>().to(equal<readonly ["0", "0"]>);
    expect<_DivRem<"-0", "0.0034">>().to(equal<readonly ["-0", "-0"]>);
    expect<_DivRem<"0", "-0.75">>().to(equal<readonly ["-0", "0"]>);
    expect<_DivRem<"-0", "-0.75">>().to(equal<readonly ["0", "-0"]>);
    expect<_DivRem<"0", "-0.0034">>().to(equal<readonly ["-0", "0"]>);
    expect<_DivRem<"-0", "-0.0034">>().to(equal<readonly ["0", "-0"]>);
  });

  it("should divide two single-digit natural numbers and return the correct quotient and remainder", () => {
    expect<_DivRem<"1", "1">>().to(equal<readonly ["1", "0"]>);
    expect<_DivRem<"1", "2">>().to(equal<readonly ["0", "1"]>);
    expect<_DivRem<"1", "3">>().to(equal<readonly ["0", "1"]>);
    expect<_DivRem<"1", "4">>().to(equal<readonly ["0", "1"]>);
    expect<_DivRem<"1", "5">>().to(equal<readonly ["0", "1"]>);
    expect<_DivRem<"1", "6">>().to(equal<readonly ["0", "1"]>);
    expect<_DivRem<"1", "7">>().to(equal<readonly ["0", "1"]>);
    expect<_DivRem<"1", "8">>().to(equal<readonly ["0", "1"]>);
    expect<_DivRem<"1", "9">>().to(equal<readonly ["0", "1"]>);

    expect<_DivRem<"2", "1">>().to(equal<readonly ["2", "0"]>);
    expect<_DivRem<"2", "2">>().to(equal<readonly ["1", "0"]>);
    expect<_DivRem<"2", "3">>().to(equal<readonly ["0", "2"]>);
    expect<_DivRem<"2", "4">>().to(equal<readonly ["0", "2"]>);
    expect<_DivRem<"2", "5">>().to(equal<readonly ["0", "2"]>);
    expect<_DivRem<"2", "6">>().to(equal<readonly ["0", "2"]>);
    expect<_DivRem<"2", "7">>().to(equal<readonly ["0", "2"]>);
    expect<_DivRem<"2", "8">>().to(equal<readonly ["0", "2"]>);
    expect<_DivRem<"2", "9">>().to(equal<readonly ["0", "2"]>);

    expect<_DivRem<"3", "1">>().to(equal<readonly ["3", "0"]>);
    expect<_DivRem<"3", "2">>().to(equal<readonly ["1", "1"]>);
    expect<_DivRem<"3", "3">>().to(equal<readonly ["1", "0"]>);
    expect<_DivRem<"3", "4">>().to(equal<readonly ["0", "3"]>);
    expect<_DivRem<"3", "5">>().to(equal<readonly ["0", "3"]>);
    expect<_DivRem<"3", "6">>().to(equal<readonly ["0", "3"]>);
    expect<_DivRem<"3", "7">>().to(equal<readonly ["0", "3"]>);
    expect<_DivRem<"3", "8">>().to(equal<readonly ["0", "3"]>);
    expect<_DivRem<"3", "9">>().to(equal<readonly ["0", "3"]>);

    expect<_DivRem<"4", "1">>().to(equal<readonly ["4", "0"]>);
    expect<_DivRem<"4", "2">>().to(equal<readonly ["2", "0"]>);
    expect<_DivRem<"4", "3">>().to(equal<readonly ["1", "1"]>);
    expect<_DivRem<"4", "4">>().to(equal<readonly ["1", "0"]>);
    expect<_DivRem<"4", "5">>().to(equal<readonly ["0", "4"]>);
    expect<_DivRem<"4", "6">>().to(equal<readonly ["0", "4"]>);
    expect<_DivRem<"4", "7">>().to(equal<readonly ["0", "4"]>);
    expect<_DivRem<"4", "8">>().to(equal<readonly ["0", "4"]>);
    expect<_DivRem<"4", "9">>().to(equal<readonly ["0", "4"]>);

    expect<_DivRem<"5", "1">>().to(equal<readonly ["5", "0"]>);
    expect<_DivRem<"5", "2">>().to(equal<readonly ["2", "1"]>);
    expect<_DivRem<"5", "3">>().to(equal<readonly ["1", "2"]>);
    expect<_DivRem<"5", "4">>().to(equal<readonly ["1", "1"]>);
    expect<_DivRem<"5", "5">>().to(equal<readonly ["1", "0"]>);
    expect<_DivRem<"5", "6">>().to(equal<readonly ["0", "5"]>);
    expect<_DivRem<"5", "7">>().to(equal<readonly ["0", "5"]>);
    expect<_DivRem<"5", "8">>().to(equal<readonly ["0", "5"]>);
    expect<_DivRem<"5", "9">>().to(equal<readonly ["0", "5"]>);

    expect<_DivRem<"6", "1">>().to(equal<readonly ["6", "0"]>);
    expect<_DivRem<"6", "2">>().to(equal<readonly ["3", "0"]>);
    expect<_DivRem<"6", "3">>().to(equal<readonly ["2", "0"]>);
    expect<_DivRem<"6", "4">>().to(equal<readonly ["1", "2"]>);
    expect<_DivRem<"6", "5">>().to(equal<readonly ["1", "1"]>);
    expect<_DivRem<"6", "6">>().to(equal<readonly ["1", "0"]>);
    expect<_DivRem<"6", "7">>().to(equal<readonly ["0", "6"]>);
    expect<_DivRem<"6", "8">>().to(equal<readonly ["0", "6"]>);
    expect<_DivRem<"6", "9">>().to(equal<readonly ["0", "6"]>);

    expect<_DivRem<"7", "1">>().to(equal<readonly ["7", "0"]>);
    expect<_DivRem<"7", "2">>().to(equal<readonly ["3", "1"]>);
    expect<_DivRem<"7", "3">>().to(equal<readonly ["2", "1"]>);
    expect<_DivRem<"7", "4">>().to(equal<readonly ["1", "3"]>);
    expect<_DivRem<"7", "5">>().to(equal<readonly ["1", "2"]>);
    expect<_DivRem<"7", "6">>().to(equal<readonly ["1", "1"]>);
    expect<_DivRem<"7", "7">>().to(equal<readonly ["1", "0"]>);
    expect<_DivRem<"7", "8">>().to(equal<readonly ["0", "7"]>);
    expect<_DivRem<"7", "9">>().to(equal<readonly ["0", "7"]>);

    expect<_DivRem<"8", "1">>().to(equal<readonly ["8", "0"]>);
    expect<_DivRem<"8", "2">>().to(equal<readonly ["4", "0"]>);
    expect<_DivRem<"8", "3">>().to(equal<readonly ["2", "2"]>);
    expect<_DivRem<"8", "4">>().to(equal<readonly ["2", "0"]>);
    expect<_DivRem<"8", "5">>().to(equal<readonly ["1", "3"]>);
    expect<_DivRem<"8", "6">>().to(equal<readonly ["1", "2"]>);
    expect<_DivRem<"8", "7">>().to(equal<readonly ["1", "1"]>);
    expect<_DivRem<"8", "8">>().to(equal<readonly ["1", "0"]>);
    expect<_DivRem<"8", "9">>().to(equal<readonly ["0", "8"]>);

    expect<_DivRem<"9", "1">>().to(equal<readonly ["9", "0"]>);
    expect<_DivRem<"9", "2">>().to(equal<readonly ["4", "1"]>);
    expect<_DivRem<"9", "3">>().to(equal<readonly ["3", "0"]>);
    expect<_DivRem<"9", "4">>().to(equal<readonly ["2", "1"]>);
    expect<_DivRem<"9", "5">>().to(equal<readonly ["1", "4"]>);
    expect<_DivRem<"9", "6">>().to(equal<readonly ["1", "3"]>);
    expect<_DivRem<"9", "7">>().to(equal<readonly ["1", "2"]>);
    expect<_DivRem<"9", "8">>().to(equal<readonly ["1", "1"]>);
    expect<_DivRem<"9", "9">>().to(equal<readonly ["1", "0"]>);
  });

  it("should divide two positive integers and return the correct quotient and remainder", () => {
    expect<_DivRem<"3", "3">>().to(equal<readonly ["1", "0"]>);
    expect<_DivRem<"2", "5">>().to(equal<readonly ["0", "2"]>);
    expect<_DivRem<"5", "2">>().to(equal<readonly ["2", "1"]>);
    expect<_DivRem<"1", "3">>().to(equal<readonly ["0", "1"]>);
    expect<_DivRem<"64", "5">>().to(equal<readonly ["12", "4"]>);
    expect<_DivRem<"64", "17">>().to(equal<readonly ["3", "13"]>);
    expect<_DivRem<"100", "3">>().to(equal<readonly ["33", "1"]>);
    expect<_DivRem<"1000", "7">>().to(equal<readonly ["142", "6"]>);
    expect<_DivRem<"1000", "427">>().to(equal<readonly ["2", "146"]>);
  });

  it("should divide two negative integers and return the correct quotient and remainder", () => {
    expect<_DivRem<"-3", "-3">>().to(equal<readonly ["1", "-0"]>);
    expect<_DivRem<"-2", "-5">>().to(equal<readonly ["0", "-2"]>);
    expect<_DivRem<"-5", "-2">>().to(equal<readonly ["2", "-1"]>);
    expect<_DivRem<"-1", "-3">>().to(equal<readonly ["0", "-1"]>);
    expect<_DivRem<"-64", "-5">>().to(equal<readonly ["12", "-4"]>);
    expect<_DivRem<"-64", "-17">>().to(equal<readonly ["3", "-13"]>);
    expect<_DivRem<"-100", "-3">>().to(equal<readonly ["33", "-1"]>);
    expect<_DivRem<"-1000", "-7">>().to(equal<readonly ["142", "-6"]>);
    expect<_DivRem<"-1000", "-427">>().to(equal<readonly ["2", "-146"]>);
  });

  it("should divide a positive and a negative integer and return the correct quotient and remainder", () => {
    expect<_DivRem<"3", "-3">>().to(equal<readonly ["-1", "0"]>);
    expect<_DivRem<"2", "-5">>().to(equal<readonly ["-0", "2"]>);
    expect<_DivRem<"5", "-2">>().to(equal<readonly ["-2", "1"]>);
    expect<_DivRem<"1", "-3">>().to(equal<readonly ["-0", "1"]>);
    expect<_DivRem<"64", "-5">>().to(equal<readonly ["-12", "4"]>);
    expect<_DivRem<"64", "-17">>().to(equal<readonly ["-3", "13"]>);
    expect<_DivRem<"100", "-3">>().to(equal<readonly ["-33", "1"]>);
    expect<_DivRem<"1000", "-7">>().to(equal<readonly ["-142", "6"]>);
    expect<_DivRem<"1000", "-427">>().to(equal<readonly ["-2", "146"]>);
  });

  it("should divide a negative and a positive integer and return the correct quotient and remainder", () => {
    expect<_DivRem<"-3", "3">>().to(equal<readonly ["-1", "-0"]>);
    expect<_DivRem<"-2", "5">>().to(equal<readonly ["-0", "-2"]>);
    expect<_DivRem<"-5", "2">>().to(equal<readonly ["-2", "-1"]>);
    expect<_DivRem<"-1", "3">>().to(equal<readonly ["-0", "-1"]>);
    expect<_DivRem<"-64", "5">>().to(equal<readonly ["-12", "-4"]>);
    expect<_DivRem<"-64", "17">>().to(equal<readonly ["-3", "-13"]>);
    expect<_DivRem<"-100", "3">>().to(equal<readonly ["-33", "-1"]>);
    expect<_DivRem<"-1000", "7">>().to(equal<readonly ["-142", "-6"]>);
    expect<_DivRem<"-1000", "427">>().to(equal<readonly ["-2", "-146"]>);
  });

  it("should divide a positive integer and a positive float and return the correct quotient and remainder", () => {
    expect<_DivRem<"1", "0.0025">>().to(equal<readonly ["400", "0"]>);
    expect<_DivRem<"1", "0.07">>().to(equal<readonly ["14", "0.02"]>);
    expect<_DivRem<"1", "0.25">>().to(equal<readonly ["4", "0"]>);
    expect<_DivRem<"1", "0.75">>().to(equal<readonly ["1", "0.25"]>);
    expect<_DivRem<"2", "3.14">>().to(equal<readonly ["0", "2"]>);
    expect<_DivRem<"3", "2.718">>().to(equal<readonly ["1", "0.282"]>);
    expect<_DivRem<"29", "2.718">>().to(equal<readonly ["10", "1.82"]>);
    expect<_DivRem<"9949", "25.67">>().to(equal<readonly ["387", "14.71"]>);
  });

  it("should divide a negative integer and a negative float and return the correct quotient and remainder", () => {
    expect<_DivRem<"-1", "-0.0025">>().to(equal<readonly ["400", "-0"]>);
    expect<_DivRem<"-1", "-0.07">>().to(equal<readonly ["14", "-0.02"]>);
    expect<_DivRem<"-1", "-0.25">>().to(equal<readonly ["4", "-0"]>);
    expect<_DivRem<"-1", "-0.75">>().to(equal<readonly ["1", "-0.25"]>);
    expect<_DivRem<"-2", "-3.14">>().to(equal<readonly ["0", "-2"]>);
    expect<_DivRem<"-3", "-2.718">>().to(equal<readonly ["1", "-0.282"]>);
    expect<_DivRem<"-29", "-2.718">>().to(equal<readonly ["10", "-1.82"]>);
    expect<_DivRem<"-9949", "-25.67">>().to(equal<readonly ["387", "-14.71"]>);
  });

  it("should divide a positive integer and a negative float and return the correct quotient and remainder", () => {
    expect<_DivRem<"1", "-0.0025">>().to(equal<readonly ["-400", "0"]>);
    expect<_DivRem<"1", "-0.07">>().to(equal<readonly ["-14", "0.02"]>);
    expect<_DivRem<"1", "-0.25">>().to(equal<readonly ["-4", "0"]>);
    expect<_DivRem<"1", "-0.75">>().to(equal<readonly ["-1", "0.25"]>);
    expect<_DivRem<"2", "-3.14">>().to(equal<readonly ["-0", "2"]>);
    expect<_DivRem<"3", "-2.718">>().to(equal<readonly ["-1", "0.282"]>);
    expect<_DivRem<"21", "-2.718">>().to(equal<readonly ["-7", "1.974"]>);
    expect<_DivRem<"9949", "-25.67">>().to(equal<readonly ["-387", "14.71"]>);
  });

  it("should divide a negative integer and a positive float and return the correct quotient and remainder", () => {
    expect<_DivRem<"-1", "0.0025">>().to(equal<readonly ["-400", "-0"]>);
    expect<_DivRem<"-1", "0.07">>().to(equal<readonly ["-14", "-0.02"]>);
    expect<_DivRem<"-1", "0.25">>().to(equal<readonly ["-4", "-0"]>);
    expect<_DivRem<"-1", "0.75">>().to(equal<readonly ["-1", "-0.25"]>);
    expect<_DivRem<"-2", "3.14">>().to(equal<readonly ["-0", "-2"]>);
    expect<_DivRem<"-3", "2.718">>().to(equal<readonly ["-1", "-0.282"]>);
    expect<_DivRem<"-21", "2.718">>().to(equal<readonly ["-7", "-1.974"]>);
    expect<_DivRem<"-9949", "25.67">>().to(equal<readonly ["-387", "-14.71"]>);
  });

  it("should divide a positive float and a positive integer and return the correct quotient and remainder", () => {
    expect<_DivRem<"0.0025", "2">>().to(equal<readonly ["0", "0.0025"]>);
    expect<_DivRem<"0.07", "3">>().to(equal<readonly ["0", "0.07"]>);
    expect<_DivRem<"0.25", "2">>().to(equal<readonly ["0", "0.25"]>);
    expect<_DivRem<"0.75", "3">>().to(equal<readonly ["0", "0.75"]>);
    expect<_DivRem<"3.14", "2">>().to(equal<readonly ["1", "1.14"]>);
    expect<_DivRem<"2.718", "3">>().to(equal<readonly ["0", "2.718"]>);
    expect<_DivRem<"2.718", "29">>().to(equal<readonly ["0", "2.718"]>);
    expect<_DivRem<"4356.791", "832">>().to(equal<readonly ["5", "196.791"]>);
  });

  it("should divide a negative float and a negative integer and return the correct quotient and remainder", () => {
    expect<_DivRem<"-0.0025", "-2">>().to(equal<readonly ["0", "-0.0025"]>);
    expect<_DivRem<"-0.07", "-3">>().to(equal<readonly ["0", "-0.07"]>);
    expect<_DivRem<"-0.25", "-2">>().to(equal<readonly ["0", "-0.25"]>);
    expect<_DivRem<"-0.75", "-3">>().to(equal<readonly ["0", "-0.75"]>);
    expect<_DivRem<"-3.14", "-2">>().to(equal<readonly ["1", "-1.14"]>);
    expect<_DivRem<"-2.718", "-3">>().to(equal<readonly ["0", "-2.718"]>);
    expect<_DivRem<"-2.718", "-29">>().to(equal<readonly ["0", "-2.718"]>);
    expect<_DivRem<"-4356.791", "-832">>().to(equal<readonly ["5", "-196.791"]>);
  });

  it("should divide a positive float and a negative integer and return the correct quotient and remainder", () => {
    expect<_DivRem<"0.0025", "-2">>().to(equal<readonly ["-0", "0.0025"]>);
    expect<_DivRem<"0.07", "-3">>().to(equal<readonly ["-0", "0.07"]>);
    expect<_DivRem<"0.25", "-2">>().to(equal<readonly ["-0", "0.25"]>);
    expect<_DivRem<"0.75", "-3">>().to(equal<readonly ["-0", "0.75"]>);
    expect<_DivRem<"3.14", "-2">>().to(equal<readonly ["-1", "1.14"]>);
    expect<_DivRem<"2.718", "-3">>().to(equal<readonly ["-0", "2.718"]>);
    expect<_DivRem<"21.0", "-2">>().to(equal<readonly ["-10", "1"]>);
    expect<_DivRem<"4356.791", "-832">>().to(equal<readonly ["-5", "196.791"]>);
  });

  it("should divide a negative float and a positive integer and return the correct quotient and remainder", () => {
    expect<_DivRem<"-0.0025", "2">>().to(equal<readonly ["-0", "-0.0025"]>);
    expect<_DivRem<"-0.07", "3">>().to(equal<readonly ["-0", "-0.07"]>);
    expect<_DivRem<"-0.25", "2">>().to(equal<readonly ["-0", "-0.25"]>);
    expect<_DivRem<"-0.75", "3">>().to(equal<readonly ["-0", "-0.75"]>);
    expect<_DivRem<"-3.14", "2">>().to(equal<readonly ["-1", "-1.14"]>);
    expect<_DivRem<"-2.718", "3">>().to(equal<readonly ["-0", "-2.718"]>);
    expect<_DivRem<"-21.0", "2">>().to(equal<readonly ["-10", "-1"]>);
    expect<_DivRem<"-4356.791", "832">>().to(equal<readonly ["-5", "-196.791"]>);
  });

  it("should divide two positive floats and return the correct quotient and remainder", () => {
    expect<_DivRem<"0.0025", "0.25">>().to(equal<readonly ["0", "0.0025"]>);
    expect<_DivRem<"0.34", "0.0026">>().to(equal<readonly ["130", "0.002"]>);
    expect<_DivRem<"0.5", "0.25">>().to(equal<readonly ["2", "0"]>);
    expect<_DivRem<"3.14", "2.86">>().to(equal<readonly ["1", "0.28"]>);
    expect<_DivRem<"2.718", "3.599">>().to(equal<readonly ["0", "2.718"]>);
    expect<_DivRem<"129.07", "0.02718">>().to(equal<readonly ["4748", "0.01936"]>);
    expect<_DivRem<"4356.791", "832.329">>().to(equal<readonly ["5", "195.146"]>);
  });

  it("should divide two negative floats and return the correct quotient and remainder", () => {
    expect<_DivRem<"-0.0025", "-0.25">>().to(equal<readonly ["0", "-0.0025"]>);
    expect<_DivRem<"-0.34", "-0.0026">>().to(equal<readonly ["130", "-0.002"]>);
    expect<_DivRem<"-0.5", "-0.25">>().to(equal<readonly ["2", "-0"]>);
    expect<_DivRem<"-3.14", "-2.86">>().to(equal<readonly ["1", "-0.28"]>);
    expect<_DivRem<"-2.718", "-3.599">>().to(equal<readonly ["0", "-2.718"]>);
    expect<_DivRem<"-129.07", "-0.02718">>().to(equal<readonly ["4748", "-0.01936"]>);
    expect<_DivRem<"-4356.791", "-832.329">>().to(equal<readonly ["5", "-195.146"]>);
  });

  it("should divide a positive and a negative float and return the correct quotient and remainder", () => {
    expect<_DivRem<"0.0025", "-0.25">>().to(equal<readonly ["-0", "0.0025"]>);
    expect<_DivRem<"0.34", "-0.0026">>().to(equal<readonly ["-130", "0.002"]>);
    expect<_DivRem<"0.5", "-0.25">>().to(equal<readonly ["-2", "0"]>);
    expect<_DivRem<"3.14", "-2.86">>().to(equal<readonly ["-1", "0.28"]>);
    expect<_DivRem<"2.718", "-3.599">>().to(equal<readonly ["-0", "2.718"]>);
    expect<_DivRem<"129.07", "-0.02718">>().to(equal<readonly ["-4748", "0.01936"]>);
    expect<_DivRem<"4356.791", "-832.329">>().to(equal<readonly ["-5", "195.146"]>);
  });

  it("should divide a negative and a positive float and return the correct quotient and remainder", () => {
    expect<_DivRem<"-0.0025", "0.25">>().to(equal<readonly ["-0", "-0.0025"]>);
    expect<_DivRem<"-0.34", "0.0026">>().to(equal<readonly ["-130", "-0.002"]>);
    expect<_DivRem<"-0.5", "0.25">>().to(equal<readonly ["-2", "-0"]>);
    expect<_DivRem<"-3.14", "2.86">>().to(equal<readonly ["-1", "-0.28"]>);
    expect<_DivRem<"-2.718", "3.599">>().to(equal<readonly ["-0", "-2.718"]>);
    expect<_DivRem<"-129.07", "0.02718">>().to(equal<readonly ["-4748", "-0.01936"]>);
    expect<_DivRem<"-4356.791", "832.329">>().to(equal<readonly ["-5", "-195.146"]>);
  });
});
