import type { RawArg0, TypeLambda } from "hkt-core";

import type { _Add } from "./internal/_Arith";

declare module "." {
  namespace Num {
    /**
     * Add 1 to the given number.
     *
     * Sig: `(self: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Num.Inc<3>; // => 4
     * type _2 = Num.Inc<-1>; // => 0
     * type _3 = Num.Inc<479>; // => 480
     * type _4 = Num.Inc<2.718>; // => 3.718
     * type _5 = Num.Inc<-0.5>; // => 0.5
     * type _6 = Num.Inc<-3.14>; // => -2.14
     * ```
     */
    export type Inc<Self extends number> = _Add<Self, 1>;

    /**
     * [Fn] Add 1 to the given number.
     *
     * Sig: `(self: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<3, Num.Inc$>; // => 4
     * type _2 = Pipe<-1, Num.Inc$>; // => 0
     * type _3 = Pipe<479, Num.Inc$>; // => 480
     * type _4 = Pipe<2.718, Num.Inc$>; // => 3.718
     * type _5 = Pipe<-0.5, Num.Inc$>; // => 0.5
     * type _6 = Pipe<-3.14, Num.Inc$>; // => -2.14
     * ```
     */
    export interface Inc$ extends TypeLambda<[self: number], number> {
      return: _Add<RawArg0<this>, 1>;
    }
  }
}
