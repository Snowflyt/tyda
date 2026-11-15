import type { Call0W, RawArg0, RetType, TArg, TypeLambda0, TypeLambdaG } from "hkt-core";

import type { Some } from ".";

declare module "." {
  export namespace Option {
    /**
     * Gets the underlying value of a {@linkcode Some}, or the result of calling the provided type-level function if the option is {@linkcode None}.
     *
     * Sig: `<A, B>(self: Option<A>, f: () => B) => A | B`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Option.UnwrapOrElse<Some<string>, Always<number>>; // => string
     * type _2 = Option.UnwrapOrElse<None, Always<number>>; // => number
     * type _3 = Option.UnwrapOrElse<Option<boolean>, Always<string>>; // => boolean | string
     * ```
     */
    export type UnwrapOrElse<
      Self extends Option<unknown>,
      F extends TypeLambda0<unknown>,
    > = _UnwrapOrElse<Self, F>;

    /**
     * [Fn] Gets the underlying value of a {@linkcode Some}, or the result of calling the provided type-level function if the option is {@linkcode None}.
     *
     * Sig: `<A, B>(self: Option<A>, f: () => B) => A | B`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<Some<string>, Option.UnwrapOrElse$<Always<number>>>; // => string
     * type _2 = Pipe<None, Option.UnwrapOrElse$<Always<number>>>; // => number
     * type _3 = Pipe<Option<boolean>, Option.UnwrapOrElse$<Always<string>>>; // => boolean | string
     * ```
     */
    export interface UnwrapOrElse$<F extends TypeLambda0<unknown>> extends TypeLambdaG<["A"]> {
      signature: (self: Option<TArg<this, "A">>) => TArg<this, "A"> | RetType<F>;
      return: _UnwrapOrElse<RawArg0<this>, F>;
    }
  }
}

type _UnwrapOrElse<Self, F> =
  0 extends 1 & Self ? any
  : Self extends Some<infer A> ? A
  : Call0W<F>;
