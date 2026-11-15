type Div10Pow<
  S extends string,
  PowStr extends string,
  // Initially, `Dec` is `string`, meaning `PowStr` is not yet exhausted
  // Once `PowStr` is exhausted, `Dec` tracks the remaining digits for the decimal part
  Dec extends string = string,
  Acc extends string = "",
> =
  S extends `${infer D}${infer Rest}` ?
    PowStr extends `${string}${infer PowRest}` ? Div10Pow<Rest, PowRest, Dec, `${Acc}${D}`>
    : // `PowStr` is exhausted
    string extends Dec ? Div10Pow<S, "", `${Acc}${S}`>
    : Dec extends `${infer D}${infer RawRest}` ? Div10Pow<Rest, "", RawRest, `${Acc}${D}`>
    : `${Acc}${S}`
  : string extends Dec ?
    // #`PowStr` >= #`S`, `Dec` is not used
    PowStr extends `${string}${infer PowRest}` ?
      // Add leading zeroes to the decimal part
      Div10Pow<"", PowRest, Dec, `0${Acc}`>
    : Acc extends `${infer NextAcc}0` ?
      // Remove trailing zeroes in decimal part
      Div10Pow<"", "", Dec, NextAcc>
    : // Add `0.` to the front of the decimal part
      `0.${Acc}`
  : // `Dec` represents the decimal part
  Dec extends `${infer NextDec}0` ?
    // Remove trailing zeroes in decimal part
    Div10Pow<"", "", NextDec, Acc>
  : `${Acc}${Dec extends "" ? "" : "."}${Dec}`;

/**
 * Divide an integer by 10 raised to the power of the length of `PowStr`.
 * @private
 */
export type _Div10Pow<I extends string, PowStr extends string> =
  I extends "0" ? "0"
  : I extends "-0" ? "-0"
  : `${I}` extends `-${infer IAbs}` ? `-${Div10Pow<IAbs, PowStr>}`
  : Div10Pow<`${I}`, PowStr>;
