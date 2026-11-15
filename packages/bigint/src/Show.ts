import type { ImplShow } from "@tyda/typeclass";
import type { RawArg0, TypeLambda } from "hkt-core";

declare module "@tyda/typeclass" {
  interface ShowImpl {
    bigint: ImplShow<
      bigint,
      {
        Show$: Show$;
      }
    >;
  }
}

interface Show$ extends TypeLambda<[self: bigint], string> {
  return: bigint extends RawArg0<this> ? "bigint" : `${RawArg0<this> & bigint}n`;
}
