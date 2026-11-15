import type { _RemoveLeadingZeroes } from "./_RemoveLeadingZeroes";

type Mul10Pow<S extends string, PowStr extends string, Acc extends string = ""> =
  S extends `${infer D}${infer Rest}` ?
    PowStr extends `${string}${infer PowRest}` ?
      Mul10Pow<Rest, PowRest, `${Acc}${D}`>
    : `${Acc}.${S}`
  : PowStr extends `${string}${infer PowRest}` ? Mul10Pow<"", PowRest, `${Acc}0`>
  : Acc;

/**
 * Multiply a float by 10 raised to the power of the length of `PowStr`.
 * @private
 */
export type _Mul10Pow<N extends string, PowStr extends string> =
  N extends "0" ? "0"
  : `${N}` extends `${infer I}.${infer F}` ? _RemoveLeadingZeroes<`${I}${Mul10Pow<F, PowStr>}`>
  : `${N}${Mul10Pow<"", PowStr>}`;
