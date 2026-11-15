import type { Arg0, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Gets the first element of the given tuple, returning `never` if the tuple is empty.
     *
     * Sig: `<A>(self: readonly A[]) => A`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.UnsafeHead<[string, number, boolean]>; // => string
     * type _2 = Arr.UnsafeHead<readonly [1, 2, 3]>; // => 1
     * type _3 = Arr.UnsafeHead<["foo"]>; // => "foo"
     * type _4 = Arr.UnsafeHead<[]>; // => never
     * type _5 = Arr.UnsafeHead<string[]>; // => string
     * type _6 = Arr.UnsafeHead<[string?]>; // => string
     * type _7 = Arr.UnsafeHead<[string?, number?]>; // => string | number
     * type _8 = Arr.UnsafeHead<[string?, ...number[]]>; // => string | number
     * type _9 = Arr.UnsafeHead<[...string[], number]>; // => string | number
     * ```
     *
     * @see {@linkcode Arr.UnsafeTail}
     * @see {@linkcode Arr.Head}
     */
    export type UnsafeHead<Self extends readonly unknown[]> =
      Self extends readonly [infer Head, ...unknown[]] ? Head
      : Self extends unknown ?
        IsTuple<Self> extends true ?
          Self["length"] extends 0 ? never
          : // If it is not an empty tuple, it should
          // 1) Start with rest elements
          // 2) Start with optional elements
          // It should not start with required elements, because that case is already handled above
          // 1) No leading optional elements, it must start with rest elements
          _ScanLeadingOptionalElements<Self> extends [never, infer _] ?
            _ScanLeadingRest<Self> extends (
              [
                infer LeadingRest extends readonly unknown[],
                infer Remaining extends readonly unknown[],
              ]
            ) ?
              | LeadingRest[number]
              // It must have at least one element remaining,
              // otherwise it would be treated as a regular array
              | Remaining[0]
            : never
          : // 2) Start with optional elements
          _ScanLeadingOptionalElements<Self> extends (
            [infer Result, infer Remaining extends readonly unknown[]]
          ) ?
            | Result
            // Since required elements are not allowed to follow optional elements in a tuple,
            // the remaining elements must be a rest element or empty
            | Remaining[number]
          : never
        : Self[number]
      : never;

    /**
     * Gets the first element of the given tuple, returning `never` if the tuple is empty.
     *
     * Sig: `<A>(self: readonly A[]) => A`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<[string, number, boolean], Arr.UnsafeHead$>; // => string
     * type _2 = Pipe<readonly [1, 2, 3], Arr.UnsafeHead$>; // => 1
     * type _3 = Pipe<["foo"], Arr.UnsafeHead$>; // => "foo"
     * type _4 = Pipe<[], Arr.UnsafeHead$>; // => never
     * type _5 = Pipe<string[], Arr.UnsafeHead$>; // => string
     * type _6 = Pipe<[string?], Arr.UnsafeHead$>; // => string
     * type _7 = Pipe<[string?, number?], Arr.UnsafeHead$>; // => string | number
     * type _8 = Pipe<[string?, ...number[]], Arr.UnsafeHead$>; // => string | number
     * type _9 = Pipe<[...string[], number], Arr.UnsafeHead$>; // => string | number
     * ```
     *
     * @see {@linkcode Arr.UnsafeTail$}
     * @see {@linkcode Arr.Head$}
     */
    export interface UnsafeHead$ extends TypeLambdaG<["A"]> {
      signature: (self: readonly TArg<this, "A">[]) => TArg<this, "A">;
      return: UnsafeHead<Arg0<this>>;
    }
  }
}

type _ScanLeadingOptionalElements<Self extends readonly unknown[], Result = never> =
  [Extract<keyof Self, `${number}`>] extends [never] ? [Result, Self]
  : Self extends readonly [(infer Head)?, ...infer Tail] ?
    _ScanLeadingOptionalElements<Tail, Result | Head>
  : [Result, Self];

type _ScanLeadingRest<Self extends readonly unknown[], Result extends unknown[] = []> =
  Self extends readonly [...infer Init, infer Last] ? _ScanLeadingRest<Init, [Last, ...Result]>
  : [Self, Result];
