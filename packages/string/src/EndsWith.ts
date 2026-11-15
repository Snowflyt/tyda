import type { RawArg0, RawArg1, TypeLambda } from "hkt-core";

declare module "." {
  namespace Str {
    /**
     * Checks if the given string ends with the specified suffix.
     *
     * Sig: `(self: string, suffix: string) => boolean`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Str.EndsWith<"hello world", "world">; // => true
     * type _2 = Str.EndsWith<"hello world", "hello">; // => false
     * type _3 = Str.EndsWith<"typescript", "script">; // => true
     * type _4 = Str.EndsWith<"typescript", "">; // => true
     * type _5 = Str.EndsWith<"", "">; // => true
     * ```
     */
    export type EndsWith<Self extends string, Suffix extends string> = _EndsWith<Self, Suffix>;

    /**
     * [Fn] Checks if the given string ends with the specified suffix.
     *
     * Sig: `[suffix: string](self: string) => boolean`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<"hello world", Str.EndsWith$<"world">>; // => true
     * type _2 = Pipe<"hello world", Str.EndsWith$<"hello">>; // => false
     * type _3 = Pipe<"typescript", Str.EndsWith$<"script">>; // => true
     * type _4 = Pipe<"typescript", Str.EndsWith$<"">>; // => true
     * type _5 = Pipe<"", Str.EndsWith$<"">>; // => true
     * ```
     */
    export interface EndsWith$<Suffix extends string> extends TypeLambda<[self: string], boolean> {
      return: _EndsWith<RawArg0<this>, Suffix>;
    }

    /**
     * [Fn] Checks if the given string ends with the specified suffix.
     *
     * Sig: `(self: string, suffix: string) => boolean`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Str.EndsWith$$, "hello world", "world">; // => true
     * type _2 = Call2<Str.EndsWith$$, "hello world", "hello">; // => false
     * type _3 = Call2<Str.EndsWith$$, "typescript", "script">; // => true
     * type _4 = Call2<Str.EndsWith$$, "typescript", "">; // => true
     * type _5 = Call2<Str.EndsWith$$, "", "">; // => true
     * ```
     */
    export interface EndsWith$$ extends TypeLambda<[self: string, suffix: string], boolean> {
      return: _EndsWith<RawArg0<this>, RawArg1<this>>;
    }
  }
}

type _EndsWith<Self, Suffix> =
  string extends Self ? boolean
  : string extends Suffix ? boolean
  : [Suffix] extends [never] ? never
  : Self extends `${string}${Suffix & string}` ? true
  : false;
