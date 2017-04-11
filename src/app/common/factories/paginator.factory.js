(function () {
  'use strict';

  angular.module('fleetControl').factory('paginatorFactory', paginatorFactory);

  /*@ngInject*/
  function paginatorFactory() {

    return {
      create: function () {
        return {
          currentPage: 1,
          page: 0,
          size: 5,
          totalElements: 0,
          maxSize: 10
        };
      }
    };
  }
})();