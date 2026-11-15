import type { Either, Right } from "@tyda/core";
import type { Call1W, RawArg0, RetType, TypeLambda } from "hkt-core";

import type { FromStr, FromStrImpl } from ".";

declare module "." {
  namespace FromStr {
    export { __FromStr as FromStr, _FromStr$ as FromStr$ };
  }
}

/**
 * Converts the given string to a type that implements the `FromStr` type class.
 *
 * Sig: `<T extends FromStr>(T: T, s: string) => T`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = FromStr.FromStr<number, "42">; // => Right<42>
 * type _2 = FromStr.FromStr<number, "-3.14">; // => Right<-3.14>
 * type _3 = FromStr.FromStr<boolean, "true">; // => Right<true>
 * type _4 = FromStr.FromStr<number, "foo">; // => Left<"Cannot convert 'foo' to number">
 * ```
 *
 * **Example** (Use `any` to try all types that implement `FromStr`)
 *
 * **Warning:** This can slow down type checking significantly depending on how many types implement `FromStr`.
 *
 * ```typescript
 * type _1 = FromStr.FromStr<any, "42">; // => Right<42>
 * type _2 = FromStr.FromStr<any, "true">; // => Right<true>
 * type _3 = FromStr.FromStr<any, "foo">; // => Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean"> | ...
 * ```
 */
type __FromStr<T extends FromStr, S extends string> =
  [T] extends [never] ? never
  : {
    [K in keyof FromStrImpl as [Extract<T, FromStrImpl[K][0]>] extends [never] ? never
    : K]: FromStrImpl[K][1];
  }[keyof {
    [K in keyof FromStrImpl as [Extract<T, FromStrImpl[K][0]>] extends [never] ? never : K]: never;
  }] extends infer Instance extends FromStrImpl[keyof FromStrImpl][1] ?
    _FromStr<Instance, S>
  : never;

/**
 * [Fn] Converts the given string to a type that implements the `FromStr` type class.
 *
 * Sig: `<T extends FromStr>[T: T](s: string) => T`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Pipe<"42", FromStr.FromStr$<number>>; // => Right<42>
 * type _2 = Pipe<"-3.14", FromStr.FromStr$<number>>; // => Right<-3.14>
 * type _3 = Pipe<"true", FromStr.FromStr$<boolean>>; // => Right<true>
 * type _4 = Pipe<"foo", FromStr.FromStr$<number>>; // => Left<"Cannot convert 'foo' to number">
 * ```
 *
 * **Example** (Use `any` to try all types that implement `FromStr`)
 *
 * **Warning:** This can slow down type checking significantly depending on how many types implement `FromStr`.
 *
 * ```typescript
 * type _1 = Pipe<"42", FromStr.FromStr$<any>>; // => Right<42>
 * type _2 = Pipe<"true", FromStr.FromStr$<any>>; // => Right<true>
 * type _3 = Pipe<"foo", FromStr.FromStr$<any>>; // => Left<"Cannot convert 'foo' to number"> | Left<"Cannot convert 'foo' to boolean"> | ...
 * ```
 */
type _FromStr$<T extends FromStr> =
  {
    [K in keyof FromStrImpl as [Extract<T, FromStrImpl[K][0]>] extends [never] ? never
    : K]: FromStrImpl[K][1];
  }[keyof {
    [K in keyof FromStrImpl as [Extract<T, FromStrImpl[K][0]>] extends [never] ? never : K]: never;
  }] extends infer Instance extends FromStrImpl[keyof FromStrImpl][1] ?
    FromStr$<Instance>
  : never;

interface FromStr$<Instance extends FromStrImpl[keyof FromStrImpl][1]> extends TypeLambda<
  [s: string],
  RetType<Instance["FromStr$"]>
> {
  return: _FromStr<Instance, RawArg0<this>>;
}

type _FromStr<Instance extends FromStrImpl[keyof FromStrImpl][1], S> =
  [Instance] extends [never] ? never
  : [S] extends [never] ? never
  : 0 extends 1 & S ? RetType<Instance["FromStr$"]>
  : string extends S ? RetType<Instance["FromStr$"]>
  : S extends string ?
    Right<never> extends (
      S extends "any" ? Right<any>
      : Instance extends FromStrImpl[keyof FromStrImpl][1] ? Call1W<Instance["FromStr$"], S>
      : never
    ) ?
      Right<
        S extends "any" ? any
        : Instance extends FromStrImpl[keyof FromStrImpl][1] ?
          Call1W<Either.Unwrap$, Call1W<Instance["FromStr$"], S>>
        : never
      >
    : S extends "any" ? Right<any>
    : Instance extends FromStrImpl[keyof FromStrImpl][1] ? Call1W<Instance["FromStr$"], S>
    : never
  : never;
