angular.module('myApp', [])
.controller('Historial', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id = $location.search().id;
    $scope.sortType = 'tipoTransaccion'; // Tipo de orden inicial
    // Orden inicial

    $http.get('https://localhost:7282/api/HistorialTransacs/BuscarPorIDcliente/' + $scope.id)
        .then(function(response) {
            $scope.historialTransacciones = response.data;
        })
        .catch(function(error) {
            console.error('Error al cargar el historial de transacciones:', error);
        });

    $scope.redirigir = function(url) {
        $window.location.href = url + '#!/?id=' + $scope.id;
    };

    $scope.sortBy = function(propertyName) {
        $scope.sortType = propertyName;
    };

    $scope.changeOrder = function() {
        $scope.sortReverse = ($scope.sortReverse === 'true'); 
    };


}])
.controller('HistorialE', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id = $location.search().id;
    $scope.sortType = 'tipoTransaccion'; // Tipo de orden inicial
    // Orden inicial

    $http.get('https://localhost:7282/api/HistorialCreditoEducativo/BuscarPorIDcliente/' + $scope.id)
        .then(function(response) {
            $scope.historialTransacciones = response.data;
        })
        .catch(function(error) {
            console.error('Error al cargar el historial de transacciones:', error);
        });

    $scope.redirigir = function(url) {
        $window.location.href = url + '#!/?id=' + $scope.id;
    };

    $scope.sortBy = function(propertyName) {
        $scope.sortType = propertyName;
    };

    $scope.changeOrder = function() {
        $scope.sortReverse = ($scope.sortReverse === 'true'); 
    };


}])

.controller('HistorialCredito', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id = $location.search().id;
    $scope.sortType = 'tipoTransaccion'; // Tipo de orden inicial
    // Orden inicial

    $http.get('https://localhost:7282/api/HistorialCreditoPagos/BuscarPorIDcliente/' + $scope.id)
        .then(function(response) {
            $scope.historialTransacciones = response.data;
        })
        .catch(function(error) {
            console.error('Error al cargar el historial de transacciones:', error);
        });

    $scope.redirigir = function(url) {
        $window.location.href = url + '#!/?id=' + $scope.id;
    };

    $scope.sortBy = function(propertyName) {
        $scope.sortType = propertyName;
    };

    $scope.changeOrder = function() {
        $scope.sortReverse = ($scope.sortReverse === 'true'); 
    };


}]);

