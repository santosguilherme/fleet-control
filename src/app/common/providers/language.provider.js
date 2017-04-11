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