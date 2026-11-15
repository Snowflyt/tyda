import type { _StrToNum } from "./_StrToNum";

/*
 * Decimal arithmetic on number literals, done on their digit strings.
 *
 * Operands are handled as decimal strings: signs are stripped, fractions aligned by padding with
 * zeroes, the digits are added/subtracted/multiplied/divided, and the decimal point is put back.
 * Additions and multiplications are exact; divisions keep producing digits until the next digit
 * would make the result unrepresentable as a `number` literal. Results go back through `_StrToNum`.
 */

type Tup = {
  "0": [];
  "1": [0];
  "2": [0, 0];
  "3": [0, 0, 0];
  "4": [0, 0, 0, 0];
  "5": [0, 0, 0, 0, 0];
  "6": [0, 0, 0, 0, 0, 0];
  "7": [0, 0, 0, 0, 0, 0, 0];
  "8": [0, 0, 0, 0, 0, 0, 0, 0];
  "9": [0, 0, 0, 0, 0, 0, 0, 0, 0];
};
type Digit = keyof Tup;
type Ten = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
type Len<T extends 0[]> = T extends { length: infer L extends number } ? L : never;

/** First char, or `"0"` past the end (so shorter operands are zero-padded). */
type Head<S extends string> = S extends `${infer H extends Digit}${string}` ? H : "0";
type Tail<S extends string> = S extends `${string}${infer T}` ? T : "";
type Rev<S extends string, Acc extends string = ""> =
  S extends `${infer H}${infer T}` ? Rev<T, `${H}${Acc}`> : Acc;
type Strip<S extends string> =
  S extends `0${infer T}` ?
    T extends "" ?
      "0"
    : Strip<T>
  : S;
/** Split a 1–2 digit string into `[carry, digit]`. */
type Split<S extends string> =
  S extends `${infer C extends Digit}${infer D extends Digit}` ? [C, D] : ["0", S];

/* ---- naturals: inputs reversed (least significant first), output in normal order ---- */

type AddR<A extends string, B extends string, C extends Digit = "0", Acc extends string = ""> =
  [A, B] extends ["", ""] ?
    C extends "0" ?
      Acc
    : `${C}${Acc}`
  : Split<`${Len<[...Tup[Head<A>], ...Tup[Head<B>], ...Tup[C]]>}`> extends (
    [infer C2 extends Digit, infer D extends string]
  ) ?
    AddR<Tail<A>, Tail<B>, C2, `${D}${Acc}`>
  : never;

/** `A - B`, or `"-"` if `A < B`. Keeps leading zeroes. */
type SubR<A extends string, B extends string, Br extends [] | [0] = [], Acc extends string = ""> =
  [A, B] extends ["", ""] ?
    Br extends [] ?
      Acc
    : "-"
  : Tup[Head<A>] extends [...Tup[Head<B>], ...Br, ...infer R] ?
    SubR<Tail<A>, Tail<B>, [], `${R["length"]}${Acc}`>
  : [...Tup[Head<A>], ...Ten] extends [...Tup[Head<B>], ...Br, ...infer R] ?
    SubR<Tail<A>, Tail<B>, [0], `${R["length"]}${Acc}`>
  : never;

type Times<X extends 0[], N extends 0[]> =
  N extends [0, ...infer R extends 0[]] ? [...X, ...Times<X, R>] : [];

/** `A * D` for reversed `A` and a single digit `D`. */
type MulDigitR<A extends string, D extends Digit, C extends Digit = "0", Acc extends string = ""> =
  A extends `${infer H extends Digit}${infer T}` ?
    Split<`${Len<[...Times<Tup[H], Tup[D]>, ...Tup[C]]>}`> extends (
      [infer C2 extends Digit, infer E extends string]
    ) ?
      MulDigitR<T, D, C2, `${E}${Acc}`>
    : never
  : C extends "0" ? Acc
  : `${C}${Acc}`;

type AddN<A extends string, B extends string> = AddR<Rev<A>, Rev<B>>;
type SubN<A extends string, B extends string> = SubR<Rev<A>, Rev<B>>;
/** Horner's scheme over the digits of `B`. */
type MulN<RA extends string, B extends string, Acc extends string = "0"> =
  B extends `${infer D extends Digit}${infer T}` ?
    MulN<RA, T, Strip<AddN<`${Acc}0`, MulDigitR<RA, D>>>>
  : Acc;

/** Largest `Q` (0–9) with `B * Q <= R`, as `[Q, R - B * Q]`. */
type DivDigit<R extends string, B extends string, Q extends 0[] = []> =
  SubN<R, B> extends `${infer Next extends string}` ?
    Next extends "-" ?
      [`${Q["length"]}`, R]
    : DivDigit<Strip<Next>, B, [...Q, 0]>
  : never;

/** Long division of naturals `A / B`; stops when the remainder is 0 or the next fraction digit is unrepresentable. */
type DivN<
  A extends string,
  B extends string,
  R extends string = "0",
  I extends string = "",
  F extends string | null = null,
> =
  A extends `${infer D}${infer T}` ?
    DivDigit<Strip<`${R}${D}`>, B> extends [infer Q extends string, infer R2 extends string] ?
      DivN<T, B, R2, `${I}${Q}`>
    : never
  : R extends "0" ?
    F extends string ?
      `${I}.${F}`
    : I
  : DivDigit<`${R}0`, B> extends [infer Q extends string, infer R2 extends string] ?
    `${F extends string ? F : ""}${Q}` extends infer F2 extends string ?
      Q extends "0" ? DivN<"", B, R2, I, F2>
      : `${Strip<I>}.${F2}` extends `${infer N extends number}` ?
        number extends N ?
          F extends string ?
            `${I}.${F}`
          : I
        : DivN<"", B, R2, I, F2>
      : never
    : never
  : never;

/* ---- decimal strings, e.g. `"-4356.791"` ---- */

type Sign<S extends string> = S extends `-${string}` ? "-" : "";
type Abs<S extends string> = S extends `-${infer A}` ? A : S;
type Negate<S extends string> = S extends `-${infer A}` ? A : `-${S}`;
type Frac<S extends string> = S extends `${string}.${infer F}` ? F : "";
type Xor<A extends string, B extends string> = Sign<A> extends Sign<B> ? "" : "-";
type Longer<A extends string, B extends string, SA extends string = A, SB extends string = B> =
  SA extends `${string}${infer TA}` ?
    SB extends `${string}${infer TB}` ?
      Longer<A, B, TA, TB>
    : A
  : B;

/** Digits of a non-negative decimal times 10 ** `K.length` (`K` is at least as long as its fraction). */
type Scale<
  S extends string,
  K extends string,
  F extends string = Frac<S>,
  Acc extends string = S extends `${infer I}.${infer G}` ? `${I}${G}` : S,
> =
  K extends `${string}${infer KT}` ?
    F extends `${string}${infer FT}` ?
      Scale<S, KT, FT, Acc>
    : Scale<S, KT, "", `${Acc}0`>
  : Acc;

/** Digits divided by 10 ** `K.length`, i.e. a decimal point before the last `K.length` digits. */
type Place<D extends string, K extends string> = PlaceR<Rev<D>, K>;
type PlaceR<RD extends string, K extends string, F extends string = ""> =
  K extends `${string}${infer KT}` ? PlaceR<Tail<RD>, KT, `${Head<RD>}${F}`>
  : `${RD extends "" ? "0" : Rev<RD>}.${F}`;

type AddS<A extends string, B extends string, K extends string = Longer<Frac<A>, Frac<B>>> =
  [Scale<Abs<A>, K>, Scale<Abs<B>, K>] extends [infer X extends string, infer Y extends string] ?
    Sign<A> extends Sign<B> ? `${Sign<A>}${Place<AddN<X, Y>, K>}`
    : SubN<X, Y> extends "-" ? `${Sign<B>}${Place<SubN<Y, X>, K>}`
    : `${Sign<A>}${Place<SubN<X, Y>, K>}`
  : never;

type MulS<
  A extends string,
  B extends string,
> = `${Xor<A, B>}${Place<MulN<Rev<Scale<Abs<A>, "">>, Scale<Abs<B>, "">>, `${Frac<A>}${Frac<B>}`>}`;

type DivS<A extends string, B extends string, K extends string = Longer<Frac<A>, Frac<B>>> =
  Strip<Scale<Abs<B>, K>> extends infer Y extends string ?
    Y extends "0" ?
      number
    : `${Xor<A, B>}${DivN<Strip<Scale<Abs<A>, K>>, Y>}`
  : never;

/**
 * `number`/`any` give `number`, `never` gives `never`, unions distribute. Exponent-notation
 * literals (e.g. `1e21`) give `number`.
 */
type Op<N1, N2, O extends "+" | "-" | "*" | "/"> =
  number extends N1 | N2 ? number
  : N1 extends number ?
    N2 extends number ?
      `${N1}${N2}` extends `${string}e${string}` ? number
      : (
        O extends "+" ? AddS<`${N1}`, `${N2}`>
        : O extends "-" ? AddS<`${N1}`, Negate<`${N2}`>>
        : O extends "*" ? MulS<`${N1}`, `${N2}`>
        : DivS<`${N1}`, `${N2}`>
      ) extends infer R ?
        R extends string ?
          _StrToNum<R>
        : R
      : never
    : never
  : never;

/** @private */
export type _Add<N1, N2> = Op<N1, N2, "+">;
/** @private */
export type _Sub<N1, N2> = Op<N1, N2, "-">;
/** @private */
export type _Mul<N1, N2> = Op<N1, N2, "*">;
/** @private */
export type _Div<N1, N2> = Op<N1, N2, "/">;
