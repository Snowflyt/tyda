import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, Call2 } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Str } from ".";

describe("Str.RemoveSuffix", () => {
  it("should be of correct signature", () => {
    expect<Str.RemoveSuffix$<"foo">>().to(beOfSig<(self: string) => string>);
    expect<Str.RemoveSuffix$$>().to(beOfSig<(self: string, suffix: string) => string>);
  });

  it("should return a string with the suffix removed if it ends with the given suffix", () => {
    expect<Str.RemoveSuffix<"hello world", "world">>().to(equal<"hello ">);
    expect<Call1<Str.RemoveSuffix$<"world">, "hello world">>().to(equal<"hello ">);
    expect<Call2<Str.RemoveSuffix$$, "hello world", "world">>().to(equal<"hello ">);

    expect<Str.RemoveSuffix<"typescript", "script">>().to(equal<"type">);
    expect<Call1<Str.RemoveSuffix$<"script">, "typescript">>().to(equal<"type">);
    expect<Call2<Str.RemoveSuffix$$, "typescript", "script">>().to(equal<"type">);
  });

  it("should return the original string for strings that do not end with the given suffix", () => {
    expect<Str.RemoveSuffix<"hello world", "hello">>().to(equal<"hello world">);
    expect<Call1<Str.RemoveSuffix$<"hello">, "hello world">>().to(equal<"hello world">);
    expect<Call2<Str.RemoveSuffix$$, "hello world", "hello">>().to(equal<"hello world">);

    expect<Str.RemoveSuffix<"typescript", "type">>().to(equal<"typescript">);
    expect<Call1<Str.RemoveSuffix$<"type">, "typescript">>().to(equal<"typescript">);
    expect<Call2<Str.RemoveSuffix$$, "typescript", "type">>().to(equal<"typescript">);
  });

  it("should return the original string when the suffix is an empty string", () => {
    expect<Str.RemoveSuffix<"hello", "">>().to(equal<"hello">);
    expect<Call1<Str.RemoveSuffix$<"">, "hello">>().to(equal<"hello">);
    expect<Call2<Str.RemoveSuffix$$, "hello", "">>().to(equal<"hello">);

    expect<Str.RemoveSuffix<"", "">>().to(equal<"">);
    expect<Call1<Str.RemoveSuffix$<"">, "">>().to(equal<"">);
    expect<Call2<Str.RemoveSuffix$$, "", "">>().to(equal<"">);
  });

  it("should handle unions of `string`s", () => {
    expect<Str.RemoveSuffix<"foo" | "bar", "o">>().to(equal<"fo" | "bar">);
    expect<Call1<Str.RemoveSuffix$<"o">, "foo" | "bar">>().to(equal<"fo" | "bar">);
    expect<Call2<Str.RemoveSuffix$$, "foo" | "bar", "o">>().to(equal<"fo" | "bar">);

    expect<Str.RemoveSuffix<"hello" | "foo", "lo">>().to(equal<"hel" | "foo">);
    expect<Call1<Str.RemoveSuffix$<"lo">, "hello" | "foo">>().to(equal<"hel" | "foo">);
    expect<Call2<Str.RemoveSuffix$$, "hello" | "foo", "lo">>().to(equal<"hel" | "foo">);

    expect<Str.RemoveSuffix<"hello" | "foo", "o">>().to(equal<"hell" | "fo">);
    expect<Call1<Str.RemoveSuffix$<"o">, "hello" | "foo">>().to(equal<"hell" | "fo">);
    expect<Call2<Str.RemoveSuffix$$, "hello" | "foo", "o">>().to(equal<"hell" | "fo">);

    expect<Str.RemoveSuffix<"hello" | "hi", "x">>().to(equal<"hello" | "hi">);
    expect<Call1<Str.RemoveSuffix$<"x">, "hello" | "hi">>().to(equal<"hello" | "hi">);
    expect<Call2<Str.RemoveSuffix$$, "hello" | "hi", "x">>().to(equal<"hello" | "hi">);

    expect<Str.RemoveSuffix<"foo" | "bar", "">>().to(equal<"foo" | "bar">);
    expect<Call1<Str.RemoveSuffix$<"">, "foo" | "bar">>().to(equal<"foo" | "bar">);
    expect<Call2<Str.RemoveSuffix$$, "foo" | "bar", "">>().to(equal<"foo" | "bar">);
  });

  it("should return `string` if either argument is `string`", () => {
    expect<Str.RemoveSuffix<string, "foo">>().to(equal<string>);
    expect<Call1<Str.RemoveSuffix$<"foo">, string>>().to(equal<string>);
    expect<Call2<Str.RemoveSuffix$$, string, "foo">>().to(equal<string>);

    expect<Str.RemoveSuffix<"bar", string>>().to(equal<string>);
    expect<Call1<Str.RemoveSuffix$<string>, "bar">>().to(equal<string>);
    expect<Call2<Str.RemoveSuffix$$, "bar", string>>().to(equal<string>);

    expect<Str.RemoveSuffix<string, string>>().to(equal<string>);
    expect<Call1<Str.RemoveSuffix$<string>, string>>().to(equal<string>);
    expect<Call2<Str.RemoveSuffix$$, string, string>>().to(equal<string>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Str.RemoveSuffix<never, "foo">>().to(beNever);
    expect<Call1<Str.RemoveSuffix$<"foo">, never>>().to(beNever);
    expect<Call2<Str.RemoveSuffix$$, never, "foo">>().to(beNever);

    expect<Str.RemoveSuffix<"bar", never>>().to(beNever);
    expect<Call1<Str.RemoveSuffix$<never>, "bar">>().to(beNever);
    expect<Call2<Str.RemoveSuffix$$, "bar", never>>().to(beNever);

    expect<Str.RemoveSuffix<never, never>>().to(beNever);
    expect<Call1<Str.RemoveSuffix$<never>, never>>().to(beNever);
    expect<Call2<Str.RemoveSuffix$$, never, never>>().to(beNever);
  });

  it("should return `string` if either argument is `any`", () => {
    expect<Str.RemoveSuffix<any, "foo">>().to(equal<string>);
    expect<Call1<Str.RemoveSuffix$<"foo">, any>>().to(equal<string>);
    expect<Call2<Str.RemoveSuffix$$, any, "foo">>().to(equal<string>);

    expect<Str.RemoveSuffix<"bar", any>>().to(equal<string>);
    expect<Call1<Str.RemoveSuffix$<any>, "bar">>().to(equal<string>);
    expect<Call2<Str.RemoveSuffix$$, "bar", any>>().to(equal<string>);

    expect<Str.RemoveSuffix<any, any>>().to(equal<string>);
    expect<Call1<Str.RemoveSuffix$<any>, any>>().to(equal<string>);
    expect<Call2<Str.RemoveSuffix$$, any, any>>().to(equal<string>);
  });

  it("should accept only `string`s", () => {
    // @ts-expect-error
    expect<Str.RemoveSuffix<"foo", number>>().to(error);
    // @ts-expect-error
    expect<Call1<Str.RemoveSuffix$<number>, "foo">>().to(error);
    // @ts-expect-error
    expect<Call2<Str.RemoveSuffix$$, "foo", number>>().to(error);

    // @ts-expect-error
    expect<Str.RemoveSuffix<unknown, "bar">>().to(error);
    // @ts-expect-error
    expect<Call1<Str.RemoveSuffix$<"bar">, unknown>>().to(error);
    // @ts-expect-error
    expect<Call2<Str.RemoveSuffix$$, unknown, "bar">>().to(error);
  });
});
