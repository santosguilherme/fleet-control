(function () {
  'use strict';

  angular.module('fleetControl').config(configuration);

  /*@ngInject*/
  function configuration($httpProvider, blockUIConfig, growlProvider, $translateProvider, languageProvider, $compileProvider) {
    $httpProvider.interceptors.push('requestExceptionInterceptor');
    $compileProvider.preAssignBindingsEnabled(true);

    configureBlockUI(blockUIConfig);
    configureGrowl(growlProvider);
    configureTranslate($translateProvider, languageProvider);
  }

  function configureBlockUI(blockUIConfig) {
    blockUIConfig.templateUrl = 'app/common/components/block-ui/block-ui-overlay.html';
    blockUIConfig.delay = 300;

    blockUIConfig.blockBrowserNavigation = false;
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