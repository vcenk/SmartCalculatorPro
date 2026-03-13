/**
 * InputField Component
 *
 * Renders a single calculator input field based on content model.
 */

'use client';

import { CalculatorInput as CalculatorInputType } from '@/lib/types/content';

interface InputFieldProps {
  input: CalculatorInputType;
  value: number | string | boolean;
  onChange: (value: number | string | boolean) => void;
}

export function InputField({ input, value, onChange }: InputFieldProps) {
  const renderField = () => {
    switch (input.type) {
      case 'number':
        return (
          <input
            type="number"
            value={value as number}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            min={input.min}
            max={input.max}
            step={input.step ?? 1}
            placeholder={input.placeholder}
            required={input.required}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        );

      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            required={input.required}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {(input.options ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={value === true}
                onChange={() => onChange(true)}
                className="h-4 w-4 border-primary text-primary focus:ring-primary"
              />
              <span className="text-sm">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={value === false}
                onChange={() => onChange(false)}
                className="h-4 w-4 border-primary text-primary focus:ring-primary"
              />
              <span className="text-sm">No</span>
            </label>
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
              className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
            />
            <span className="text-sm">Enable this option</span>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={input.key} className="text-sm font-medium">
        {input.label}
        {input.required && <span className="text-red-500 ml-1">*</span>}
        {input.unit && <span className="text-muted-foreground ml-1">({input.unit})</span>}
      </label>
      {renderField()}
      {input.explanation && (
        <p className="text-xs text-muted-foreground">{input.explanation}</p>
      )}
    </div>
  );
}
