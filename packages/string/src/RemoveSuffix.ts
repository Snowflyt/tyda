import type { RawArg0, RawArg1, TypeLambda } from "hkt-core";

declare module "." {
  namespace Str {
    /**
     * Removes a suffix from the given string if it ends with that suffix, otherwise returns the original string.
     *
     * Sig: `(self: string, suffix: string) => string`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Str.RemoveSuffix<"hello world", "world">; // => "hello "
     * type _2 = Str.RemoveSuffix<"hello world", "hello">; // => "hello world"
     * type _3 = Str.RemoveSuffix<"typescript", "script">; // => "type"
     * type _4 = Str.RemoveSuffix<"typescript", "">; // => "typescript"
     * type _5 = Str.RemoveSuffix<"", "">; // => ""
     * ```
     */
    export type RemoveSuffix<Self extends string, Suffix extends string> = _RemoveSuffix<
      Self,
      Suffix
    >;

    /**
     * [Fn] Removes a suffix from the given string if it ends with that suffix, otherwise returns the original string.
     *
     * Sig: `[suffix: string](self: string) => string`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<"hello world", Str.RemoveSuffix$<"world">>; // => "hello "
     * type _2 = Pipe<"hello world", Str.RemoveSuffix$<"hello">>; // => "hello world"
     * type _3 = Pipe<"typescript", Str.RemoveSuffix$<"script">>; // => "type"
     * type _4 = Pipe<"typescript", Str.RemoveSuffix$<"">>; // => "typescript"
     * type _5 = Pipe<"", Str.RemoveSuffix$<"">>; // => ""
     * ```
     */
    export interface RemoveSuffix$<Suffix extends string> extends TypeLambda<
      [self: string],
      string
    > {
      return: _RemoveSuffix<RawArg0<this>, Suffix>;
    }

    /**
     * [Fn] Removes a suffix from a string if it ends with that suffix, otherwise returns the original string.
     *
     * Sig: `(self: string, suffix: string) => string`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Str.RemoveSuffix$$, "hello world", "world">; // => "hello "
     * type _2 = Call2<Str.RemoveSuffix$$, "hello world", "hello">; // => "hello world"
     * type _3 = Call2<Str.RemoveSuffix$$, "typescript", "script">; // => "type"
     * type _4 = Call2<Str.RemoveSuffix$$, "typescript", "">; // => "typescript"
     * type _5 = Call2<Str.RemoveSuffix$$, "", "">; // => ""
     * ```
     */
    export interface RemoveSuffix$$ extends TypeLambda<[self: string, suffix: string], string> {
      return: _RemoveSuffix<RawArg0<this>, RawArg1<this>>;
    }
  }
}

type _RemoveSuffix<Self, Suffix> =
  string extends Self ? string
  : string extends Suffix ? string
  : [Suffix] extends [never] ? never
  : Self extends `${infer Rest}${Suffix & string}` ? Rest
  : Self;
