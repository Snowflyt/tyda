/**
 * Negate a `number`.
 *
 * Sig: `(n: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Negate<3>; // => -3
 * type _2 = Negate<-3.14>; // => 3.14
 * type _3 = Negate<0>; // => 0
 * ```
 */
export type Negate<N> =
  number extends N ? number
  : N extends number ?
    N extends 0 ? 0
    : `${N}` extends `-${infer M extends number}` ? M
    : `-${N}` extends `${infer M extends number}` ? M
    : never
  : never;
