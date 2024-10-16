angular.module('myApp', [])
.controller('NuevoNipController', ['$scope', '$window', '$http', '$location', function($scope, $window, $http, $location) {
    $scope.nuevoNIP = ''; // Initialize nuevoNIP
    $scope.confirmarNIP = ''; // Initialize confirmarNIP
      $scope.id = $location.search().id;
    $scope.guardarNIP = function() {
        if ($scope.nuevoNIP === $scope.confirmarNIP) {
           // Use $scope.id instead of id
            $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
                .then(function(response) {
                    $scope.Saldo = response.data.saldoTarjeta;
                    var valorRetirado = 0; // Define valorRetirado if needed
                    $scope.limite = response.data.limTrans;
                    $scope.cliente = {
                        iD_cliente: $scope.id,
                        nombre: "",
                        numTarjeta: 0,
                        nip: $scope.nuevoNIP,
                        correo: "",
                        saldoTarjeta: 0, // Update with appropriate value
                        tipoTarjeta: "",
                        limTrans: 0, // Update with appropriate value
                        adeuTarjeta: 0,
                        limiteTarjeta: 0,
                        adeuHipoteca: 0,
                        adeuCarro: 0,
                        mesesAdeudo: 0,
                        interesAnual: 0,
                        ce: "",
                        ace: 0,
                        tic: 0,
                        ap: 0
                    };

                    $http.put('https://localhost:7282/api/Clientes/ActualizarNip/' + $scope.id, $scope.cliente)
                        .then(function(response) {
                            // Handle success
                            alert('NIP actualizado exitosamente');
                            $window.location.href = 'MenuPrincipal.html#!/?id=' + $scope.id;
                        })
                        .catch(function(error) {
                            console.error('Error al actualizar los datos:', error);
                            alert('Error al actualizar los datos');
                        });
                })
                .catch(function(error) {
                    console.error('Error al cargar el nombre:', error);
                    alert('Error al cargar el nombre');
                });
        } else {
            alert('Los NIPs no coinciden. Por favor, asegúrate de ingresar los NIPs correctamente.');
            $scope.nuevoNIP = '';
            $scope.confirmarNIP = '';
        }
    };
}]);
