/**
 * Pad the start of a string with a specified character until it reaches the desired length.
 * @private
 */
export type _PadStart<
  S extends string,
  PadChar extends string,
  LengthAtLeast extends string,
  Result extends string = "",
> =
  S extends `${infer First}${infer Rest}` ?
    LengthAtLeast extends `${string}${infer LengthRest}` ?
      _PadStart<Rest, PadChar, LengthRest, `${Result}${First}`>
    : _PadStart<Rest, PadChar, "", `${Result}${First}`>
  : LengthAtLeast extends `${string}${infer LengthRest}` ?
    _PadStart<"", PadChar, LengthRest, `${PadChar}${Result}`>
  : Result;
