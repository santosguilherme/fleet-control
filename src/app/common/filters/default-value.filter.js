(function () {
  'use strict';

  angular.module('fleetControl').filter('defaultValueFilter', defaultValueFilter);

  function defaultValueFilter() {
    function returnStringValue(string, emptyMessage) {
      return string.trim().length === 0 ? emptyMessage : string;
    }

    return function (value, optionalMessage) {
      var emptyMessage = optionalMessage || '-';

      return !value ? emptyMessage : angular.isString(value) ? returnStringValue(value, emptyMessage) : value;
    };
  }
})();
