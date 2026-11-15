import type { ImplShow } from "@tyda/typeclass";
import type { RawArg0, TypeLambda } from "hkt-core";

declare module "@tyda/typeclass" {
  interface ShowImpl {
    number: ImplShow<
      number,
      {
        Show$: Show$;
      }
    >;
  }
}

interface Show$ extends TypeLambda<[self: number], string> {
  return: number extends RawArg0<this> ? "number" : `${RawArg0<this> & number}`;
}
