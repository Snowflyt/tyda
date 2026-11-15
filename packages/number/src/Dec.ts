import type { RawArg0, TypeLambda } from "hkt-core";

import type { _Sub } from "./internal/_Arith";

declare module "." {
  namespace Num {
    /**
     * Subtract 1 from the given number.
     *
     * Sig: `(self: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Num.Dec<3>; // => 2
     * type _2 = Num.Dec<0>; // => -1
     * type _3 = Num.Dec<480>; // => 479
     * type _4 = Num.Dec<3.14>; // => 2.14
     * type _5 = Num.Dec<0.718>; // => -0.282
     * type _6 = Num.Dec<-2.718>; // => -3.718
     * ```
     */
    export type Dec<Self extends number> = _Sub<Self, 1>;

    /**
     * [Fn] Subtract 1 from the given number.
     *
     * Sig: `(self: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<3, Num.Dec$>; // => 2
     * type _2 = Pipe<0, Num.Dec$>; // => -1
     * type _3 = Pipe<480, Num.Dec$>; // => 479
     * type _4 = Pipe<3.14, Num.Dec$>; // => 2.14
     * type _5 = Pipe<0.718, Num.Dec$>; // => -0.282
     * type _6 = Pipe<-2.718, Num.Dec$>; // => -3.718
     * ```
     */
    export interface Dec$ extends TypeLambda<[self: number], number> {
      return: _Sub<RawArg0<this>, 1>;
    }
  }
}
