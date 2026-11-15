/**
 * Gets the absolute value of a `number`.
 *
 * Sig: `(n: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Abs<3>; // => 3
 * type _2 = Abs<-3>; // => 3
 * type _3 = Abs<0>; // => 0
 * ```
 */
export type Abs<N> =
  number extends N ? number
  : N extends number ?
    `${N}` extends `-${infer M extends number}` ?
      M
    : N
  : never;
