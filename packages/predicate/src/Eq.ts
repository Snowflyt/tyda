import type { RawArg0, RawArg1, TypeLambda } from "hkt-core";

declare module "." {
  /**
   * Checks if two types are exactly equal.
   *
   * **Example**
   *
   * ```typescript
   * type _1 = Eq<1, 1>; // => true
   * type _2 = Eq<1, number>; // => false
   * type _3 = Eq<1, 1 | 2>; // => false
   * ```
   */
  export type Eq<A, B> =
    (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2 ? true : false;

  /**
   * [Fn] Checks if another type is exactly equal to the given type.
   *
   * **Example**
   *
   * ```typescript
   * type _1 = Pipe<1, Eq$<1>>; // => true
   * type _2 = Pipe<1, Eq$<number>>; // => false
   * type _3 = Pipe<1, Eq$<1 | 2>>; // => false
   * ```
   */
  export interface Eq$<That> extends TypeLambda<[self: unknown], boolean> {
    return: Eq<RawArg0<this>, That>;
  }

  /**
   * [Fn] Checks if two types are exactly equal.
   *
   * **Example**
   *
   * ```typescript
   * type _1 = Call2<Eq$$, 1, 1>; // => true
   * type _2 = Call2<Eq$$, 1, number>; // => false
   * type _3 = Call2<Eq$$, 1, 1 | 2>; // => false
   * ```
   */
  export interface Eq$$ extends TypeLambda<[a: unknown, b: unknown], boolean> {
    return: Eq<RawArg0<this>, RawArg1<this>>;
  }
}
