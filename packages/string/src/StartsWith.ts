import type { RawArg0, RawArg1, RawTArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Str {
    /**
     * Checks if the given string starts with the specified prefix.
     *
     * Sig: ``<S extends string, Prefix extends string>(self: S, prefix: Prefix) => self is S & `${Prefix}${string}` ``
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Str.StartsWith<"hello world", "hello">; // => true
     * type _2 = Str.StartsWith<"hello world", "world">; // => false
     * type _3 = Str.StartsWith<"typescript", "type">; // => true
     * type _4 = Str.StartsWith<"typescript", "">; // => true
     * type _5 = Str.StartsWith<"", "">; // => true
     * ```
     */
    export type StartsWith<Self extends string, Prefix extends string> = _StartsWith<Self, Prefix>;

    /**
     * [Fn] Checks if the given string starts with the specified prefix.
     *
     * Sig: ``<S extends string, Prefix extends string>[prefix: Prefix](self: S) => self is S & `${Prefix}${string}` ``
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<"hello world", Str.StartsWith$<"hello">>; // => true
     * type _2 = Pipe<"hello world", Str.StartsWith$<"world">>; // => false
     * type _3 = Pipe<"typescript", Str.StartsWith$<"type">>; // => true
     * type _4 = Pipe<"typescript", Str.StartsWith$<"">>; // => true
     * type _5 = Pipe<"", Str.StartsWith$<"">>; // => true
     * ```
     */
    export interface StartsWith$<Prefix extends string> extends TypeLambdaG<[["S", string]]> {
      signature: (self: RawTArg<this, "S">) => self is RawTArg<this, "S"> & `${Prefix}${string}`;
      return: _StartsWith<RawArg0<this>, Prefix>;
    }

    /**
     * [Fn] Checks if the given string starts with the specified prefix.
     *
     * Sig: ``<S extends string, Prefix extends string>(self: S, prefix: Prefix) => self is S & `${Prefix}${string}` ``
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Str.StartsWith$$, "hello world", "hello">; // => true
     * type _2 = Call2<Str.StartsWith$$, "hello world", "world">; // => false
     * type _3 = Call2<Str.StartsWith$$, "typescript", "type">; // => true
     * type _4 = Call2<Str.StartsWith$$, "typescript", "">; // => true
     * type _5 = Call2<Str.StartsWith$$, "", "">; // => true
     * ```
     */
    export interface StartsWith$$ extends TypeLambdaG<[["S", string], ["Prefix", string]]> {
      signature: (
        self: RawTArg<this, "S">,
        prefix: RawTArg<this, "Prefix">,
      ) => self is RawTArg<this, "S"> & `${RawTArg<this, "Prefix">}${string}`;
      return: _StartsWith<RawArg0<this>, RawArg1<this>>;
    }
  }
}

type _StartsWith<Self, Prefix> =
  string extends Self ? boolean
  : string extends Prefix ? boolean
  : [Prefix] extends [never] ? never
  : Self extends `${Prefix & string}${string}` ? true
  : false;
