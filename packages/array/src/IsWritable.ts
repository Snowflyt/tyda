import type { TypeGuard, TypeIs, TypeIsNot } from "@tyda/core";
import type { RawArg0, TypeLambda } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Checks if an array is writable (i.e., not readonly).
     *
     * Sig: `(self: readonly unknown[]) => self is unknown[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.IsWritable<string[]>; // => true
     * type _2 = Arr.IsWritable<readonly number[]>; // => false
     * type _3 = Arr.IsWritable<["foo", "bar"]>; // => true
     * type _4 = Arr.IsWritable<readonly [42, 1337, ...string[]]>; // => false
     * ```
     *
     * @see {@linkcode Arr.IsReadonly}
     */
    export type IsWritable<Self extends readonly unknown[]> = _IsWritable<Self>;

    /**
     * [Fn] Checks if an array is writable (i.e., not readonly).
     *
     * Sig: `(self: readonly unknown[]) => self is unknown[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<string[], Arr.IsWritable$>; // => true
     * type _2 = Pipe<readonly number[], Arr.IsWritable$>; // => false
     * type _3 = Pipe<["foo", "bar"], Arr.IsWritable$>; // => true
     * type _4 = Pipe<readonly [42, 1337, ...string[]], Arr.IsWritable$>; // => false
     * ```
     *
     * @see {@linkcode Arr.IsReadonly$}
     */
    export interface IsWritable$ extends TypeLambda<
      [self: readonly unknown[]],
      TypeGuard<unknown[]>
    > {
      return: _IsWritable<RawArg0<this>>;
    }
  }
}

type _IsWritable<Self> = Self extends unknown[] ? TypeIs<unknown[]> : TypeIsNot<unknown[]>;
