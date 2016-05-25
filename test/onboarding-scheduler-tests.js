'use strict';

var moment = require('moment');
var onboardingScheduler = require('../index.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var input = [
  {
    title: 'This is a task',
    day: 1,
    sent: false
  },
  {
    title: 'This is another task',
    day: 2,
    sent: false
  },
  {
    title: 'This is yet another task',
    day: 2,
    sent: false
  },
  {
    title: 'Aaaaaand another task!',
    day: 3,
    sent: false
  }
]

var expected = [
  {
    title: 'This is a task',
    day: 1,
    sent: false
  },
  {
    title: 'This is another task',
    day: 2,
    sent: false
  },
  {
    title: 'This is yet another task',
    day: 2,
    sent: false
  },
  {
    title: 'Aaaaaand another task!',
    day: 3,
    sent: false
  }
]

var today = new Date('Tue May 24 2016 12:34:56 GMT-0400 (EDT)');

exports.onboardingScheduler = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.equal(onboardingScheduler(input, today), expected, 'should be awesome.');
    test.done();
  }
};
