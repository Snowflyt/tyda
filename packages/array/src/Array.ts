import type { RawArg0, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Creates a writable array containing the given value.
     *
     * Sig: `<A>(a: A) => A[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.Array<number>; // => number[]
     * type _2 = Arr.Array<42 | string>; // => (42 | string)[]
     * ```
     */
    export type Array<A> = A[];

    /**
     * [Fn] Creates a writable array containing the given value.
     *
     * Sig: `<A>(a: A) => A[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<number, Arr.Array$>; // => number[]
     * type _2 = Pipe<42 | string, Arr.Array$>; // => (42 | string)[]
     * ```
     */
    export interface Array$ extends TypeLambdaG<["A"]> {
      signature: (a: TArg<this, "A">) => TArg<this, "A">[];
      return: RawArg0<this>[];
    }
  }
}
