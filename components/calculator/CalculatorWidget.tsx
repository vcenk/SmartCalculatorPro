/**
 * Calculator Widget Component
 *
 * Reusable calculator form that renders inputs based on content model.
 * Client-side component for interactive calculations.
 */

'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { CalculatorInput as CalculatorInputType, CalculatorOutput as CalculatorOutputType } from '@/lib/types/content';
import { InputField } from './InputField';
import { ResultDisplay } from './ResultDisplay';
import { Button } from '@/components/ui/Button';

const SALARY_STANDARD_DEDUCTIONS: Record<string, number> = {
  single: 15750,
  marriedJoint: 31500,
  marriedSeparate: 15750,
  headOfHousehold: 23625,
};

interface CalculatorWidgetProps {
  calculatorId: string;
  inputs: CalculatorInputType[];
  outputs: CalculatorOutputType[];
  defaultValues: Record<string, number | string | boolean>;
  buttonText: string;
  resetButtonText?: string;
  resultTitle?: string;
}

export function CalculatorWidget({
  calculatorId,
  inputs,
  outputs,
  defaultValues,
  buttonText,
  resetButtonText,
  resultTitle,
}: CalculatorWidgetProps) {
  const [values, setValues] = useState<Record<string, number | string | boolean>>(defaultValues);
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleChange = (key: string, value: number | string | boolean) => {
    setValues(prev => {
      const nextValues = { ...prev, [key]: value };

      if (
        key === 'filingStatus'
        && typeof value === 'string'
        && typeof prev.filingStatus === 'string'
        && typeof prev.federalAllowances === 'number'
      ) {
        const previousDefault = SALARY_STANDARD_DEDUCTIONS[prev.filingStatus];
        const nextDefault = SALARY_STANDARD_DEDUCTIONS[value];

        if (previousDefault !== undefined && nextDefault !== undefined && prev.federalAllowances === previousDefault) {
          nextValues.federalAllowances = nextDefault;
        }
      }

      return nextValues;
    });
    // Clear results when inputs change
    setHasCalculated(false);
  };

  const handleCalculate = async () => {
    try {
      const { executeCalculation } = await import('@/lib/calculations/registry');
      const calculatedResults = executeCalculation<
        Record<string, number | string | boolean>,
        Record<string, number>
      >(calculatorId, values);

      if (!calculatedResults) {
        throw new Error('Calculation failed');
      }

      setResults(calculatedResults);
      setHasCalculated(true);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const handleReset = () => {
    setValues(defaultValues);
    setResults(null);
    setHasCalculated(false);
  };

  // Auto-calculate on mount
  useEffect(() => {
    void handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputs.map(input => (
          <InputField
            key={input.key}
            input={input}
            value={values[input.key]}
            onChange={(value) => handleChange(input.key, value)}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={() => void handleCalculate()} size="lg">
          {buttonText}
        </Button>
        {resetButtonText && (
          <Button variant="outline" onClick={handleReset}>
            {resetButtonText}
          </Button>
        )}
      </div>

      {/* Results */}
      {hasCalculated && results && (
        <ResultDisplay
          title={resultTitle}
          outputs={outputs}
          results={results}
        />
      )}
    </div>
  );
}
