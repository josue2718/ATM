angular.module('myApp', [])
.controller('Pago', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id = $location.search().id;
    $scope.cliente = {};
    
    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.ace;
            $scope.cliente = response.data;
            var tasaPeriodica = $scope.cliente.tic / 100 / 12;
            var numeroPagos = $scope.cliente.ap * 12;
            var pagoFijo = ($scope.cliente.ace * tasaPeriodica * Math.pow(1 + tasaPeriodica, numeroPagos)) / (Math.pow(1 + tasaPeriodica, numeroPagos) - 1);
            $scope.pagoFijo = pagoFijo.toFixed(0);
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
        if ($scope.pagoFijo<=valor)
        {
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
           
        }
        else
        {
            alert('Cantidad Incorrecta recuerda que tiene que ser '+$scope.pagoFijo)
        }
       
        //$window.location.href = 'ConfirmacionCreditoEducativo.html#!/?id=' + $scope.id;
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
        ap:0
    };

    $http.get('https://localhost:7282/api/HistorialCreditoEducativo/' + $scope.id)
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
                })
                .catch(function(error) {
                    console.error('Error al cargar el nombre:', error);
                    
                });
        })
        .catch(function(error) {
            console.error('Error al cargar el nombre:', error);

        });
}]);
