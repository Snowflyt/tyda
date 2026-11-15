import type { RawArg0, TArg, TypeLambdaG } from "hkt-core";

import type { Right } from ".";

declare module "." {
  namespace Either {
    /**
     * Gets the underlying value of a {@linkcode Right}, or `never` if the option is {@linkcode Left}.
     *
     * Sig: `<A>(self: Either<unknown, A>) => A`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Either.Unwrap<Right<string>>; // => string
     * type _2 = Either.Unwrap<Left<number>>; // => never
     * type _3 = Either.Unwrap<Either<number, string>>; // => string
     * ```
     */
    export type Unwrap<Self extends Either<unknown, unknown>> = _Unwrap<Self>;

    /**
     * [Fn] Gets the underlying value of a {@linkcode Right}, or `never` if the option is {@linkcode Left}.
     *
     * Sig: `<A>(self: Either<unknown, A>) => A`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<Right<string>, Either.Unwrap$>; // => string
     * type _2 = Pipe<Left<number>, Either.Unwrap$>; // => never
     * type _3 = Pipe<Either<number, string>, Either.Unwrap$>; // => string
     * ```
     */
    export interface Unwrap$ extends TypeLambdaG<["A"]> {
      signature: (self: Either<unknown, TArg<this, "A">>) => TArg<this, "A">;
      return: _Unwrap<RawArg0<this>>;
    }
  }
}

type _Unwrap<Self> =
  0 extends 1 & Self ? any
  : Self extends Right<infer A> ? A
  : never;
