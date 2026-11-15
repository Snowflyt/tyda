import type { RawArg0, TArg, TypeLambdaG } from "hkt-core";

import type { Some } from ".";

declare module "." {
  namespace Option {
    /**
     * Gets the underlying value of the provided {@linkcode Option} if it is a {@linkcode Some}, or `never` if it is {@linkcode None}.
     *
     * Sig: `<A>(self: Option<A>) => A`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Option.Unwrap<Some<42>>; // => 42
     * type _2 = Option.Unwrap<None>; // => never
     * type _3 = Option.Unwrap<Option<number>>; // => number
     * ```
     */
    export type Unwrap<Self extends Option<unknown>> = _Unwrap<Self>;

    /**
     * [Fn] Gets the underlying value of the provided {@linkcode Option} if it is a {@linkcode Some}, or `never` if it is {@linkcode None}.
     *
     * Sig: `<A>(self: Option<A>) => A`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<Some<42>, Option.Unwrap$>; // => 42
     * type _2 = Pipe<None, Option.Unwrap$>; // => never
     * type _3 = Pipe<Option<number>, Option.Unwrap$>; // => number
     * ```
     */
    export interface Unwrap$ extends TypeLambdaG<["A"]> {
      signature: (self: Option<TArg<this, "A">>) => TArg<this, "A">;
      return: _Unwrap<RawArg0<this>>;
    }
  }
}

type _Unwrap<Self> =
  0 extends 1 & Self ? any
  : Self extends Some<infer A> ? A
  : never;
