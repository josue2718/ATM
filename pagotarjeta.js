angular.module('myApp', [])
    .controller('abono', function ($scope, $window) {
        var storedValue = localStorage.getItem('monto');
        $scope.monto = storedValue ? parseInt(storedValue) : 0;
        $scope.movimientos = 0;
        $scope.limpiarCampos = function() {
            $scope.monto = ''; // Limpiar el campo monto
        };
        $scope.redirigir = function (url) {
            $window.location.href = url;
        };

        $scope.pago = function () {
            var monto = $scope.monto; // Corregido
            $scope.monto = monto; // Corregido
            localStorage.setItem('monto', monto);
            $window.location.href = 'ConfirmacionPagotarjeta.html';
        }; 
    })
    .controller('transaccion', function ($scope, $window) {
        $scope.ultimaOperacion = localStorage.getItem('ultima_operacion') || 'No hay operaciones';
        $scope.guardarOperacion = function (operacion) {
            localStorage.setItem('ultima_operacion', operacion);
            console.log('Operación guardada:', operacion);
        };

        $scope.redirigir = function (url) {
            $window.location.href = url; 
        };

    })
    // El controlador 'transaccione' no tiene contenido, por lo que se elimina.
    .controller('folio', function ($scope, $window) {
        function generarFolio() {
            var fecha = new Date(); // Obtener la fecha actual
            var folio = fecha.getFullYear().toString(); // Año
            folio += (fecha.getMonth() < 9 ? '0' : '') + (fecha.getMonth() + 1).toString(); 
            folio += (fecha.getDate() < 10 ? '0' : '') + fecha.getDate().toString(); 
            folio += fecha.getHours().toString(); 
            folio += fecha.getMinutes().toString(); 
            folio += fecha.getSeconds().toString(); 
            folio += Math.floor(Math.random() * 1000).toString(); 
            return folio;
        }
            var folio = generarFolio();
            localStorage.setItem('folio_actual', folio);
            $scope.folio = folio;
       
    })
    .controller('fecha', function ($scope) {
        function obtenerFechaActual() {
            var fecha = new Date();
            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1; // Sumar 1 porque los meses se indexan desde 0
            var anio = fecha.getFullYear();
        
            // Formatear la fecha como "dd/mm/aaaa"
            return `${dia}/${mes}/${anio}`;
        }

        // Obtener la fecha actual
        $scope.fechaActual = obtenerFechaActual();
    });
