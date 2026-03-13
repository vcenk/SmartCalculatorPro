/**
 * Finance Calculations
 *
 * All calculation functions for finance calculators.
 * Loan, Mortgage, Compound Interest, Savings, and Salary calculations.
 */

// ============================================================================
// Input Types
// ============================================================================

export interface LoanCalculatorInput {
  loanAmount: number;
  annualInterestRate: number;
  loanTermYears: number;
}

export interface LoanCalculatorOutput {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

export interface MortgageCalculatorInput extends LoanCalculatorInput {
  propertyTaxAnnual?: number;
  insuranceAnnual?: number;
}

export interface MortgageCalculatorOutput {
  monthlyPrincipalInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

export interface CompoundInterestCalculatorInput {
  principal: number;
  annualInterestRate: number;
  years: number;
  contributionAmount?: number;
  contributionFrequency?: 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'weekly';
  compoundingFrequency?: 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'weekly' | 'daily';
}

export interface CompoundInterestCalculatorOutput {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
}

export interface SavingsCalculatorInput {
  currentSavings: number;
  monthlyContribution: number;
  annualInterestRate?: number;
  savingsGoal: number;
}

export interface SavingsCalculatorOutput {
  monthsToGoal: number;
  yearsToGoal: number;
  totalContributions: number;
  totalInterestEarned: number;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get number of periods per year based on frequency
 */
function getPeriodsPerYear(frequency: string): number {
  const periods: Record<string, number> = {
    annually: 1,
    'semi-annually': 2,
    quarterly: 4,
    monthly: 12,
    weekly: 52,
    daily: 365,
  };
  return periods[frequency] || 12;
}

// ============================================================================
// Loan Calculation
// ============================================================================

/**
 * Calculate loan payments using standard amortization formula
 * M = P × [r(1+r)^n] / [(1+r)^n − 1]
 */
export function calculateLoan(input: LoanCalculatorInput): LoanCalculatorOutput {
  const { loanAmount, annualInterestRate, loanTermYears } = input;

  const monthlyRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPayment: number;

  if (monthlyRate === 0) {
    // Simple division if interest rate is 0
    monthlyPayment = loanAmount / numberOfPayments;
  } else {
    // Standard amortization formula
    const growthFactor = Math.pow(1 + monthlyRate, numberOfPayments);
    monthlyPayment =
      (loanAmount * monthlyRate * growthFactor) / (growthFactor - 1);
  }

  const totalCost = monthlyPayment * numberOfPayments;
  const totalInterest = totalCost - loanAmount;

  return {
    monthlyPayment,
    totalInterest,
    totalCost,
  };
}

// ============================================================================
// Mortgage Calculation
// ============================================================================

/**
 * Calculate mortgage payments including property tax and insurance
 */
export function calculateMortgage(input: MortgageCalculatorInput): MortgageCalculatorOutput {
  const { propertyTaxAnnual = 0, insuranceAnnual = 0, ...loanInput } = input;

  // Calculate principal and interest using loan formula
  const loanResult = calculateLoan(loanInput);

  // Calculate monthly portions of tax and insurance
  const monthlyTax = propertyTaxAnnual / 12;
  const monthlyInsurance = insuranceAnnual / 12;

  // Total monthly payment
  const monthlyPayment = loanResult.monthlyPayment + monthlyTax + monthlyInsurance;

  // Calculate total cost including tax and insurance
  const totalMonths = loanInput.loanTermYears * 12;
  const totalTax = propertyTaxAnnual * loanInput.loanTermYears;
  const totalInsurance = insuranceAnnual * loanInput.loanTermYears;
  const totalCost = loanResult.totalCost + totalTax + totalInsurance;

  return {
    monthlyPrincipalInterest: loanResult.monthlyPayment,
    monthlyTax,
    monthlyInsurance,
    monthlyPayment,
    totalInterest: loanResult.totalInterest + totalTax + totalInsurance,
    totalCost,
  };
}

// ============================================================================
// Compound Interest Calculation
// ============================================================================

/**
 * Calculate compound interest with optional regular contributions
 * FV = P(1 + r)^t + PMT × [((1 + r)^t - 1) / r]
 */
export function calculateCompoundInterest(
  input: CompoundInterestCalculatorInput
): CompoundInterestCalculatorOutput {
  const {
    principal,
    annualInterestRate,
    years,
    contributionAmount = 0,
    contributionFrequency = 'monthly',
    compoundingFrequency = 'monthly',
  } = input;

  const periodsPerYear = getPeriodsPerYear(compoundingFrequency);
  const periods = years * periodsPerYear;
  const ratePerPeriod = (annualInterestRate / 100) / periodsPerYear;

  let finalBalance = principal;
  let totalContributions = principal;

  if (contributionAmount > 0) {
    const contributionPeriodsPerYear = getPeriodsPerYear(contributionFrequency);
    const contributionPerCompoundPeriod =
      contributionAmount * (contributionPeriodsPerYear / periodsPerYear);

    // Future value of a series formula for contributions
    if (ratePerPeriod === 0) {
      // Simple accumulation if no interest
      finalBalance = principal + contributionAmount * contributionPeriodsPerYear * years;
      totalContributions = finalBalance;
    } else {
      const growthFactor = Math.pow(1 + ratePerPeriod, periods);
      const futureValueOfContributions =
        contributionPerCompoundPeriod * ((growthFactor - 1) / ratePerPeriod);
      const futureValueOfPrincipal = principal * growthFactor;
      finalBalance = futureValueOfPrincipal + futureValueOfContributions;
      totalContributions = principal + contributionAmount * contributionPeriodsPerYear * years;
    }
  } else {
    // No contributions, just compound on principal
    if (ratePerPeriod === 0) {
      finalBalance = principal;
    } else {
      finalBalance = principal * Math.pow(1 + ratePerPeriod, periods);
    }
    totalContributions = principal;
  }

  const totalInterest = finalBalance - totalContributions;

  return {
    finalBalance,
    totalContributions,
    totalInterest,
  };
}

// ============================================================================
// Savings Calculation
// ============================================================================

/**
 * Calculate time to reach a savings goal
 */
export function calculateSavings(input: SavingsCalculatorInput): SavingsCalculatorOutput {
  const { currentSavings, monthlyContribution, annualInterestRate = 0, savingsGoal } = input;

  // Handle case where monthly contribution is 0
  if (monthlyContribution === 0) {
    if (currentSavings >= savingsGoal) {
      return {
        monthsToGoal: 0,
        yearsToGoal: 0,
        totalContributions: currentSavings,
        totalInterestEarned: 0,
      };
    }
    // Impossible to reach goal with no contributions
    return {
      monthsToGoal: Infinity,
      yearsToGoal: Infinity,
      totalContributions: currentSavings,
      totalInterestEarned: 0,
    };
  }

  // Handle zero interest rate (simple case)
  if (annualInterestRate === 0) {
    const amountNeeded = savingsGoal - currentSavings;
    const monthsToGoal = Math.ceil(amountNeeded / monthlyContribution);
    const yearsToGoal = monthsToGoal / 12;
    const totalContributions = currentSavings + monthlyContribution * monthsToGoal;

    return {
      monthsToGoal,
      yearsToGoal,
      totalContributions,
      totalInterestEarned: 0,
    };
  }

  // Solve for time with compound interest
  // FV = P(1 + r)^t + PMT × [((1 + r)^t - 1) / r]
  // This requires numerical approximation

  const monthlyRate = annualInterestRate / 100 / 12;
  let months = 0;
  let balance = currentSavings;
  let maxIterations = 1200; // Cap at 100 years to prevent infinite loops
  const epsilon = 0.01; // Precision threshold

  while (balance < savingsGoal - epsilon && months < maxIterations) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    months++;
  }

  const totalContributions = currentSavings + monthlyContribution * months;
  const totalInterestEarned = balance - totalContributions;

  return {
    monthsToGoal: months,
    yearsToGoal: months / 12,
    totalContributions,
    totalInterestEarned,
  };
}

// ============================================================================
// Salary Calculation
// ============================================================================

/**
 * 2025 U.S. Federal Income Tax Brackets (Single Filer)
 */
const FEDERAL_TAX_BRACKETS_2025 = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

/**
 * Standard deduction amounts by filing status (2025)
 */
const STANDARD_DEDUCTION_2025 = {
  single: 14600,
  marriedJoint: 29200,
  marriedSeparate: 14600,
  headOfHousehold: 21900,
};

/**
 * Social Security parameters (2025)
 */
const SOCIAL_SECURITY_2025 = {
  wageBaseLimit: 174900,
  taxRate: 0.062, // 6.2%
};

/**
 * Medicare parameters (2025)
 */
const MEDICARE_2025 = {
  taxRate: 0.0145, // 1.45%
};

/**
 * Salary calculator input/output types
 */
export interface GrossToNetSalaryCalculatorInput {
  grossSalary: number;
  payFrequency: 'annual' | 'monthly' | 'biweekly' | 'semimonthly';
  taxYear: number;
  filingStatus: 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold';
  federalAllowances?: number;
  stateTaxRate: number;
  socialSecurityRate: number;
  medicareRate: number;
  pretaxDeductions?: number;
  posttaxDeductions?: number;
}

export interface GrossToNetSalaryCalculatorOutput {
  netSalary: number;
  federalTax: number;
  stateTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalTaxes: number;
  totalDeductions: number;
  effectiveTaxRate: number;
  annualNetSalary: number;
}

export interface NetToGrossSalaryCalculatorInput {
  netSalary: number;
  payFrequency: 'annual' | 'monthly' | 'biweekly' | 'semimonthly';
  taxYear: number;
  filingStatus: 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold';
  federalAllowances?: number;
  stateTaxRate: number;
  socialSecurityRate: number;
  medicareRate: number;
  pretaxDeductions?: number;
  posttaxDeductions?: number;
}

export interface NetToGrossSalaryCalculatorOutput {
  requiredGrossSalary: number;
  annualGrossSalary: number;
  federalTax: number;
  stateTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalTaxes: number;
  totalDeductions: number;
  effectiveTaxRate: number;
  annualNetSalary: number;
}

function getSalaryPeriodsPerYear(
  payFrequency: GrossToNetSalaryCalculatorInput['payFrequency']
): number {
  switch (payFrequency) {
    case 'monthly':
      return 12;
    case 'biweekly':
      return 26;
    case 'semimonthly':
      return 24;
    case 'annual':
    default:
      return 1;
  }
}

function toAnnualSalary(
  amount: number,
  payFrequency: GrossToNetSalaryCalculatorInput['payFrequency']
): number {
  return amount * getSalaryPeriodsPerYear(payFrequency);
}

function fromAnnualSalary(
  annualAmount: number,
  payFrequency: GrossToNetSalaryCalculatorInput['payFrequency']
): number {
  return annualAmount / getSalaryPeriodsPerYear(payFrequency);
}

function calculateFederalIncomeTax(taxableIncome: number): number {
  let federalTax = 0;

  for (const bracket of FEDERAL_TAX_BRACKETS_2025) {
    if (taxableIncome > bracket.max) {
      federalTax += bracket.rate * (bracket.max - bracket.min);
    } else if (taxableIncome > bracket.min) {
      federalTax += bracket.rate * (taxableIncome - bracket.min);
      break;
    }
  }

  return federalTax;
}

/**
 * Calculate gross to net salary with federal, state, Social Security, and Medicare taxes
 *
 * Note: This uses simplified 2025 U.S. tax brackets and assumes no dependents.
 * This is an educational estimate and not tax advice.
 */
export function calculateGrossToNetSalary(input: GrossToNetSalaryCalculatorInput): GrossToNetSalaryCalculatorOutput {
  const {
    grossSalary,
    payFrequency = 'annual',
    taxYear = 2025,
    filingStatus = 'single',
    federalAllowances,
    stateTaxRate = 5,
    socialSecurityRate = 6.2,
    medicareRate = 1.45,
    pretaxDeductions = 0,
    posttaxDeductions = 0,
  } = input;

  void taxYear;

  const annualGrossSalary = toAnnualSalary(grossSalary, payFrequency);
  const totalPretaxDeductions = pretaxDeductions || 0;
  const payrollTaxableWages = Math.max(0, annualGrossSalary - totalPretaxDeductions);
  const federalDeduction =
    federalAllowances ?? STANDARD_DEDUCTION_2025[filingStatus] ?? STANDARD_DEDUCTION_2025.single;
  const federalTaxableIncome = Math.max(
    0,
    annualGrossSalary - federalDeduction - totalPretaxDeductions
  );
  const federalTax = calculateFederalIncomeTax(federalTaxableIncome);
  const socialSecurityWages = Math.min(payrollTaxableWages, SOCIAL_SECURITY_2025.wageBaseLimit);
  const socialSecurityTax = socialSecurityWages * (socialSecurityRate / 100);
  const medicareTax = payrollTaxableWages * (medicareRate / 100);
  const stateTax = payrollTaxableWages * (stateTaxRate / 100);

  // Total taxes
  const totalTaxes = federalTax + socialSecurityTax + medicareTax + stateTax;

  // Total deductions
  const totalDeductions = totalPretaxDeductions + (posttaxDeductions || 0);

  // Calculate net salary
  const annualNetSalary = Math.max(0, annualGrossSalary - totalTaxes - totalDeductions);

  // Calculate effective tax rate as percentage of gross
  const effectiveTaxRate = annualGrossSalary > 0 ? (totalTaxes / annualGrossSalary) * 100 : 0;

  return {
    netSalary: fromAnnualSalary(annualNetSalary, payFrequency),
    federalTax,
    stateTax,
    socialSecurityTax,
    medicareTax,
    totalTaxes,
    totalDeductions,
    effectiveTaxRate,
    annualNetSalary,
  };
}

export function calculateNetToGrossSalary(
  input: NetToGrossSalaryCalculatorInput
): NetToGrossSalaryCalculatorOutput {
  const {
    netSalary,
    payFrequency = 'annual',
    taxYear = 2025,
    filingStatus = 'single',
    federalAllowances,
    stateTaxRate = 5,
    socialSecurityRate = 6.2,
    medicareRate = 1.45,
    pretaxDeductions = 0,
    posttaxDeductions = 0,
  } = input;

  const annualTargetNet = toAnnualSalary(netSalary, payFrequency);
  let lowerBound = Math.max(0, annualTargetNet);
  let upperBound = Math.max(annualTargetNet * 2, 50000);

  while (
    calculateGrossToNetSalary({
      grossSalary: upperBound,
      payFrequency: 'annual',
      taxYear,
      filingStatus,
      federalAllowances,
      stateTaxRate,
      socialSecurityRate,
      medicareRate,
      pretaxDeductions,
      posttaxDeductions,
    }).annualNetSalary < annualTargetNet
  ) {
    upperBound *= 1.5;
  }

  for (let iteration = 0; iteration < 40; iteration++) {
    const midpoint = (lowerBound + upperBound) / 2;
    const estimate = calculateGrossToNetSalary({
      grossSalary: midpoint,
      payFrequency: 'annual',
      taxYear,
      filingStatus,
      federalAllowances,
      stateTaxRate,
      socialSecurityRate,
      medicareRate,
      pretaxDeductions,
      posttaxDeductions,
    });

    if (estimate.annualNetSalary < annualTargetNet) {
      lowerBound = midpoint;
    } else {
      upperBound = midpoint;
    }
  }

  const finalEstimate = calculateGrossToNetSalary({
    grossSalary: upperBound,
    payFrequency: 'annual',
    taxYear,
    filingStatus,
    federalAllowances,
    stateTaxRate,
    socialSecurityRate,
    medicareRate,
    pretaxDeductions,
    posttaxDeductions,
  });

  return {
    requiredGrossSalary: fromAnnualSalary(upperBound, payFrequency),
    annualGrossSalary: upperBound,
    federalTax: finalEstimate.federalTax,
    stateTax: finalEstimate.stateTax,
    socialSecurityTax: finalEstimate.socialSecurityTax,
    medicareTax: finalEstimate.medicareTax,
    totalTaxes: finalEstimate.totalTaxes,
    totalDeductions: finalEstimate.totalDeductions,
    effectiveTaxRate: finalEstimate.effectiveTaxRate,
    annualNetSalary: finalEstimate.annualNetSalary,
  };
}
