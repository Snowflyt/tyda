import type { Lazied, Option, OptionHKT, Unlazy } from "@tyda/core";
import type { HKT, TolerantRetType, TypeLambda, TypeLambda1 } from "hkt-core";

import type {} from "./Map";

/**
 * Any type that implements the `Functor` type class.
 */
export type Functor = Unlazy<FunctorL>;
/**
 * {@linkcode Lazied} version of {@linkcode Functor}.
 */
export type FunctorL = Lazied<FunctorImpl[keyof FunctorImpl][0]>;

export type FunctorHKT = FunctorImpl[keyof FunctorImpl][1];

export namespace Functor {}

/**
 * Instance implementations of the {@linkcode Functor} type class.
 */
export interface FunctorImpl {
  Option: ImplFunctor<
    OptionHKT,
    {
      Map$$: Option.Map$$;
    }
  >;
}

// The kind of a Functor must be `* -> *` (i.e., `HKT<unknown, unknown>`)
export interface FunctorDefinition<out F extends HKT<unknown, unknown>> {
  readonly Map$$: TypeLambda<[self: TolerantRetType<F>, f: TypeLambda1], TolerantRetType<F>>;
}

export type ImplFunctor<
  F extends HKT<unknown, unknown>,
  Definition extends FunctorDefinition<F>,
> = [TolerantRetType<F>, F, Definition];
