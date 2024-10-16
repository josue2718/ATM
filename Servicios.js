angular.module('myApp', [])
.controller('pago', function ($scope, $window) {
    $scope.limpiarCampos = function() {
        $scope.referencia = '';
        $scope.monto = '';
    };
    $scope.limpiarCampos();

    var storedReferencia = localStorage.getItem('referencia');
    $scope.referencia = storedReferencia ? storedReferencia : '';

    var storedMonto = localStorage.getItem('monto');
    $scope.monto = storedMonto ? parseInt(storedMonto) : '';

    $scope.redirigir = function (url) {
        $window.location.href = url; 
    };

    $scope.pagos = function () {
        var referencia = $scope.referencia;
        var monto = $scope.monto;
        localStorage.setItem('referencia', referencia);
        localStorage.setItem('monto', monto);
        $window.location.href = 'Confirmacionservicio.html';
    };
})



.controller('servicio', function ($scope, $window) {
    $scope.ultimaOperacion = localStorage.getItem('ultima_operacion') || 'No hay operaciones';
    $scope.guardarOperacion = function (empresa) {
        localStorage.setItem('ultima_operacion', empresa);
        console.log('Operación guardada:', empresa);
    };
    
    $scope.redirigir = function (url) {
        $window.location.href = url; 
    };
})
.controller('pagos', function ($scope, $window) {  
})
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
