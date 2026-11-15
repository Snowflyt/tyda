import type {
  Call1W,
  Call2W,
  Kind,
  Param0,
  PickTypeArgs,
  RawArg0,
  RawArg1,
  RawTArg,
  RetType,
  TypeLambda,
  TypeLambdaG,
} from "hkt-core";

import type { FunctorImpl } from ".";

declare module "." {
  namespace Functor {
    /**
     * Applies a type-level function to the underlying value(s) of the given {@linkcode Functor},
     * returning a new {@linkcode Functor} with the transformed value(s).
     *
     * Sig: `<F<~> extends Functor, A, B>(self: F<A>, f: (a: A) => B) => F<B>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Functor.Map<[1, 2, 3], Num.Inc$>; // => [2, 3, 4]
     * type _2 = Functor.Map<Some<3.14>, Num.Inc$>; // => Some<4.14>
     * type _3 = Functor.Map<None, Arr.Of1$>; // => None
     * ```
     */
    export type Map<
      Self extends Functor,
      F extends TypeLambda<
        [
          a: {
            // A Self that already fits F<never> (e.g. None, []) holds no value, so A = never
            [K in keyof FunctorImpl as Self extends FunctorImpl[K][0] ? K : never]: [
              Extract<Self, FunctorImpl[K][0]>,
            ] extends [Call1W<FunctorImpl[K][1], never>] ?
              never
            : [Extract<Self, FunctorImpl[K][0]>] extends [Call1W<FunctorImpl[K][1], infer A>] ? A
            : never;
          }[keyof {
            [K in keyof FunctorImpl as Self extends FunctorImpl[K][0] ? K : never]: never;
          }],
        ],
        unknown
      >,
    > = _Map<Self, F>;

    /**
     * [Fn] Applies a type-level function to the underlying value(s) of the given {@linkcode Functor},
     * returning a new {@linkcode Functor} with the transformed value(s).
     *
     * Sig: `<F<~> extends Functor, A, B>[f: (a: A) => B](self: F<A>) => F<B>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<[1, 2, 3], Functor.Map$<Num.Inc$>>; // => [2, 3, 4]
     * type _2 = Pipe<Some<3.14>, Functor.Map$<Num.Inc$>>; // => Some<4.14>
     * type _3 = Pipe<None, Functor.Map$<Arr.Of1$>>; // => None
     * ```
     */
    export interface Map$<F extends TypeLambda<[a: never], unknown>> extends TypeLambda {
      readonly "~hkt": F["~hkt"];
      signature: (
        self: Kind<FunctorHKT, Param0<F & PickTypeArgs<this>>>,
      ) => Kind<FunctorHKT, RetType<F & PickTypeArgs<this>>>;
      return: _Map<RawArg0<this>, F>;
    }

    /**
     * [Fn] Applies a type-level function to the underlying value(s) of a given {@linkcode Functor},
     * returning a new {@linkcode Functor} with the transformed value(s).
     *
     * Sig: `<F<~> extends Functor, A, B>(self: F<A>, f: (a: A) => B) => F<B>`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Functor.Map$$, [1, 2, 3], Num.Inc$>; // => [2, 3, 4]
     * type _2 = Call2<Functor.Map$$, Some<3.14>, Num.Inc$>; // => Some<4.14>
     * type _3 = Call2<Functor.Map$$, None, Arr.Of1$>; // => None
     * ```
     */
    export interface Map$$ extends TypeLambdaG<["A", "B"]> {
      signature: (
        self: Kind<FunctorHKT, RawTArg<this, "A">>,
        f: TypeLambda<[a: RawTArg<this, "A">], RawTArg<this, "B">>,
      ) => Kind<FunctorHKT, RawTArg<this, "B">>;
      return: _Map<RawArg0<this>, RawArg1<this>>;
    }
  }
}

type _Map<Self, F> = {
  [K in keyof FunctorImpl as Self extends FunctorImpl[K][0] ? K : never]: F extends unknown ?
    Call2W<FunctorImpl[K][2]["Map$$"], Extract<Self, FunctorImpl[K][0]>, F>
  : never;
}[keyof {
  [K in keyof FunctorImpl as Self extends FunctorImpl[K][0] ? K : never]: never;
}];
