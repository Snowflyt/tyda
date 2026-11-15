import type { _DivRem } from "./internal/_DivRem";
import type { _StrToNum } from "./internal/_StrToNum";

/**
 * Divides two `number`s and return `readonly [quotient, remainder]`.
 * The remainder is of the same sign as the dividend.
 *
 * Sig: `(n1: number, n2: number) => readonly [number, number]`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = DivRem<42, 3>; // => readonly [14, 0]
 * type _2 = DivRem<4356, 832>; // => readonly [5, 196]
 * type _3 = DivRem<-4356.791, 832.329>; // => readonly [-5, -195.146]
 * type _4 = DivRem<832.329, -56.791>; // => readonly [-14, 37.255]
 * ```
 */
export type DivRem<N1, N2> =
  number extends N1 | N2 ? readonly [number, number]
  : N1 extends number ?
    N2 extends number ?
      readonly [_StrToNum<_DivRem<`${N1}`, `${N2}`>[0]>, _StrToNum<_DivRem<`${N1}`, `${N2}`>[1]>]
    : never
  : never;
