import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { subscribeToActiveSessions } from '../../services/socket';
import './DateTimeBlock.scss';


type DateTimeBlockProps = {
  activeSessions?: number;
};

const DateTimeBlock: React.FC<DateTimeBlockProps> = ({ activeSessions = 1 }) => {
  const [now, setNow] = useState(new Date());
  const [liveSessions, setLiveSessions] = useState(activeSessions);
  const { t, i18n } = useTranslation();
  const weekDayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

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
  const currentLocale = i18n.language === 'en' ? 'en-US' : i18n.language === 'es' ? 'es-ES' : 'uk-UA';

 const formattedDate = useMemo(
  () => now.toLocaleDateString(currentLocale),
  [currentLocale, now]
);
 const formattedTime = useMemo(
  () => now.toLocaleTimeString(currentLocale, {
    hour: '2-digit',
    minute: '2-digit',
  }),
  [currentLocale, now]
);


const formattedWeekDay = useMemo(
  () => t(`datetime.weekdays.${weekDayKeys[now.getDay()]}`),
  [now, t]
);

  return (
    <div className="date-time-block" aria-label={t('datetime.label')}>
      <div className="date-time-block__content">
        <div className="date-time-block__datetime">
          <div className="date-time-block__calendar">
           <div className="date-time-block__weekday">{formattedWeekDay}</div>
            <span className="date-time-block__date">{formattedDate}</span>
          </div>
          <div className="date-time-block__meta">
            <div className="date-time-block__sessions" aria-label={t('datetime.activeSessions', { count: liveSessions })}>
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
