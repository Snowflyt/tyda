import type { Lazied, None, Option, OptionL, Some, Unlazy } from "@tyda/core";
import type { Call1W, RawArg0, TypeLambda } from "hkt-core";

import type {} from "./Show";

/**
 * Any type that implements the `Show` type class.
 */
export type Show = Unlazy<ShowL>;
/**
 * {@linkcode Lazied} version of {@linkcode Show}.
 */
export type ShowL = Lazied<ShowImpl[keyof ShowImpl][0]>;

export namespace Show {}

/**
 * Instance implementations of the {@linkcode Show} type class.
 */
export interface ShowImpl {
  Option: ImplShow<
    OptionL<ShowL>,
    {
      Show$: OptionShow$;
    }
  >;
}

interface OptionShow$ extends TypeLambda<[self: OptionL<ShowL>], string> {
  return: RawArg0<this> extends Some<infer A> ? `Some<${Call1W<Show.Show$, A>}>`
  : RawArg0<this> extends None ? "None"
  : RawArg0<this> extends Option<infer A> ? `Option<${Call1W<Show.Show$, A>}>`
  : never;
}

export interface ShowDefinition<in A> {
  readonly Show$: TypeLambda<[self: A], string>;
}

export type ImplShow<A, Definition extends ShowDefinition<A>> = [A, Definition];
