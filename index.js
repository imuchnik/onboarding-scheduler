/*
 * onboarding-scheduler
 *
 * A work of the public domain from the Consumer Financial Protection Bureau.
 */

'use strict';

var moment = require('moment');

// var input = [
//   {
//     title: 'This is a task',
//     day: 1,
//     sent: false
//   },
//   {
//     title: 'This is another task',
//     day: 2,
//     sent: false
//   },
//   {
//     title: 'This is yet another task',
//     day: 2,
//     sent: false
//   },
//   {
//     title: 'Aaaaaand another task!',
//     day: 3,
//     sent: false
//   }
// ]

moment.fn.isWeekend = function() {
  return this.isoWeekday() >= 6
}

moment.fn.nextBusinessDay = function() {
  var tomorrow = this.add(1, 'd');
  while (tomorrow.isWeekend()) {
    tomorrow.add(1, 'd');
  }
  return tomorrow;
}

function processTasks(tasks, startDate) {

  var day = moment(startDate),
      businessDays = [day.format()];

  tasks.forEach(function saveDate(task) {
    businessDays.push(day.nextBusinessDay().format());
  });

  console.log(businessDays);

  return tasks.map(function (task) {
    return {
      title: task.title,
      sent: task.sent,
      day: task.day,
      time: businessDays[task.day - 1]
    }
  });

}

module.exports = processTasks;
