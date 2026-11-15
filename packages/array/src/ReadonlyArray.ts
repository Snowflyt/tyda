import type { RawArg0, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Creates a readonly array containing the given value.
     *
     * Sig: `<A>(a: A) => readonly A[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.ReadonlyArray<number>; // => readonly number[]
     * type _2 = Arr.ReadonlyArray<42 | string>; // => readonly (42 | string)[]
     * ```
     */
    export type ReadonlyArray<A> = readonly A[];

    /**
     * [Fn] Creates a readonly array containing the given value.
     *
     * Sig: `<A>(a: A) => readonly A[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<number, Arr.ReadonlyArray$>; // => readonly number[]
     * type _2 = Pipe<42 | string, Arr.ReadonlyArray$>; // => readonly (42 | string)[]
     * ```
     */
    export interface ReadonlyArray$ extends TypeLambdaG<["A"]> {
      signature: (a: TArg<this, "A">) => readonly TArg<this, "A">[];
      return: readonly RawArg0<this>[];
    }
  }
}
