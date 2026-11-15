import { describe, equal, expect, it } from "typroof";

import type { _Div10Pow } from "./_Div10Pow";

describe("_Div10Pow", () => {
  it("should divide an integer by 10 raised to the power of `Pow`", () => {
    expect<_Div10Pow<"0", "">>().to(equal<"0">);
    expect<_Div10Pow<"0", "x">>().to(equal<"0">);
    expect<_Div10Pow<"0", "xx">>().to(equal<"0">);
    expect<_Div10Pow<"0", "xxx">>().to(equal<"0">);
    expect<_Div10Pow<"7", "">>().to(equal<"7">);
    expect<_Div10Pow<"7", "x">>().to(equal<"0.7">);
    expect<_Div10Pow<"7", "xx">>().to(equal<"0.07">);
    expect<_Div10Pow<"7", "xxx">>().to(equal<"0.007">);
    expect<_Div10Pow<"1000", "">>().to(equal<"1000">);
    expect<_Div10Pow<"1000", "x">>().to(equal<"100">);
    expect<_Div10Pow<"1000", "xx">>().to(equal<"10">);
    expect<_Div10Pow<"1000", "xxx">>().to(equal<"1">);
    expect<_Div10Pow<"1000", "xxxx">>().to(equal<"0.1">);
    expect<_Div10Pow<"1000", "xxxxx">>().to(equal<"0.01">);
    expect<_Div10Pow<"114514", "">>().to(equal<"114514">);
    expect<_Div10Pow<"114514", "x">>().to(equal<"11451.4">);
    expect<_Div10Pow<"114514", "xx">>().to(equal<"1145.14">);
    expect<_Div10Pow<"114514", "xxx">>().to(equal<"114.514">);
    expect<_Div10Pow<"114514", "xxxx">>().to(equal<"11.4514">);
    expect<_Div10Pow<"114514", "xxxxx">>().to(equal<"1.14514">);
    expect<_Div10Pow<"114514", "xxxxxx">>().to(equal<"0.114514">);
    expect<_Div10Pow<"114514", "xxxxxxx">>().to(equal<"0.0114514">);
    expect<_Div10Pow<"114514", "xxxxxxxx">>().to(equal<"0.00114514">);
    expect<_Div10Pow<"-500", "">>().to(equal<"-500">);
    expect<_Div10Pow<"-500", "x">>().to(equal<"-50">);
    expect<_Div10Pow<"-500", "xx">>().to(equal<"-5">);
    expect<_Div10Pow<"-500", "xxx">>().to(equal<"-0.5">);
    expect<_Div10Pow<"-500", "xxxx">>().to(equal<"-0.05">);
    expect<_Div10Pow<"-500", "xxxxx">>().to(equal<"-0.005">);
    expect<_Div10Pow<"-1230", "">>().to(equal<"-1230">);
    expect<_Div10Pow<"-1230", "x">>().to(equal<"-123">);
    expect<_Div10Pow<"-1230", "xx">>().to(equal<"-12.3">);
    expect<_Div10Pow<"-1230", "xxx">>().to(equal<"-1.23">);
    expect<_Div10Pow<"-1230", "xxxx">>().to(equal<"-0.123">);
    expect<_Div10Pow<"-1230", "xxxxx">>().to(equal<"-0.0123">);
    expect<_Div10Pow<"-1234", "">>().to(equal<"-1234">);
    expect<_Div10Pow<"-1234", "x">>().to(equal<"-123.4">);
    expect<_Div10Pow<"-1234", "xx">>().to(equal<"-12.34">);
    expect<_Div10Pow<"-1234", "xxx">>().to(equal<"-1.234">);
    expect<_Div10Pow<"-1234", "xxxx">>().to(equal<"-0.1234">);
    expect<_Div10Pow<"-1234", "xxxxx">>().to(equal<"-0.01234">);
  });
});
