import type { _CompareNat } from "./_CompareNat";
import type { _Mul10Pow } from "./_Mul10Pow";
import type { _MulNat } from "./_MulNat";
import type { _RemoveLeadingZeroes } from "./_RemoveLeadingZeroes";
import type { _SubNat } from "./_SubNat";

type MidMatrix = [
  [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
  [0, 1, 1, 2, 2, 3, 3, 4, 4, 5],
  [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
  [1, 2, 2, 3, 3, 4, 4, 5, 5, 6],
  [2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
  [2, 3, 3, 4, 4, 5, 5, 6, 6, 7],
  [3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
  [3, 4, 4, 5, 5, 6, 6, 7, 7, 8],
  [4, 4, 5, 5, 6, 6, 7, 7, 8, 8],
  [4, 5, 5, 6, 6, 7, 7, 8, 8, 9],
];

/**
 * Binary search for the largest multiplier (0 <= Multiplier <= 9) where (Divisor * Multiplier) <= Dividend.
 */
type SearchMultiplier<
  Dividend extends string,
  Divisor extends string,
  Lo extends number = 0,
  Hi extends number = 9,
> =
  MidMatrix[Lo][Hi] extends Lo ?
    _CompareNat<_MulNat<Divisor, `${Hi}`>, Dividend> extends 1 ?
      `${Lo}`
    : `${Hi}`
  : _CompareNat<_MulNat<Divisor, `${MidMatrix[Lo][Hi]}`>, Dividend> extends 1 ?
    SearchMultiplier<Dividend, Divisor, Lo, MidMatrix[Lo][Hi]>
  : SearchMultiplier<Dividend, Divisor, MidMatrix[Lo][Hi], Hi>;

/**
 * Divide two natural numbers and return a floating point number.
 */
type DivFloat<
  N1 extends string,
  N2 extends string,
  Rem extends string = "0",
  Acc extends string = "",
  // Initially, `LastRepresentableNumber` is `number`, meaning we're still handling the integral part
  // Once we hit the decimal point, we switch to tracking the last representable number
  LastRepresentableNumber extends number = number,
> =
  N1 extends `.${infer Rest}` ?
    // First time entering decimal part, add decimal point to accumulator
    DivFloat<
      Rest,
      N2,
      Rem,
      `${Acc extends "" ? "0" : Acc}.`,
      `${Acc}` extends `${infer R extends number}` ? R : 0
    >
  : N1 extends `${infer D}${infer Rest}` ?
    `${Rem extends "0" ? "" : Rem}${D}` extends infer Dividend extends string ?
      number extends LastRepresentableNumber ?
        // Integral part
        DivFloat<
          Rest,
          N2,
          _SubNat<Dividend, _MulNat<N2, SearchMultiplier<Dividend, N2>>>,
          `${Acc}${[Acc, SearchMultiplier<Dividend, N2>] extends ["", "0"] ? "" : SearchMultiplier<Dividend, N2>}`,
          LastRepresentableNumber
        >
      : // Decimal part
      `${Acc}${SearchMultiplier<Dividend, N2>}` extends infer NextAcc extends string ?
        NextAcc extends `${string}0` ?
          // Skip trailing zeroes in decimal part
          DivFloat<
            Rest,
            N2,
            _SubNat<Dividend, _MulNat<N2, SearchMultiplier<Dividend, N2>>>,
            NextAcc,
            LastRepresentableNumber
          >
        : NextAcc extends `${infer R extends number}` ?
          // Check for representability, if exceeded, return last representable number
          number extends R ?
            `${LastRepresentableNumber}`
          : DivFloat<
              Rest,
              N2,
              _SubNat<Dividend, _MulNat<N2, SearchMultiplier<Dividend, N2>>>,
              NextAcc,
              R
            >
        : `${LastRepresentableNumber}`
      : never
    : never
  : Rem extends "0" ?
    // Early end if no remainder
    Acc
  : // Multiply remainder by 10 to continue decimal part
  `${
    // First time entering decimal part, add decimal point
    number extends LastRepresentableNumber ? `${Acc extends "" ? "0" : Acc}.` : Acc
  }${SearchMultiplier<`${Rem}0`, N2>}` extends infer NextAcc extends string ?
    NextAcc extends `${string}0` ?
      // Skip trailing zeroes in decimal part
      DivFloat<
        "",
        N2,
        _SubNat<`${Rem}0`, _MulNat<N2, SearchMultiplier<`${Rem}0`, N2>>>,
        NextAcc,
        number extends LastRepresentableNumber ?
          `${Acc}` extends `${infer R extends number}` ?
            R
          : never
        : LastRepresentableNumber
      >
    : NextAcc extends `${infer R extends number}` ?
      // Check for representability, if exceeded, return last representable number
      number extends R ?
        `${LastRepresentableNumber}`
      : DivFloat<
          "",
          N2,
          _SubNat<`${Rem}0`, _MulNat<N2, SearchMultiplier<`${Rem}0`, N2>>>,
          NextAcc,
          R
        >
    : `${LastRepresentableNumber}`
  : never;

/**
 * Divide two floats.
 * @private
 */
export type _DivFloat<N1 extends string, N2 extends string> =
  N1 extends "NaN" ? "NaN"
  : N2 extends "NaN" ? "NaN"
  : N2 extends "-Infinity" ?
    N1 extends "Infinity" | "-Infinity" ? "NaN"
    : N1 extends `-${string}` ? "0"
    : "-0"
  : N2 extends "Infinity" ?
    N1 extends "Infinity" | "-Infinity" ? "NaN"
    : N1 extends `-${string}` ? "-0"
    : "0"
  : N1 extends "-Infinity" ?
    N2 extends `-${string}` ?
      "Infinity"
    : "-Infinity"
  : N1 extends "Infinity" ?
    N2 extends `-${string}` ?
      "-Infinity"
    : "Infinity"
  : N2 extends "-0" ?
    N1 extends "-0" | "0" ? "NaN"
    : N1 extends `-${string}` ? "Infinity"
    : "-Infinity"
  : N2 extends "0" ?
    N1 extends "-0" | "0" ? "NaN"
    : N1 extends `-${string}` ? "-Infinity"
    : "Infinity"
  : N1 extends "-0" ?
    N2 extends `-${string}` ?
      "0"
    : "-0"
  : N1 extends "0" ?
    N2 extends `-${string}` ?
      "-0"
    : "0"
  : N1 extends `-${infer N1Abs}` ?
    N2 extends `-${infer I}.${infer F}` ?
      DivFloat<_Mul10Pow<N1Abs, F>, _RemoveLeadingZeroes<`${I}${F}`>>
    : `${N2}` extends `-${infer N2Abs}` ? DivFloat<N1Abs, N2Abs>
    : `${N2}` extends `${infer I}.${infer F}` ?
      `-${DivFloat<_Mul10Pow<N1Abs, F>, _RemoveLeadingZeroes<`${I}${F}`>>}`
    : `-${DivFloat<N1Abs, N2>}`
  : N2 extends `-${infer I}.${infer F}` ?
    `-${DivFloat<_Mul10Pow<`${N1}`, F>, _RemoveLeadingZeroes<`${I}${F}`>>}`
  : N2 extends `-${infer N2Abs}` ? `-${DivFloat<`${N1}`, N2Abs>}`
  : N2 extends `${infer I}.${infer F}` ?
    DivFloat<_Mul10Pow<`${N1}`, F>, _RemoveLeadingZeroes<`${I}${F}`>>
  : DivFloat<`${N1}`, N2>;
