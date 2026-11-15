/**
 * Remove leading zeroes from a string representation of a number.
 *
 * **Note:** If the integral part is a single zero, it will be preserved.
 * @private
 */
export type _RemoveLeadingZeroes<S extends string> =
  S extends `-${infer Rest}` ? `-${RemoveLeadingZeroes<Rest>}` : RemoveLeadingZeroes<S>;

type RemoveLeadingZeroes<S extends string> =
  S extends "0" ? S
  : S extends `0.${string}` ? S
  : S extends `0${infer Tail}` ? RemoveLeadingZeroes<Tail>
  : S;
