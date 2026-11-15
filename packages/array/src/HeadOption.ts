import type { None, Option, Some } from "@tyda/core";
import type { Arg0, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Gets the first element of the given possibly empty tuple as an {@linkcode Option}.
     *
     * Sig: `<A>(self: readonly A[]) => Option<A>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.HeadOption<[string, number, boolean]>; // => Some<string>
     * type _2 = Arr.HeadOption<readonly [1, 2, 3]>; // => Some<1>
     * type _3 = Arr.HeadOption<["foo"]>; // => Some<"foo">
     * type _4 = Arr.HeadOption<[]>; // => None
     * type _5 = Arr.HeadOption<string[]>; // => Option<string>
     * type _6 = Arr.HeadOption<[string?]>; // => Some<string> | None
     * type _7 = Arr.HeadOption<[string?, number?]>; // => Some<string> | Some<number> | None
     * type _8 = Arr.HeadOption<[string?, ...number[]]>; // => Some<string> | Option<number>
     * type _9 = Arr.HeadOption<[...string[], number, boolean]>; // => Some<string> | Some<number>
     * ```
     *
     * @see {@linkcode Arr.TailOption}
     * @see {@linkcode Arr.UnsafeHead}
     * @see {@linkcode Arr.Head}
     */
    export type HeadOption<Self extends readonly unknown[]> =
      0 extends 1 & Self ? Option<any>
      : Self extends readonly [infer Head, ...unknown[]] ? Some<Head>
      : Self extends unknown ?
        IsTuple<Self> extends true ?
          Self["length"] extends 0 ? None
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
              | Some<LeadingRest[number]>
              // It must have at least one element remaining,
              // otherwise it would be treated as a regular array
              | Some<Remaining[0]>
            : never
          : // 2) Start with optional elements
          _ScanLeadingOptionalElements<Self> extends [infer Result extends Some<unknown>, []] ?
            // Only optional elements
            Result | None
          : _ScanLeadingOptionalElements<Self> extends (
            [infer Result extends Some<unknown>, infer Remaining extends unknown[]]
          ) ?
            | Result
            // Since required elements are not allowed to follow optional elements in a tuple,
            // the remaining elements must be a rest element
            | Option<Remaining[number]>
          : never
        : Option<Self[number]>
      : never;

    /**
     * Gets the first element of the given possibly empty tuple as an {@linkcode Option}.
     *
     * Sig: `<A>(self: readonly A[]) => Option<A>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<[string, number, boolean], Arr.HeadOption$>; // => Some<string>
     * type _2 = Pipe<readonly [1, 2, 3], Arr.HeadOption$>; // => Some<1>
     * type _3 = Pipe<["foo"], Arr.HeadOption$>; // => Some<"foo">
     * type _4 = Pipe<[], Arr.HeadOption$>; // => None
     * type _5 = Pipe<string[], Arr.HeadOption$>; // => Option<string>
     * type _6 = Pipe<[string?], Arr.HeadOption$>; // => Some<string> | None
     * type _7 = Pipe<[string?, number?], Arr.HeadOption$>; // => Some<string> | Some<number> | None
     * type _8 = Pipe<[string?, ...number[]], Arr.HeadOption$>; // => Some<string> | Option<number>
     * type _9 = Pipe<[...string[], number, boolean], Arr.HeadOption$>; // => Some<string> | Some<number>
     * ```
     *
     * @see {@linkcode Arr.TailOption$}
     * @see {@linkcode Arr.UnsafeHead$}
     * @see {@linkcode Arr.Head$}
     */
    export interface HeadOption$ extends TypeLambdaG<["A"]> {
      signature: (self: readonly TArg<this, "A">[]) => Option<TArg<this, "A">>;
      return: HeadOption<Arg0<this>>;
    }
  }
}

type _ScanLeadingOptionalElements<Self extends readonly unknown[], Result = never> =
  [Extract<keyof Self, `${number}`>] extends [never] ? [Result, Self]
  : Self extends readonly [(infer Head)?, ...infer Tail] ?
    _ScanLeadingOptionalElements<Tail, Result | Some<Head>>
  : [Result, Self];

type _ScanLeadingRest<Self extends readonly unknown[], Result extends unknown[] = []> =
  Self extends readonly [...infer Init, infer Last] ? _ScanLeadingRest<Init, [Last, ...Result]>
  : [Self, Result];
