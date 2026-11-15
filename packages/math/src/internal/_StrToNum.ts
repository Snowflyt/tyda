/**
 * Convert a `string` to a `number`.
 *
 * It handles the following cases:
 * - Leading zeroes are ignored.
 * - Trailing decimal zeroes are ignored.
 * - `-0` and `0` are both converted to `0`.
 * - `-.F` and `.F` are converted to `-0.F` and `0.F` respectively.
 * - Integral numbers with a trailing decimal point (e.g., `I.`) are converted to `I`.
 * - `NaN`, `Infinity`, and `-Infinity` are converted to `number`.
 * - Decimal parts that are not representable as `number` are truncated.
 * @private
 */
export type _StrToNum<S> =
  S extends "NaN" | "Infinity" | "-Infinity" ? number
  : Parse<Normalize<S>> extends infer R extends number ? R
  : never;

type Normalize<S> =
  S extends "-0" | "0" | "-.0" | ".0" ? "0"
  : S extends `${infer I}.` ? Normalize<I>
  : S extends `${infer I}.${infer F}0` ? Normalize<`${I}.${F}`>
  : S extends `-0${infer Rest}` ? Normalize<`-${Rest}`>
  : S extends `0${infer Rest}` ? Normalize<Rest>
  : S extends `-.${infer F}` ? `-0.${F}`
  : S extends `.${infer F}` ? `0.${F}`
  : S;

type Parse<S> =
  S extends `${infer R extends number}` ?
    number extends R ?
      // Truncate decimal part until it is representable as a `number`
      S extends (
        `${infer I}.${infer F}${"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}`
      ) ?
        Parse<`${I}.${F}`>
      : R
    : R
  : never;
