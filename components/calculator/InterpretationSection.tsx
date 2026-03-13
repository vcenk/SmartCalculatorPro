/**
 * InterpretationSection Component
 *
 * Displays result interpretation and warnings.
 */

import { ResultInterpretation } from '@/lib/types/content';

interface InterpretationSectionProps {
  interpretation: ResultInterpretation;
}

export function InterpretationSection({ interpretation }: InterpretationSectionProps) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Understanding Your Results</h2>

      {/* Default interpretation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-blue-800">{interpretation.defaultText}</p>
      </div>

      {/* Warning messages */}
      {interpretation.warningMessages && interpretation.warningMessages.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-medium text-amber-800 mb-2">Things to Consider:</h3>
          <ul className="space-y-2">
            {interpretation.warningMessages.map((warning, index) => (
              <li key={index} className="flex items-start text-amber-700">
                <svg
                  className="h-5 w-5 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
