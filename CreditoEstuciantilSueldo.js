angular.module('myApp', [])
.controller('Pago', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id = $location.search().id;
    $scope.cliente = {};
    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.ace;
           
        })
        .catch(function(error) {
            console.error('Error al cargar la información del cliente:', error);
            
            
        });



    $scope.pago = function () {
        var valor = $scope.monto;
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
            ace: $scope.Saldo - valor,
            tic: 0,
            ap: 0
        };
        if ($scope.Saldo - valor > 0) {

            $http.put('https://localhost:7282/api/Clientes/ActualizarCE/' + $scope.id, $scope.cliente)
            .then(function(response) {
                console.log('Datos actualizados correctamente:', response.data);
    
                var fechaActual = new Date();
                               
                // Obteniendo los componentes de la fecha y hora
                var dia = fechaActual.getDate().toString().padStart(2, '0');
                var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
                var año = fechaActual.getFullYear();
                var hora = fechaActual.getHours().toString().padStart(2, '0');
                var minuto = fechaActual.getMinutes().toString().padStart(2, '0');
                var segundo = fechaActual.getSeconds().toString().padStart(2, '0');
                
                // Construyendo la cadena de fecha y hora en el formato deseado
                var fechaFormateada = `${año}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
                
                console.log(fechaFormateada); // Ejemplo de salida: "2024-04-13T17:50:02"
                
                // Puedes agregar milisegundos si los necesitas
                var milisegundos = fechaActual.getMilliseconds().toString().padStart(3, '0');
                fechaFormateada += `.${milisegundos}`;
                
                console.log(fechaFormateada); // Ejemplo de salida con milisegundos: "2024-04-13T17:50:02.380"
                var folio = fechaActual.getTime();
    
                var historialCredito = {
                    iD_cliente: $scope.id,
                    monto: valor, 
                    saldoRestante: $scope.Saldo - valor,
                    folio: folio,
                    fecha: fechaFormateada
                };
    
                $http.post('https://localhost:7282/api/HistorialCreditoEducativo', historialCredito)
                .then(function(response) {
                    console.log('Historial de transacción creado:', response.data);
                    $scope.id2 = response.data.iD_CreditoEducativo;
                   $window.location.href = 'ConfirmacionCreditoEducativo.html#!/?id=' + $scope.id2;
                }) 
                .catch(function(error) {
                    console.error('Error al crear el historial de transacción:', error);
                });
            })
            .catch(function(error) {
                console.error('Error al actualizar los datos:', error);
                alert('Error al actualizar los datos');
            });
    
        }
        else
        {
            alert('No Tienes Deuda')
        }
    };
    
}])

.controller('Pago2', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.monto = localStorage.getItem('monto');
    $scope.id = $location.search().id;
    $scope.cliente = {};
    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.ace;
           
        })
        .catch(function(error) {
            console.error('Error al cargar la información del cliente:', error);
        });

    $scope.pago = function () {
        var monto1 = $scope.monto*0.10;
        localStorage.setItem('monto', monto1);
        $window.location.href = 'Credito_EstudiantilSueldofin.html#!/?id=' + $scope.id;
    };
}])

