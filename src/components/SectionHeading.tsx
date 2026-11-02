import React from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}

const SectionHeading: React.FC<Props> = ({ eyebrow, title, description, action, as: Tag = 'h2', className = '' }) => (
  <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}>
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag
        className={`mt-3 font-bold tracking-tight ${Tag === 'h1' ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'}`}
      >
        {title}
      </Tag>
      {description && <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default SectionHeading;
