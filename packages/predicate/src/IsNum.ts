import type { TypeGuard, TypeIs, TypeIsNot } from "@tyda/core";
import type { RawArg0, TypeLambda } from "hkt-core";

declare module "." {
  namespace Is {
    /**
     * Checks if the given type is `number`.
     *
     * Sig: `(a: unknown) => a is number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Is.Num<string>; // => false
     * type _2 = Is.Num<number>; // => true
     * type _3 = Is.Num<42>; // => true
     * ```
     */
    export type Num<A> = A extends number ? TypeIs<number> : TypeIsNot<number>;

    /**
     * [Fn] Checks if the given type is `number`.
     *
     * Sig: `(a: unknown) => a is number`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<string, Is.Num$>; // => false
     * type _2 = Pipe<number, Is.Num$>; // => true
     * type _3 = Pipe<42, Is.Num$>; // => true
     * ```
     */
    export interface Num$ extends TypeLambda<[a: unknown], TypeGuard<number>> {
      return: Num<RawArg0<this>>;
    }
  }
}
