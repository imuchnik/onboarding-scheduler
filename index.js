/*
 * onboarding-scheduler
 *
 * A work of the public domain from the Consumer Financial Protection Bureau.
 */

'use strict';

var moment = require('moment');
var _ = require('lodash');

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
      businessDays = [day.set({hour: 10, minute: 0, second: 0}).format()],
      scheduledTasks = [],
      hoursApart = 4;

  tasks.forEach(function saveDate(task) {
    businessDays.push(day.nextBusinessDay().format());
  });

  // Give every task a sequential date
  tasks = tasks.map(function (task) {
    task.time = businessDays[task.day - 1];
    return task;
  });

  // Group tasks on the same day and spread out their times
  tasks = _.groupBy(tasks, function(task) {
    return task.day;
  });
  for (var task in tasks) {
    if (tasks[task].length > 1) {
      hoursApart = Math.floor(8 / tasks[task].length);
      tasks[task] = tasks[task].map(function adjustTime(task, i) {
        var hour = 9 + (hoursApart / 2) + (hoursApart * i);
        task.time = moment(task.time).hour(hour).format();
        return task;
      });
    }
  }

  // Flatten the object back into an array
  for (var task in tasks) {
    scheduledTasks = scheduledTasks.concat(tasks[task]);
  }

  return scheduledTasks;

}

module.exports = processTasks;
