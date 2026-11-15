import type { RawArg0, RawTArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Creates a single-element tuple containing the given value.
     *
     * Sig: `<A>(a: A) => readonly [A]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.Of1<42>; // => readonly [42]
     * type _2 = Arr.Of1<number | string>; // => readonly [number | string]
     * ```
     */
    export type Of1<A> = readonly [A];

    /**
     * [Fn] Creates a single-element tuple containing the given value.
     *
     * Sig: `<A>(a: A) => readonly [A]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<42, Arr.Of1$>; // => readonly [42]
     * type _2 = Pipe<number | string, Arr.Of1$>; // => readonly [number | string]
     * ```
     */
    export interface Of1$ extends TypeLambdaG<["A"]> {
      signature: (a: RawTArg<this, "A">) => readonly [RawTArg<this, "A">];
      return: Of1<RawArg0<this>>;
    }
  }
}
