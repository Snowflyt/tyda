/**
 * @module
 * @private
 * @internal
 */

export type Dec = [
  sign: "" | "-",
  coefficientDigits: number[],
  coefficientDigitsRev: number[],
  coefficientDigitsCounter: 0[],
  exponentSign: "" | "-",
  exponentCounter: 0[],
  special: "Finite" | "NaN" | "Infinity",
];

export namespace Dec {
  export type NaN = [
    sign: "",
    coefficientDigits: [],
    coefficientDigitsRev: [],
    coefficientDigitsCounter: [],
    exponentSign: "",
    exponentCounter: [],
    special: "NaN",
  ];

  export type Infinity = [
    sign: "",
    coefficientDigits: [],
    coefficientDigitsRev: [],
    coefficientDigitsCounter: [],
    exponentSign: "",
    exponentCounter: [],
    special: "Infinity",
  ];
  export type NegativeInfinity = [
    sign: "-",
    coefficientDigits: [],
    coefficientDigitsRev: [],
    coefficientDigitsCounter: [],
    exponentSign: "",
    exponentCounter: [],
    special: "Infinity",
  ];

  export type Zero = [
    sign: "",
    coefficientDigits: [0],
    coefficientDigitsRev: [0],
    coefficientDigitsCounter: [0],
    exponentSign: "",
    exponentCounter: [],
    special: "Finite",
  ];
  export type NegativeZero = [
    sign: "-",
    coefficientDigits: [0],
    coefficientDigitsRev: [0],
    coefficientDigitsCounter: [0],
    exponentSign: "",
    exponentCounter: [],
    special: "Finite",
  ];
}
