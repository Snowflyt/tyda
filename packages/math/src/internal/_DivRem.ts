import type { _CompareNat } from "./_CompareNat";
import type { _Div10Pow } from "./_Div10Pow";
import type { _MulNat } from "./_MulNat";
import type { _PadEnd } from "./_PadEnd";
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

type DivRemNat<
  N1 extends string,
  N2 extends string,
  Rem extends string = "0",
  Acc extends string = "",
> =
  N1 extends `${infer D}${infer Rest}` ?
    `${Rem extends "0" ? "" : Rem}${D}` extends infer Dividend extends string ?
      DivRemNat<
        Rest,
        N2,
        _SubNat<Dividend, _MulNat<N2, SearchMultiplier<Dividend, N2>>>,
        `${Acc}${[Acc, SearchMultiplier<Dividend, N2>] extends ["", "0"] ? "" : SearchMultiplier<Dividend, N2>}`
      >
    : never
  : readonly [Acc extends "" ? "0" : Acc, Rem];

type DivRemInt<N1 extends string, N2 extends string> =
  N1 extends `-${infer M1}` ?
    N2 extends `-${infer M2}` ?
      readonly [DivRemNat<M1, M2>[0], `-${DivRemNat<M1, M2>[1]}`]
    : readonly [`-${DivRemNat<M1, N2>[0]}`, `-${DivRemNat<M1, N2>[1]}`]
  : N2 extends `-${infer M2}` ? readonly [`-${DivRemNat<N1, M2>[0]}`, DivRemNat<N1, M2>[1]]
  : DivRemNat<N1, N2>;

/**
 * Divides two natural numbers and return `readonly [quotient, remainder]`. The remainder is of the same sign as the dividend.
 *
 * `NaN`, `±Infinity`, and `±0` are handled following [the `divrem` function in Julia](https://docs.julialang.org/en/v1/base/math/#Base.divrem).
 * @private
 */
export type _DivRem<N1 extends string, N2 extends string> =
  N1 extends "NaN" | "Infinity" | "-Infinity" ? readonly ["NaN", "NaN"]
  : N2 extends "NaN" ? readonly ["NaN", "NaN"]
  : N2 extends "-Infinity" ? readonly ["-0", N1]
  : N2 extends "Infinity" ? readonly ["0", N1]
  : N2 extends "-0" ?
    N1 extends "-0" | "0" ? readonly ["NaN", "NaN"]
    : N1 extends `-${string}` ? readonly ["Infinity", "NaN"]
    : readonly ["-Infinity", "NaN"]
  : N2 extends "0" ?
    N1 extends "-0" | "0" ? readonly ["NaN", "NaN"]
    : N1 extends `-${string}` ? readonly ["-Infinity", "NaN"]
    : readonly ["Infinity", "NaN"]
  : N1 extends "-0" ?
    N2 extends `-${string}` ?
      readonly ["0", "-0"]
    : readonly ["-0", "-0"]
  : N1 extends "0" ?
    N2 extends `-${string}` ?
      readonly ["-0", "0"]
    : readonly ["0", "0"]
  : N1 extends `${infer I1S}.${infer F1S}` ?
    N2 extends `${infer I2S}.${infer F2S}` ?
      readonly [
        DivRemInt<
          _RemoveLeadingZeroes<`${I1S}${_PadEnd<F1S, "0", F2S>}`>,
          _RemoveLeadingZeroes<`${I2S}${_PadEnd<F2S, "0", F1S>}`>
        >[0],
        _Div10Pow<
          DivRemInt<
            _RemoveLeadingZeroes<`${I1S}${_PadEnd<F1S, "0", F2S>}`>,
            _RemoveLeadingZeroes<`${I2S}${_PadEnd<F2S, "0", F1S>}`>
          >[1],
          _PadEnd<F1S, "0", F2S>
        >,
      ]
    : readonly [
        DivRemInt<
          _RemoveLeadingZeroes<`${I1S}${F1S}`>,
          _RemoveLeadingZeroes<`${N2}${_PadEnd<"", "0", F1S>}`>
        >[0],
        _Div10Pow<
          DivRemInt<
            _RemoveLeadingZeroes<`${I1S}${F1S}`>,
            _RemoveLeadingZeroes<`${N2}${_PadEnd<"", "0", F1S>}`>
          >[1],
          F1S
        >,
      ]
  : N2 extends `${infer I2S}.${infer F2S}` ?
    readonly [
      DivRemInt<
        _RemoveLeadingZeroes<`${N1}${_PadEnd<"", "0", F2S>}`>,
        _RemoveLeadingZeroes<`${I2S}${F2S}`>
      >[0],
      _Div10Pow<
        DivRemInt<
          _RemoveLeadingZeroes<`${N1}${_PadEnd<"", "0", F2S>}`>,
          _RemoveLeadingZeroes<`${I2S}${F2S}`>
        >[1],
        F2S
      >,
    ]
  : DivRemInt<N1, N2>;
