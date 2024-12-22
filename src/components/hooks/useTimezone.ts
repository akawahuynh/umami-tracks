import { setItem } from 'next-basics';
import { TIMEZONE_CONFIG } from 'lib/constants';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';
import useStore, { setTimezone } from 'store/app';

const selector = (state: { timezone: string }) => state.timezone;

export function useTimezone() {
  const timezone = useStore(selector);

  const saveTimezone = (value: string) => {
    setItem(TIMEZONE_CONFIG, value);
    setTimezone(value);
  };

  const formatTimezoneDate = (date: string, pattern: string) => {
    return formatInTimeZone(
      /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{3})?Z$/.test(date)
        ? date
        : date.split(' ').join('T') + 'Z',
      timezone,
      pattern,
    );
  };

  const toUtc = (date: Date | string | number) => {
    return fromZonedTime(date, timezone);
  };

  const fromUtc = (date: Date | string | number) => {
    return toZonedTime(date, timezone);
  };

  return { timezone, saveTimezone, formatTimezoneDate, toUtc, fromUtc };
}

export default useTimezone;
