import type { RawArg0, RawArg1, TypeLambda } from "hkt-core";

import type { _Mul } from "./internal/_Arith";

declare module "." {
  namespace Num {
    /**
     * Multiply two numbers.
     *
     * Sig: `(self: number, that: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Num.Mul<42, 3>; // => 126
     * type _2 = Num.Mul<4356, 832>; // => 3624192
     * type _3 = Num.Mul<-4356.791, 832.329>; // => -3626283.496239
     * ```
     */
    export type Mul<Self extends number, That extends number> = _Mul<Self, That>;

    /**
     * [Fn] Multiply another number to the given number.
     *
     * Sig: `[that: number](self: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<42, Num.Mul$<3>>; // => 126
     * type _2 = Pipe<4356, Num.Mul$<832>>; // => 3624192
     * type _3 = Pipe<-4356.791, Num.Mul$<832.329>>; // => -3626283.496239
     * ```
     */
    export interface Mul$<That extends number> extends TypeLambda<[self: number], number> {
      return: _Mul<RawArg0<this>, That>;
    }

    /**
     * [Fn] Multiply two numbers.
     *
     * Sig: `(self: number, that: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Num.Mul$$, 42, 3>; // => 126
     * type _2 = Call2<Num.Mul$$, 4356, 832>; // => 3624192
     * type _3 = Call2<Num.Mul$$, -4356.791, 832.329>; // => -3626283.496239
     * ```
     */
    export interface Mul$$ extends TypeLambda<[self: number, that: number], number> {
      return: _Mul<RawArg0<this>, RawArg1<this>>;
    }
  }
}
