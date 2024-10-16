angular.module('myApp', [])
.controller('transaccion', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id= $location.search().id;
    $scope.cliente = {
        iD_cliente: 0,
        nombre: "",
        numTarjeta: 0,
        nip: 0,
        correo: "",
        saldoTarjeta: 0,
        tipoTarjeta: "",
        limTrans: 0,
        adeuTarjeta: 0,
        limiteTarjeta: 0,
        adeuHipoteca: 0,
        adeuCarro: 0,
        mesesAdeudo: 0,
        interesAnual: 0,
        ce: "",
        ace: 0,
        tic:0,
        ap:0

    };

    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.saldoTarjeta;
            $scope.Tarjeta = response.data.numTarjeta;
            $scope.Cliente=response.data.nombre;
           
        })
        .catch(function(error) {
            console.error('Error al cargar el nombre:', error);
            alert('Error al cargar el nombre');
        });

    $scope.redirigir = function (url) {
        $window.location.href = url+'#!/?id='+$scope.id; 
    };
}])
.controller('ticket', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
 
    $scope.id = $location.search().id;
    $scope.cliente = {
        iD_cliente: 0,
        nombre: "",
        numTarjeta: 0,
        nip: 0,
        correo: "",
        saldoTarjeta: 0,
        tipoTarjeta: "",
        limTrans: 0,
        adeuTarjeta: 0,
        limiteTarjeta: 0,
        adeuHipoteca: 0,
        adeuCarro: 0,
        mesesAdeudo: 0,
        interesAnual: 0,
        ce: "",
        ace: 0,
        tic:0,
        ap:0
    };

    $http.get('https://localhost:7282/api/HistorialTransacs/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.saldoRestante;
            $scope.id2 = response.data.iD_cliente;
            $scope.Tipo = response.data.tipoTransaccion;
            $scope.Monto = response.data.monto;
            $scope.Folio = response.data.folio;
            $scope.fechaActual = response.data.fecha;
            $scope.redirigir = function(url) {
                $window.location.href = url +'#!/?id='+$scope.id2;
            };
            $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id2)
                .then(function(response) {
                    $scope.Tarjeta = response.data.numTarjeta;
                    $scope.Cliente=response.data.nombre;
                })
                .catch(function(error) {
                    console.error('Error al cargar el nombre:', error);
                    
                });
        })
        .catch(function(error) {
            console.error('Error al cargar el nombre:', error);

        });
}]) 
