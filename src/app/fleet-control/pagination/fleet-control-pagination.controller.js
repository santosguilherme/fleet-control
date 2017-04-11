(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlPaginationController', FleetControlPaginationController);

  /*@ngInject*/
  function FleetControlPaginationController() {
    var vm = this;

    vm.handleChangePage = function () {
      vm.onPageChange && vm.onPageChange() && vm.onPageChange()();
    };
  }
})();