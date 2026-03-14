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

export interface HourlyToSalaryCalculatorInput {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface HourlyToSalaryCalculatorOutput {
  weeklyPay: number;
  biweeklyPay: number;
  semimonthlyPay: number;
  monthlySalary: number;
  annualSalary: number;
}

export interface SalaryToHourlyCalculatorInput {
  salaryAmount: number;
  salaryFrequency: 'annual' | 'monthly' | 'biweekly' | 'semimonthly' | 'weekly';
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface SalaryToHourlyCalculatorOutput {
  hourlyRate: number;
  weeklyPay: number;
  biweeklyPay: number;
  semimonthlyPay: number;
  monthlySalary: number;
  annualSalary: number;
}

export interface OvertimeCalculatorInput {
  regularHourlyPay: number;
  standardHours: number;
  overtimeHours: number;
  overtimeMultiplier: number;
  weeksPerYear: number;
}

export interface OvertimeCalculatorOutput {
  regularPay: number;
  overtimeRate: number;
  overtimePay: number;
  totalPay: number;
  totalHours: number;
  effectiveHourlyRate: number;
  annualizedPay: number;
}

export interface SalaryIncreaseCalculatorInput {
  currentSalary: number;
  increaseType: 'amount' | 'percent';
  increaseValue: number;
}

export interface SalaryIncreaseCalculatorOutput {
  currentSalary: number;
  increaseAmount: number;
  increasePercent: number;
  newSalary: number;
}

export interface ContractorVsEmployeeTakeHomeEstimatorInput {
  employeeGrossPay: number;
  contractorGrossRevenue: number;
  filingStatus: 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold';
  taxYear: number;
  stateTaxRate: number;
  employeeBenefitsAdjustment: number;
  contractorBusinessExpenses: number;
  contractorBenefitsAdjustment: number;
  selfEmploymentTaxRate: number;
}

export interface ContractorVsEmployeeTakeHomeEstimatorOutput {
  employeeTakeHome: number;
  contractorTakeHome: number;
  employeeTaxes: number;
  contractorTaxes: number;
  contractorBusinessExpenses: number;
  employeeBenefitsAdjustment: number;
  contractorBenefitsAdjustment: number;
  takeHomeDifference: number;
}

export interface SideHustleProfitEstimatorInput {
  revenue: number;
  businessExpenses: number;
  optionalFees: number;
  estimatedTaxRate: number;
  hoursWorked: number;
}

export interface SideHustleProfitEstimatorOutput {
  estimatedProfit: number;
  estimatedAfterTaxProfit: number;
  effectiveHourlyProfit: number;
  retainedPercentage: number;
  totalCosts: number;
}

export interface ContractorRateCalculatorInput {
  targetAnnualIncome: number;
  estimatedTaxRate: number;
  businessExpenses: number;
  billableHoursPerWeek: number;
  weeksWorkedPerYear: number;
  utilizationRate: number;
}

export interface ContractorRateCalculatorOutput {
  requiredHourlyRate: number;
  requiredAnnualRevenue: number;
  requiredMonthlyRevenue: number;
  effectiveBillableRateNeeded: number;
}

export interface CanadaGstHstCalculatorInput {
  calculationMode: 'beforeTaxToTotal' | 'totalToBeforeTax';
  provinceCode: string;
  amount: number;
}

export interface CanadaGstHstCalculatorOutput {
  beforeTaxAmount: number;
  totalAfterTax: number;
  totalTaxAmount: number;
  gstAmount: number;
  hstAmount: number;
  provincialTaxAmount: number;
}

export interface CanadaRrspVsTfsaCalculatorInput {
  annualContributionAmount: number;
  currentMarginalTaxRate: number;
  expectedInvestmentGrowthRate: number;
  yearsInvested: number;
  expectedRetirementTaxRate: number;
}

export interface CanadaRrspVsTfsaCalculatorOutput {
  estimatedRrspValue: number;
  estimatedTfsaValue: number;
  estimatedAfterTaxRrspValue: number;
  contributionTaxDeductionEstimate: number;
  sideBySideComparisonSummary: number;
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

function getCompensationPeriodsPerYear(
  frequency: SalaryToHourlyCalculatorInput['salaryFrequency']
): number {
  switch (frequency) {
    case 'weekly':
      return 52;
    case 'biweekly':
      return 26;
    case 'semimonthly':
      return 24;
    case 'monthly':
      return 12;
    case 'annual':
    default:
      return 1;
  }
}

function buildCompensationBreakdown(annualSalary: number) {
  return {
    weeklyPay: annualSalary / 52,
    biweeklyPay: annualSalary / 26,
    semimonthlyPay: annualSalary / 24,
    monthlySalary: annualSalary / 12,
    annualSalary,
  };
}

interface CanadaSalesTaxRates {
  provinceCode: string;
  provinceName: string;
  gstRate: number;
  hstRate: number;
  provincialRate: number;
  provincialLabel: 'PST' | 'QST' | 'RST' | 'GST';
}

const CANADA_SALES_TAX_RATES: Record<string, CanadaSalesTaxRates> = {
  AB: { provinceCode: 'AB', provinceName: 'Alberta', gstRate: 5, hstRate: 0, provincialRate: 0, provincialLabel: 'GST' },
  BC: { provinceCode: 'BC', provinceName: 'British Columbia', gstRate: 5, hstRate: 0, provincialRate: 7, provincialLabel: 'PST' },
  MB: { provinceCode: 'MB', provinceName: 'Manitoba', gstRate: 5, hstRate: 0, provincialRate: 7, provincialLabel: 'RST' },
  NB: { provinceCode: 'NB', provinceName: 'New Brunswick', gstRate: 0, hstRate: 15, provincialRate: 0, provincialLabel: 'GST' },
  NL: { provinceCode: 'NL', provinceName: 'Newfoundland and Labrador', gstRate: 0, hstRate: 15, provincialRate: 0, provincialLabel: 'GST' },
  NS: { provinceCode: 'NS', provinceName: 'Nova Scotia', gstRate: 0, hstRate: 14, provincialRate: 0, provincialLabel: 'GST' },
  NT: { provinceCode: 'NT', provinceName: 'Northwest Territories', gstRate: 5, hstRate: 0, provincialRate: 0, provincialLabel: 'GST' },
  NU: { provinceCode: 'NU', provinceName: 'Nunavut', gstRate: 5, hstRate: 0, provincialRate: 0, provincialLabel: 'GST' },
  ON: { provinceCode: 'ON', provinceName: 'Ontario', gstRate: 0, hstRate: 13, provincialRate: 0, provincialLabel: 'GST' },
  PE: { provinceCode: 'PE', provinceName: 'Prince Edward Island', gstRate: 0, hstRate: 15, provincialRate: 0, provincialLabel: 'GST' },
  QC: { provinceCode: 'QC', provinceName: 'Quebec', gstRate: 5, hstRate: 0, provincialRate: 9.975, provincialLabel: 'QST' },
  SK: { provinceCode: 'SK', provinceName: 'Saskatchewan', gstRate: 5, hstRate: 0, provincialRate: 6, provincialLabel: 'PST' },
  YT: { provinceCode: 'YT', provinceName: 'Yukon', gstRate: 5, hstRate: 0, provincialRate: 0, provincialLabel: 'GST' },
};

function getCanadaSalesTaxRates(provinceCode: string): CanadaSalesTaxRates {
  return CANADA_SALES_TAX_RATES[provinceCode] ?? CANADA_SALES_TAX_RATES.ON;
}

function calculateAnnualContributionFutureValue(
  annualContributionAmount: number,
  annualGrowthRate: number,
  yearsInvested: number
): number {
  const contribution = Math.max(0, annualContributionAmount);
  const rate = Math.max(0, annualGrowthRate) / 100;
  const years = Math.max(0, yearsInvested);

  if (years === 0) {
    return 0;
  }

  if (rate === 0) {
    return contribution * years;
  }

  return contribution * ((Math.pow(1 + rate, years) - 1) / rate);
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
// Hourly / Salary Conversion
// ============================================================================

export function calculateHourlyToSalary(
  input: HourlyToSalaryCalculatorInput
): HourlyToSalaryCalculatorOutput {
  const {
    hourlyRate,
    hoursPerWeek = 40,
    weeksPerYear = 52,
  } = input;

  const annualSalary = hourlyRate * hoursPerWeek * weeksPerYear;

  return buildCompensationBreakdown(annualSalary);
}

export function calculateSalaryToHourly(
  input: SalaryToHourlyCalculatorInput
): SalaryToHourlyCalculatorOutput {
  const {
    salaryAmount,
    salaryFrequency = 'annual',
    hoursPerWeek = 40,
    weeksPerYear = 52,
  } = input;

  const annualSalary = salaryAmount * getCompensationPeriodsPerYear(salaryFrequency);
  const annualHours = hoursPerWeek * weeksPerYear;
  const hourlyRate = annualHours > 0 ? annualSalary / annualHours : 0;

  return {
    hourlyRate,
    ...buildCompensationBreakdown(annualSalary),
  };
}

export function calculateOvertime(
  input: OvertimeCalculatorInput
): OvertimeCalculatorOutput {
  const {
    regularHourlyPay,
    standardHours = 40,
    overtimeHours = 0,
    overtimeMultiplier = 1.5,
    weeksPerYear = 52,
  } = input;

  const regularPay = regularHourlyPay * standardHours;
  const overtimeRate = regularHourlyPay * overtimeMultiplier;
  const overtimePay = overtimeRate * overtimeHours;
  const totalPay = regularPay + overtimePay;
  const totalHours = standardHours + overtimeHours;
  const effectiveHourlyRate = totalHours > 0 ? totalPay / totalHours : 0;
  const annualizedPay = totalPay * weeksPerYear;

  return {
    regularPay,
    overtimeRate,
    overtimePay,
    totalPay,
    totalHours,
    effectiveHourlyRate,
    annualizedPay,
  };
}

export function calculateSalaryIncrease(
  input: SalaryIncreaseCalculatorInput
): SalaryIncreaseCalculatorOutput {
  const {
    currentSalary,
    increaseType = 'amount',
    increaseValue = 0,
  } = input;

  const increaseAmount =
    increaseType === 'percent'
      ? currentSalary * (increaseValue / 100)
      : increaseValue;
  const newSalary = currentSalary + increaseAmount;
  const increasePercent =
    currentSalary > 0 ? (increaseAmount / currentSalary) * 100 : 0;

  return {
    currentSalary,
    increaseAmount,
    increasePercent,
    newSalary,
  };
}

export function calculateContractorVsEmployeeTakeHome(
  input: ContractorVsEmployeeTakeHomeEstimatorInput
): ContractorVsEmployeeTakeHomeEstimatorOutput {
  const {
    employeeGrossPay,
    contractorGrossRevenue,
    filingStatus = 'single',
    taxYear = 2025,
    stateTaxRate = 5,
    employeeBenefitsAdjustment = 0,
    contractorBusinessExpenses = 0,
    contractorBenefitsAdjustment = 0,
    selfEmploymentTaxRate = 15.3,
  } = input;

  const employeeEstimate = calculateGrossToNetSalary({
    grossSalary: employeeGrossPay,
    payFrequency: 'annual',
    taxYear,
    filingStatus,
    stateTaxRate,
    socialSecurityRate: 6.2,
    medicareRate: 1.45,
    pretaxDeductions: 0,
    posttaxDeductions: employeeBenefitsAdjustment,
  });

  const contractorNetBusinessIncome = Math.max(
    0,
    contractorGrossRevenue - contractorBusinessExpenses
  );
  const salaryRules = getUsSalaryRules(taxYear);
  const federalDeduction = salaryRules.standardDeduction[filingStatus];
  const contractorTaxableIncome = Math.max(
    0,
    contractorNetBusinessIncome - federalDeduction
  );
  const contractorFederalTax = calculateFederalIncomeTax(
    contractorTaxableIncome,
    filingStatus
  );
  const contractorStateTax = contractorNetBusinessIncome * (stateTaxRate / 100);
  const contractorSelfEmploymentTax =
    contractorNetBusinessIncome * (selfEmploymentTaxRate / 100);
  const contractorTaxes =
    contractorFederalTax + contractorStateTax + contractorSelfEmploymentTax;
  const contractorTakeHome = Math.max(
    0,
    contractorGrossRevenue
      - contractorBusinessExpenses
      - contractorTaxes
      - contractorBenefitsAdjustment
  );

  return {
    employeeTakeHome: employeeEstimate.annualNetSalary,
    contractorTakeHome,
    employeeTaxes: employeeEstimate.totalTaxes,
    contractorTaxes,
    contractorBusinessExpenses,
    employeeBenefitsAdjustment,
    contractorBenefitsAdjustment,
    takeHomeDifference: contractorTakeHome - employeeEstimate.annualNetSalary,
  };
}

export function calculateSideHustleProfit(
  input: SideHustleProfitEstimatorInput
): SideHustleProfitEstimatorOutput {
  const {
    revenue,
    businessExpenses = 0,
    optionalFees = 0,
    estimatedTaxRate = 25,
    hoursWorked = 0,
  } = input;

  const totalCosts = businessExpenses + optionalFees;
  const estimatedProfit = Math.max(0, revenue - totalCosts);
  const estimatedAfterTaxProfit = Math.max(
    0,
    estimatedProfit * (1 - estimatedTaxRate / 100)
  );
  const effectiveHourlyProfit =
    hoursWorked > 0 ? estimatedAfterTaxProfit / hoursWorked : 0;
  const retainedPercentage =
    revenue > 0 ? (estimatedAfterTaxProfit / revenue) * 100 : 0;

  return {
    estimatedProfit,
    estimatedAfterTaxProfit,
    effectiveHourlyProfit,
    retainedPercentage,
    totalCosts,
  };
}

export function calculateContractorRate(
  input: ContractorRateCalculatorInput
): ContractorRateCalculatorOutput {
  const {
    targetAnnualIncome,
    estimatedTaxRate = 25,
    businessExpenses = 0,
    billableHoursPerWeek,
    weeksWorkedPerYear,
    utilizationRate = 75,
  } = input;

  const netRetentionRate = Math.max(0.01, 1 - estimatedTaxRate / 100);
  const requiredAnnualRevenue =
    (Math.max(0, targetAnnualIncome) + Math.max(0, businessExpenses)) / netRetentionRate;
  const requiredMonthlyRevenue = requiredAnnualRevenue / 12;
  const annualBillableHours = Math.max(0, billableHoursPerWeek) * Math.max(0, weeksWorkedPerYear);
  const utilizationDecimal = Math.max(0.01, utilizationRate / 100);
  const totalWorkingHours = annualBillableHours / utilizationDecimal;
  const effectiveBillableRateNeeded =
    annualBillableHours > 0 ? requiredAnnualRevenue / annualBillableHours : 0;
  const requiredHourlyRate =
    totalWorkingHours > 0 ? requiredAnnualRevenue / totalWorkingHours : 0;

  return {
    requiredHourlyRate,
    requiredAnnualRevenue,
    requiredMonthlyRevenue,
    effectiveBillableRateNeeded,
  };
}

export function calculateCanadaGstHst(
  input: CanadaGstHstCalculatorInput
): CanadaGstHstCalculatorOutput {
  const { calculationMode, provinceCode, amount } = input;
  const rates = getCanadaSalesTaxRates(provinceCode);
  const combinedRate = (rates.hstRate || rates.gstRate + rates.provincialRate) / 100;

  const beforeTaxAmount =
    calculationMode === 'totalToBeforeTax'
      ? Math.max(0, amount) / (1 + combinedRate)
      : Math.max(0, amount);
  const totalAfterTax =
    calculationMode === 'totalToBeforeTax'
      ? Math.max(0, amount)
      : beforeTaxAmount * (1 + combinedRate);

  const hstAmount = rates.hstRate > 0 ? beforeTaxAmount * (rates.hstRate / 100) : 0;
  const gstAmount = rates.hstRate > 0 ? 0 : beforeTaxAmount * (rates.gstRate / 100);
  const provincialTaxAmount =
    rates.hstRate > 0 ? 0 : beforeTaxAmount * (rates.provincialRate / 100);
  const totalTaxAmount = hstAmount + gstAmount + provincialTaxAmount;

  return {
    beforeTaxAmount,
    totalAfterTax,
    totalTaxAmount,
    gstAmount,
    hstAmount,
    provincialTaxAmount,
  };
}

export function calculateCanadaRrspVsTfsa(
  input: CanadaRrspVsTfsaCalculatorInput
): CanadaRrspVsTfsaCalculatorOutput {
  const {
    annualContributionAmount,
    currentMarginalTaxRate = 30,
    expectedInvestmentGrowthRate = 5,
    yearsInvested = 20,
    expectedRetirementTaxRate = 20,
  } = input;

  const contribution = Math.max(0, annualContributionAmount);
  const currentTaxRate = Math.max(0, currentMarginalTaxRate) / 100;
  const retirementTaxRate = Math.max(0, expectedRetirementTaxRate) / 100;

  const estimatedTfsaValue = calculateAnnualContributionFutureValue(
    contribution,
    expectedInvestmentGrowthRate,
    yearsInvested
  );
  const estimatedRrspValue = calculateAnnualContributionFutureValue(
    contribution,
    expectedInvestmentGrowthRate,
    yearsInvested
  );
  const contributionTaxDeductionEstimate = contribution * currentTaxRate;
  const deductionGrowthValue = calculateAnnualContributionFutureValue(
    contributionTaxDeductionEstimate,
    expectedInvestmentGrowthRate,
    yearsInvested
  );
  const estimatedAfterTaxRrspValue =
    estimatedRrspValue * (1 - retirementTaxRate) + deductionGrowthValue;

  return {
    estimatedRrspValue,
    estimatedTfsaValue,
    estimatedAfterTaxRrspValue,
    contributionTaxDeductionEstimate,
    sideBySideComparisonSummary:
      estimatedAfterTaxRrspValue - estimatedTfsaValue,
  };
}

// ============================================================================
// Salary Calculation
// ============================================================================

type FilingStatus =
  | 'single'
  | 'marriedJoint'
  | 'marriedSeparate'
  | 'headOfHousehold';

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

interface UsSalaryRules {
  standardDeduction: Record<FilingStatus, number>;
  federalBrackets: Record<FilingStatus, TaxBracket[]>;
  socialSecurity: {
    wageBaseLimit: number;
  };
  medicare: {
    additionalRateThreshold: Record<FilingStatus, number>;
  };
}

/**
 * Simplified 2025 U.S. salary-planning rules.
 *
 * Federal bracket thresholds are filing-status specific. Standard deduction
 * values reflect the 2025 amounts currently published by the IRS.
 */
const US_SALARY_RULES_2025: UsSalaryRules = {
  standardDeduction: {
    single: 15750,
    marriedJoint: 31500,
    marriedSeparate: 15750,
    headOfHousehold: 23625,
  },
  federalBrackets: {
    single: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 },
    ],
    marriedJoint: [
      { min: 0, max: 23850, rate: 0.10 },
      { min: 23850, max: 96950, rate: 0.12 },
      { min: 96950, max: 206700, rate: 0.22 },
      { min: 206700, max: 394600, rate: 0.24 },
      { min: 394600, max: 501050, rate: 0.32 },
      { min: 501050, max: 751600, rate: 0.35 },
      { min: 751600, max: Infinity, rate: 0.37 },
    ],
    marriedSeparate: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 375800, rate: 0.35 },
      { min: 375800, max: Infinity, rate: 0.37 },
    ],
    headOfHousehold: [
      { min: 0, max: 17000, rate: 0.10 },
      { min: 17000, max: 64850, rate: 0.12 },
      { min: 64850, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250500, rate: 0.32 },
      { min: 250500, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 },
    ],
  },
  socialSecurity: {
    wageBaseLimit: 176100,
  },
  medicare: {
    additionalRateThreshold: {
      single: 200000,
      marriedJoint: 250000,
      marriedSeparate: 125000,
      headOfHousehold: 200000,
    },
  },
};

/**
 * Social Security parameters (2025)
 */
const SOCIAL_SECURITY_2025 = {
  wageBaseLimit: US_SALARY_RULES_2025.socialSecurity.wageBaseLimit,
  taxRate: 0.062, // 6.2%
};

/**
 * Medicare parameters (2025)
 */
const MEDICARE_2025 = {
  taxRate: 0.0145, // 1.45%
  additionalTaxRate: 0.009, // 0.9%
};

/**
 * Salary calculator input/output types
 */
export interface GrossToNetSalaryCalculatorInput {
  grossSalary: number;
  payFrequency: 'annual' | 'monthly' | 'biweekly' | 'semimonthly';
  taxYear: number;
  filingStatus: FilingStatus;
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
  filingStatus: FilingStatus;
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

function getUsSalaryRules(taxYear: number): UsSalaryRules {
  void taxYear;
  return US_SALARY_RULES_2025;
}

function calculateFederalIncomeTax(taxableIncome: number, filingStatus: FilingStatus): number {
  const brackets = US_SALARY_RULES_2025.federalBrackets[filingStatus];
  let federalTax = 0;

  for (const bracket of brackets) {
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
 * Note: This uses simplified 2025 U.S. tax assumptions for planning.
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

  const salaryRules = getUsSalaryRules(taxYear);

  const annualGrossSalary = toAnnualSalary(grossSalary, payFrequency);
  const totalPretaxDeductions = pretaxDeductions || 0;
  const payrollTaxableWages = Math.max(0, annualGrossSalary - totalPretaxDeductions);
  const federalDeduction =
    federalAllowances
    ?? salaryRules.standardDeduction[filingStatus]
    ?? salaryRules.standardDeduction.single;
  const federalTaxableIncome = Math.max(
    0,
    annualGrossSalary - federalDeduction - totalPretaxDeductions
  );
  const federalTax = calculateFederalIncomeTax(federalTaxableIncome, filingStatus);
  const socialSecurityWages = Math.min(payrollTaxableWages, SOCIAL_SECURITY_2025.wageBaseLimit);
  const socialSecurityTax = socialSecurityWages * (socialSecurityRate / 100);
  const additionalMedicareThreshold = salaryRules.medicare.additionalRateThreshold[filingStatus];
  const additionalMedicareTaxableWages = Math.max(0, payrollTaxableWages - additionalMedicareThreshold);
  const medicareTax =
    payrollTaxableWages * (medicareRate / 100)
    + additionalMedicareTaxableWages * MEDICARE_2025.additionalTaxRate;
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
