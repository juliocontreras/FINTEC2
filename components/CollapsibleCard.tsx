'use client';

import { PropsWithChildren, useState } from 'react';

interface CollapsibleCardProps {
  title: string;
  initiallyOpen?: boolean;
}

export default function CollapsibleCard({
  title,
  initiallyOpen = true,
  children,
}: PropsWithChildren<CollapsibleCardProps>) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <div className="border rounded shadow" data-testid="collapsible-card">
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 bg-gray-100"
        onClick={() => setOpen((o) => !o)}
      >
        <h2 className="font-semibold text-left">{title}</h2>
        <span>{open ? '-' : '+'}</span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

