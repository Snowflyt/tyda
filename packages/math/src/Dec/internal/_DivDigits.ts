import type { _AddDigits } from "./_AddDigits";
import type { _CompareDigits } from "./_CompareDigits";
import type { _MulDigits } from "./_MulDigits";
import type { _SubDigits } from "./_SubDigits";

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
  Dividend extends number[],
  DividendDigitsCounter extends 0[],
  DivisorRev extends number[],
  Lo extends number = 0,
  Hi extends number = 9,
> =
  [MidMatrix[Lo][Hi], _MulDigits<DivisorRev, [Hi]>[2]] extends (
    [Lo, [...DividendDigitsCounter, 0, ...infer _]]
  ) ?
    Lo
  : [MidMatrix[Lo][Hi], DividendDigitsCounter] extends (
    [Lo, [..._MulDigits<DivisorRev, [Hi]>[2], 0, ...infer _]]
  ) ?
    Hi
  : [MidMatrix[Lo][Hi], _CompareDigits<_MulDigits<DivisorRev, [Hi]>[0], Dividend>] extends [Lo, 1] ?
    Lo
  : MidMatrix[Lo][Hi] extends Lo ? Hi
  : _MulDigits<DivisorRev, [MidMatrix[Lo][Hi]]>[2] extends (
    [...DividendDigitsCounter, 0, ...infer _]
  ) ?
    SearchMultiplier<Dividend, DividendDigitsCounter, DivisorRev, Lo, MidMatrix[Lo][Hi]>
  : DividendDigitsCounter extends (
    [..._MulDigits<DivisorRev, [MidMatrix[Lo][Hi]]>[2], 0, ...infer _]
  ) ?
    SearchMultiplier<Dividend, DividendDigitsCounter, DivisorRev, MidMatrix[Lo][Hi], Hi>
  : _CompareDigits<_MulDigits<DivisorRev, [MidMatrix[Lo][Hi]]>[0], Dividend> extends 1 ?
    SearchMultiplier<Dividend, DividendDigitsCounter, DivisorRev, Lo, MidMatrix[Lo][Hi]>
  : SearchMultiplier<Dividend, DividendDigitsCounter, DivisorRev, MidMatrix[Lo][Hi], Hi>;

type DivDigits<
  N1 extends number[],
  N1DigitsCounter extends 0[],
  N2Rev extends number[],
  ExponentSign extends "" | "-",
  ExponentCounter extends 0[],
  Prec extends 0[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Rem extends number[] = [0],
  RemRev extends number[] = [0],
  RemDigitsCounter extends 0[] = [0],
  Acc extends number[] = [],
  AccRev extends number[] = [],
  AccDigitsCounter extends 0[] = [],
> =
  [N1, N1DigitsCounter, Rem, Acc, SearchMultiplier<[N1[0]], [0], N2Rev>] extends (
    [
      [infer D extends number, ...infer RestDigits1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
      [0],
      [],
      0,
    ]
  ) ?
    DivDigits<
      RestDigits1,
      RestDigitsCounter1,
      N2Rev,
      ExponentSign,
      ExponentCounter,
      Prec,
      _SubDigits<
        [D],
        [D],
        [0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[2]
      >[0],
      _SubDigits<
        [D],
        [D],
        [0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[2]
      >[1],
      _SubDigits<
        [D],
        [D],
        [0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[2]
      >[2],
      Acc,
      AccRev,
      AccDigitsCounter
    >
  : [N1, N1DigitsCounter, Prec, Rem] extends (
    [
      [infer D extends number, ...infer RestDigits1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
      [0, ...infer RestPrec extends 0[]],
      [0],
    ]
  ) ?
    DivDigits<
      RestDigits1,
      RestDigitsCounter1,
      N2Rev,
      ExponentSign,
      ExponentCounter,
      RestPrec,
      _SubDigits<
        [D],
        [D],
        [0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[2]
      >[0],
      _SubDigits<
        [D],
        [D],
        [0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[2]
      >[1],
      _SubDigits<
        [D],
        [D],
        [0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[D], [0], N2Rev>]>[2]
      >[2],
      [...Acc, SearchMultiplier<[D], [0], N2Rev>],
      [SearchMultiplier<[D], [0], N2Rev>, ...AccRev],
      [...AccDigitsCounter, 0]
    >
  : [N1, Prec, Rem] extends [[infer D extends number, ...infer _RestDigits1], [], [0]] ?
    SearchMultiplier<[D], [0], N2Rev> extends 0 | 1 | 2 | 3 | 4 ?
      ExponentSign extends "" ?
        [Acc, AccRev, AccDigitsCounter, ExponentSign, [...ExponentCounter, ...N1DigitsCounter]]
      : N1DigitsCounter extends [...ExponentCounter, ...infer RestExponentCounter] ?
        [Acc, AccRev, AccDigitsCounter, "", RestExponentCounter]
      : ExponentCounter extends [...N1DigitsCounter, ...infer RestExponentCounter extends 0[]] ?
        [Acc, AccRev, AccDigitsCounter, "-", RestExponentCounter]
      : never
    : Acc extends 9[] ?
      ExponentSign extends "" ?
        [[1], [1], [0], ExponentSign, [...ExponentCounter, ...AccDigitsCounter, ...N1DigitsCounter]]
      : [...AccDigitsCounter, ...N1DigitsCounter] extends (
        [...ExponentCounter, ...infer RestExponentCounter]
      ) ?
        [[1], [1], [0], "", RestExponentCounter]
      : ExponentCounter extends (
        [...AccDigitsCounter, ...N1DigitsCounter, ...infer RestExponentCounter extends 0[]]
      ) ?
        [[1], [1], [0], "-", RestExponentCounter]
      : never
    : ExponentSign extends "" ?
      [
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[0],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[1],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[2],
        ExponentSign,
        [...ExponentCounter, ...N1DigitsCounter],
      ]
    : N1DigitsCounter extends [...ExponentCounter, ...infer RestExponentCounter] ?
      [
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[0],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[1],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[2],
        "",
        RestExponentCounter,
      ]
    : ExponentCounter extends [...N1DigitsCounter, ...infer RestExponentCounter extends 0[]] ?
      [
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[0],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[1],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[2],
        "-",
        RestExponentCounter,
      ]
    : never
  : [
    N1,
    N1DigitsCounter,
    Acc,
    SearchMultiplier<[...Rem, N1[0]], [...RemDigitsCounter, 0], N2Rev>,
  ] extends (
    [
      [infer D extends number, ...infer RestDigits1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
      [],
      0,
    ]
  ) ?
    DivDigits<
      RestDigits1,
      RestDigitsCounter1,
      N2Rev,
      ExponentSign,
      ExponentCounter,
      Prec,
      _SubDigits<
        [...Rem, D],
        [D, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[0],
      _SubDigits<
        [...Rem, D],
        [D, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[1],
      _SubDigits<
        [...Rem, D],
        [D, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[2],
      Acc,
      AccRev,
      AccDigitsCounter
    >
  : [N1, N1DigitsCounter, Prec] extends (
    [
      [infer D extends number, ...infer RestDigits1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
      [0, ...infer RestPrec extends 0[]],
    ]
  ) ?
    DivDigits<
      RestDigits1,
      RestDigitsCounter1,
      N2Rev,
      ExponentSign,
      ExponentCounter,
      RestPrec,
      _SubDigits<
        [...Rem, D],
        [D, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[0],
      _SubDigits<
        [...Rem, D],
        [D, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[1],
      _SubDigits<
        [...Rem, D],
        [D, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[2],
      [...Acc, SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>],
      [SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev>, ...AccRev],
      [...AccDigitsCounter, 0]
    >
  : [N1, Prec] extends [[infer D extends number, ...infer _RestDigits1 extends number[]], []] ?
    SearchMultiplier<[...Rem, D], [...RemDigitsCounter, 0], N2Rev> extends 0 | 1 | 2 | 3 | 4 ?
      ExponentSign extends "" ?
        [Acc, AccRev, AccDigitsCounter, ExponentSign, [...ExponentCounter, ...N1DigitsCounter]]
      : N1DigitsCounter extends [...ExponentCounter, ...infer RestExponentCounter] ?
        [Acc, AccRev, AccDigitsCounter, "", RestExponentCounter]
      : ExponentCounter extends [...N1DigitsCounter, ...infer RestExponentCounter extends 0[]] ?
        [Acc, AccRev, AccDigitsCounter, "-", RestExponentCounter]
      : never
    : Acc extends 9[] ?
      ExponentSign extends "" ?
        [[1], [1], [0], ExponentSign, [...ExponentCounter, ...AccDigitsCounter, ...N1DigitsCounter]]
      : [...AccDigitsCounter, ...N1DigitsCounter] extends (
        [...ExponentCounter, ...infer RestExponentCounter]
      ) ?
        [[1], [1], [0], "", RestExponentCounter]
      : ExponentCounter extends (
        [...AccDigitsCounter, ...N1DigitsCounter, ...infer RestExponentCounter extends 0[]]
      ) ?
        [[1], [1], [0], "-", RestExponentCounter]
      : never
    : ExponentSign extends "" ?
      [
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[0],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[1],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[2],
        ExponentSign,
        [...ExponentCounter, ...N1DigitsCounter],
      ]
    : N1DigitsCounter extends [...ExponentCounter, ...infer RestExponentCounter] ?
      [
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[0],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[1],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[2],
        "",
        RestExponentCounter,
      ]
    : ExponentCounter extends [...N1DigitsCounter, ...infer RestExponentCounter extends 0[]] ?
      [
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[0],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[1],
        _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[2],
        "-",
        RestExponentCounter,
      ]
    : never
  : Rem extends [0] ?
    // Early end if no remainder
    [Acc, AccRev, AccDigitsCounter, ExponentSign, ExponentCounter]
  : [ExponentSign, Prec] extends ["-", [0, ...infer RestPrec extends 0[]]] ?
    DivDigits<
      [],
      [],
      N2Rev,
      "-",
      [...ExponentCounter, 0],
      RestPrec,
      _SubDigits<
        [...Rem, 0],
        [0, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[0],
      _SubDigits<
        [...Rem, 0],
        [0, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[1],
      _SubDigits<
        [...Rem, 0],
        [0, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[2],
      [...Acc, SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>],
      [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>, ...AccRev],
      [...AccDigitsCounter, 0]
    >
  : [ExponentSign, ExponentCounter, Prec] extends ["", [], [0, ...infer RestPrec extends 0[]]] ?
    DivDigits<
      [],
      [],
      N2Rev,
      "-",
      [0],
      RestPrec,
      _SubDigits<
        [...Rem, 0],
        [0, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[0],
      _SubDigits<
        [...Rem, 0],
        [0, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[1],
      _SubDigits<
        [...Rem, 0],
        [0, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[2],
      [...Acc, SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>],
      [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>, ...AccRev],
      [...AccDigitsCounter, 0]
    >
  : [ExponentSign, ExponentCounter, Prec] extends (
    ["", [0, ...infer RestExponentCounter extends 0[]], [0, ...infer RestPrec extends 0[]]]
  ) ?
    DivDigits<
      [],
      [],
      N2Rev,
      "",
      RestExponentCounter,
      RestPrec,
      _SubDigits<
        [...Rem, 0],
        [0, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[0],
      _SubDigits<
        [...Rem, 0],
        [0, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[1],
      _SubDigits<
        [...Rem, 0],
        [0, ...RemRev],
        [...RemDigitsCounter, 0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[0],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[1],
        _MulDigits<N2Rev, [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>]>[2]
      >[2],
      [...Acc, SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>],
      [SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev>, ...AccRev],
      [...AccDigitsCounter, 0]
    >
  : SearchMultiplier<[...Rem, 0], [...RemDigitsCounter, 0], N2Rev> extends 0 | 1 | 2 | 3 | 4 ?
    ExponentSign extends "" ?
      [Acc, AccRev, AccDigitsCounter, ExponentSign, [...ExponentCounter, ...N1DigitsCounter]]
    : N1DigitsCounter extends [...ExponentCounter, ...infer RestExponentCounter] ?
      [Acc, AccRev, AccDigitsCounter, "", RestExponentCounter]
    : ExponentCounter extends [...N1DigitsCounter, ...infer RestExponentCounter extends 0[]] ?
      [Acc, AccRev, AccDigitsCounter, "-", RestExponentCounter]
    : never
  : Acc extends 9[] ?
    ExponentSign extends "" ?
      [[1], [1], [0], ExponentSign, [...ExponentCounter, ...AccDigitsCounter, ...N1DigitsCounter]]
    : [...AccDigitsCounter, ...N1DigitsCounter] extends (
      [...ExponentCounter, ...infer RestExponentCounter]
    ) ?
      [[1], [1], [0], "", RestExponentCounter]
    : ExponentCounter extends (
      [...AccDigitsCounter, ...N1DigitsCounter, ...infer RestExponentCounter extends 0[]]
    ) ?
      [[1], [1], [0], "-", RestExponentCounter]
    : never
  : ExponentSign extends "" ?
    [
      _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[0],
      _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[1],
      _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[2],
      ExponentSign,
      [...ExponentCounter, ...N1DigitsCounter],
    ]
  : N1DigitsCounter extends [...ExponentCounter, ...infer RestExponentCounter] ?
    [
      _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[0],
      _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[1],
      _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[2],
      "",
      RestExponentCounter,
    ]
  : ExponentCounter extends [...N1DigitsCounter, ...infer RestExponentCounter extends 0[]] ?
    [
      _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[0],
      _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[1],
      _AddDigits<Acc, AccRev, AccDigitsCounter, [1], [1], [0]>[2],
      "-",
      RestExponentCounter,
    ]
  : never;

export type _DivDigits<
  N1 extends number[],
  N1DigitsCounter extends 0[],
  N2Rev extends number[],
  ExponentSign extends "" | "-",
  ExponentCounter extends 0[],
> =
  DivDigits<N1, N1DigitsCounter, N2Rev, ExponentSign, ExponentCounter> extends (
    infer R extends [number[], number[], 0[], "" | "-", 0[]]
  ) ?
    R
  : never;

type test0 = Stringify<0.00000123>; // =>
type test1 = Stringify<0.000000123>; // =>
type test2 = Stringify<123000000000000000000>; // =>
type test3 = Stringify<1230000000000000000000>; // =>

type Stringify<N extends number> = `${N}`;
