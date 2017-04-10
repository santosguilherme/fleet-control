(function () {
  'use strict';

  angular.module('fleetControl').provider('language', language);

  function language() {
    var vm = this;
    var labels = {

      'LABELS': {
        'IMAGE': 'Imagem',

        'NEW_VEHICLE': 'Novo Carro',
        'NO_IMAGE': 'Sem imagem',

        'PAGINATION_NEXT': '>>',
        'PAGINATION_PREVIOUS': '<<',

        'SAVE': 'Salvar Carro',

        'VEHICLE_REGISTER': 'Cadastro de Carro'
      },
      'MESSAGES': {}
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