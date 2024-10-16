angular.module('myApp', [])
.controller('LoginController', function ($scope, $window, $http) {
    $scope.loginAttempts = 0;
    $scope.limpiarCampos = function() {
        $scope.inputValue = ''; 
        $scope.Nip=''
    };
    $scope.login = function () {
        var cardNumber = $scope.inputValue; 
        var nip = $scope.Nip;
        if ($scope.loginAttempts >= 3) {
            alert('Ha alcanzado el límite de intentos de inicio de sesión.');
            $window.location.href = 'Principal.html';
            return;
        }

        $http.get('https://localhost:7282/api/clientes/BuscarPorNumTarjeta/' + cardNumber)
            .then(function(response) {
                var nombreClientePorTarjeta = response.data.nombre;
                $http.get('https://localhost:7282/api/Clientes/BuscarPorNip/' + nip)
                    .then(function(response) {
                        var nombreClientePorNip = response.data.nombre;

                        if (nombreClientePorTarjeta && nombreClientePorNip && nombreClientePorTarjeta === nombreClientePorNip) {
                            alert("Bienvenido: " + nombreClientePorTarjeta);
                            $window.location.href = 'MenuPrincipal.html#!/?id=' + response.data.iD_cliente; 
                            
                        } else {
                            alert('Los NIPs no coinciden.');
                            $scope.loginAttempts++;
                            $scope.limpiarCampos(); 
                        }
                    })
                    .catch(function(error) {
                        alert('Usuario no encontrado');
                        console.error('Error al realizar la solicitud HTTP:', error);
                        $scope.loginAttempts++;
                    });
            })
            .catch(function(error) {
                alert('Usuario no encontrado ');
                console.error('Error al realizar la solicitud HTTP:', error);
                $scope.loginAttempts++;
            });
    };
})
.controller('Nombre', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id= $location.search().id;
    $scope.redirigir = function(url) {
        $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Tipo = response.data.tipoTarjeta;
            if ($scope.Tipo == 'Credito') {
                $window.location.href = url + '#!/?id=' + $scope.id;
            } else {
                alert('Opciones no disponibles');
            }
        })
        .catch(function(error) {
            console.error('Error al redirigir:', error);
            alert('Error al redirigir');
        });
    };
    
    $scope.redirigir2 = function(url) {
        $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Tipo = response.data.ce;
            if ($scope.Tipo == 'Si') {
                $window.location.href = url + '#!/?id=' + $scope.id;
            } else {
                alert('Opciones no disponibles');
            }
        })
        .catch(function(error) {
            console.error('Error al redirigir:', error);
            alert('Error al redirigir');
        });
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
