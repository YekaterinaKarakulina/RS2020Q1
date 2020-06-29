import { getCurrentDate, getWeekDay } from '../js/utils/dateUtils';

describe('getWeekDay', () => {
  it('Should return week day by number', () => {
    const result = getWeekDay(0);
    expect(result.length).toBeGreaterThan(0);
    expect(result).toEqual('sunday');
  });
});

describe('getCurrentDate', () => {
  it('Should return date', () => {
    const appObject = {
      timezone: 'Asia/Dubai',
    };
    const result = getCurrentDate(appObject);
    expect(result).toBeInstanceOf(Date);
  });
});
