/**
 * Truncates a number by removing its fractional part.
 *
 * Sig: `(n: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Trunc<13.37>; // => 13
 * type _2 = Trunc<42.849>; // => 42
 * type _3 = Trunc<0.1234>; // => 0
 * type _4 = Trunc<-0.123>; // => 0
 * ```
 */
export type Trunc<N> =
  number extends N ? number
  : N extends number ?
    `${N}` extends `-0.${string}` ? 0
    : `${N}` extends `${infer M extends number}.${string}` ? M
    : N
  : never;
