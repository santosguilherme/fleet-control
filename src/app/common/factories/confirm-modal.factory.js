(function () {
  'use strict';

  angular.module('fleetControl').factory('confirmModalFactory', confirmModalFactory);

  /*@ngInject*/
  function confirmModalFactory($uibModal) {
    return {
      open: function (text, callback, appendTo, backdrop) {
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
        appendTo && appendTo.length && (modalConfig.appendTo = appendTo);
        angular.isDefined(backdrop) && (modalConfig.backdrop = backdrop);

        var modalInstance = $uibModal.open(modalConfig);

        modalInstance.result.then(callback);
      }
    };
  }
})();