import type { FromStr } from "@tyda/typeclass";
import type { Call1W, RawArg0, RetType, TypeLambda } from "hkt-core";

declare module "." {
  namespace Str {
    /**
     * Parses the given string to a type that implements the {@linkcode FromStr} type class.
     *
     * Sig: `<T extends FromStr>(T: T, self: string) => Either<unknown, T>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Str.Parse<number, "42">; // => Right<42>
     * type _2 = Str.Parse<number, "-3.14">; // => Right<-3.14>
     * type _3 = Str.Parse<boolean, "true">; // => Right<true>
     * type _4 = Str.Parse<number, "foo">; // => Left<"Cannot convert 'foo' to number">
     * ```
     *
     * **Example** (Use union types to try all possible parsers)
     *
     * ```typescript
     * type _1 = Str.Parse<number | boolean, "42">; // => Right<42>
     * type _2 = Str.Parse<number | boolean, "42" | "false">; // => Right<42> | Right<false>
     * type _3 = Str.Parse<number | boolean, "foo">; // => Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">
     * type _4 = Str.Parse<number | boolean, "42" | "foo">; // => Right<42> | Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">
     * ```
     *
     * **Example** (Use `any` to try all types that implement `FromStr`)
     *
     * **Warning:** This can slow down type checking significantly depending on how many types implement `FromStr`.
     *
     * ```typescript
     * type _1 = Str.Parse<any, "42">; // => Right<42>
     * type _2 = Str.Parse<any, "true">; // => Right<true>
     * type _3 = Str.Parse<any, "foo">; // => Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean"> | ...
     * ```
     *
     * @see {@linkcode Str.UnsafeParse} for an unsafe version that returns `never` on failure.
     */
    export type Parse<T extends FromStr, Self extends string> = FromStr.FromStr<T, Self>;

    /**
     * [Fn] Parses the given string to a type that implements the {@linkcode FromStr} type class.
     *
     * Sig: `<T extends FromStr>[T: T](self: string) => Either<unknown, T>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<"42", Str.Parse$<number>>; // => Right<42>
     * type _2 = Pipe<"-3.14", Str.Parse$<number>>; // => Right<-3.14>
     * type _3 = Pipe<"true", Str.Parse$<boolean>>; // => Right<true>
     * type _4 = Pipe<"foo", Str.Parse$<number>>; // => Left<"Cannot convert 'foo' to number">
     * ```
     *
     * **Example** (Use union types to try all possible parsers)
     *
     * ```typescript
     * type _1 = Pipe<"42", Str.Parse$<number | boolean>>; // => Right<42>
     * type _2 = Pipe<"42" | "false", Str.Parse$<number | boolean>>; // => Right<42> | Right<false>
     * type _3 = Pipe<"foo", Str.Parse$<number | boolean>>; // => Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">
     * type _4 = Pipe<"42" | "foo", Str.Parse$<number | boolean>>; // => Right<42> | Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean">
     * ```
     *
     * **Example** (Use `any` to try all types that implement `FromStr`)
     *
     * **Warning:** This can slow down type checking significantly depending on how many types implement `FromStr`.
     *
     * ```typescript
     * type _1 = Pipe<"42", Str.Parse$<any>>; // => Right<42>
     * type _2 = Pipe<"true", Str.Parse$<any>>; // => Right<true>
     * type _3 = Pipe<"foo", Str.Parse$<any>>; // => Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean"> | ...
     * ```
     *
     * @see {@linkcode Str.UnsafeParse$} for an unsafe version that returns `never` on failure.
     */
    export interface Parse$<T extends FromStr> extends TypeLambda<
      [self: string],
      RetType<FromStr.FromStr$<T>>
    > {
      return: Call1W<FromStr.FromStr$<T>, RawArg0<this>>;
    }
  }
}
