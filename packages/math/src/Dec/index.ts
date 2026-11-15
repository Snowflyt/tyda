import type { Dec as _Dec } from "./internal/_Dec";
import type { _Parse } from "./internal/_Parse";

/**
 * A type representing a decimal number.
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Dec<"-123.45">; // => ["-", [5, 4, 3, 2, 1], "", [0, 0], "Finite"]
 * type _2 = Dec<0.00123>; // => ["", [3, 2, 1], "-", [0, 0, 0], "Finite"]
 * type _3 = Dec<"NaN">; // => ["", [], "", [], "NaN"]
 * type _4 = Dec<"Infinity">; // => ["", [], "", [], "Infinity"]
 * type _5 = Dec<"-Infinity">; // => ["-", [], "", [], "Infinity"]
 * ```
 */
export type Dec<N extends string | number = string | number> = _Parse<`${N}`>;

export namespace Dec {
  export type NaN = _Dec.NaN;
  export type Infinity = _Dec.Infinity;
  export type NegativeInfinity = _Dec.NegativeInfinity;
}
