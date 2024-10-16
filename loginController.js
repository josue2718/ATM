angular.module('myApp', [])
.controller('LoginController', function ($scope, $window, $http) {
    $scope.loginAttempts = 0;
    $scope.continuar = true;

    $scope.limpiarCampos = function() {
        $scope.inputValue = ''; 
        $scope.Nip = '';
    };

    $scope.Tarjeta = function () {
        var cardNumber = $scope.inputValue;
        if($scope.loginAttempts<5)
        {
            $http.get('https://localhost:7282/api/Clientes/BuscarPorNumTarjeta/' + cardNumber)
                        .then(function(response) {
                            $scope.id=response.data.iD_cliente
                            $window.location.href ='Loginnip.html#!/?id=' +$scope.id;
                            
                        })
                        .catch(function(error) {
                            console.error('Error al realizar la solicitud HTTP:', error);
                            alert('Tarjeta no Encontrada')
                            $scope.loginAttempts++;
                        });
        }
        else
        {
            alert('Error de autentificacion')
        }
       
    };

})
.controller('Logintrans', function ($scope, $window, $http) {
    $scope.loginAttempts = 0;
    $scope.continuar = true;

    $scope.limpiarCampos = function() {
        $scope.inputValue = ''; 
        $scope.Nip = '';
    };

    $scope.Tarjeta = function () {
        var cardNumber = $scope.inputValue;

        $http.get('https://localhost:7282/api/Clientes/BuscarPorNumTarjeta/' + cardNumber)
            .then(function(response) {
                $scope.id=response.data.iD_cliente
                $window.location.href ='DepositarT.html#!/?id=' +$scope.id;
                
            })
            .catch(function(error) {
                console.error('Error al realizar la solicitud HTTP:', error);
                alert('Tarjeta no Encontrada')
                $scope.loginAttempts++;
            });
    };

})
.controller('Nip', ['$scope', '$http', '$location' ,'$window', function ($scope, $http, $location ,$window) {
    
    $scope.loginAttempts = 0;
    $scope.continuar = true;
    $scope.id = $location.search().id;
    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' +  $scope.id)
        .then(function(response) {
            $scope.nip = response.data.nip;
            $scope.Nom = response.data.nombre;
        })
        .catch(function(error) {
            console.error('Error al realizar la solicitud HTTP:', error);
            $scope.loginAttempts++;
        });
    
    $scope.limpiarCampos = function() {
        $scope.inputValue = ''; 
        $scope.Nip = '';
    };
    
    $scope.Validar = function() {
        var Nip = $scope.Nip;
        console.log($scope.nip)
        if ( Nip == $scope.nip) { 
            $window.location.href ='MenuPrincipal.html#!/?id=' + $scope.id;
            alert('Bienvenido: ' + $scope.Nom);
        } else {
            $scope.loginAttempts++;
            alert('Nip incorrecto');
        } 
    };
    
}])


.controller('Nombre', ['$scope', '$http', '$location', function ($scope, $http, $location) {
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
        mp: 0,
        ti: 0,
        pm: 0,
        ag: 0,
        ce: "",
        ace: 0,
        tic: 0,
        ap: 0
    };

    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.nombre = response.data.nombre;
            $scope.Tipo=response.data.tipoTarjeta
        })
        .catch(function(error) {
            console.error('Error al cargar el nombre:', error);
            alert('Error al cargar el nombre');
        });
}]);
