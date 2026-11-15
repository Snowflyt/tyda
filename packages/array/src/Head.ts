import type { Arg0, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Gets the first element of the given non-empty tuple.
     *
     * Sig: `<A>(self: readonly [A, ...unknown[]]) => A`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.Head<[string, number, boolean]>; // => string
     * type _2 = Arr.Head<readonly [1, 2, 3]>; // => 1
     * type _3 = Arr.Head<["foo"]>; // => "foo"
     * ```
     *
     * @see {@linkcode Arr.Tail}
     * @see {@linkcode Arr.HeadOption}
     * @see {@linkcode Arr.UnsafeHead}
     */
    export type Head<Self extends readonly [unknown, ...unknown[]]> = Self[0];

    /**
     * Gets the first element of the given non-empty tuple.
     *
     * Sig: `<A>(self: readonly [A, ...unknown[]]) => A`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<[string, number, boolean], Arr.Head$>; // => string
     * type _2 = Pipe<readonly [1, 2, 3], Arr.Head$>; // => 1
     * type _3 = Pipe<["foo"], Arr.Head$>; // => "foo"
     * ```
     *
     * @see {@linkcode Arr.Tail$}
     * @see {@linkcode Arr.HeadOption$}
     * @see {@linkcode Arr.UnsafeHead$}
     */
    export interface Head$ extends TypeLambdaG<["A"]> {
      signature: (self: readonly [TArg<this, "A">, ...unknown[]]) => TArg<this, "A">;
      return: Head<Arg0<this>>;
    }
  }
}
