import type { RawArg0, RawArg1, TypeLambda } from "hkt-core";

declare module "." {
  namespace Str {
    /**
     * Removes a prefix from the given string if it starts with that prefix, otherwise returns the original string.
     *
     * Sig: `(self: string, prefix: string) => string`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Str.RemovePrefix<"hello world", "hello">; // => " world"
     * type _2 = Str.RemovePrefix<"hello world", "world">; // => "hello world"
     * type _3 = Str.RemovePrefix<"typescript", "type">; // => "script"
     * type _4 = Str.RemovePrefix<"typescript", "">; // => "typescript"
     * type _5 = Str.RemovePrefix<"", "">; // => ""
     * ```
     */
    export type RemovePrefix<Self extends string, Prefix extends string> = _RemovePrefix<
      Self,
      Prefix
    >;

    /**
     * [Fn] Removes a prefix from the given string if it starts with that prefix, otherwise returns the original string.
     *
     * Sig: `[prefix: string](self: string) => string`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<"hello world", Str.RemovePrefix$<"hello">>; // => " world"
     * type _2 = Pipe<"hello world", Str.RemovePrefix$<"world">>; // => "hello world"
     * type _3 = Pipe<"typescript", Str.RemovePrefix$<"type">>; // => "script"
     * type _4 = Pipe<"typescript", Str.RemovePrefix$<"">>; // => "typescript"
     * type _5 = Pipe<"", Str.RemovePrefix$<"">>; // => ""
     * ```
     */
    export interface RemovePrefix$<Prefix extends string> extends TypeLambda<
      [self: string],
      string
    > {
      return: _RemovePrefix<RawArg0<this>, Prefix>;
    }

    /**
     * [Fn] Removes a prefix from a string if it starts with that prefix, otherwise returns the original string.
     *
     * Sig: `(self: string, prefix: string) => string`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Str.RemovePrefix$$, "hello world", "hello">; // => " world"
     * type _2 = Call2<Str.RemovePrefix$$, "hello world", "world">; // => "hello world"
     * type _3 = Call2<Str.RemovePrefix$$, "typescript", "type">; // => "script"
     * type _4 = Call2<Str.RemovePrefix$$, "typescript", "">; // => "typescript"
     * type _5 = Call2<Str.RemovePrefix$$, "", "">; // => ""
     * ```
     */
    export interface RemovePrefix$$ extends TypeLambda<[self: string, prefix: string], string> {
      return: _RemovePrefix<RawArg0<this>, RawArg1<this>>;
    }
  }
}

type _RemovePrefix<Self, Prefix> =
  string extends Self ? string
  : string extends Prefix ? string
  : [Prefix] extends [never] ? never
  : Self extends `${Prefix & string}${infer Rest}` ? Rest
  : Self;
