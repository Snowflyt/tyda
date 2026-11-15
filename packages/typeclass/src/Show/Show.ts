import type { Call1W, RawArg0, TypeLambda } from "hkt-core";

import type { Show, ShowImpl } from ".";

declare module "." {
  namespace Show {
    export type { __Show as Show, Show$ };
  }
}

/**
 * Converts a type that implements the `Show` type class into its string representation.
 *
 * Sig: `(self: Show) => string`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Show.Show<42>; // => "42"
 * type _2 = Show.Show<Some<"foo">>; // => "Some<'foo'>"
 * type _3 = Show.Show<Option<Some<string | 42>> | "bar">; // => "Option<Some<string | 42>> | 'bar'"
 * ```
 */
type __Show<Self extends Show> = _Show<Self>;

/**
 * [Fn] Converts a type that implements the `Show` type class into its string representation.
 *
 * Sig: `(self: Show) => string`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Pipe<42, Show.Show$>; // => "42"
 * type _2 = Pipe<Some<"foo">, Show.Show$>; // => "Some<'foo'>"
 * type _3 = Pipe<Option<Some<string | 42>> | "bar", Show.Show$>; // => "Option<Some<string | 42>> | 'bar'"
 * ```
 */
interface Show$ extends TypeLambda<[self: Show], string> {
  return: _Show<RawArg0<this>>;
}

type _Show<Self> =
  0 extends 1n & Self ? "any"
  : [Self] extends [never] ? "never"
  : JoinUnion<
      {
        [K in keyof ShowImpl as [Extract<Self, ShowImpl[K][0]>] extends [never] ? never
        : K]: Call1W<ShowImpl[K][1]["Show$"], Extract<Self, ShowImpl[K][0]>> & string;
      }[keyof {
        [K in keyof ShowImpl as [Extract<Self, ShowImpl[K][0]>] extends [never] ? never : K]: never;
      }]
    >;

type JoinUnion<U extends string, Result extends string = ""> =
  [Exclude<U, LastInUnion<U>>] extends [never] ? `${Result}${LastInUnion<U>}`
  : JoinUnion<Exclude<U, LastInUnion<U>>, `${Result}${LastInUnion<U>} | `>;

type LastInUnion<U> =
  UnionToIntersection<U extends unknown ? (x: U) => void : never> extends (
    (x: infer L extends string) => void
  ) ?
    L
  : never;

export type UnionToIntersection<U> =
  (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
