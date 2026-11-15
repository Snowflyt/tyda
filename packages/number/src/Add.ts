import type { RawArg0, RawArg1, TypeLambda } from "hkt-core";

import type { _Add } from "./internal/_Arith";

declare module "." {
  namespace Num {
    /**
     * Add two numbers.
     *
     * Sig: `(self: number, that: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _ = Num.Add<4356, 832>; // => 5188
     * ```
     */
    export type Add<Self extends number, That extends number> = _Add<Self, That>;

    /**
     * [Fn] Add another number to the given number.
     *
     * Sig: `[that: number](self: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _ = Pipe<4356, Num.Add$<832>>; // => 5188
     * ```
     */
    export interface Add$<That extends number> extends TypeLambda<[self: number], number> {
      return: _Add<RawArg0<this>, That>;
    }

    /**
     * [Fn] Add two numbers.
     *
     * Sig: `(self: number, that: number) => number`
     *
     * **Example**
     *
     * ```typescript
     * type _ = Call2<Num.Add$$, 4356, 832>; // => 5188
     * ```
     */
    export interface Add$$ extends TypeLambda<[self: number, that: number], number> {
      return: _Add<RawArg0<this>, RawArg1<this>>;
    }
  }
}
