/* eslint-disable */
(function () {
  'use strict';

  angular.module('fleetControl', [
    'ngResource',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'angular-growl',
    'pascalprecht.translate',
    'ui.mask',
    'ui.utils.masks',
    'LocalStorageModule',
    'angular-uuid'
  ]);
})();

/**
 * https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 */
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

/**
 * https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some
 */
// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
  Array.prototype.some = function (fun/*, thisArg*/) {
    'use strict';

    if (this == null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }

    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true;
      }
    }

    return false;
  };
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 */
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}
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
(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlTableController', FleetControlTableController);

  /*@ngInject*/
  function FleetControlTableController($window) {
    var vm = this;
    vm.allSelected = false;

    vm.openNewTab = function (url) {
      $window.open(url, '_blank');
    };

    vm.handleToggleSelectAll = function () {
      (vm.vehicles || []).forEach(function (vehicle) {
        vehicle.selected = vm.allSelected;
      });

      vm.onSelect()(getSelectedVehicles());
    };

    vm.handleToggleSelectRow = function () {
      vm.onSelect()(getSelectedVehicles());
    };

    function getSelectedVehicles() {
      return angular.copy(vm.vehicles || []).filter(function (vehicle) {
        return vehicle.selected;
      }).map(function (vehicle) {
        delete vehicle.selected;
        return vehicle;
      });
    }
  }
})();
(function () {
  'use strict';

  angular.module('fleetControl').component('fleetControlTable', {
    templateUrl: 'app/fleet-control/table/fleet-control-table.html',
    controller: 'FleetControlTableController',
    bindings: {
      vehicles: '=',
      onSelect: '&'
    }
  });
})();
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
(function () {
  'use strict';

  angular.module('fleetControl').component('fleetControlPagination', {
    templateUrl: 'app/fleet-control/pagination/fleet-control-pagination.html',
    controller: 'FleetControlPaginationController',
    bindings: {
      paginator: '=',
      onPageChange: '&'
    }
  });
})();
(function () {
  'use strict';

  angular.module('fleetControl').factory('fleetControlModalFactory', fleetControlModalFactory);

  /*@ngInject*/
  function fleetControlModalFactory($uibModal) {
    return {
      open: function (vehicle) {
        var modalConfig = {
          animation: true,
          size: 'md',
          backdrop: 'static',
          component: 'fleetControlModal',
          resolve: {
            vehicle: function () {
              return angular.copy(vehicle || {});
            }
          }
        };
        return $uibModal.open(modalConfig);
      }
    };
  }
})();
(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlModalController', FleetControlModalController);

  /*@ngInject*/
  function FleetControlModalController() {
    var vm = this;

    constructor();

    function constructor(){
      vm.fuels = ['Álcool', 'Flex', 'Gasolina'];
      vm.vehicle = angular.copy(vm.resolve.vehicle);
      vm.regexPlate = /^[A-Za-z]{3}-[0-9]{4}$/;
    }

    vm.handleClose = function () {
      vm.vehicle = angular.merge({}, vm.vehicle, {placa: vm.vehicle.placa.toUpperCase()});

      vm.modalInstance.close(vm.vehicle);
    };

    vm.handleCancel = function () {
      vm.modalInstance.dismiss();
    };
  }
})();
(function () {
  'use strict';

  angular.module('fleetControl').component('fleetControlModal', {
    templateUrl: 'app/fleet-control/modal/fleet-control-modal.html',
    controller: 'FleetControlModalController',
    bindings: {
      modalInstance: '<',
      resolve: '<'
    }
  });
})();
(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlActionsController', FleetControlActionsController);

  /*@ngInject*/
  function FleetControlActionsController() {
    var vm = this;

    constructor();

    function constructor() {
      vm.filterText = '';
    }

    vm.handleClickNewVehicle = function () {
      vm.createVehicle()();
    };

    vm.handleClickEditVehicle = function () {
      vm.editVehicle()();
    };

    vm.handleClickDeleteVehicle = function () {
      vm.deleteVehicle()();
    };

    vm.onChangeFilterText = function () {
      vm.onFilter && vm.onFilter() && vm.onFilter()(vm.filterText);
    };
  }
})();
(function () {
  'use strict';

  angular.module('fleetControl').component('fleetControlActions', {
    templateUrl: 'app/fleet-control/actions/fleet-control-actions.html',
    controller: 'FleetControlActionsController',
    bindings: {
      onFilter: '&',
      showEditButton: '<',
      showDeleteButton: '<',
      createVehicle: '&',
      editVehicle: '&',
      deleteVehicle: '&'
    }
  });
})();
(function () {
  'use strict';

  angular.module('fleetControl').service('vehiclesService', vehiclesService);

  /*@ngInject*/
  function vehiclesService($q, uuid, localStorageService, $filter, paginatorFactory) {
    var vm = this;
    var KEY = 'vehicles';

    vm.query = function (filter) {
      var deferred = $q.defer();

      deferred.resolve(queryResponseObject(filter));

      return deferred.promise;
    };

    vm.save = function (vehicle) {
      var deferred = $q.defer();

      if (!vehicle) {
        deferred.reject();
      }

      if (vehicle) {
        deferred.resolve(saveVehicle(vehicle));
      }

      return deferred.promise;
    };

    vm.delete = function (vehicleId) {
      var deferred = $q.defer();

      if (!vehicleId) {
        deferred.reject();
      }

      deferred.resolve(deleteVehicleById(vehicleId));

      return deferred.promise;
    };

    function deleteVehicleById(vehicleId) {
      var vehiclesToSave = queryAll().filter(function (vehicle) {
        return vehicle.id !== vehicleId;
      });

      return saveArrayVehicles(vehiclesToSave);
    }

    function saveVehicle(vehicle) {
      var vehicleToSave = angular.merge({}, vehicle);
      var vehiclesSaved = queryAll();

      if (vehicle.id) {
        vehiclesSaved = vehiclesSaved.filter(function (vehicle) {
          return vehicle.id !== vehicleToSave.id;
        });
      }

      vehicleToSave = angular.merge({}, vehicle, {id: uuid.v4()});
      vehiclesSaved.push(vehicleToSave);
      saveArrayVehicles(vehiclesSaved);

      return vehiclesSaved;
    }

    function queryResponseObject(filter) {
      var queryFilter = filter || paginatorFactory.create();
      var vehicles = $filter('filter')(queryAll(), queryFilter.text);
      var vehiclesTotalLength = vehicles.length;
      var startAt = (queryFilter.currentPage - 1) * queryFilter.size;
      var endAt = startAt + queryFilter.size;

      return {
        totalElements: vehiclesTotalLength,
        content: $filter('orderBy')(vehicles, 'placa').slice(startAt, endAt)
      };
    }

    function saveArrayVehicles(array) {
      return localStorageService.set(KEY, array);
    }

    function queryAll() {
      return localStorageService.get(KEY) || [];
    }
  }
})();
(function () {
  'use strict';

  angular.module('fleetControl').provider('language', language);

  function language() {
    var vm = this;
    var labels = {

      'LABELS': {
        'ATTENTION': 'Atenção',

        'BRAND': 'Marca',

        'CANCEL': 'Cancelar',
        'CONFIRM': 'Confirmar',

        'DELETE_VEHICLE': 'Remover Carro(s)',

        'EDIT_VEHICLE': 'Editar Carro',

        'FUEL': 'Combustível',

        'IMAGE': 'Imagem',

        'MODEL': 'Modelo',

        'NEW_VEHICLE': 'Novo Carro',
        'NO_IMAGE': 'Sem imagem',

        'PAGINATION_NEXT': '>>',
        'PAGINATION_PREVIOUS': '<<',
        'PHOTO': 'Foto',
        'PLATE': 'Placa',
        'PRICE': 'Valor',

        'SAVE': 'Salvar Carro',
        'SELECT_FUEL': 'Selecione um combustível',

        'VEHICLE_REGISTER': 'Cadastro de Carro'
      },
      'MESSAGES': {
        'NOT_FOUND_VEHICLES': 'Nenhum carro encontrado',

        'VEHICLE_REMOVE_CONFIRM': 'Deseja remover o(s) <strong>{{size}}</strong> carro(s)?',
        'VEHICLE_REMOVED_SUCCESS': 'Carros removidos com sucesso!',
        'VEHICLE_SAVED_SUCCESS': 'Carro salvo com sucesso!'
      }
    };

    vm.getLabels = function () {
      return labels;
    };

    this.$get = function () {
      return {
        getLabels: vm.getLabels
      };
    };
  }
})();
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

(function () {
  'use strict';

  angular.module('fleetControl').factory('urlFactory', urlFactory);

  /*@ngInject*/
  function urlFactory($location) {
    var factory = {};

    factory.getRootURL = getRootURL;

    return factory;

    function getRootURL() {
      return $location.protocol() + '://' + $location.host() + ':' + $location.port();
    }
  }

})();
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
(function () {
  'use strict';

  angular.module('fleetControl').directive('initialFocus', solarBpmFocus);

  /*@ngInject*/
  function solarBpmFocus($timeout) {
    return {
      restrict: 'A',
      link: linkFn
    };

    function linkFn(scope, element) {
      element && element[0] && $timeout(function () {
        angular.element(element[0]).focus();
      });
    }
  }
})();
(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlController', FleetControlController);

  /*@ngInject*/
  function FleetControlController(vehiclesService, paginatorFactory, growl, $translate, fleetControlModalFactory, confirmModalFactory, $q) {
    var vm = this;

    constructor();

    function constructor() {
      vm.filter = angular.merge({}, {text: ''}, paginatorFactory.create());
      vm.showEditButton = false;
      vm.showDeleteButton = false;
      vm.selectedsVehicles = [];

      queryVehicles();
    }

    function queryVehicles() {
      vehiclesService.query(vm.filter).then(function (response) {
        vm.vehicles = response.content;
        vm.filter.totalElements = response.totalElements;
      });
    }

    vm.addVehicle = function () {
      fleetControlModalFactory.open().result
        .then(function (vehicle) {
          return vehiclesService.save(vehicle);
        })
        .then(function () {
          growl.success($translate.instant('MESSAGES.VEHICLE_SAVED_SUCCESS'));
          queryVehicles();
        });
    };

    vm.updateVehicle = function () {
      var vehicleToEdit = vm.selectedsVehicles[0];

      fleetControlModalFactory.open(vehicleToEdit).result
        .then(function (vehicle) {
          vm.showEditButton = false;
          vm.selectedsVehicles = [];

          return vehiclesService.save(vehicle);
        })
        .then(function () {
          growl.success($translate.instant('MESSAGES.VEHICLE_SAVED_SUCCESS'));
          queryVehicles();
        });

    };

    vm.removeVehicle = function () {
      confirmModalFactory.open($translate.instant('MESSAGES.VEHICLE_REMOVE_CONFIRM', {size: vm.selectedsVehicles.length})).result
        .then(function () {
          var promises = vm.selectedsVehicles.map(function (vehicle) {
            return vehiclesService.delete(vehicle.id);
          });

          $q.all(promises).then(function () {
            vm.showDeleteButton = false;
            vm.selectedsVehicles = [];
            queryVehicles();
            growl.success($translate.instant('MESSAGES.VEHICLE_REMOVED_SUCCESS'));
          });


        });
    };

    vm.onSelectVehicles = function (selectedsVehicles) {
      vm.showEditButton = selectedsVehicles && selectedsVehicles.length === 1;
      vm.showDeleteButton = selectedsVehicles && selectedsVehicles.length;
      vm.selectedsVehicles = angular.copy(selectedsVehicles);
    };

    vm.filterVehicles = function (text) {
      vm.filter.text = text;
      vm.filter.currentPage = 1;

      queryVehicles();
    };

    vm.onPageChange = function () {
      queryVehicles();
    };
  }
})();
(function () {
  'use strict';

  angular.module('fleetControl').component('fleetControl', {
    templateUrl: 'app/fleet-control/fleet-control.html',
    controller: 'FleetControlController'
  });
})();
(function () {
  'use strict';

  angular.module('fleetControl').run(run);

  /*@ngInject*/
  function run(vehiclesService) {
    vehiclesService.query().then(function (response) {
      if (response.totalElements) {
        return;
      }

      insertDefaultsVehicles();
    });
    function insertDefaultsVehicles() {
      [{
        combustivel: 'Flex',
        imagem: null,
        marca: 'Volkswagem',
        modelo: 'Gol',
        placa: 'FFF5498',
        valor: 20000
      }, {
        combustivel: 'Gasolina',
        imagem: null,
        marca: 'Volkswagem',
        modelo: 'Fox',
        placa: 'FOX4125',
        valor: 20000
      }, {
        combustivel: 'Alcool',
        imagem: 'http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg',
        marca: 'Volkswagen',
        modelo: 'Fusca',
        placa: 'PAI4121',
        valor: 20000
      }].forEach(function (vehicle) {
        vehiclesService.save(vehicle);
      });
    }
  }
})();
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
angular.module('fleetControl').run(['$templateCache', function($templateCache) {$templateCache.put('index.html','<!DOCTYPE html><html lang="pt-br" ng-app="fleetControl"><head><title>Controle de Frotas</title><meta charset="UTF-8"><meta name="description" content=""><meta name="viewport" content="width=device-width"></head><body><div growl=""></div><fleet-control></fleet-control></body></html>');
$templateCache.put('app/fleet-control/fleet-control.html','<div><header class="app-header"><img src="assets/images/logo.png" alt=""></header><div class="container vehicles-content"><div class="row"><div class="col-xs-12"><fleet-control-actions on-filter="$ctrl.filterVehicles" create-vehicle="$ctrl.addVehicle" edit-vehicle="$ctrl.updateVehicle" delete-vehicle="$ctrl.removeVehicle" show-edit-button="$ctrl.showEditButton" show-delete-button="$ctrl.showDeleteButton"></fleet-control-actions></div></div><div class="row"><div class="col-xs-12"><fleet-control-table vehicles="$ctrl.vehicles" on-select="$ctrl.onSelectVehicles"></fleet-control-table></div></div><div class="row"><div class="col-xs-12"><fleet-control-pagination paginator="$ctrl.filter" on-page-change="$ctrl.onPageChange"></fleet-control-pagination></div></div></div></div>');
$templateCache.put('app/fleet-control/actions/fleet-control-actions.html','<div class="vehicle-table-actions clearfix"><div class="actions-buttons"><button class="btn btn-primary" ng-bind="::\'LABELS.NEW_VEHICLE\' | translate" ng-click="$ctrl.handleClickNewVehicle()"></button> <button class="btn btn-default" ng-bind="::\'LABELS.EDIT_VEHICLE\' | translate" ng-show="$ctrl.showEditButton" ng-click="$ctrl.handleClickEditVehicle()"></button> <button class="btn btn-default" ng-bind="::\'LABELS.DELETE_VEHICLE\' | translate" ng-show="$ctrl.showDeleteButton" ng-click="$ctrl.handleClickDeleteVehicle()"></button></div><div class="form-group"><div class="input-group"><input type="text" class="form-control" ng-model="$ctrl.filterText" ng-model-options="{ debounce: 300 }" ng-change="$ctrl.onChangeFilterText()" placeholder="Pesquisar" initial-focus=""> <span class="input-group-addon" id="basic-addon2"><i class="fa fa-search"></i></span></div></div></div>');
$templateCache.put('app/fleet-control/modal/fleet-control-modal.html','<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="$ctrl.handleCancel()"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" ng-bind="::\'LABELS.VEHICLE_REGISTER\' | translate"></h4></div><div class="modal-body"><form role="form" name="form"><div class="row"><div class="form-group col-xs-12 col-sm-4" ng-class="{\'has-error\': form.carPlate.$dirty && form.carPlate.$error.required}"><label class="control-label label-required" for="carPlate" ng-bind="::\'LABELS.PLATE\' | translate"></label> <input id="carPlate" name="carPlate" type="text" class="form-control" ng-model="$ctrl.vehicle.placa" ui-mask="AAA-9999" ui-mask-placeholder="" ui-mask-placeholder-char="_" required="" initial-focus=""></div></div><div class="row"><div class="form-group col-xs-12 col-sm-6 col-md-6" ng-class="{\'has-error\': form.carBrand.$dirty && form.carBrand.$error.required}"><label class="control-label label-required" for="carBrand" ng-bind="::\'LABELS.BRAND\' | translate"></label> <input id="carBrand" name="carBrand" type="text" class="form-control" ng-model="$ctrl.vehicle.marca" required=""></div><div class="form-group col-xs-12 col-sm-6 col-md-6" ng-class="{\'has-error\': form.carModel.$dirty && form.carModel.$error.required}"><label class="control-label label-required" for="carModel" ng-bind="::\'LABELS.MODEL\' | translate"></label> <input id="carModel" name="carModel" type="text" class="form-control" ng-model="$ctrl.vehicle.modelo" required=""></div></div><div class="row"><div class="form-group col-xs-12 col-sm-6 col-md-6" ng-class="{\'has-error\': form.carFuel.$dirty && form.carFuel.$error.required}"><label class="control-label" for="carFuel" ng-bind="::\'LABELS.FUEL\' | translate"></label><select id="carFuel" name="carFuel" class="form-control" ng-model="$ctrl.vehicle.combustivel" ng-options="fuel as fuel for fuel in $ctrl.fuels"><option value="">{{::\'LABELS.SELECT_FUEL\' | translate}}</option></select></div><div class="form-group col-xs-12 col-sm-6 col-md-6" ng-class="{\'has-error\': form.carPrice.$dirty && form.carPrice.$error.required}"><label class="control-label" for="carPrice" ng-bind="::\'LABELS.PRICE\' | translate"></label> <input id="carPrice" name="carPrice" type="text" class="form-control" ng-model="$ctrl.vehicle.valor" ui-money-mask=""></div></div><div class="row"><div class="form-group col-xs-12" ng-class="{\'has-error\': form.carImage.$dirty && form.carImage.$error.required}"><label class="control-label" for="carImage" ng-bind="::\'LABELS.IMAGE\' | translate"></label> <input id="carImage" name="carImage" type="text" class="form-control" ng-model="$ctrl.vehicle.imagem"></div></div></form></div><div class="modal-footer"><button class="btn btn-default" ng-click="$ctrl.handleCancel()" ng-bind="::\'LABELS.CANCEL\' | translate"></button> <button type="submit" class="btn btn-primary" ng-click="$ctrl.handleClose()" ng-disabled="!form.$valid" ng-bind="::\'LABELS.SAVE\' | translate"></button></div>');
$templateCache.put('app/fleet-control/pagination/fleet-control-pagination.html','<div class="vehicles-table-pagination"><ul class="pagination-sm" uib-pagination="" boundary-link-numbers="true" rotate="false" items-per-page="$ctrl.paginator.size" total-items="$ctrl.paginator.totalElements" ng-model="$ctrl.paginator.currentPage" max-size="$ctrl.paginator.maxSize" ng-change="$ctrl.handleChangePage()" next-text="{{::\'LABELS.PAGINATION_NEXT\' | translate}}" previous-text="{{::\'LABELS.PAGINATION_PREVIOUS\' | translate}}"></ul></div>');
$templateCache.put('app/fleet-control/table/fleet-control-table.html','<table class="table vehicle-table"><thead><tr><th><input type="checkbox" class="cursor-pointer" ng-model="$ctrl.allSelected" ng-change="$ctrl.handleToggleSelectAll()"></th><th ng-bind="::\'LABELS.PLATE\' | translate"></th><th ng-bind="::\'LABELS.MODEL\' | translate"></th><th ng-bind="::\'LABELS.BRAND\' | translate"></th><th ng-bind="::\'LABELS.PHOTO\' | translate"></th><th ng-bind="::\'LABELS.FUEL\' | translate"></th><th ng-bind="::\'LABELS.PRICE\' | translate"></th></tr></thead><tbody><tr ng-repeat="vehicle in $ctrl.vehicles" ng-class="{\'active\': vehicle.selected}"><td><input type="checkbox" class="cursor-pointer" ng-model="vehicle.selected" ng-change="$ctrl.handleToggleSelectRow()"></td><td ng-bind="vehicle.placa"></td><td ng-bind="vehicle.modelo"></td><td ng-bind="vehicle.marca"></td><td><a class="btn-link" ng-if="vehicle.imagem" ng-bind="::\'LABELS.IMAGE\' | translate" ng-click="$ctrl.openNewTab(vehicle.imagem)"></a> <span ng-if="!vehicle.imagem" ng-bind="::\'LABELS.NO_IMAGE\' | translate"></span></td><td ng-bind="vehicle.combustivel | defaultValueFilter"></td><td ng-bind="vehicle.valor | currency:\'\' | defaultValueFilter"></td></tr><tr ng-show="!$ctrl.vehicles.length"><td colspan="7" align="center" ng-bind="::\'MESSAGES.NOT_FOUND_VEHICLES\' | translate"></td></tr></tbody></table>');
$templateCache.put('assets/libs/roboto-fontface/test.html','<!Doctype html><html><head><title>Test Font Face</title><link rel="stylesheet" href="css/roboto/roboto-fontface.css"><link rel="stylesheet" href="css/roboto-condensed/roboto-condensed-fontface.css"><link rel="stylesheet" href="css/roboto-slab/roboto-slab-fontface.css"><style>\r\n        body {\r\n            background: #F2F2F2;\r\n        }\r\n\r\n        .test-header {\r\n            text-align: center;\r\n            font-family: \'Roboto-Black\';\r\n            font-size: 2em;\r\n            padding: 0;\r\n            margin: 0;\r\n        }\r\n\r\n        .test-header h1 {\r\n            padding: 0;\r\n            margin: 0;\r\n        }\r\n\r\n        section {\r\n            padding: 2% 10%;\r\n            margin: 0 auto;\r\n        }\r\n        /*Roboto*/\r\n\r\n        .roboto {\r\n            font-family: \'Roboto\';\r\n        }\r\n\r\n        .roboto-italic {\r\n            font-family: \'Roboto-RegularItalic\';\r\n        }\r\n\r\n        .roboto-light {\r\n            font-family: \'Roboto-Light\';\r\n        }\r\n\r\n        .roboto-light-italic {\r\n            font-family: \'Roboto-LightItalic\';\r\n        }\r\n\r\n        .roboto-bold {\r\n            font-family: \'Roboto-Bold\';\r\n        }\r\n\r\n        .roboto-bold-italic {\r\n            font-family: \'Roboto-BoldItalic\';\r\n        }\r\n\r\n        .roboto-medium {\r\n            font-family: \'Roboto-Medium\';\r\n        }\r\n\r\n        .roboto-medium-italic {\r\n            font-family: \'Roboto-MediumItalic\';\r\n        }\r\n\r\n        .roboto-thin {\r\n            font-family: \'Roboto-Thin\';\r\n        }\r\n\r\n        .roboto-thin-italic {\r\n            font-family: \'Roboto-ThinItalic\';\r\n        }\r\n        /*Roboto Condensed*/\r\n\r\n        .roboto-condensed {\r\n            font-family: \'Roboto-Condensed\';\r\n        }\r\n\r\n        .roboto-condensed-italic {\r\n            font-family: \'Roboto-Condensed-RegularItalic\';\r\n        }\r\n\r\n        .roboto-condensed-light {\r\n            font-family: \'Roboto-Condensed-Light\';\r\n        }\r\n\r\n        .roboto-condensed-light-italic {\r\n            font-family: \'Roboto-Condensed-LightItalic\';\r\n        }\r\n\r\n        .roboto-condensed-bold {\r\n            font-family: \'Roboto-Condensed-Bold\';\r\n        }\r\n\r\n        .roboto-condensed-bold-italic {\r\n            font-family: \'Roboto-Condensed-BoldItalic\';\r\n        }\r\n        /*Roboto Slab*/\r\n\r\n        .roboto-slab {\r\n            font-family: \'Roboto-Slab\';\r\n        }\r\n\r\n        .roboto-slab-light {\r\n            font-family: \'Roboto-Slab-Light\';\r\n        }\r\n\r\n        .roboto-slab-bold {\r\n            font-family: \'Roboto-Slab-Bold\';\r\n        }\r\n\r\n        .roboto-slab-thin {\r\n            font-family: \'Roboto-Slab-Thin\';\r\n        }\r\n    </style></head><body><header class="test-header"><h1>Roboto-Fontface-Bower</h1></header><section class="roboto"><header><h1>I am Roboto</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-italic"><header><h1>I am Roboto Italic</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-light"><header><h1>I am Roboto Light</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-light-italic"><header><h1>I am Roboto Light Italic</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-medium"><header><h1>I am Roboto Medium</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-medium-italic"><header><h1>I am Roboto Medium Italic</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-bold"><header><h1>I am Roboto Bold</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-bold-italic"><header><h1>I am Roboto Bold Italic</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-thin"><header><h1>I am Roboto Thin</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-thin-italic"><header><h1>I am Roboto Thin Italic</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-condensed"><header><h1>I am RobotoCondensed</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-condensed-italic"><header><h1>I am RobotoCondensed Italic</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-condensed-light"><header><h1>I am RobotoCondensed Light</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-condensed-light-italic"><header><h1>I am RobotoCondensed Light Italic</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-condensed-bold"><header><h1>I am RobotoCondensed Bold</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-condensed-bold-italic"><header><h1>I am RobotoCondensed Bold Italic</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-slab"><header><h1>I am RobotoSlab</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-slab-light"><header><h1>I am RobotoSlab Light</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-slab-bold"><header><h1>I am RobotoSlab Bold</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section><section class="roboto-slab-thin"><header><h1>I am RobotoSlab Thin</h1></header>CSS on its own can be fun, but stylesheets are getting larger, more complex, and harder to maintain. This is where a preprocessor can help. Sass lets you use features that don\'t exist in CSS yet like variables, nesting, mixins, inheritance and other nifty goodies that make writing CSS fun again.</section></body></html>');
$templateCache.put('app/common/components/confirm-modal/confirm-modal.html','<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="vm.cancel()"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" ng-bind="::\'LABELS.ATTENTION\' | translate"></h4></div><div class="modal-body"><span ng-bind-html="::vm.data.text"></span></div><div class="modal-footer"><button type="submit" class="btn btn-default" ng-click="vm.cancel()" solar-bpm-focus=""><span ng-bind="::\'LABELS.CANCEL\' | translate"></span></button> <button type="submit" class="btn btn-warning" ng-click="vm.confirm()"><span ng-bind="::\'LABELS.CONFIRM\' | translate"></span></button></div>');
$templateCache.put('assets/libs/angular-local-storage/demo/demo.html','<!doctype html><html lang="en"><meta charset="utf-8"><title>Demo of Angular Local Storage Module</title><meta name="description" content="Demo of Angular Local Storage Module"><meta name="author" content="Gregory Pike"><link rel="stylesheet" href="http://necolas.github.com/normalize.css/2.0.1/normalize.css"><link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.1.1/css/bootstrap-combined.min.css" rel="stylesheet"><link href="http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.css" rel="stylesheet"><link href="demo-style.css" rel="stylesheet"><body onload="prettyPrint()"><div class="container" ng-app="demoModule"><div class="navbar navbar-inverse"><div class="navbar-inner"><a class="brand" href="#">Angular Local Storage</a></div></div><div class="hero-unit"><h1>Give it a try</h1><div ng-controller="DemoCtrl"><p><input type="text" ng-model="localStorageDemo" placeholder="Start typing..."></p><blockquote class="well" ng-show="localStorageDemoValue"><p ng-bind="localStorageDemoValue"></p><small>{{storageType}} value</small></blockquote><p><button ng-click="clearAll()">Clear All</button></p></div><p>The Angular Local Storage Module is meant to be a plug-and-play Angular module for accessing the browsers Local Storage API.</p></div><p>Angular Local Storage offers you access to the browser local storage API through Angular but also allows has the following features:</p><ul><li>Control local storage access through key prefices (e.g. "myApp.keyName")</li><li>Checks browser support and falls back to cookies for antiquated browsers</li><li>Allows programmatic access to remove all keys for a given app</li></ul><h3>Usage</h3><div style="float: right"><script async="" src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-8242772837340688" data-ad-slot="1586567981"></ins><script>\n    (adsbygoogle = window.adsbygoogle || []).push({});\n    </script></div><h6>Dependencies:</h6><ul><li><code>AngularJS</code> <small><a href="http://angularjs.org/">http://angularjs.org/</a></small></li><li><code>Angular Local Storage Module</code> <small><a href="../src/angular-local-storage.js">angular-local-storage.js</a></small></li></ul><h6>JS Example</h6><pre class="prettyprint lang-js">\nvar YourCtrl = function($scope, localStorageService, ...) {\n  // To add to local storage\n  localStorageService.set(\'localStorageKey\',\'Add this!\');\n  // Read that value back\n  var value = localStorageService.get(\'localStorageKey\');\n  // To remove a local storage\n  localStorageService.remove(\'localStorageKey\');\n  // Removes all local storage\n  localStorageService.clearAll();\n  // You can also play with cookies the same way\n  localStorageService.cookie.set(\'localStorageKey\',\'I am a cookie value now\');\n}</pre><h3>API Access</h3><table class="table table-striped table-bordered"><thead><tr><th>Call</th><th>Arguments</th><th>Action</th><th>Returns</th></tr></thead><tbody><tr><td><code>isSupported</code></td><td class="muted"><small>n/a</small></td><td>Checks the browsers support for local storage</td><td>Boolean for success</td></tr><tr><td><code>set</code></td><td><small>key, value</small></td><td>Adds a key-value pair to the browser local storage</td><td>Boolean for success</td></tr><tr><td><code>get</code></td><td><small>key</small></td><td>Gets a value from local storage</td><td>Stored value</td></tr><tr><td><code>remove</code></td><td><small>key, ...</small></td><td>Removes a key-value pairs from the browser local storage</td><td>n/a</td></tr><tr><td><code>clearAll</code></td><td class="muted">n/a</td><td><span class="label label-warning">Warning</span> Removes all local storage key-value pairs for this app. It will optionally take a string, which is converted to a regular expression, and then clears keys based on that regular expression.</td><td>Boolean for success</td></tr><tr><td><code>cookie</code></td><td><small>set | get | remove | clearAll</small></td><td>Each function within cookie uses the same arguments as the coresponding local storage functions</td><td>n/a</td></tr></tbody></table></div><script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.min.js"></script><script src="http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.js"></script><script src="https://rawgit.com/grevory/angular-local-storage/master/dist/angular-local-storage.min.js"></script><script src="demo-app.js"></script></body></html>');
$templateCache.put('assets/libs/angular-ui-mask/demo/index.html','<!DOCTYPE html><html lang="en" ng-app="demo"><head><meta charset="utf-8"><title>AngularJS ui-mask</title><script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.js"></script><link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.css"><script src="../dist/mask.js"></script></head><body class="container"><script>\n            var app = angular.module(\'demo\', [\'ui.mask\']);\n        </script><section id="mask"><div class="page-header"><h1>Mask <small><a href="https://github.com/angular-ui/ui-mask">GitHub</a></small></h1></div><div class="row"><div class="col-md-6"><h3>What?</h3><p>Apply a mask on an input field so the user can only type pre-determined pattern.</p><form name="demo" class="form-horizontal"><div class="form-group"><label class="col-sm-3" for="masked">Masked Input:</label><div class="col-sm-9" ng-init="vm = {}"><input ng-if="!remove" class="form-control" id="masked" name="masked" ui-mask="{{y}}" ui-options="{{options | json}}" model-view-value="{{modelViewValue}}" ng-model="vm.x" placeholder="Write a mask or click a button" ui-mask-placeholder="" ui-mask-placeholder-char="{{z}}"> <span class="help-inline"><div ng-show="vm.x.length">Model value: <code>{{vm.x}}</code></div><div ng-hide="vm.x.length">Model value: <code>undefined</code></div><div ng-show="demo.masked.$viewValue.length">NgModelController.$viewValue: <code>{{demo.masked.$viewValue}}</code></div><div ng-hide="demo.masked.$viewValue.length">NgModelController.$viewValue: <code>undefined</code></div></span></div></div><div class="form-group"><label class="col-sm-3" for="definition">Mask Definition:</label><div class="col-sm-9"><input class="form-control" id="definition" ng-model="y" style="vertical-align: top;"> <span class="help-inline"><code>A</code> Any letter.<br><code>9</code> Any number.<br><code>*</code> Any letter or number.<br><code>?</code> Make any part of the mask optional.</span></div></div><div class="form-group"><label class="col-sm-3" for="placeholder-char">Default placeholder char:</label><div class="col-sm-9"><input class="form-control" id="placeholder-char" ng-model="z" style="vertical-align: top; width: 10em;" maxlength="5"> <span class="help-inline">You can use any single char, or exactly <code>space</code> to use space symbol. The default value if nothing is specified is: <code>_</code></span></div></div><div class="form-group"><label class="col-sm-3">Predefined masks:</label><div class="col-sm-9"><p><button class="btn btn-default" ng-click="y = undefined; z=\'\'">Set to undefined (uninitialize)</button></p><p><button class="btn btn-default" ng-click="y = \'(999) 999-9999\';z=\'\'">Set to (999) 999-9999</button></p><p><button class="btn btn-default" ng-click="y = \'(999) 999-9999 ext. 999\';z=\'\'">Set to (999) 999-9999 ext. 999</button></p><p><button class="btn btn-default" ng-click="y = \'(999) 999-9999 ext. ?9?9?9\';z=\'\'">Set to (999) 999-9999 ext. ?9?9?9</button></p><p><button class="btn btn-default" ng-click="y = \'(?9?9?9) ?9?9?9-?9?9?9?9\'">Set to (999) 999-9999 (no validation)</button></p><p><button class="btn btn-default" ng-click="y = \'(999) 999-9999 ext. 999\'">Set to (999) 999-9999 ext. 999</button></p><p><button class="btn btn-default" ng-click="y = \'(**: AAA-999)\';z=\'\'">Set to (**: AAA-999)</button></p><p><button class="btn btn-default" ng-click="y = \'9999 9999 9999 9999\';z=\'space\'">Set to 9999 9999 9999 9999 (with space chars as placeholders)</button></p><p><button class="btn btn-default" ng-click="y = \'AA-9999\';z=\'*\'">Set to AA-9999 (with asterisks chars as placeholders)</button></p></div></div><div class="form-group"><label class="col-sm-3" for="modelViewValue">Model View Value:</label><div class="col-sm-9"><input type="checkbox" id="modelViewValue" ng-model="modelViewValue" style="vertical-align: top;"></div></div><div class="form-group"><label class="col-sm-3">Re-initialize:</label><div class="col-sm-9"><div>Use the following checkbox to reinitialize the ui-mask by removing and adding the target element from the DOM. Helps with testing different ui-options</div><input type="checkbox" ng-model="remove"></div></div><div class="form-group" ng-init="e.input = e.keyup = e.click = e.focus = true;"><label class="col-sm-3">Events to handle:</label><div class="col-sm-9"><span class="col-sm-3">input</span><input type="checkbox" id="input" ng-model="e.input" ng-click="options = {eventsToHandle: [e.input ? \'input\' : null, e.keyup ? \'keyup\' : null, e.click ? \'click\' : null, e.focus ? \'focus\' : null]}" style="vertical-align: top;"><br><span class="col-sm-3">keyup</span><input type="checkbox" id="keyup" ng-model="e.keyup" ng-click="options = {eventsToHandle: [e.input ? \'input\' : null, e.keyup ? \'keyup\' : null, e.click ? \'click\' : null, e.focus ? \'focus\' : null]}" style="vertical-align: top;"><br><span class="col-sm-3">click</span><input type="checkbox" id="click" ng-model="e.click" ng-click="options = {eventsToHandle: [e.input ? \'input\' : null, e.keyup ? \'keyup\' : null, e.click ? \'click\' : null, e.focus ? \'focus\' : null]}" style="vertical-align: top;"><br><span class="col-sm-3">focus</span><input type="checkbox" id="focus" ng-model="e.focus" ng-click="options = {eventsToHandle: [e.input ? \'input\' : null, e.keyup ? \'keyup\' : null, e.click ? \'click\' : null, e.focus ? \'focus\' : null]}" style="vertical-align: top;"><br><span class="col-sm-3">ui-options</span><span>{{options | json}}</span></div></div></form></div><div class="col-md-6"><h3>How?</h3><pre class="prettyprint">&lt;input type=&quot;text&quot; ng-model=&quot;phonenumber&quot; ui-mask=&quot;(999) 999-9999&quot;  ui-mask-placeholder ui-mask-placeholder-char="_"/&gt;</pre><p>Replace &quot;(999) 999-9999&quot; with your desired mask.</p></div></div></section></body></html>');
$templateCache.put('index.html','<!DOCTYPE html><html lang="pt-br" ng-app="fleetControl"><head><title>Controle de Frotas</title><meta charset="UTF-8"><meta name="description" content=""><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="assets/libs/bootstrap/dist/css/bootstrap.css"><link rel="stylesheet" href="assets/libs/components-font-awesome/css/font-awesome.css"><link rel="stylesheet" href="assets/libs/roboto-fontface/css/roboto/roboto-fontface.css"><link rel="stylesheet" href="assets/libs/angular-growl-v2/build/angular-growl.css"><link rel="stylesheet" href="assets/css/app.css"></head><body><div growl=""></div><fleet-control></fleet-control><script src="assets/libs/jquery/dist/jquery.js"></script><script src="assets/libs/bootstrap/dist/js/bootstrap.min.js"></script><script src="assets/libs/angular/angular.js"></script><script src="assets/libs/angular-animate/angular-animate.js"></script><script src="assets/libs/angular-aria/angular-aria.js"></script><script src="assets/libs/angular-resource/angular-resource.js"></script><script src="assets/libs/angular-sanitize/angular-sanitize.js"></script><script src="assets/libs/angular-growl-v2/build/angular-growl.js"></script><script src="assets/libs/angular-bootstrap/ui-bootstrap-tpls.js"></script><script src="assets/libs/angular-translate/angular-translate.js"></script><script src="assets/libs/angular-i18n/angular-locale_pt-br.js"></script><script src="assets/libs/angular-ui-mask/dist/mask.js"></script><script src="assets/libs/angular-input-masks/angular-input-masks-standalone.js"></script><script src="assets/libs/angular-local-storage/dist/angular-local-storage.js"></script><script src="assets/libs/angular-uuids/angular-uuid.js"></script><script src="app/app.module.js"></script><script src="app/common/components/confirm-modal/confirm-modal.controller.js"></script><script src="app/fleet-control/table/fleet-control-table.controller.js"></script><script src="app/fleet-control/table/fleet-control-table.component.js"></script><script src="app/fleet-control/pagination/fleet-control-pagination.controller.js"></script><script src="app/fleet-control/pagination/fleet-control-pagination.component.js"></script><script src="app/fleet-control/modal/fleet-control-modal.factory.js"></script><script src="app/fleet-control/modal/fleet-control-modal.controller.js"></script><script src="app/fleet-control/modal/fleet-control-modal.component.js"></script><script src="app/fleet-control/actions/fleet-control-actions.controller.js"></script><script src="app/fleet-control/actions/fleet-control-actions.component.js"></script><script src="app/common/services/vehicles.service.js"></script><script src="app/common/providers/language.provider.js"></script><script src="app/common/interceptors/request-exception-interceptor.factory.js"></script><script src="app/common/filters/default-value.filter.js"></script><script src="app/common/factories/url.factory.js"></script><script src="app/common/factories/paginator.factory.js"></script><script src="app/common/factories/confirm-modal.factory.js"></script><script src="app/common/directives/initial-focus.js"></script><script src="app/fleet-control/fleet-control.controller.js"></script><script src="app/fleet-control/fleet-control.component.js"></script><script src="app/app.run.js"></script><script src="app/app.config.js"></script></body></html>');}]);