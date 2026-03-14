/**
 * Calculation Registry
 *
 * Explicit mapping of calculator IDs to their calculation functions.
 * This registry is a pure mapping layer - all actual calculation logic
 * lives in separate category files.
 */

// ============================================================================
// Import Calculation Functions from Category Modules
// ============================================================================

import {
  calculateLoan,
  calculateMortgage,
  calculateCompoundInterest,
  calculateSavings,
  calculateHourlyToSalary,
  calculateSalaryToHourly,
  calculateOvertime,
  calculateSalaryIncrease,
  calculateContractorVsEmployeeTakeHome,
  calculateSideHustleProfit,
  calculateContractorRate,
  calculateCanadaGstHst,
  calculateCanadaRrspVsTfsa,
  calculateCanadaMortgageAffordability,
  calculateCanadaRentVsBuy,
  calculateCanadaHomeBuyingCost,
  calculateCanadaEmergencyFund,
  calculateGrossToNetSalary,
  calculateNetToGrossSalary,
} from './finance';
import type { CalculatorFunction } from './types';

// ============================================================================
// Calculator Registry Type
// ============================================================================

export interface CalculatorRegistryEntry {
  calculate: CalculatorFunction;
  inputType: string;
  outputType: string;
  category: string;
  implemented: boolean;
}

// ============================================================================
// Calculator Registry (Explicit Mapping Layer)
// ============================================================================

/**
 * The registry maps calculator IDs to their calculation functions.
 * All actual calculation logic lives in separate category files.
 *
 * To add a new calculator:
 * 1. Create calculation function in appropriate category file
 * 2. Add entry here with category and function reference
 */
export const calculatorRegistry: Record<string, CalculatorRegistryEntry> = {
  // ========== Finance Calculators (Launch Cluster - IMPLEMENTED) ==========
  'loan-calculator': {
    calculate: calculateLoan,
    inputType: 'LoanCalculatorInput',
    outputType: 'LoanCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'mortgage-calculator': {
    calculate: calculateMortgage,
    inputType: 'MortgageCalculatorInput',
    outputType: 'MortgageCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'compound-interest-calculator': {
    calculate: calculateCompoundInterest,
    inputType: 'CompoundInterestCalculatorInput',
    outputType: 'CompoundInterestCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'savings-calculator': {
    calculate: calculateSavings,
    inputType: 'SavingsCalculatorInput',
    outputType: 'SavingsCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'gross-to-net-salary-calculator': {
    calculate: calculateGrossToNetSalary,
    inputType: 'GrossToNetSalaryCalculatorInput',
    outputType: 'GrossToNetSalaryCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'net-to-gross-salary-calculator': {
    calculate: calculateNetToGrossSalary,
    inputType: 'NetToGrossSalaryCalculatorInput',
    outputType: 'NetToGrossSalaryCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'hourly-to-salary-calculator': {
    calculate: calculateHourlyToSalary,
    inputType: 'HourlyToSalaryCalculatorInput',
    outputType: 'HourlyToSalaryCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'salary-to-hourly-calculator': {
    calculate: calculateSalaryToHourly,
    inputType: 'SalaryToHourlyCalculatorInput',
    outputType: 'SalaryToHourlyCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'overtime-calculator': {
    calculate: calculateOvertime,
    inputType: 'OvertimeCalculatorInput',
    outputType: 'OvertimeCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'salary-increase-calculator': {
    calculate: calculateSalaryIncrease,
    inputType: 'SalaryIncreaseCalculatorInput',
    outputType: 'SalaryIncreaseCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'contractor-vs-employee-take-home-estimator': {
    calculate: calculateContractorVsEmployeeTakeHome,
    inputType: 'ContractorVsEmployeeTakeHomeEstimatorInput',
    outputType: 'ContractorVsEmployeeTakeHomeEstimatorOutput',
    category: 'finance',
    implemented: true,
  },
  'side-hustle-profit-estimator': {
    calculate: calculateSideHustleProfit,
    inputType: 'SideHustleProfitEstimatorInput',
    outputType: 'SideHustleProfitEstimatorOutput',
    category: 'finance',
    implemented: true,
  },
  'contractor-rate-calculator': {
    calculate: calculateContractorRate,
    inputType: 'ContractorRateCalculatorInput',
    outputType: 'ContractorRateCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'gst-hst-calculator': {
    calculate: calculateCanadaGstHst,
    inputType: 'CanadaGstHstCalculatorInput',
    outputType: 'CanadaGstHstCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'rrsp-vs-tfsa-calculator': {
    calculate: calculateCanadaRrspVsTfsa,
    inputType: 'CanadaRrspVsTfsaCalculatorInput',
    outputType: 'CanadaRrspVsTfsaCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'mortgage-affordability-calculator': {
    calculate: calculateCanadaMortgageAffordability,
    inputType: 'CanadaMortgageAffordabilityCalculatorInput',
    outputType: 'CanadaMortgageAffordabilityCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'rent-vs-buy-calculator': {
    calculate: calculateCanadaRentVsBuy,
    inputType: 'CanadaRentVsBuyCalculatorInput',
    outputType: 'CanadaRentVsBuyCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'home-buying-cost-calculator': {
    calculate: calculateCanadaHomeBuyingCost,
    inputType: 'CanadaHomeBuyingCostCalculatorInput',
    outputType: 'CanadaHomeBuyingCostCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  'emergency-fund-calculator': {
    calculate: calculateCanadaEmergencyFund,
    inputType: 'CanadaEmergencyFundCalculatorInput',
    outputType: 'CanadaEmergencyFundCalculatorOutput',
    category: 'finance',
    implemented: true,
  },
  // ========== Health Calculators (Content Only - PENDING IMPLEMENTATION) ==========
  'bmi-calculator': {
    calculate: () => ({ error: 'Calculation not yet implemented' }),
    inputType: 'BMICalculatorInput',
    outputType: 'BMICalculatorOutput',
    category: 'health',
    implemented: false,
  },
  'calorie-calculator': {
    calculate: () => ({ error: 'Calculation not yet implemented' }),
    inputType: 'CalorieCalculatorInput',
    outputType: 'CalorieCalculatorOutput',
    category: 'health',
    implemented: false,
  },
  // ========== Math Calculators (Content Only - PENDING IMPLEMENTATION) ==========
  'percentage-calculator': {
    calculate: () => ({ error: 'Calculation not yet implemented' }),
    inputType: 'PercentageCalculatorInput',
    outputType: 'PercentageCalculatorOutput',
    category: 'math',
    implemented: false,
  },
  'area-calculator': {
    calculate: () => ({ error: 'Calculation not yet implemented' }),
    inputType: 'AreaCalculatorInput',
    outputType: 'AreaCalculatorOutput',
    category: 'math',
    implemented: false,
  },
  // ========== Construction Calculators (Content Only - PENDING IMPLEMENTATION) ==========
  'concrete-calculator': {
    calculate: () => ({ error: 'Calculation not yet implemented' }),
    inputType: 'ConcreteCalculatorInput',
    outputType: 'ConcreteCalculatorOutput',
    category: 'construction',
    implemented: false,
  },
  'gravel-calculator': {
    calculate: () => ({ error: 'Calculation not yet implemented' }),
    inputType: 'GravelCalculatorInput',
    outputType: 'GravelCalculatorOutput',
    category: 'construction',
    implemented: false,
  },
  // ========== Everyday Life Calculators (Content Only - PENDING IMPLEMENTATION) ==========
  'tip-calculator': {
    calculate: () => ({ error: 'Calculation not yet implemented' }),
    inputType: 'TipCalculatorInput',
    outputType: 'TipCalculatorOutput',
    category: 'everyday-life',
    implemented: false,
  },
  'age-calculator': {
    calculate: () => ({ error: 'Calculation not yet implemented' }),
    inputType: 'AgeCalculatorInput',
    outputType: 'AgeCalculatorOutput',
    category: 'everyday-life',
    implemented: false,
  },
};

// ============================================================================
// Registry Access Functions
// ============================================================================

/**
 * Get calculation function entry for a calculator by ID
 */
export function getCalculatorEntry(id: string): CalculatorRegistryEntry | undefined {
  return calculatorRegistry[id];
}

/**
 * Get calculation function for a calculator by ID
 */
export function getCalculatorFunction(id: string): CalculatorFunction | null {
  const entry = calculatorRegistry[id];
  return entry?.calculate ?? null;
}

/**
 * Check if a calculator has a registered calculation function
 */
export function hasCalculatorFunction(id: string): boolean {
  const entry = calculatorRegistry[id];
  return entry?.implemented ?? false;
}

/**
 * Check if a calculator is fully implemented (not a placeholder)
 */
export function isCalculatorImplemented(id: string): boolean {
  const entry = calculatorRegistry[id];
  return entry?.implemented ?? false;
}

/**
 * Get all registered calculator IDs
 */
export function getRegisteredCalculatorIds(): string[] {
  return Object.keys(calculatorRegistry);
}

/**
 * Get calculator IDs by category
 */
export function getCalculatorIdsByCategory(category: string): string[] {
  return Object.entries(calculatorRegistry)
    .filter(([, entry]) => entry.category === category)
    .map(([id]) => id);
}

/**
 * Get fully implemented calculator IDs by category
 */
export function getImplementedCalculatorsByCategory(category: string): string[] {
  return Object.entries(calculatorRegistry)
    .filter(([, entry]) => entry.category === category && entry.implemented)
    .map(([id]) => id);
}

/**
 * Execute a calculator calculation
 */
export function executeCalculation<TInput = any, TOutput = any>(
  calculatorId: string,
  input: TInput
): TOutput | null {
  const entry = calculatorRegistry[calculatorId];
  if (!entry) {
    console.warn(`No calculation function registered for: ${calculatorId}`);
    return null;
  }
  const result = entry.calculate(input);
  return result as TOutput;
}

/**
 * Get registry status summary
 */
export function getRegistryStatus(): {
  total: number;
  implemented: number;
  byCategory: Record<string, { total: number; implemented: number }>;
} {
  const summary = {
    total: 0,
    implemented: 0,
    byCategory: {} as Record<string, { total: number; implemented: number }>,
  };

  for (const [id, entry] of Object.entries(calculatorRegistry)) {
    summary.total++;
    const isImplemented = entry.implemented;
    if (!summary.byCategory[entry.category]) {
      summary.byCategory[entry.category] = { total: 0, implemented: 0 };
    }
    summary.byCategory[entry.category].total++;
    if (isImplemented) {
      summary.byCategory[entry.category].implemented++;
    }
  }

  return summary;
}
