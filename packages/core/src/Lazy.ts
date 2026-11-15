/**
 * Wrap `A` to make it lazily evaluated by TypeScript.
 *
 * It is useful when creating self-referential union types, especially for implementing type classes.
 *
 * @see {@link Unlazy} to unwrap the type.
 */
export interface Lazied<A = unknown> {
  "~~lazy": A;
}

/**
 * Get the wrapped type of lazied type `L`.
 *
 * @see {@link Lazied} to wrap a type lazily.
 */
export type Unlazy<L extends Lazied> = L["~~lazy"];
