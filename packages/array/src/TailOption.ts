import type { None, Option, Some } from "@tyda/core";
import type { Arg0, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Gets all elements except the first element of the given possibly empty tuple as an {@linkcode Option}.
     *
     * Sig: `<A>(self: readonly A[]) => Option<readonly A[]>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.TailOption<[string, number, boolean]>; // => Some<[number, boolean]>
     * type _2 = Arr.TailOption<readonly [1, 2, 3]>; // => Some<readonly [2, 3]>
     * type _3 = Arr.TailOption<["foo"]>; // => Some<[]>
     * type _4 = Arr.TailOption<[]>; // => None
     * type _5 = Arr.TailOption<string[]>; // => Option<string[]>
     * type _6 = Arr.TailOption<[string?]>; // => Some<[]> | None
     * type _7 = Arr.TailOption<[string?, number?]>; // => Some<[number?]> | None
     * type _8 = Arr.TailOption<[string?, ...number[]]>; // => Option<number[]>
     * type _9 = Arr.TailOption<[...string[], number, boolean]>; // => Some<[...string[], number, boolean]> | Some<[boolean]>
     * ```
     *
     * @see {@linkcode Arr.TailOrEmpty}
     * @see {@linkcode Arr.UnsafeTail}
     * @see {@linkcode Arr.Tail}
     */
    export type TailOption<Self extends readonly unknown[]> =
      0 extends 1 & Self ? Option<readonly any[]>
      : Self extends [infer _, ...infer Tail] ? Some<Tail>
      : Self extends readonly [infer _, ...infer Tail] ? Some<readonly [...Tail]>
      : Self extends unknown ?
        IsTuple<Self> extends true ?
          Self["length"] extends 0 ? None
          : // If it is not an empty tuple, it should
          // 1) Start with rest elements
          // 2) Start with optional elements
          // It should not start with required elements, because that case is already handled above
          // 1) Start with rest elements
          [Extract<keyof Self, `${number}`>, Self] extends [never, unknown[]] ?
            _RemoveLeadingRest<Self> extends [infer _, ...infer Tail] ?
              Some<Self> | Some<Tail>
            : never
          : [Extract<keyof Self, `${number}`>] extends [never] ?
            _RemoveLeadingRest<Self> extends [infer _, ...infer Tail] ?
              Some<Self> | Some<readonly [...Tail]>
            : never
          : // 2) Start with optional elements
          Self extends [(infer _)?, ...infer Tail] ? Option<Tail>
          : Self extends readonly [(infer _)?, ...infer Tail] ? Option<readonly [...Tail]>
          : never
        : Option<Self>
      : never;

    /**
     * Gets all elements except the first element of the given possibly empty tuple as an {@linkcode Option}.
     *
     * Sig: `<A>(self: readonly A[]) => Option<readonly A[]>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<[string, number, boolean], Arr.TailOption$>; // => Some<[number, boolean]>
     * type _2 = Pipe<readonly [1, 2, 3], Arr.TailOption$>; // => Some<readonly [2, 3]>
     * type _3 = Pipe<["foo"], Arr.TailOption$>; // => Some<[]>
     * type _4 = Pipe<[], Arr.TailOption$>; // => None
     * type _5 = Pipe<string[], Arr.TailOption$>; // => Option<string[]>
     * type _6 = Pipe<[string?], Arr.TailOption$>; // => Some<[]> | None
     * type _7 = Pipe<[string?, number?], Arr.TailOption$>; // => Some<[number?]> | None
     * type _8 = Pipe<[string?, ...number[]], Arr.TailOption$>; // => Option<number[]>
     * type _9 = Pipe<[...string[], number, boolean], Arr.TailOption$>; // => Some<[...string[], number, boolean]> | Some<[boolean]>
     * ```
     *
     * @see {@linkcode Arr.TailOrEmpty$}
     * @see {@linkcode Arr.UnsafeTail$}
     * @see {@linkcode Arr.Tail$}
     */
    export interface TailOption$ extends TypeLambdaG<["A"]> {
      signature: (self: readonly TArg<this, "A">[]) => Option<readonly TArg<this, "A">[]>;
      return: TailOption<Arg0<this>>;
    }
  }
}

type _RemoveLeadingRest<Self extends readonly unknown[], Result extends unknown[] = []> =
  Self extends readonly [...infer Init, infer Last] ? _RemoveLeadingRest<Init, [Last, ...Result]>
  : Result;
