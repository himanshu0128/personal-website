import React from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  as?: 'h1' | 'h2';
}

const SectionHeading: React.FC<Props> = ({ eyebrow, title, description, action, as: Heading = 'h2' }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent-700 dark:text-accent-400">
          {eyebrow}
        </p>
      )}
      <Heading
        className={`mt-2 font-bold tracking-tight ${Heading === 'h1' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}
      >
        {title}
      </Heading>
      {description && <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default SectionHeading;
