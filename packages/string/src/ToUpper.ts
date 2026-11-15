import type { RawArg0, TypeLambda } from "hkt-core";

declare module "." {
  namespace Str {
    /**
     * Converts all characters in the given string to uppercase.
     *
     * Sig: `(self: string) => Uppercase<string>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Str.ToUpper<"hello world!">; // => "HELLO WORLD!"
     * type _2 = Str.ToUpper<"TypeScript">; // => "TYPESCRIPT"
     * type _3 = Str.ToUpper<"">; // => ""
     * ```
     */
    export type ToUpper<Self extends string> = Uppercase<Self>;

    /**
     * [Fn] Converts all characters in the given string to uppercase.
     *
     * Sig: `(self: string) => Uppercase<string>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<"hello world!", Str.ToUpper$>; // => "HELLO WORLD!"
     * type _2 = Pipe<"TypeScript", Str.ToUpper$>; // => "TYPESCRIPT"
     * type _3 = Pipe<"", Str.ToUpper$>; // => ""
     * ```
     */
    export interface ToUpper$ extends TypeLambda<[self: string], Uppercase<string>> {
      return: Uppercase<RawArg0<this> & string>;
    }
  }
}
