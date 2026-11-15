/**
 * A type representing a value that can be one of two possible types:
 * - `Left<E>` (usually representing an error)
 * - `Right<A>` (usually representing a success)
 */
export type Either<E, A> = Left<E> | Right<A>;
/**
 * A type representing a `Left` value, usually representing an error.
 */
export interface Left<E> {
  readonly _tag: "Left";
  readonly _0: E;
}
/**
 * A type representing a `Right` value, usually representing a success.
 */
export interface Right<A> {
  readonly _tag: "Right";
  readonly _0: A;
}

import "./Unwrap";

export namespace Either {}
