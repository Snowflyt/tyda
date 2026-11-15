import type { Arg0, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Gets all elements except the first element of the given possibly empty tuple, returning an empty tuple if the tuple is empty.
     *
     * Sig: `<A>(self: readonly A[]) => readonly A[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.TailOrEmpty<[string, number, boolean]>; // => [number, boolean]
     * type _2 = Arr.TailOrEmpty<readonly [1, 2, 3]>; // => readonly [2, 3]
     * type _3 = Arr.TailOrEmpty<["foo"]>; // => []
     * type _4 = Arr.TailOrEmpty<[]>; // => []
     * type _5 = Arr.TailOrEmpty<string[]>; // => string[]
     * type _6 = Arr.TailOrEmpty<[string?]>; // => []
     * type _7 = Arr.TailOrEmpty<[string?, number?]>; // => [number?]
     * type _8 = Arr.TailOrEmpty<[string?, ...number[]]>; // => number[]
     * type _9 = Arr.TailOrEmpty<[...string[], number, boolean]>; // => [...string[], number, boolean] | [boolean]
     * ```
     *
     * @see {@linkcode Arr.HeadOption}
     * @see {@linkcode Arr.UnsafeHead}
     * @see {@linkcode Arr.TailOption}
     * @see {@linkcode Arr.UnsafeTail}
     * @see {@linkcode Arr.Tail}
     */
    export type TailOrEmpty<Self extends readonly unknown[]> =
      0 extends 1 & Self ? readonly any[]
      : Self extends [infer _, ...infer Tail] ? Tail
      : Self extends readonly [infer _, ...infer Tail] ? readonly [...Tail]
      : Self extends unknown ?
        IsTuple<Self> extends true ?
          Self extends readonly [] ? Self
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
     * Gets all elements except the first element of the given possibly empty tuple, returning an empty tuple if the tuple is empty.
     *
     * Sig: `<A>(self: readonly A[]) => readonly A[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<[string, number, boolean], Arr.TailOrEmpty$>; // => [number, boolean]
     * type _2 = Pipe<readonly [1, 2, 3], Arr.TailOrEmpty$>; // => readonly [2, 3]
     * type _3 = Pipe<["foo"], Arr.TailOrEmpty$>; // => []
     * type _4 = Pipe<[], Arr.TailOrEmpty$>; // => []
     * type _5 = Pipe<string[], Arr.TailOrEmpty$>; // => string[]
     * type _6 = Pipe<[string?], Arr.TailOrEmpty$>; // => []
     * type _7 = Pipe<[string?, number?], Arr.TailOrEmpty$>; // => [number?]
     * type _8 = Pipe<[string?, ...number[]], Arr.TailOrEmpty$>; // => number[]
     * type _9 = Pipe<[...string[], number, boolean], Arr.TailOrEmpty$>; // => [...string[], number, boolean] | [boolean]
     * ```
     *
     * @see {@linkcode Arr.HeadOption$}
     * @see {@linkcode Arr.UnsafeHead$}
     * @see {@linkcode Arr.TailOption$}
     * @see {@linkcode Arr.UnsafeTail$}
     * @see {@linkcode Arr.Tail$}
     */
    export interface TailOrEmpty$ extends TypeLambdaG<["A"]> {
      signature: (self: readonly TArg<this, "A">[]) => readonly TArg<this, "A">[];
      return: TailOrEmpty<Arg0<this>>;
    }
  }
}

type _RemoveLeadingRest<Self extends readonly unknown[], Result extends unknown[] = []> =
  Self extends readonly [...infer Init, infer Last] ? _RemoveLeadingRest<Init, [Last, ...Result]>
  : Result;
