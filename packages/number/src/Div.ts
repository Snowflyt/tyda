import type { RawArg0, RawArg1, TypeLambda } from "hkt-core";

import type { _Div } from "./internal/_Arith";

declare module "." {
  namespace Num {
    /**
     * Divide two numbers.
     *
     * Sig: `(self: number, that: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Num.Div<42, 3>; // => 14
     * type _2 = Num.Div<4356, 832>; // => 5.235576923076923
     * type _3 = Num.Div<-4356.791, 832.329>; // => -5.234457768502599
     * ```
     */
    export type Div<Self extends number, That extends number> = _Div<Self, That>;

    /**
     * [Fn] Divide another number to the given number.
     *
     * Sig: `[that: number](self: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<42, Num.Div$<3>>; // => 14
     * type _2 = Pipe<4356, Num.Div$<832>>; // => 5.235576923076923
     * type _3 = Pipe<-4356.791, Num.Div$<832.329>>; // => -5.234457768502599
     * ```
     */
    export interface Div$<That extends number> extends TypeLambda<[self: number], number> {
      return: _Div<RawArg0<this>, That>;
    }

    /**
     * [Fn] Divide two numbers.
     *
     * Sig: `(self: number, that: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Num.Div$$, 42, 3>; // => 14
     * type _2 = Call2<Num.Div$$, 4356, 832>; // => 5.235576923076923
     * type _3 = Call2<Num.Div$$, -4356.791, 832.329>; // => -5.234457768502599
     * ```
     */
    export interface Div$$ extends TypeLambda<[self: number, that: number], number> {
      return: _Div<RawArg0<this>, RawArg1<this>>;
    }
  }
}
