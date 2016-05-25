'use strict';

var moment = require('moment');
var fixtures = require('./fixtures')
var onboardingScheduler = require('../');

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

var today;

exports.onboardingScheduler = {
  setUp: function(done) {
    today = new Date('Tue May 24 2016 12:34:56 GMT-0400 (EDT)');
    done();
  },
  'no args': function(test) {
    test.expect(3);
    test.deepEqual(onboardingScheduler(fixtures.inputs[0], today), fixtures.outputs[0], 'should handle single messages');
    test.deepEqual(onboardingScheduler(fixtures.inputs[1], today), fixtures.outputs[1], 'should handle multiple messages');
    test.deepEqual(onboardingScheduler(fixtures.inputs[2], today), fixtures.outputs[2], 'should handle messages with duplicate days');
    test.done();
  }
};
