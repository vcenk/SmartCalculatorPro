/**
 * FormulaSection Component
 *
 * Displays the formula or methodology used by the calculator.
 */

import { Formula } from '@/lib/types/content';

interface FormulaSectionProps {
  formula: Formula;
  explanation: string[];
  methodologyNotes?: string[];
}

export function FormulaSection({ formula, explanation, methodologyNotes }: FormulaSectionProps) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">How It Works</h2>

      <div className="bg-muted/50 rounded-lg p-6 mb-4">
        <h3 className="font-medium mb-2">{formula.label}</h3>
        <code className="text-lg block text-primary">{formula.expression}</code>
        <p className="text-sm text-muted-foreground mt-2">{formula.plainText}</p>
      </div>

      <div className="space-y-2 mb-4">
        {explanation.map((line, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {line}
          </p>
        ))}
      </div>

      {methodologyNotes && methodologyNotes.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
          <p className="font-medium text-yellow-800 mb-2">Important Notes:</p>
          <ul className="space-y-1 text-yellow-700">
            {methodologyNotes.map((note, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">&bull;</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
