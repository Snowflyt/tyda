import type { Arg0, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Gets all elements except the first element of the given possibly empty tuple, returning `never` if the tuple is empty.
     *
     * Sig: `<A>(self: readonly A[]) => readonly A[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.UnsafeTail<[string, number, boolean]>; // => [number, boolean]
     * type _2 = Arr.UnsafeTail<readonly [1, 2, 3]>; // => readonly [2, 3]
     * type _3 = Arr.UnsafeTail<["foo"]>; // => []
     * type _4 = Arr.UnsafeTail<[]>; // => never
     * type _5 = Arr.UnsafeTail<string[]>; // => string[]
     * type _6 = Arr.UnsafeTail<[string?]>; // => []
     * type _7 = Arr.UnsafeTail<[string?, number?]>; // => [number?]
     * type _8 = Arr.UnsafeTail<[string?, ...number[]]>; // => number[]
     * type _9 = Arr.UnsafeTail<[...string[], number, boolean]>; // => [...string[], number, boolean] | [boolean]
     * ```
     *
     * @see {@linkcode Arr.UnsafeHead}
     * @see {@linkcode Arr.Tail}
     */
    export type UnsafeTail<Self extends readonly unknown[]> =
      0 extends 1 & Self ? readonly any[]
      : Self extends [infer _, ...infer Tail] ? Tail
      : Self extends readonly [infer _, ...infer Tail] ? readonly [...Tail]
      : Self extends unknown ?
        IsTuple<Self> extends true ?
          Self["length"] extends 0 ? never
          : // If it is not an empty tuple, it should
          // 1) Start with rest elements
          // 2) Start with optional elements
          // It should not start with required elements, because that case is already handled above
          // 1) Start with rest elements
          [Extract<keyof Self, `${number}`>, Self] extends [never, unknown[]] ?
            _RemoveLeadingRest<Self> extends [infer _, ...infer Tail] ?
              Self | Tail
            : never
          : [Extract<keyof Self, `${number}`>] extends [never] ?
            _RemoveLeadingRest<Self> extends [infer _, ...infer Tail] ?
              Self | readonly [...Tail]
            : never
          : // 2) Start with optional elements
          Self extends [(infer _)?, ...infer Tail] ? Tail
          : Self extends readonly [(infer _)?, ...infer Tail] ? readonly [...Tail]
          : never
        : Self
      : never;

    /**
     * Gets all elements except the first element of the given possibly empty tuple, returning `never` if the tuple is empty.
     *
     * Sig: `<A>(self: readonly A[]) => readonly A[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<[string, number, boolean], Arr.UnsafeTail$>; // => [number, boolean]
     * type _2 = Pipe<readonly [1, 2, 3], Arr.UnsafeTail$>; // => readonly [2, 3]
     * type _3 = Pipe<["foo"], Arr.UnsafeTail$>; // => []
     * type _4 = Pipe<[], Arr.UnsafeTail$>; // => never
     * type _5 = Pipe<string[], Arr.UnsafeTail$>; // => string[]
     * type _6 = Pipe<[string?], Arr.UnsafeTail$>; // => []
     * type _7 = Pipe<[string?, number?], Arr.UnsafeTail$>; // => [number?]
     * type _8 = Pipe<[string?, ...number[]], Arr.UnsafeTail$>; // => number[]
     * type _9 = Pipe<[...string[], number, boolean], Arr.UnsafeTail$>; // => [...string[], number, boolean] | [boolean]
     * ```
     *
     * @see {@linkcode Arr.UnsafeHead$}
     * @see {@linkcode Arr.Tail$}
     */
    export interface UnsafeTail$ extends TypeLambdaG<["A"]> {
      signature: (self: readonly TArg<this, "A">[]) => readonly TArg<this, "A">[];
      return: UnsafeTail<Arg0<this>>;
    }
  }
}

type _RemoveLeadingRest<Self extends readonly unknown[], Result extends unknown[] = []> =
  Self extends readonly [...infer Init, infer Last] ? _RemoveLeadingRest<Init, [Last, ...Result]>
  : Result;
