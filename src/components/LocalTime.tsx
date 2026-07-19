'use client';

import { useEffect, useState } from 'react';

export const LocalTime = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Tallinn',
        }).format(new Date())
      );

    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time ?? '--:--'}</span>;
};
