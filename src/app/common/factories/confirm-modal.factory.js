(function () {
  'use strict';

  angular.module('fleetControl').factory('confirmModalFactory', confirmModalFactory);

  /*@ngInject*/
  function confirmModalFactory($uibModal) {
    return {
      open: function (text) {
        var modalConfig = {
          animation: true,
          size: 'sm',
          backdrop: 'static',
          controller: 'ConfirmModalController',
          controllerAs: 'vm',
          templateUrl: 'app/common/components/confirm-modal/confirm-modal.html',
          resolve: {
            data: {text: text}
          }
        };

        return $uibModal.open(modalConfig);
      }
    };
  }
})();