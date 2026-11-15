import { describe, equal, expect, it } from "typroof";

import type { _MulFloat } from "./_MulFloat";

describe("_MulFloat", () => {
  it("should multiply two positive integers", () => {
    expect<_MulFloat<"0", "0">>().to(equal<"0">);
    expect<_MulFloat<"3", "3">>().to(equal<"9">);
    expect<_MulFloat<"2", "5">>().to(equal<"10">);
    expect<_MulFloat<"5", "2">>().to(equal<"10">);
  });

  it("should multiply two negative integers", () => {
    expect<_MulFloat<"-3", "-3">>().to(equal<"9">);
    expect<_MulFloat<"-2", "-5">>().to(equal<"10">);
    expect<_MulFloat<"-5", "-2">>().to(equal<"10">);
  });

  it("should multiply a positive and a negative integer", () => {
    expect<_MulFloat<"0", "-1">>().to(equal<"0">);
    expect<_MulFloat<"3", "-3">>().to(equal<"-9">);
    expect<_MulFloat<"2", "-5">>().to(equal<"-10">);
    expect<_MulFloat<"5", "-2">>().to(equal<"-10">);
  });

  it("should multiply a negative and a positive integer", () => {
    expect<_MulFloat<"-3", "3">>().to(equal<"-9">);
    expect<_MulFloat<"-2", "5">>().to(equal<"-10">);
    expect<_MulFloat<"-5", "2">>().to(equal<"-10">);
  });

  it("should multiply a positive integer and a positive float", () => {
    expect<_MulFloat<"0", "0.75">>().to(equal<"0">);
    expect<_MulFloat<"0", "3.14">>().to(equal<"0">);
    expect<_MulFloat<"3", "2.718">>().to(equal<"8.154">);
    expect<_MulFloat<"29", "2.718">>().to(equal<"78.822">);
  });

  it("should multiply a negative integer and a negative float", () => {
    expect<_MulFloat<"-1", "-0.25">>().to(equal<"0.25">);
    expect<_MulFloat<"-3", "-3.14">>().to(equal<"9.42">);
    expect<_MulFloat<"-3", "-2.718">>().to(equal<"8.154">);
    expect<_MulFloat<"-29", "-2.718">>().to(equal<"78.822">);
  });

  it("should multiply a positive integer and a negative float", () => {
    expect<_MulFloat<"1", "-0.25">>().to(equal<"-0.25">);
    expect<_MulFloat<"3", "-3.14">>().to(equal<"-9.42">);
    expect<_MulFloat<"3", "-2.718">>().to(equal<"-8.154">);
    expect<_MulFloat<"21", "-2.718">>().to(equal<"-57.078">);
  });

  it("should multiply a negative integer and a positive float", () => {
    expect<_MulFloat<"-1", "0.25">>().to(equal<"-0.25">);
    expect<_MulFloat<"-3", "3.14">>().to(equal<"-9.42">);
    expect<_MulFloat<"-3", "2.718">>().to(equal<"-8.154">);
    expect<_MulFloat<"-21", "2.718">>().to(equal<"-57.078">);
  });

  it("should multiply a positive float and a positive integer", () => {
    expect<_MulFloat<"0.75", "0">>().to(equal<"0">);
    expect<_MulFloat<"3.14", "0">>().to(equal<"0">);
    expect<_MulFloat<"2.718", "3">>().to(equal<"8.154">);
    expect<_MulFloat<"2.718", "29">>().to(equal<"78.822">);
  });

  it("should multiply a negative float and a negative integer", () => {
    expect<_MulFloat<"-0.25", "-1">>().to(equal<"0.25">);
    expect<_MulFloat<"-3.14", "-3">>().to(equal<"9.42">);
    expect<_MulFloat<"-2.718", "-3">>().to(equal<"8.154">);
    expect<_MulFloat<"-2.718", "-29">>().to(equal<"78.822">);
  });

  it("should multiply a positive float and a negative integer", () => {
    expect<_MulFloat<"0.25", "-1">>().to(equal<"-0.25">);
    expect<_MulFloat<"3.14", "-3">>().to(equal<"-9.42">);
    expect<_MulFloat<"2.718", "-3">>().to(equal<"-8.154">);
    expect<_MulFloat<"2.718", "-21">>().to(equal<"-57.078">);
  });

  it("should multiply a negative float and a positive integer", () => {
    expect<_MulFloat<"-0.25", "1">>().to(equal<"-0.25">);
    expect<_MulFloat<"-3.14", "3">>().to(equal<"-9.42">);
    expect<_MulFloat<"-2.718", "3">>().to(equal<"-8.154">);
    expect<_MulFloat<"-2.718", "21">>().to(equal<"-57.078">);
  });

  it("should multiply two positive floats", () => {
    expect<_MulFloat<"0.5", "0.25">>().to(equal<"0.125">);
    expect<_MulFloat<"3.14", "2.86">>().to(equal<"8.9804">);
    expect<_MulFloat<"2.718", "3.599">>().to(equal<"9.782082">);
    expect<_MulFloat<"4356.791", "832.329">>().to(equal<"3626283.496239">);
  });

  it("should multiply two negative floats", () => {
    expect<_MulFloat<"-0.5", "-0.25">>().to(equal<"0.125">);
    expect<_MulFloat<"-3.14", "-2.86">>().to(equal<"8.9804">);
    expect<_MulFloat<"-2.718", "-3.599">>().to(equal<"9.782082">);
    expect<_MulFloat<"-4356.791", "-832.329">>().to(equal<"3626283.496239">);
  });

  it("should multiply a positive and a negative float", () => {
    expect<_MulFloat<"0.5", "-0.25">>().to(equal<"-0.125">);
    expect<_MulFloat<"3.14", "-2.86">>().to(equal<"-8.9804">);
    expect<_MulFloat<"2.718", "-3.599">>().to(equal<"-9.782082">);
    expect<_MulFloat<"4356.791", "-832.329">>().to(equal<"-3626283.496239">);
  });

  it("should multiply a negative and a positive float", () => {
    expect<_MulFloat<"-0.5", "0.25">>().to(equal<"-0.125">);
    expect<_MulFloat<"-3.14", "2.86">>().to(equal<"-8.9804">);
    expect<_MulFloat<"-2.718", "3.599">>().to(equal<"-9.782082">);
    expect<_MulFloat<"-4356.791", "832.329">>().to(equal<"-3626283.496239">);
  });
});
