import type { RawArg0, TypeLambda } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Checks if the given array is readonly.
     *
     * Sig: `(self: readonly unknown[]) => boolean`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.IsReadonly<string[]>; // => false
     * type _2 = Arr.IsReadonly<readonly number[]>; // => true
     * type _3 = Arr.IsReadonly<["foo", "bar"]>; // => false
     * type _4 = Arr.IsReadonly<readonly [42, 1337, ...string[]]>; // => true
     * ```
     *
     * @see {@linkcode Arr.IsWritable}
     */
    export type IsReadonly<Self extends readonly unknown[]> = _IsReadonly<Self>;

    /**
     * [Fn] Checks if the given array is readonly.
     *
     * Sig: `(self: readonly unknown[]) => boolean`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<string[], Arr.IsReadonly$>; // => false
     * type _2 = Pipe<readonly number[], Arr.IsReadonly$>; // => true
     * type _3 = Pipe<["foo", "bar"], Arr.IsReadonly$>; // => false
     * type _4 = Pipe<readonly [42, 1337, ...string[]], Arr.IsReadonly$>; // => true
     * ```
     *
     * @see {@linkcode Arr.IsWritable$}
     */
    export interface IsReadonly$ extends TypeLambda<[self: readonly unknown[]], boolean> {
      return: _IsReadonly<RawArg0<this>>;
    }
  }
}

type _IsReadonly<Self> = Self extends unknown[] ? false : true;
