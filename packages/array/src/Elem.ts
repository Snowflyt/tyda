import type { Arg0, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Gets the element type of the given array.
     *
     * Sig: `<A>(self: readonly A[]) => A`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.Elem<readonly string[]>; // => string
     * type _2 = Arr.Elem<(number | boolean)[]>; // => number | boolean
     * type _3 = Arr.Elem<[]>; // => never
     * type _4 = Arr.Elem<[1, 2, 3]>; // => 1 | 2 | 3
     * ```
     */
    export type Elem<Self extends readonly unknown[]> = Self[number];

    /**
     * Gets the element type of the given array.
     *
     * Sig: `<A>(self: readonly A[]) => A`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<readonly string[], Arr.Elem$>; // => string
     * type _2 = Pipe<(number | boolean)[], Arr.Elem$>; // => number | boolean
     * type _3 = Pipe<[], Arr.Elem$>; // => never
     * type _4 = Pipe<[1, 2, 3], Arr.Elem$>; // => 1 | 2 | 3
     * ```
     */
    export interface Elem$ extends TypeLambdaG<["A"]> {
      signature: (self: readonly TArg<this, "A">[]) => TArg<this, "A">;
      return: Elem<Arg0<this>>;
    }
  }
}
