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
  <ol className="relative">
    {items.map((item, index) => {
      const current = isCurrent(item.endDate);
      const last = index === items.length - 1;

      return (
        <li key={item.id} className="relative grid gap-1 pb-10 pl-8 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:pl-0">
          {/* date column */}
          <p className="font-mono text-xs leading-7 text-zinc-500 sm:text-right">
            {item.startDate} — {item.endDate}
          </p>

          {/* rail + dot */}
          <span
            aria-hidden
            className={`absolute left-[5px] top-2 w-px bg-zinc-200 dark:bg-zinc-800 sm:left-[calc(11rem+1rem-0.5px)] ${
              last ? 'h-0' : 'bottom-0 h-auto'
            }`}
          />
          <span
            aria-hidden
            className={`absolute left-0 top-[9px] h-[11px] w-[11px] rounded-full border-2 sm:left-[calc(11rem+1rem-5.5px)] ${
              current
                ? 'border-accent-500 bg-accent-500 shadow-[0_0_0_4px] shadow-accent-500/20'
                : 'border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950'
            }`}
          />

          <div>
            <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-semibold tracking-tight">
              {item.title}
              {current && (
                <span className="rounded-full bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent-700 ring-1 ring-inset ring-accent-600/20 dark:bg-accent-500/10 dark:text-accent-300 dark:ring-accent-400/20">
                  Current
                </span>
              )}
            </h3>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{item.subtitle}</p>
            {item.html && (
              <div
                className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400"
                dangerouslySetInnerHTML={{ __html: item.html }}
              />
            )}
          </div>
        </li>
      );
    })}
  </ol>
);

export default Timeline;
