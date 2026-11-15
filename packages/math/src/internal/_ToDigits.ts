/**
 * Converts a string representation of a number to a tuple of its digits.
 *
 * If the string representation is shorter than the length of {@linkcode LengthAtLeast}, it is
 * padded with zeroes on the higher-order end.
 * @private
 *
 * @example
 * ```typescript
 * type _1 = _ToDigits<"512", "12345">; // => [0, 0, 5, 1, 2]
 * type _2 = _ToDigits<"512", "12">; // => [5, 1, 2]
 * ```
 */
export type _ToDigits<S extends string, LengthAtLeast extends string, Acc extends number[] = []> =
  [S, LengthAtLeast] extends (
    [`${infer D extends number}${infer Rest}`, `${infer _}${infer LengthRest}`]
  ) ?
    _ToDigits<Rest, LengthRest, [...Acc, D]>
  : S extends `${infer D extends number}${infer Rest}` ? _ToDigits<Rest, "", [...Acc, D]>
  : LengthAtLeast extends `${infer _}${infer LengthRest}` ? _ToDigits<"", LengthRest, [0, ...Acc]>
  : Acc;

/**
 * Like {@linkcode _ToDigits}, but in reverse order.
 * @private
 *
 * @example
 * ```typescript
 * type _1 = _ToDigitsRev<"512", "12345">; // => [2, 1, 5, 0, 0]
 * type _2 = _ToDigitsRev<"512", "12">; // => [2, 1, 5]
 * ```
 */
export type _ToDigitsRev<
  S extends string,
  LengthAtLeast extends string,
  Acc extends number[] = [],
> =
  [S, LengthAtLeast] extends (
    [`${infer D extends number}${infer Rest}`, `${infer _}${infer LengthRest}`]
  ) ?
    _ToDigitsRev<Rest, LengthRest, [D, ...Acc]>
  : S extends `${infer D extends number}${infer Rest}` ? _ToDigitsRev<Rest, "", [D, ...Acc]>
  : LengthAtLeast extends `${infer _}${infer LengthRest}` ?
    _ToDigitsRev<"", LengthRest, [...Acc, 0]>
  : Acc;

/**
 * Like {@linkcode _ToDigits}, but faster and without padding.
 */
export type _FastToDigits<S extends string, Acc extends number[] = []> =
  S extends `${infer D extends number}${infer Rest}` ? _FastToDigits<Rest, [...Acc, D]> : Acc;

/**
 * Like {@linkcode _ToDigitsRev}, but faster and without padding.
 */
export type _FastToDigitsRev<S extends string, Acc extends number[] = []> =
  S extends `${infer D extends number}${infer Rest}` ? _FastToDigitsRev<Rest, [D, ...Acc]> : Acc;
