import type { Either, Lazied, Unlazy } from "@tyda/core";
import type { TypeLambda } from "hkt-core";

import type {} from "./FromStr";

/**
 * Any type that implements the `FromStr` type class.
 */
export type FromStr = Unlazy<FromStrL>;
/**
 * {@linkcode Lazied} version of {@linkcode FromStr}.
 */
export type FromStrL = Lazied<FromStrImpl[keyof FromStrImpl][0]>;

export namespace FromStr {}

/**
 * Instance implementations of the {@linkcode FromStr} type class.
 */
export interface FromStrImpl {}

export interface FromStrDefinition<out A, out Err = unknown> {
  readonly FromStr$: TypeLambda<[s: string], Either<Err, A>>;
}

export type ImplFromStr<A, Definition extends FromStrDefinition<A>> = [A, Definition];
