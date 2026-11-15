import type { Arg0, TypeLambda } from "hkt-core";

import type { Some } from ".";

declare module "." {
  namespace Option {
    /**
     * Gets the value type of the given {@linkcode Option} type.
     *
     * Sig: `(self: Option<unknown>) => unknown`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Option.Value<Option<string>>; // => string
     * type _2 = Option.Value<Some<number>>; // => number
     * type _3 = Option.Value<None>; // => never
     * ```
     */
    export type Value<Self extends Option<unknown>> = _Value<Self>;

    /**
     * [Fn] Gets the value type of the given {@linkcode Option} type.
     *
     * Sig: `(self: Option<unknown>) => unknown`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<Option<string>, Option.Value$>; // => string
     * type _2 = Pipe<Some<number>, Option.Value$>; // => number
     * type _3 = Pipe<None, Option.Value$>; // => never
     * ```
     */
    export interface Value$ extends TypeLambda<[self: Option<unknown>], unknown> {
      return: Value<Arg0<this>>;
    }
  }
}

type _Value<Self> =
  0 extends 1 & Self ? any
  : Self extends unknown ?
    Self extends Some<infer A> ?
      A
    : never
  : never;
