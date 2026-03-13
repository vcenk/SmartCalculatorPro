interface EstimateDisclaimerProps {
  children?: React.ReactNode;
  variant?: 'default' | 'compact';
}

const defaultDisclaimer =
  'Results are estimates based on the information you provide and the assumptions shown on this page. They are not legal, tax, medical, or financial advice.';

export function EstimateDisclaimer({
  children,
  variant = 'default',
}: EstimateDisclaimerProps) {
  const content = children ?? defaultDisclaimer;
  const compact = variant === 'compact';

  return (
    <aside
      aria-label="Calculator disclaimer"
      className={`rounded-lg border border-amber-200 bg-amber-50 text-amber-900 ${
        compact ? 'p-3 text-sm' : 'p-4'
      }`}
    >
      <p className={compact ? '' : 'text-sm'}>{content}</p>
    </aside>
  );
}
