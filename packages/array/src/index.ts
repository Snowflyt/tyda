import type { HKT, RawArg0 } from "hkt-core";

export interface ArrHKT extends HKT<unknown, readonly unknown[]> {
  return: readonly RawArg0<this>[];
}

import type {} from "./Array";
import type {} from "./Elem";
import type {} from "./Head";
import type {} from "./HeadOption";
import type {} from "./IsFixedLengthTuple";
import type {} from "./IsReadonly";
import type {} from "./IsTuple";
import type {} from "./IsWritable";
import type {} from "./Map";
import type {} from "./Mix";
import type {} from "./Mutate";
import type {} from "./Of1";
import type {} from "./ReadonlyArray";
import type {} from "./Tail";
import type {} from "./TailOption";
import type {} from "./TailOrEmpty";
import type {} from "./UnsafeHead";
import type {} from "./UnsafeTail";

/**
 * Utilities for arrays and tuples.
 */
export namespace Arr {}
