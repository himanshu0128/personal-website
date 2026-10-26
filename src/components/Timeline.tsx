import React from 'react';

import { isCurrent } from 'utils/dates';

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  html?: string | null;
}

interface Props {
  items: TimelineItem[];
}

const Timeline: React.FC<Props> = ({ items }) => (
  <ol className="relative border-l border-zinc-200 dark:border-zinc-800">
    {items.map((item) => {
      const current = isCurrent(item.endDate);
      return (
        <li key={item.id} className="relative pb-10 pl-8 last:pb-0">
          <span
            aria-hidden
            className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-zinc-950 ${
              current ? 'bg-accent-500' : 'bg-zinc-300 dark:bg-zinc-700'
            }`}
          />
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
            <p className="shrink-0 font-mono text-xs text-zinc-500">
              {item.startDate} — {item.endDate}
            </p>
          </div>
          <p className="mt-0.5 font-medium text-accent-700 dark:text-accent-400">{item.subtitle}</p>
          {item.html && (
            <div
              className="prose prose-zinc mt-3 max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: item.html }}
            />
          )}
        </li>
      );
    })}
  </ol>
);

export default Timeline;
