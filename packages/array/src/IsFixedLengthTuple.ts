import type { Arg0, TypeLambda } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Checks if the given array is a fixed length tuple (i.e., the `length` property is a number literal).
     *
     * Sig: `(self: readonly string[]) => boolean`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.IsFixedLengthTuple<string[]>; // => false
     * type _2 = Arr.IsFixedLengthTuple<readonly number[]>; // => false
     * type _3 = Arr.IsFixedLengthTuple<["foo", "bar"]>; // => true
     * type _4 = Arr.IsFixedLengthTuple<readonly [42, 1337, ...string[]]>; // => false
     * ```
     *
     * @see {@linkcode Arr.IsTuple}
     */
    export type IsFixedLengthTuple<Self extends readonly unknown[]> =
      0 extends 1 & Self ? boolean
      : Self extends unknown ?
        number extends Self["length"] ?
          false
        : true
      : never;

    /**
     * [Fn] Checks if the given array is a fixed length tuple (i.e., the `length` property is a number literal).
     *
     * Sig: `(self: readonly string[]) => boolean`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<string[], Arr.IsFixedLengthTuple$>; // => false
     * type _2 = Pipe<readonly number[], Arr.IsFixedLengthTuple$>; // => false
     * type _3 = Pipe<["foo", "bar"], Arr.IsFixedLengthTuple$>; // => true
     * type _4 = Pipe<readonly [42, 1337, ...string[]], Arr.IsFixedLengthTuple$>; // => false
     * ```
     *
     * @see {@linkcode Arr.IsTuple$}
     */
    export interface IsFixedLengthTuple$ extends TypeLambda<[self: readonly unknown[]], boolean> {
      return: IsFixedLengthTuple<Arg0<this>>;
    }
  }
}
