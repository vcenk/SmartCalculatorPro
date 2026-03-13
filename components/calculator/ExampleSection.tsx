/**
 * ExampleSection Component
 *
 * Displays a worked example of the calculator.
 */

import { CalculatorExample } from '@/lib/types/content';

interface ExampleSectionProps {
  example: CalculatorExample;
}

export function ExampleSection({ example }: ExampleSectionProps) {
  const formatInput = (key: string, value: number | string | boolean): string => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-US').format(value);
    }
    return String(value);
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Worked Example</h2>

      <div className="bg-muted/50 rounded-lg p-6">
        <p className="font-medium mb-4">{example.scenario}</p>

        <div className="space-y-2 mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Inputs:</p>
          <ul className="space-y-1 text-sm">
            {Object.entries(example.inputs).map(([key, value]) => (
              <li key={key} className="flex">
                <span className="w-32 text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className="font-medium">{formatInput(key, value)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground mb-1">Result:</p>
          <p className="font-medium">{example.resultSummary}</p>
        </div>
      </div>
    </section>
  );
}
