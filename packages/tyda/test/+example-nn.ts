import type { Arg0, Pipe, TypeLambda } from "hkt-core";
import type { Arr, Num } from "tyda";

import type { Dec } from "../../math/src/Dec/index";
import type { _Add } from "../../math/src/Dec/internal/_Add";
import type { _Exp } from "../../math/src/Dec/internal/_Exp";
import type { _Mul } from "../../math/src/Dec/internal/_Mul";
import type { _Stringify } from "../../math/src/Dec/internal/_Stringify";
import type { _Sub } from "../../math/src/Dec/internal/_Sub";
import type { _StrToNum } from "../../math/src/internal/_StrToNum";

/**
 * Generate a random number in range [0, 1) using Linear Congruential Generator.
 */
type LCG<Seed extends number> =
  Num.Mul<1664525, Seed> extends infer MulResult extends number ?
    Num.Add<MulResult, 1013904223> extends infer AddResult extends number ?
      Num.Rem<AddResult, 4294967296> extends infer NextSeed extends number ?
        [Num.Div<NextSeed, 4294967296>, NextSeed]
      : never
    : never
  : never;

type RandomMatrix<Rows extends number, Cols extends number, CurrSeed extends number = 42> =
  Rows extends 0 ? []
  : _RandomRow<Cols, CurrSeed> extends [infer Row extends number[], infer NextSeed extends number] ?
    [Row, ...RandomMatrix<Num.Dec<Rows>, Cols, NextSeed>] extends infer R extends number[][] ?
      R
    : never
  : never;
type _RandomRow<Cols extends number, CurrSeed extends number, Result extends number[] = []> =
  Cols extends 0 ? [Result, CurrSeed]
  : LCG<CurrSeed> extends [infer Value extends number, infer NextSeed extends number] ?
    _RandomRow<Num.Dec<Cols>, NextSeed, [...Result, Num.Sub<Value, 0.5>]>
  : never;

interface Sigmoid$ extends TypeLambda<[n: number], number> {
  return: Num.Div<1, _StrToNum<_Stringify<_Add<Dec<1>, _Exp<_Mul<Dec<Arg0<this>>, Dec<-1>>>>>>>;
}
type SigmoidDerivative<N extends number> = _StrToNum<
  _Stringify<_Mul<Dec<N>, _Sub<Dec<1>, Dec<N>>>>
>;

namespace NN {
  export interface State {
    LearningRate: number;
    WeightsInputHidden: number[][];
    WeightsHiddenOutput: number[][];
  }

  export type New<
    InputNodes extends number,
    HiddenNodes extends number,
    OutputNodes extends number,
    LearningRate extends number,
    WeightsInputHidden extends number[][] = RandomMatrix<HiddenNodes, InputNodes>,
    WeightsHiddenOutput extends number[][] = RandomMatrix<OutputNodes, HiddenNodes>,
  > = {
    LearningRate: LearningRate;
    WeightsInputHidden: WeightsInputHidden;
    WeightsHiddenOutput: WeightsHiddenOutput;
  };

  export type Forward<NN extends State, InputArray extends number[]> =
    Pipe<
      NN["WeightsInputHidden"],
      Arr.Map$<FoldRowWeight$<InputArray>>,
      Arr.Map$<Sigmoid$>
    > extends infer HiddenOutputs extends number[] ?
      Pipe<
        NN["WeightsHiddenOutput"],
        Arr.Map$<FoldRowWeight$<HiddenOutputs>>,
        Arr.Map$<Sigmoid$>
      > extends infer FinalOutputs extends number[] ?
        [HiddenOutputs, FinalOutputs]
      : never
    : never;
  interface FoldRowWeight$<InputArray extends number[]> extends TypeLambda<
    [row: number[]],
    number
  > {
    return: _FoldRowWeight<Arg0<this>, InputArray>;
  }
  type _FoldRowWeight<
    Row extends number[],
    InputArray extends number[],
    Result extends number = 0,
  > =
    Row extends [infer RowHead extends number, ...infer RowTail extends number[]] ?
      InputArray extends [infer InputHead extends number, ...infer InputTail extends number[]] ?
        _FoldRowWeight<RowTail, InputTail, Num.Add<Result, Num.Mul<RowHead, InputHead>>>
      : never
    : Result;

  export type Train<NN extends State, InputArray extends number[], TargetArray extends number[]> =
    Forward<NN, InputArray> extends (
      [infer HiddenOutputs extends number[], infer FinalOutputs extends number[]]
    ) ?
      CalculateOutputErrors<FinalOutputs, TargetArray> extends infer OutputErrors extends number[] ?
        CalculateHiddenErrors<NN["WeightsHiddenOutput"], OutputErrors> extends (
          infer HiddenErrors extends number[]
        ) ?
          {
            LearningRate: NN["LearningRate"];
            WeightsInputHidden: UpdateWeights<
              NN["WeightsInputHidden"],
              NN["LearningRate"],
              HiddenErrors,
              HiddenOutputs,
              InputArray
            >;
            WeightsHiddenOutput: UpdateWeights<
              NN["WeightsHiddenOutput"],
              NN["LearningRate"],
              OutputErrors,
              FinalOutputs,
              HiddenOutputs
            >;
          }
        : never
      : never
    : never;
  type CalculateOutputErrors<
    FinalOutputs extends number[],
    TargetArray extends number[],
    Result extends number[] = [],
  > =
    FinalOutputs extends (
      [infer FinalOutput extends number, ...infer FinalOutputsTail extends number[]]
    ) ?
      TargetArray extends [infer Target extends number, ...infer TargetArrayTail extends number[]] ?
        CalculateOutputErrors<
          FinalOutputsTail,
          TargetArrayTail,
          [...Result, Num.Sub<Target, FinalOutput>]
        >
      : never
    : Result;
  type CalculateHiddenErrors<
    WeightsHiddenOutput extends number[][],
    OutputErrors extends number[],
    I extends number = 0,
    Result extends number[] = [],
  > =
    I extends WeightsHiddenOutput[0]["length"] ? Result
    : CalculateHiddenErrors<
        WeightsHiddenOutput,
        OutputErrors,
        Num.Add<I, 1>,
        [...Result, _FoldOutputErrors<WeightsHiddenOutput, I, OutputErrors>]
      >;
  type _FoldOutputErrors<
    WeightsHiddenOutput extends number[][],
    Col extends number,
    OutputErrors extends number[],
    Result extends number = 0,
  > =
    WeightsHiddenOutput extends [infer Row extends number[], ...infer Rows extends number[][]] ?
      OutputErrors extends (
        [infer OutputErrorHead extends number, ...infer OutputErrorTail extends number[]]
      ) ?
        _FoldOutputErrors<
          Rows,
          Col,
          OutputErrorTail,
          Num.Add<Result, Num.Mul<Row[Col], OutputErrorHead>>
        >
      : never
    : Result;

  type UpdateWeights<
    Weights extends number[][],
    LearningRate extends number,
    Errors extends number[],
    Outputs extends number[],
    Inputs extends number[],
  > = _UpdateMatrix<LearningRate, Weights, 0, Errors, Outputs, Inputs>;
  type _UpdateWeight<
    Weight extends number,
    LearningRate extends number,
    Error extends number,
    Output extends number,
    Input extends number,
  > = Num.Add<
    Weight,
    Num.Mul<Num.Mul<Num.Mul<LearningRate, Error>, SigmoidDerivative<Output>>, Input>
  >;
  type _UpdateRow<
    LearningRate extends number,
    Row extends number[],
    RowIndex extends number,
    ColIndex extends number,
    Errors extends number[],
    Outputs extends number[],
    Inputs extends number[],
    Result extends number[] = [],
  > =
    ColIndex extends Row["length"] ? Result
    : _UpdateWeight<
      Row[ColIndex],
      LearningRate,
      Errors[RowIndex],
      Outputs[RowIndex],
      Inputs[ColIndex]
    > extends infer UpdatedWeight extends number ?
      _UpdateRow<
        LearningRate,
        Row,
        RowIndex,
        Num.Add<ColIndex, 1>,
        Errors,
        Outputs,
        Inputs,
        [...Result, UpdatedWeight]
      >
    : never;
  type _UpdateMatrix<
    LearningRate extends number,
    Matrix extends number[][],
    RowIndex extends number,
    Errors extends number[],
    Outputs extends number[],
    Inputs extends number[],
    Result extends number[][] = [],
  > =
    RowIndex extends Matrix["length"] ? Result
    : _UpdateRow<LearningRate, Matrix[RowIndex], RowIndex, 0, Errors, Outputs, Inputs> extends (
      infer UpdatedRow extends number[]
    ) ?
      _UpdateMatrix<
        LearningRate,
        Matrix,
        Num.Add<RowIndex, 1>,
        Errors,
        Outputs,
        Inputs,
        [...Result, UpdatedRow]
      >
    : never;

  export type Predict<NN extends State, InputArray extends number[]> = Forward<NN, InputArray>[1];
}

type TrainRepeat<NN extends NN.State, Repeat extends number> =
  Repeat extends 0 ? NN
  : TrainRepeat<NN.Train<NN.Train<NN, [1], [0.1]>, [2], [0.2]>, Num.Dec<Repeat>>;

type InputNodes = 1;
type HiddenNodes = 4;
type OutputNodes = 1;
type LearningRate = 10;

// Try to fit `y = 0.1x`
type NN = NN.New<InputNodes, HiddenNodes, OutputNodes, LearningRate>;

type NextNN1 = NN.Train<NN, [1], [0.1]>;
