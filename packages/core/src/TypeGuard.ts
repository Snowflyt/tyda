/**
 * A type guard that can be used to check if a value is of a certain type.
 */
export type TypeGuard<A> = TypeIs<A> | TypeIsNot<A>;
export type TypeIs<A> = true & { readonly _tag: "TypeIs"; readonly _0: A };
export type TypeIsNot<A> = false & { readonly _tag: "TypeIsNot"; readonly _0: A };
