import React, { useEffect, useMemo, useState } from 'react';
import { subscribeToActiveSessions } from '../../services/socket';
import './DateTimeBlock.scss';

const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

type DateTimeBlockProps = {
  activeSessions?: number;
};

const DateTimeBlock: React.FC<DateTimeBlockProps> = ({ activeSessions = 1 }) => {
  const [now, setNow] = useState(new Date());
  const [liveSessions, setLiveSessions] = useState(activeSessions);

  useEffect(() => {
    const syncNow = () => setNow(new Date());
    const millisecondsUntilNextMinute = 60000 - (Date.now() % 60000);
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      syncNow();
      intervalId = window.setInterval(syncNow, 60000);
    }, millisecondsUntilNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToActiveSessions((count) => {
      setLiveSessions((current) => (current === count ? current : count));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const formattedDate = useMemo(() => now.toLocaleDateString('uk-UA'), [now]);
  const formattedTime = useMemo(() => now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }), [now]);

  return (
    <div className="date-time-block" aria-label="Top menu с датой, временем и активными сессиями">
      <div className="date-time-block__content">
        <div className="date-time-block__datetime">
          <div className="date-time-block__calendar">
            <div className="date-time-block__weekday">{weekDays[now.getDay()]}</div>
            <span className="date-time-block__date">{formattedDate}</span>
          </div>
          <div className="date-time-block__meta">
            <div className="date-time-block__sessions" aria-label={`Активных сессий: ${liveSessions}`}>
              <span className="date-time-block__sessions-dot" />
              <span className="date-time-block__sessions-count">{liveSessions}</span>
            </div>
            <span className="date-time-block__time">{formattedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeBlock;
