import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, Call2 } from "hkt-core";
import { beFalse, beNever, beTrue, describe, equal, error, expect, it } from "typroof";

import type { Str } from ".";

describe("Str.EndsWith", () => {
  it("should be of correct signature", () => {
    expect<Str.EndsWith$<"foo">>().to(beOfSig<(self: string) => boolean>);
    expect<Str.EndsWith$$>().to(beOfSig<(self: string, suffix: string) => boolean>);
  });

  it("should return `true` for strings that end with the given suffix", () => {
    expect<Str.EndsWith<"hello world", "world">>().to(beTrue);
    expect<Call1<Str.EndsWith$<"world">, "hello world">>().to(beTrue);
    expect<Call2<Str.EndsWith$$, "hello world", "world">>().to(beTrue);

    expect<Str.EndsWith<"typescript", "script">>().to(beTrue);
    expect<Call1<Str.EndsWith$<"script">, "typescript">>().to(beTrue);
    expect<Call2<Str.EndsWith$$, "typescript", "script">>().to(beTrue);
  });

  it("should return `false` for strings that do not end with the given suffix", () => {
    expect<Str.EndsWith<"hello world", "hello">>().to(beFalse);
    expect<Call1<Str.EndsWith$<"hello">, "hello world">>().to(beFalse);
    expect<Call2<Str.EndsWith$$, "hello world", "hello">>().to(beFalse);

    expect<Str.EndsWith<"typescript", "type">>().to(beFalse);
    expect<Call1<Str.EndsWith$<"type">, "typescript">>().to(beFalse);
    expect<Call2<Str.EndsWith$$, "typescript", "type">>().to(beFalse);
  });

  it("should return `true` when the suffix is an empty string", () => {
    expect<Str.EndsWith<"hello", "">>().to(beTrue);
    expect<Call1<Str.EndsWith$<"">, "hello">>().to(beTrue);
    expect<Call2<Str.EndsWith$$, "hello", "">>().to(beTrue);

    expect<Str.EndsWith<"", "">>().to(beTrue);
    expect<Call1<Str.EndsWith$<"">, "">>().to(beTrue);
    expect<Call2<Str.EndsWith$$, "", "">>().to(beTrue);
  });

  it("should handle unions of `string`s", () => {
    expect<Str.EndsWith<"foo" | "bar", "o">>().to(equal<boolean>);
    expect<Call1<Str.EndsWith$<"o">, "foo" | "bar">>().to(equal<boolean>);
    expect<Call2<Str.EndsWith$$, "foo" | "bar", "o">>().to(equal<boolean>);

    expect<Str.EndsWith<"hello" | "foo", "lo">>().to(equal<boolean>);
    expect<Call1<Str.EndsWith$<"lo">, "hello" | "foo">>().to(equal<boolean>);
    expect<Call2<Str.EndsWith$$, "hello" | "foo", "lo">>().to(equal<boolean>);

    expect<Str.EndsWith<"hello" | "foo", "o">>().to(beTrue);
    expect<Call1<Str.EndsWith$<"o">, "hello" | "foo">>().to(beTrue);
    expect<Call2<Str.EndsWith$$, "hello" | "foo", "o">>().to(beTrue);

    expect<Str.EndsWith<"hello" | "hi", "x">>().to(beFalse);
    expect<Call1<Str.EndsWith$<"x">, "hello" | "hi">>().to(beFalse);
    expect<Call2<Str.EndsWith$$, "hello" | "hi", "x">>().to(beFalse);

    expect<Str.EndsWith<"foo" | "bar", "">>().to(beTrue);
    expect<Call1<Str.EndsWith$<"">, "foo" | "bar">>().to(beTrue);
    expect<Call2<Str.EndsWith$$, "foo" | "bar", "">>().to(beTrue);
  });

  it("should return `boolean` if either argument is `string`", () => {
    expect<Str.EndsWith<string, "foo">>().to(equal<boolean>);
    expect<Call1<Str.EndsWith$<"foo">, string>>().to(equal<boolean>);
    expect<Call2<Str.EndsWith$$, string, "foo">>().to(equal<boolean>);

    expect<Str.EndsWith<"bar", string>>().to(equal<boolean>);
    expect<Call1<Str.EndsWith$<string>, "bar">>().to(equal<boolean>);
    expect<Call2<Str.EndsWith$$, "bar", string>>().to(equal<boolean>);

    expect<Str.EndsWith<string, string>>().to(equal<boolean>);
    expect<Call1<Str.EndsWith$<string>, string>>().to(equal<boolean>);
    expect<Call2<Str.EndsWith$$, string, string>>().to(equal<boolean>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Str.EndsWith<never, "foo">>().to(beNever);
    expect<Call1<Str.EndsWith$<"foo">, never>>().to(beNever);
    expect<Call2<Str.EndsWith$$, never, "foo">>().to(beNever);

    expect<Str.EndsWith<"bar", never>>().to(beNever);
    expect<Call1<Str.EndsWith$<never>, "bar">>().to(beNever);
    expect<Call2<Str.EndsWith$$, "bar", never>>().to(beNever);

    expect<Str.EndsWith<never, never>>().to(beNever);
    expect<Call1<Str.EndsWith$<never>, never>>().to(beNever);
    expect<Call2<Str.EndsWith$$, never, never>>().to(beNever);
  });

  it("should return `boolean` if either argument is `any`", () => {
    expect<Str.EndsWith<any, "foo">>().to(equal<boolean>);
    expect<Call1<Str.EndsWith$<"foo">, any>>().to(equal<boolean>);
    expect<Call2<Str.EndsWith$$, any, "foo">>().to(equal<boolean>);

    expect<Str.EndsWith<"bar", any>>().to(equal<boolean>);
    expect<Call1<Str.EndsWith$<any>, "bar">>().to(equal<boolean>);
    expect<Call2<Str.EndsWith$$, "bar", any>>().to(equal<boolean>);

    expect<Str.EndsWith<any, any>>().to(equal<boolean>);
    expect<Call1<Str.EndsWith$<any>, any>>().to(equal<boolean>);
    expect<Call2<Str.EndsWith$$, any, any>>().to(equal<boolean>);
  });

  it("should accept only `string`s", () => {
    // @ts-expect-error
    expect<Str.EndsWith<"foo", number>>().to(error);
    // @ts-expect-error
    expect<Call1<Str.EndsWith$<number>, "foo">>().to(error);
    // @ts-expect-error
    expect<Call2<Str.EndsWith$$, "foo", number>>().to(error);

    // @ts-expect-error
    expect<Str.EndsWith<unknown, "bar">>().to(error);
    // @ts-expect-error
    expect<Call1<Str.EndsWith$<"bar">, unknown>>().to(error);
    // @ts-expect-error
    expect<Call2<Str.EndsWith$$, unknown, "bar">>().to(error);
  });
});
