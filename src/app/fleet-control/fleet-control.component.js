(function () {
  'use strict';

  angular.module('fleetControl').component('fleetControl', {
    templateUrl: 'app/fleet-control/fleet-control.html',
    controller: FleetControlController,
    bindings: {}
  });

  function FleetControlController() {
    var vm = this;

    vm.filter = {
      text: ''
    };

    vm.vehicles = [{
      combustivel: 'Flex',
      imagem: null,
      marca: 'Volkswagem',
      modelo: 'Gol',
      placa: 'FFF-5498',
      valor: 20000
    },
      {
        combustivel: 'Gasolina',
        imagem: null,
        marca: 'Volkswagem',
        modelo: 'Fox',
        placa: 'FOX-4125',
        valor: 20000
      },
      {
        combustivel: 'Alcool',
        imagem: 'http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg',
        marca: 'Volkswagen',
        modelo: 'Fusca',
        placa: 'PAI-4121',
        valor: 20000
      }];

    vm.addVehicle = function (vehicle) {
      vm.vehicles.push(vehicle);
    };

    vm.filterVehicles = function (text) {
      vm.filter.text = text;

      // TODO
    };
  }
})();