import type {
  Call1W,
  Param0,
  PickTypeArgs,
  RawArg0,
  RawArg1,
  RetType,
  TArg,
  TypeLambda,
  TypeLambdaG,
} from "hkt-core";

import type { None, Option, Some } from ".";

declare module "." {
  namespace Option {
    /**
     * Applies a type-level function to the underlying value of the given {@linkcode Option},
     * returning a new {@linkcode Some} with the transformed value if the option is {@linkcode Some},
     * or {@linkcode None} if the option is {@linkcode None}.
     *
     * Sig: `<A, B>(self: Option<A>, f: (a: A) => B) => Option<B>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Option.Map<Some<42>, Num.Inc$>; // => Some<43>
     * type _2 = Option.Map<None, Arr.Of1$>; // => None
     * type _3 = Option.Map<Option<3.14>, Num.Inc$>; // => Option<4.14>
     * ```
     */
    export type Map<
      Self extends Option<unknown>,
      F extends TypeLambda<[a: Option.Value<Self>], unknown>,
    > = _Map<Self, F>;

    /**
     * [Fn] Applies a type-level function to the underlying value of the given {@linkcode Option},
     * returning a new {@linkcode Some} with the transformed value if the option is {@linkcode Some},
     * or {@linkcode None} if the option is {@linkcode None}.
     *
     * Sig: `<A, B>[f: (a: A) => B](self: Option<A>) => Option<B>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<Some<42>, Option.Map$<Num.Inc$>>; // => Some<43>
     * type _2 = Pipe<None, Option.Map$<Arr.Of1$>>; // => None
     * type _3 = Pipe<Option<3.14>, Option.Map$<Num.Inc$>>; // => Option<4.14>
     * ```
     */
    export interface Map$<F extends TypeLambda<[a: never], unknown>> extends TypeLambda {
      readonly "~hkt": F["~hkt"];
      signature: (
        self: Option<Param0<F & PickTypeArgs<this>>>,
      ) => Option<RetType<F & PickTypeArgs<this>>>;
      return: _Map<RawArg0<this>, F>;
    }

    /**
     * [Fn] Applies a type-level function to the underlying value of the given {@linkcode Option},
     * returning a new {@linkcode Some} with the transformed value if the option is {@linkcode Some},
     * or {@linkcode None} if the option is {@linkcode None}.
     *
     * Sig: `<A, B>(self: Option<A>, f: (a: A) => B) => Option<B>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Option.Map$$, Some<42>, Num.Inc$>; // => Some<43>
     * type _2 = Call2<Option.Map$$, None, Arr.Of1$>; // => None
     * type _3 = Call2<Option.Map$$, Option<3.14>, Num.Inc$>; // => Option<4.14>
     * ```
     */
    export interface Map$$ extends TypeLambdaG<["A", "B"]> {
      signature: (
        self: Option<TArg<this, "A">>,
        f: TypeLambda<[a: TArg<this, "A">], TArg<this, "B">>,
      ) => Option<TArg<this, "B">>;
      return: _Map<RawArg0<this>, RawArg1<this>>;
    }
  }
}

type _Map<Self, F> =
  0 extends 1 & Self ? Option<Call1W<F, any>>
  : [F] extends [never] ? never
  : Self extends Some<infer A> ? Some<Call1W<F, A>>
  : None;
