import moment from 'moment';

/**
 * Group.schedule -> to moment
 * @example
 *     group.schedule.find(s =>
 *         moment().isBetween(scheduleToMoment(s, 'startAt'), scheduleToMoment(s, 'endAt')));
 */

const scheduleToMoment = (
  schedule: {
    [x: string]:
      | string
      | number
      | void
      | moment.Moment
      | Date
      | (string | number)[]
      | moment.MomentInputObject
      | undefined;
    day: string | number;
  },
  startOrEnd: string | number
) => moment().day(schedule.day).hour(moment(schedule[startOrEnd]).hour()).minute(moment(schedule[startOrEnd]).minute());

export = { scheduleToMoment };
