import type { _DivFloat } from "./internal/_DivFloat";
import type { _StrToNum } from "./internal/_StrToNum";

/**
 * Divide two `number`s.
 *
 * Sig: `(n1: number, n2: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Div<42, 3>; // => 14
 * type _2 = Div<4356, 832>; // => 5.235576923076923
 * type _3 = Div<4356.791, 832.329>; // => 5.234457768502599
 * type _4 = Div<832.329, -4356.791>; // => -0.1910417552735488
 * ```
 */
export type Div<N1, N2> =
  number extends N1 | N2 ? number
  : N1 extends number ?
    N2 extends number ?
      _StrToNum<_DivFloat<`${N1}`, `${N2}`>>
    : never
  : never;
