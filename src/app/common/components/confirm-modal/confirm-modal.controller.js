(function () {
  'use strict';

  angular.module('fleetControl').controller('ConfirmModalController', ConfirmPopinController);

  /*@ngInject*/
  function ConfirmPopinController($uibModalInstance, data) {
    var vm = this;
    vm.data = angular.copy(data);

    vm.cancel = function () {
      $uibModalInstance.dismiss();
    };

    vm.confirm = function () {
      $uibModalInstance.close();
    };
  }
})();