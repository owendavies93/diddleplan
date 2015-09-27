'use strict';

describe('Filter: filterDate', function () {

  // load the filter's module
  beforeEach(module('diddleplanApp'));

  // initialize a new instance of the filter before each test
  var filterDate;
  beforeEach(inject(function ($filter) {
    filterDate = $filter('filterDate');
  }));

  it('should return the input prefixed with "filterDate filter:"', function () {
    // var text = 'angularjs';
    // expect(filterDate(text)).toBe('filterDate filter: ' + text);
  });

});
