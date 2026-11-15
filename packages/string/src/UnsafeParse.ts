import type { Either } from "@tyda/core";
import type { FromStr } from "@tyda/typeclass";
import type { Call1W, RawArg0, TypeLambda } from "hkt-core";

declare module "." {
  namespace Str {
    /**
     * Parses the given string to a type that implements the {@linkcode FromStr} type class, returning `never` if the parsing fails.
     *
     * Sig: `<T extends FromStr>(T: T, self: string) => T`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Str.UnsafeParse<number, "42">; // => 42
     * type _2 = Str.UnsafeParse<number, "-3.14">; // => -3.14
     * type _3 = Str.UnsafeParse<boolean, "true">; // => true
     * type _4 = Str.UnsafeParse<number, "foo">; // => never
     * ```
     *
     * **Example** (Use union types to try all possible parsers)
     *
     * ```typescript
     * type _1 = Str.UnsafeParse<number | boolean, "42">; // => 42
     * type _2 = Str.UnsafeParse<number | boolean, "42" | "false">; // => 42 | false
     * type _3 = Str.UnsafeParse<number | boolean, "foo">; // => never
     * type _4 = Str.UnsafeParse<number | boolean, "42" | "foo">; // => 42
     * ```
     *
     * **Example** (Use `any` to try all types that implement `FromStr`)
     *
     * **Warning:** This can slow down type checking significantly depending on how many types implement `FromStr`.
     *
     * ```typescript
     * type _1 = Str.UnsafeParse<any, "42">; // => 42
     * type _2 = Str.UnsafeParse<any, "true">; // => true
     * type _3 = Str.UnsafeParse<any, "foo">; // => never
     * ```
     *
     * @see {@linkcode Str.Parse} for a safe version that returns an {@linkcode Either} type.
     */
    export type UnsafeParse<T extends FromStr, Self extends string> = Call1W<
      Either.Unwrap$,
      FromStr.FromStr<T, Self>
    >;

    /**
     * [Fn] Parses the given string to a type that implements the {@linkcode FromStr} type class, returning `never` if the parsing fails.
     *
     * Sig: `<T extends FromStr>[T: T](self: string) => T`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<"42", Str.UnsafeParse$<number>>; // => 42
     * type _2 = Pipe<"-3.14", Str.UnsafeParse$<number>>; // => -3.14
     * type _3 = Pipe<"true", Str.UnsafeParse$<boolean>>; // => true
     * type _4 = Pipe<"foo", Str.UnsafeParse$<number>>; // => never
     * ```
     *
     * **Example** (Use union types to try all possible parsers)
     *
     * ```typescript
     * type _1 = Pipe<"42", Str.UnsafeParse$<number | boolean>>; // => 42
     * type _2 = Pipe<"42" | "false", Str.UnsafeParse$<number | boolean>>; // => 42 | false
     * type _3 = Pipe<"foo", Str.UnsafeParse$<number | boolean>>; // => never
     * type _4 = Pipe<"42" | "foo", Str.UnsafeParse$<number | boolean>>; // => 42
     * ```
     *
     * **Example** (Use `any` to try all types that implement `FromStr`)
     *
     * **Warning:** This can slow down type checking significantly depending on how many types implement `FromStr`.
     *
     * ```typescript
     * type _1 = Pipe<"42", Str.UnsafeParse$<any>>; // => 42
     * type _2 = Pipe<"true", Str.UnsafeParse$<any>>; // => true
     * type _3 = Pipe<"foo", Str.UnsafeParse$<any>>; // => never
     * ```
     *
     * @see {@linkcode Str.Parse$} for a safe version that returns an {@linkcode Either} type.
     */
    export interface UnsafeParse$<T extends FromStr> extends TypeLambda<
      [self: string],
      0 extends 1 & T ? FromStr : T
    > {
      return: Call1W<Either.Unwrap$, Call1W<FromStr.FromStr$<T>, RawArg0<this>>>;
    }
  }
}
