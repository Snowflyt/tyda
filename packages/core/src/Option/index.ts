import type { HKT, RawArg0 } from "hkt-core";

import type { Lazied, Unlazy } from "../Lazy";

/**
 * A type representing a value that can either be present ({@linkcode Some}) or absent ({@linkcode None}).
 */
export type Option<A> = Some<A> | None;
/**
 * {@link Lazied} version of {@link Option}.
 */
export type OptionL<L extends Lazied> = SomeL<L> | None;
/**
 * A type representing a present value.
 */
export interface Some<out A> {
  readonly _tag: "Some";
  readonly _0: A;
}
/**
 * {@link Lazied} version of {@link Some}.
 */
export interface SomeL<L extends Lazied> extends Some<Unlazy<L>> {}
/**
 * A type representing an absent value.
 */
export interface None {
  readonly _tag: "None";
}

export interface OptionHKT extends HKT<unknown, Option<unknown>> {
  return: Option<RawArg0<this>>;
}

import type {} from "./Map";
import type {} from "./Unwrap";
import type {} from "./UnwrapOr";
import type {} from "./UnwrapOrElse";
import type {} from "./Value";

export namespace Option {}
