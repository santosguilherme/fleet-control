(function () {
  'use strict';

  angular.module('fleetControl').config(configuration);

  /*@ngInject*/
  function configuration($httpProvider, $qProvider, growlProvider, $translateProvider, languageProvider, $compileProvider, localStorageServiceProvider) {
    $httpProvider.interceptors.push('requestExceptionInterceptor');

    $compileProvider.preAssignBindingsEnabled(true);
    $qProvider.errorOnUnhandledRejections(false);

    localStorageServiceProvider.setPrefix('fleetControl');

    configureGrowl(growlProvider);
    configureTranslate($translateProvider, languageProvider);
  }

  function configureGrowl(growlProvider) {
    growlProvider.globalTimeToLive({success: 5000, error: -1, warning: -1, info: 5000});
    growlProvider.globalDisableCountDown(true);
    growlProvider.globalPosition('top-center');
  }

  function configureTranslate($translateProvider, commonLanguageProvider) {
    $translateProvider.preferredLanguage('pt');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    $translateProvider.translations('pt', commonLanguageProvider.getLabels());
  }
})();