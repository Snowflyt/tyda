import type { RawArg0, RawArg1, TArg, TypeLambdaG } from "hkt-core";

import type { Some } from ".";

declare module "." {
  namespace Option {
    /**
     * Gets the underlying value of the provided {@linkcode Option} if it is a {@linkcode Some}, or the provided default value if it is {@linkcode None}.
     *
     * Sig: `<A, Default>(self: Option<A>, default: Default) => A | Default`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Option.UnwrapOr<Some<string>, number>; // => string
     * type _2 = Option.UnwrapOr<None, number>; // => number
     * type _3 = Option.UnwrapOr<Option<boolean>, string>; // => boolean | string
     * ```
     */
    export type UnwrapOr<Self extends Option<unknown>, Default> = _UnwrapOr<Self, Default>;

    /**
     * [Fn] Gets the underlying value of the provided {@linkcode Option} if it is a {@linkcode Some}, or the provided default value if it is {@linkcode None}.
     *
     * Sig: `<A, Default>[default: Default](self: Option<A>) => A | Default`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<Some<string>, Option.UnwrapOr$<number>>; // => string
     * type _2 = Pipe<None, Option.UnwrapOr$<number>>; // => number
     * type _3 = Pipe<Option<boolean>, Option.UnwrapOr$<string>>; // => boolean | string
     * ```
     */
    export interface UnwrapOr$<Default> extends TypeLambdaG<["A"]> {
      signature: (self: Option<TArg<this, "A">>) => TArg<this, "A"> | Default;
      return: _UnwrapOr<RawArg0<this>, Default>;
    }

    /**
     * [Fn] Gets the underlying value of the provided {@linkcode Option} if it is a {@linkcode Some}, or the provided default value if it is {@linkcode None}.
     *
     * Sig: `<A, Default>(self: Option<A>, default: Default) => A | Default`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Option.UnwrapOr$$, Some<string>, number>; // => string
     * type _2 = Call2<Option.UnwrapOr$$, None, number>; // => number
     * type _3 = Call2<Option.UnwrapOr$$, Option<boolean>, string>; // => boolean | string
     * ```
     */
    export interface UnwrapOr$$ extends TypeLambdaG<["A", "Default"]> {
      signature: (
        self: Option<TArg<this, "A">>,
        default_: TArg<this, "Default">,
      ) => TArg<this, "A"> | TArg<this, "Default">;
      return: _UnwrapOr<RawArg0<this>, RawArg1<this>>;
    }
  }
}

type _UnwrapOr<Self, Default> =
  0 extends 1 & Self ? any
  : Self extends Some<infer A> ? A
  : Default;
