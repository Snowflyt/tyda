import type { RawArg0, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Gets all elements except the first element of the given non-empty tuple.
     *
     * Sig: `<A>(self: readonly [unknown, ...A[]]) => readonly A[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.Tail<[string, number, boolean]>; // => [number, boolean]
     * type _2 = Arr.Tail<readonly [1, 2, 3]>; // => readonly [2, 3]
     * type _3 = Arr.Tail<["foo"]>; // => []
     * ```
     *
     * @see {@linkcode Arr.Head}
     * @see {@linkcode Arr.TailOrEmpty}
     * @see {@linkcode Arr.TailOption}
     * @see {@linkcode Arr.UnsafeTail}
     */
    export type Tail<Self extends readonly [unknown, ...unknown[]]> = _Tail<Self>;

    /**
     * Gets all elements except the first element of the given non-empty tuple.
     *
     * Sig: `<A>(self: readonly [unknown, ...A[]]) => readonly A[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<[string, number, boolean], Arr.Tail$>; // => [number, boolean]
     * type _2 = Pipe<readonly [1, 2, 3], Arr.Tail$>; // => readonly [2, 3]
     * type _3 = Pipe<["foo"], Arr.Tail$>; // => []
     * ```
     *
     * @see {@linkcode Arr.Tail$}
     * @see {@linkcode Arr.TailOrEmpty$}
     * @see {@linkcode Arr.TailOption$}
     * @see {@linkcode Arr.UnsafeTail$}
     */
    export interface Tail$ extends TypeLambdaG<["A"]> {
      signature: (self: readonly [unknown, ...TArg<this, "A">[]]) => readonly TArg<this, "A">[];
      return: _Tail<RawArg0<this>>;
    }
  }
}

type _Tail<Self> =
  0 extends 1 & Self ? readonly any[]
  : Self extends [infer _, ...infer Tail] ? Tail
  : Self extends readonly [infer _, ...infer Tail] ? readonly [...Tail]
  : never;
