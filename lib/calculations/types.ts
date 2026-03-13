/**
 * Calculation Types
 *
 * Shared types for calculation functions.
 */

export type CalculatorFunction = (input: any) => any;

/**
 * Calculator function result
 * Can be a proper result object or an error object
 */
export type CalculationResultData = {
  [key: string]: number | string;
};

export type CalculationResult = CalculationResultData & {
  error?: string;
};
