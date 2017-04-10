(function () {
  'use strict';

  angular.module('fleetControl').provider('language', language);

  function language() {
    var vm = this;
    var labels = {

      'LABELS': {
        'BRAND': 'Marca',

        'CANCEL': 'Cancelar',

        'FUEL': 'Combustível',

        'IMAGE': 'Imagem',

        'MODEL': 'Modelo',

        'NEW_VEHICLE': 'Novo Carro',
        'NO_IMAGE': 'Sem imagem',

        'PAGINATION_NEXT': '>>',
        'PAGINATION_PREVIOUS': '<<',
        'PLATE': 'Placa',
        'PRICE': 'Valor',

        'SAVE': 'Salvar Carro',
        'SELECT_FUEL': 'Selecione um combustível',

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