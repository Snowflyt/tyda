import type { _AddNat } from "./internal/_AddNat";

/**
 * Gets the largest integer less than or equal to a given number.
 *
 * Sig: `(n: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Floor<3>; // => 3
 * type _2 = Floor<3.14>; // => 3
 * type _3 = Floor<-2.718>; // => -3
 * ```
 */
export type Floor<N> =
  number extends N ? number
  : N extends number ?
    `${N}` extends `-${infer M}.${string}` ?
      `-${_AddNat<M, "1">}` extends `${infer R extends number}` ?
        R
      : never
    : `${N}` extends `${infer M extends number}.${string}` ? M
    : N
  : never;
