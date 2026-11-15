import type { RawArg0, RawArg1, TypeLambda } from "hkt-core";

import type { _Sub } from "./internal/_Arith";

declare module "." {
  namespace Num {
    /**
     * Subtract two numbers.
     *
     * Sig: `(self: number, that: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _ = Num.Sub<4356, 832>; // => 3524
     * ```
     */
    export type Sub<Self extends number, That extends number> = _Sub<Self, That>;

    /**
     * [Fn] Subtract another number from the given number.
     *
     * Sig: `[that: number](self: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _ = Pipe<4356, Num.Sub$<832>>; // => 3524
     * ```
     */
    export interface Sub$<That extends number> extends TypeLambda<[self: number], number> {
      return: _Sub<RawArg0<this>, That>;
    }

    /**
     * [Fn] Subtract two numbers.
     *
     * Sig: `(self: number, that: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _ = Call2<Num.Sub$$, 4356, 832>; // => 3524
     * ```
     */
    export interface Sub$$ extends TypeLambda<[self: number, that: number], number> {
      return: _Sub<RawArg0<this>, RawArg1<this>>;
    }
  }
}
