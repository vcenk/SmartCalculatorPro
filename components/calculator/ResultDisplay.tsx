/**
 * ResultDisplay Component
 *
 * Displays calculator results in a formatted way.
 */

'use client';

import { CalculatorOutput as CalculatorOutputType } from '@/lib/types/content';
import { formatNumber, formatCurrency } from '@/lib/utils/format';

interface ResultDisplayProps {
  title?: string;
  outputs: CalculatorOutputType[];
  results: Record<string, number>;
}

export function ResultDisplay({ title, outputs, results }: ResultDisplayProps) {
  const formatValue = (output: CalculatorOutputType, value: number): string => {
    if (output.unit === 'currency' || output.unit === 'USD') {
      return formatCurrency(value);
    }
    if (output.unit === 'percent') {
      return `${value.toFixed(output.precision ?? 2)}%`;
    }
    return formatNumber(value, output.precision ?? 2);
  };

  return (
    <div className="rounded-lg border bg-muted/50 p-6 space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {outputs.map((output) => (
          <div key={output.key} className="space-y-1">
            <p className="text-sm text-muted-foreground">{output.label}</p>
            <p className="text-2xl font-bold text-primary">
              {formatValue(output, results[output.key])}
            </p>
            {output.explanation && (
              <p className="text-xs text-muted-foreground">{output.explanation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
