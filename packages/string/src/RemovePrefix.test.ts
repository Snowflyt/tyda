import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, Call2 } from "hkt-core";
import { beNever, describe, equal, error, expect, it } from "typroof";

import type { Str } from ".";

describe("Str.RemovePrefix", () => {
  it("should be of correct signature", () => {
    expect<Str.RemovePrefix$<"foo">>().to(beOfSig<(self: string) => string>);
    expect<Str.RemovePrefix$$>().to(beOfSig<(self: string, prefix: string) => string>);
  });

  it("should return a string with the prefix removed if it starts with the given prefix", () => {
    expect<Str.RemovePrefix<"hello world", "hello">>().to(equal<" world">);
    expect<Call1<Str.RemovePrefix$<"hello">, "hello world">>().to(equal<" world">);
    expect<Call2<Str.RemovePrefix$$, "hello world", "hello">>().to(equal<" world">);

    expect<Str.RemovePrefix<"typescript", "type">>().to(equal<"script">);
    expect<Call1<Str.RemovePrefix$<"type">, "typescript">>().to(equal<"script">);
    expect<Call2<Str.RemovePrefix$$, "typescript", "type">>().to(equal<"script">);
  });

  it("should return the original string for strings that do not start with the given prefix", () => {
    expect<Str.RemovePrefix<"hello world", "world">>().to(equal<"hello world">);
    expect<Call1<Str.RemovePrefix$<"world">, "hello world">>().to(equal<"hello world">);
    expect<Call2<Str.RemovePrefix$$, "hello world", "world">>().to(equal<"hello world">);

    expect<Str.RemovePrefix<"typescript", "script">>().to(equal<"typescript">);
    expect<Call1<Str.RemovePrefix$<"script">, "typescript">>().to(equal<"typescript">);
    expect<Call2<Str.RemovePrefix$$, "typescript", "script">>().to(equal<"typescript">);
  });

  it("should return the original string when the prefix is an empty string", () => {
    expect<Str.RemovePrefix<"hello", "">>().to(equal<"hello">);
    expect<Call1<Str.RemovePrefix$<"">, "hello">>().to(equal<"hello">);
    expect<Call2<Str.RemovePrefix$$, "hello", "">>().to(equal<"hello">);

    expect<Str.RemovePrefix<"", "">>().to(equal<"">);
    expect<Call1<Str.RemovePrefix$<"">, "">>().to(equal<"">);
    expect<Call2<Str.RemovePrefix$$, "", "">>().to(equal<"">);
  });

  it("should handle unions of `string`s", () => {
    expect<Str.RemovePrefix<"foo" | "bar", "f">>().to(equal<"oo" | "bar">);
    expect<Call1<Str.RemovePrefix$<"f">, "foo" | "bar">>().to(equal<"oo" | "bar">);
    expect<Call2<Str.RemovePrefix$$, "foo" | "bar", "f">>().to(equal<"oo" | "bar">);

    expect<Str.RemovePrefix<"hello" | "hi", "he">>().to(equal<"llo" | "hi">);
    expect<Call1<Str.RemovePrefix$<"he">, "hello" | "hi">>().to(equal<"llo" | "hi">);
    expect<Call2<Str.RemovePrefix$$, "hello" | "hi", "he">>().to(equal<"llo" | "hi">);

    expect<Str.RemovePrefix<"hello" | "hi", "h">>().to(equal<"ello" | "i">);
    expect<Call1<Str.RemovePrefix$<"h">, "hello" | "hi">>().to(equal<"ello" | "i">);
    expect<Call2<Str.RemovePrefix$$, "hello" | "hi", "h">>().to(equal<"ello" | "i">);

    expect<Str.RemovePrefix<"hello" | "hi", "x">>().to(equal<"hello" | "hi">);
    expect<Call1<Str.RemovePrefix$<"x">, "hello" | "hi">>().to(equal<"hello" | "hi">);
    expect<Call2<Str.RemovePrefix$$, "hello" | "hi", "x">>().to(equal<"hello" | "hi">);

    expect<Str.RemovePrefix<"foo" | "bar", "">>().to(equal<"foo" | "bar">);
    expect<Call1<Str.RemovePrefix$<"">, "foo" | "bar">>().to(equal<"foo" | "bar">);
    expect<Call2<Str.RemovePrefix$$, "foo" | "bar", "">>().to(equal<"foo" | "bar">);
  });

  it("should return `string` if either argument is `string`", () => {
    expect<Str.RemovePrefix<string, "foo">>().to(equal<string>);
    expect<Call1<Str.RemovePrefix$<"foo">, string>>().to(equal<string>);
    expect<Call2<Str.RemovePrefix$$, string, "foo">>().to(equal<string>);

    expect<Str.RemovePrefix<"bar", string>>().to(equal<string>);
    expect<Call1<Str.RemovePrefix$<string>, "bar">>().to(equal<string>);
    expect<Call2<Str.RemovePrefix$$, "bar", string>>().to(equal<string>);

    expect<Str.RemovePrefix<string, string>>().to(equal<string>);
    expect<Call1<Str.RemovePrefix$<string>, string>>().to(equal<string>);
    expect<Call2<Str.RemovePrefix$$, string, string>>().to(equal<string>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Str.RemovePrefix<never, "foo">>().to(beNever);
    expect<Call1<Str.RemovePrefix$<"foo">, never>>().to(beNever);
    expect<Call2<Str.RemovePrefix$$, never, "foo">>().to(beNever);

    expect<Str.RemovePrefix<"bar", never>>().to(beNever);
    expect<Call1<Str.RemovePrefix$<never>, "bar">>().to(beNever);
    expect<Call2<Str.RemovePrefix$$, "bar", never>>().to(beNever);

    expect<Str.RemovePrefix<never, never>>().to(beNever);
    expect<Call1<Str.RemovePrefix$<never>, never>>().to(beNever);
    expect<Call2<Str.RemovePrefix$$, never, never>>().to(beNever);
  });

  it("should return `string` if either argument is `any`", () => {
    expect<Str.RemovePrefix<any, "foo">>().to(equal<string>);
    expect<Call1<Str.RemovePrefix$<"foo">, any>>().to(equal<string>);
    expect<Call2<Str.RemovePrefix$$, any, "foo">>().to(equal<string>);

    expect<Str.RemovePrefix<"bar", any>>().to(equal<string>);
    expect<Call1<Str.RemovePrefix$<any>, "bar">>().to(equal<string>);
    expect<Call2<Str.RemovePrefix$$, "bar", any>>().to(equal<string>);

    expect<Str.RemovePrefix<any, any>>().to(equal<string>);
    expect<Call1<Str.RemovePrefix$<any>, any>>().to(equal<string>);
    expect<Call2<Str.RemovePrefix$$, any, any>>().to(equal<string>);
  });

  it("should accept only `string`s", () => {
    // @ts-expect-error
    expect<Str.RemovePrefix<"foo", number>>().to(error);
    // @ts-expect-error
    expect<Call1<Str.RemovePrefix$<number>, "foo">>().to(error);
    // @ts-expect-error
    expect<Call2<Str.RemovePrefix$$, "foo", number>>().to(error);

    // @ts-expect-error
    expect<Str.RemovePrefix<unknown, "bar">>().to(error);
    // @ts-expect-error
    expect<Call1<Str.RemovePrefix$<"bar">, unknown>>().to(error);
    // @ts-expect-error
    expect<Call2<Str.RemovePrefix$$, unknown, "bar">>().to(error);
  });
});
