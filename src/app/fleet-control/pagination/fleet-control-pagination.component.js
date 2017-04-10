(function () {
  'use strict';

  angular.module('fleetControl').component('fleetControlPagination', {
    templateUrl: 'app/fleet-control/pagination/fleet-control-pagination.html',
    controller: 'FleetControlPaginationController',
    bindings: {
      itens: '=',
      onPageChange: '&'
    }
  });
})();