import { beOfSig } from "@tyda/typroof-plugin";
import type { Call1, Call2, TypeArgs } from "hkt-core";
import { beFalse, beNever, beTrue, describe, equal, error, expect, it } from "typroof";

import type { Str } from ".";

describe("Str.StartsWith", () => {
  it("should be of correct signature", () => {
    expect<Str.StartsWith$<"foo">>().to(beOfSig<<S extends string>(self: S) => boolean>);
    expect<Str.StartsWith$<"foo">["signature"]>().to(
      equal<(self: string) => self is `foo${string}`>,
    );
    expect<
      (Str.StartsWith$<"foo"> & TypeArgs<Str.StartsWith$<"foo">, [Lowercase<string>]>)["signature"]
    >().to(equal<(self: Lowercase<string>) => self is Lowercase<string> & `foo${string}`>);

    expect<Str.StartsWith$$>().to(
      beOfSig<<S extends string, Prefix extends string>(self: S, prefix: Prefix) => boolean>,
    );
    expect<
      (Str.StartsWith$$ & TypeArgs<Str.StartsWith$$, [Lowercase<string>, "bar"]>)["signature"]
    >().to(
      equal<(self: Lowercase<string>, prefix: "bar") => self is Lowercase<string> & `bar${string}`>,
    );
  });

  it("should return `true` for strings that start with the given prefix", () => {
    expect<Str.StartsWith<"hello world", "hello">>().to(beTrue);
    expect<Call1<Str.StartsWith$<"hello">, "hello world">>().to(beTrue);
    expect<Call2<Str.StartsWith$$, "hello world", "hello">>().to(beTrue);

    expect<Str.StartsWith<"typescript", "type">>().to(beTrue);
    expect<Call1<Str.StartsWith$<"type">, "typescript">>().to(beTrue);
    expect<Call2<Str.StartsWith$$, "typescript", "type">>().to(beTrue);
  });

  it("should return `false` for strings that do not start with the given prefix", () => {
    expect<Str.StartsWith<"hello world", "world">>().to(beFalse);
    expect<Call1<Str.StartsWith$<"world">, "hello world">>().to(beFalse);
    expect<Call2<Str.StartsWith$$, "hello world", "world">>().to(beFalse);

    expect<Str.StartsWith<"typescript", "script">>().to(beFalse);
    expect<Call1<Str.StartsWith$<"script">, "typescript">>().to(beFalse);
    expect<Call2<Str.StartsWith$$, "typescript", "script">>().to(beFalse);
  });

  it("should return `true` when the prefix is an empty string", () => {
    expect<Str.StartsWith<"hello", "">>().to(beTrue);
    expect<Call1<Str.StartsWith$<"">, "hello">>().to(beTrue);
    expect<Call2<Str.StartsWith$$, "hello", "">>().to(beTrue);

    expect<Str.StartsWith<"", "">>().to(beTrue);
    expect<Call1<Str.StartsWith$<"">, "">>().to(beTrue);
    expect<Call2<Str.StartsWith$$, "", "">>().to(beTrue);
  });

  it("should handle unions of `string`s", () => {
    expect<Str.StartsWith<"foo" | "bar", "f">>().to(equal<boolean>);
    expect<Call1<Str.StartsWith$<"f">, "foo" | "bar">>().to(equal<boolean>);
    expect<Call2<Str.StartsWith$$, "foo" | "bar", "f">>().to(equal<boolean>);

    expect<Str.StartsWith<"hello" | "hi", "he">>().to(equal<boolean>);
    expect<Call1<Str.StartsWith$<"he">, "hello" | "hi">>().to(equal<boolean>);
    expect<Call2<Str.StartsWith$$, "hello" | "hi", "he">>().to(equal<boolean>);

    expect<Str.StartsWith<"hello" | "hi", "h">>().to(beTrue);
    expect<Call1<Str.StartsWith$<"h">, "hello" | "hi">>().to(beTrue);
    expect<Call2<Str.StartsWith$$, "hello" | "hi", "h">>().to(beTrue);

    expect<Str.StartsWith<"hello" | "hi", "x">>().to(beFalse);
    expect<Call1<Str.StartsWith$<"x">, "hello" | "hi">>().to(beFalse);
    expect<Call2<Str.StartsWith$$, "hello" | "hi", "x">>().to(beFalse);

    expect<Str.StartsWith<"foo" | "bar", "">>().to(beTrue);
    expect<Call1<Str.StartsWith$<"">, "foo" | "bar">>().to(beTrue);
    expect<Call2<Str.StartsWith$$, "foo" | "bar", "">>().to(beTrue);
  });

  it("should return `boolean` if either argument is `string`", () => {
    expect<Str.StartsWith<string, "foo">>().to(equal<boolean>);
    expect<Call1<Str.StartsWith$<"foo">, string>>().to(equal<boolean>);
    expect<Call2<Str.StartsWith$$, string, "foo">>().to(equal<boolean>);

    expect<Str.StartsWith<"bar", string>>().to(equal<boolean>);
    expect<Call1<Str.StartsWith$<string>, "bar">>().to(equal<boolean>);
    expect<Call2<Str.StartsWith$$, "bar", string>>().to(equal<boolean>);

    expect<Str.StartsWith<string, string>>().to(equal<boolean>);
    expect<Call1<Str.StartsWith$<string>, string>>().to(equal<boolean>);
    expect<Call2<Str.StartsWith$$, string, string>>().to(equal<boolean>);
  });

  it("should return `never` if either argument is `never`", () => {
    expect<Str.StartsWith<never, "foo">>().to(beNever);
    expect<Call1<Str.StartsWith$<"foo">, never>>().to(beNever);
    expect<Call2<Str.StartsWith$$, never, "foo">>().to(beNever);

    expect<Str.StartsWith<"bar", never>>().to(beNever);
    expect<Call1<Str.StartsWith$<never>, "bar">>().to(beNever);
    expect<Call2<Str.StartsWith$$, "bar", never>>().to(beNever);

    expect<Str.StartsWith<never, never>>().to(beNever);
    expect<Call1<Str.StartsWith$<never>, never>>().to(beNever);
    expect<Call2<Str.StartsWith$$, never, never>>().to(beNever);
  });

  it("should return `boolean` if either argument is `any`", () => {
    expect<Str.StartsWith<any, "foo">>().to(equal<boolean>);
    expect<Call1<Str.StartsWith$<"foo">, any>>().to(equal<boolean>);
    expect<Call2<Str.StartsWith$$, any, "foo">>().to(equal<boolean>);

    expect<Str.StartsWith<"bar", any>>().to(equal<boolean>);
    expect<Call1<Str.StartsWith$<any>, "bar">>().to(equal<boolean>);
    expect<Call2<Str.StartsWith$$, "bar", any>>().to(equal<boolean>);

    expect<Str.StartsWith<any, any>>().to(equal<boolean>);
    expect<Call1<Str.StartsWith$<any>, any>>().to(equal<boolean>);
    expect<Call2<Str.StartsWith$$, any, any>>().to(equal<boolean>);
  });

  it("should accept only `string`s", () => {
    // @ts-expect-error
    expect<Str.StartsWith<"foo", number>>().to(error);
    // @ts-expect-error
    expect<Call1<Str.StartsWith$<number>, "foo">>().to(error);
    // @ts-expect-error
    expect<Call2<Str.StartsWith$$, "foo", number>>().to(error);

    // @ts-expect-error
    expect<Str.StartsWith<unknown, "bar">>().to(error);
    // @ts-expect-error
    expect<Call1<Str.StartsWith$<"bar">, unknown>>().to(error);
    // @ts-expect-error
    expect<Call2<Str.StartsWith$$, unknown, "bar">>().to(error);
  });
});
