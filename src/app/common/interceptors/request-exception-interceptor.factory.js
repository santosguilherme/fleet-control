(function () {
  'use strict';

  angular.module('fleetControl').factory('requestExceptionInterceptor', requestExceptionInterceptor);

  /*@ngInject*/
  function requestExceptionInterceptor($q, growl) {
    return {
      requestError: function (rejection) {
        alertError(rejection);
        return $q.reject(rejection);
      },

      responseError: function (rejection) {
        alertError(rejection);
        return $q.reject(rejection);
      }
    };

    function alertError(rejection) {
      var MESSAGE_DEFAULT = '<strong>Erro desconhecido</strong>';
      var message = MESSAGE_DEFAULT;
      var status = rejection.status;
      var data = rejection.data;
      var isErrorDefined = false;
      var isMessageDefined = false;

      if (status === -1 || status === 404) {
        growl.error('Não foi possível acessar o servidor');
        return;
      }

      if (angular.isUndefined(data)) {
        growl.error(message);
        return;
      }

      isErrorDefined = data.error && angular.isDefined(data.error);
      isMessageDefined = data.message && angular.isDefined(data.message);
      message = '';

      if (isErrorDefined) {
        message = '<strong>' + data.error + '</strong>';
      }

      if (isMessageDefined && isErrorDefined) {
        message += '<strong>: </strong>';
      }

      if (isMessageDefined) {
        message += data.message;
      }

      if (!message) {
        message = MESSAGE_DEFAULT;
      }

      growl.error(message);
    }
  }
})();