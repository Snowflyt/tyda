import type { ImplFunctor } from "@tyda/typeclass";
import type {
  Call1W,
  Param0,
  PickTypeArgs,
  RawArg0,
  RawArg1,
  RetType,
  TArg,
  TypeLambda,
  TypeLambdaG,
} from "hkt-core";

import type { Arr, ArrHKT } from ".";

declare module "@tyda/typeclass" {
  interface FunctorImpl {
    array: ImplFunctor<
      ArrHKT,
      {
        Map$$: Arr.Map$$;
      }
    >;
  }
}

declare module "." {
  namespace Arr {
    /**
     * Applies a type-level function to each element of the given array or tuple,
     * returning a new array or tuple with the transformed elements.
     *
     * Sig: `<A, B>(self: readonly A[], f: (a: A) => B) => readonly B[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.Map<[1, 2, 3], Num.Inc$>; // => [2, 3, 4]
     * type _2 = Arr.Map<readonly string[], Str.ToUpper$>; // => readonly Uppercase<string>[]
     * ```
     */
    export type Map<
      Self extends readonly unknown[],
      F extends TypeLambda<[a: Required<Self>[number]], unknown>,
    > = _Map<Self, F>;

    /**
     * [Fn] Applies a type-level function to each element of the given array or tuple,
     * returning a new array or tuple with the transformed elements.
     *
     * Sig: `<A, B>[f: (a: A) => B](self: readonly A[]) => readonly B[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<[1, 2, 3], Arr.Map$<Num.Inc$>>; // => [2, 3, 4]
     * type _2 = Pipe<readonly string[], Arr.Map$<Str.ToUpper$>>; // => readonly Uppercase<string>[]
     * ```
     */
    export interface Map$<F extends TypeLambda<[a: never], unknown>> extends TypeLambda {
      readonly "~hkt": F["~hkt"];
      signature: (
        self: readonly Param0<F & PickTypeArgs<this>>[],
      ) => readonly RetType<F & PickTypeArgs<this>>[];
      return: _Map<RawArg0<this>, F>;
    }

    /**
     * [Fn] Applies a type-level function to each element of a given array or tuple,
     * returning a new array or tuple with the transformed elements.
     *
     * Sig: `<A, B>(self: readonly A[], f: (a: A) => B) => readonly B[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Arr.Map$$, [1, 2, 3], Num.Inc$>; // => [2, 3, 4]
     * type _2 = Call2<Arr.Map$$, readonly string[], Str.ToUpper$>; // => readonly Uppercase<string>[]
     * ```
     */
    export interface Map$$ extends TypeLambdaG<["A", "B"]> {
      signature: (
        self: readonly TArg<this, "A">[],
        f: TypeLambda<[a: TArg<this, "A">], TArg<this, "B">>,
      ) => readonly TArg<this, "B">[];
      return: _Map<RawArg0<this>, RawArg1<this>>;
    }
  }
}

type _Map<Self, F> =
  0 extends 1 & Self ? readonly Call1W<F, any>[]
  : { [K in keyof Self]: Call1W<F, Required<Self>[K]> };
