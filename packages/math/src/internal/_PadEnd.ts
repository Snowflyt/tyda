/**
 * Pad the end of a string with a specified character until it reaches the desired length.
 * @private
 */
export type _PadEnd<
  S extends string,
  PadChar extends string,
  LengthAtLeast extends string,
  Result extends string = "",
> =
  S extends `${infer First}${infer Rest}` ?
    LengthAtLeast extends `${string}${infer LengthRest}` ?
      _PadEnd<Rest, PadChar, LengthRest, `${Result}${First}`>
    : _PadEnd<Rest, PadChar, "", `${Result}${First}`>
  : LengthAtLeast extends `${string}${infer LengthRest}` ?
    _PadEnd<"", PadChar, LengthRest, `${Result}${PadChar}`>
  : Result;
