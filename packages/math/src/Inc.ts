import type { _AddFloat } from "./internal/_AddFloat";
import type { _StrToNum } from "./internal/_StrToNum";

/**
 * Add 1 to a `number`.
 *
 * Sig: `(n: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Inc<3>; // => 4
 * type _2 = Inc<-1>; // => 0
 * type _3 = Inc<479>; // => 480
 * type _4 = Inc<2.718>; // => 3.718
 * type _5 = Inc<-0.5>; // => 0.5
 * type _6 = Inc<-3.14>; // => -2.14
 * ```
 */
export type Inc<N> =
  number extends N ? number
  : N extends number ? _StrToNum<_AddFloat<`${N}`, "1">>
  : never;
