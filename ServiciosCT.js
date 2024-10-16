angular.module('myApp', [])
.controller('pago', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window)  {
    $scope.limpiarCampos = function() {
        $scope.referencia = '';
        $scope.monto = '';
    };
    $scope.limpiarCampos();
    $scope.id = $location.search().id;
    $scope.redirigir = function (url) {
        $window.location.href = url+'#!/?id='+$scope.id; 
    };
    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.saldoTarjeta;
        })
        $scope.pagos = function () {
            var referencia = $scope.referencia;
            var monto = $scope.monto;
            $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
                .then(function(response) {
                    $scope.Saldo = response.data.saldoTarjeta;
        
                    $scope.cliente = {
                        iD_cliente: 0,
                        nombre: "",
                        numTarjeta: 0,
                        nip: 0,
                        correo: "",
                        saldoTarjeta: $scope.Saldo - monto, // Usar monto
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
        
                    if ($scope.Saldo - monto > 0) {
                        $http.put('https://localhost:7282/api/Clientes/ActualizarSErvicio/' + $scope.id, $scope.cliente)
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
                                var folio = fechaActual.getTime();
        
                                var historialTransac = {
                                    iD_cliente: $scope.id,
                                    tipoTransaccion: "Pago Servicio",
                                    monto: monto, // Usar monto
                                    saldoRestante: $scope.Saldo - monto,
                                    folio: folio,
                                    fecha: fechaFormateada
                                };
        
                                $http.post('https://localhost:7282/api/HistorialTransacs', historialTransac)
                                    .then(function(response) {
                                        console.log('Historial de transacción creado:', response.data);
                                        $scope.id2 = response.data.iD_Historial;
                                        $window.location.href = 'ConfirmacionTransaccion.html#!/?id=' + $scope.id2;
                                    })
                                    .catch(function(error) {
                                        console.error('Error al crear el historial de transacción:', error);
                                    });
        
                                var historialServicio = {
                                    iD_Servicio: 0,
                                    iD_cliente: $scope.id,
                                    referencia: referencia,
                                    monto: monto, // Usar monto
                                    saldoRestante: $scope.Saldo - monto,
                                    folio: folio,
                                    fecha: fechaFormateada
                                };
        
                                $http.post('https://localhost:7282/api/HistorialServicio', historialServicio)
                                    .then(function(response) {
                                        console.log('Historial de transacción creado:', response.data);
                                        $scope.id2 = response.data.iD_Servicio;
                                        $window.location.href = 'ConfirmacionservicioCT.html#!/?id=' + $scope.id2;
                                    })
                                    .catch(function(error) {
                                        console.error('Error al crear el historial de transacción:', error);
                                    });
                            })
                            .catch(function(error) {
                                console.error('Error al actualizar los datos del cliente:', error);
                            });
                    } else {
                        alert('No Tiene El Saldo Suficiente');
                    }
        
                })
                .catch(function(error) {
                    console.error('Error al cargar el nombre:', error);
                    alert('Error al cargar el nombre')
                });
        };
    }])        



.controller('servicio', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id = $location.search().id;
    $scope.ultimaOperacion = localStorage.getItem('ultima_operacion') || 'No hay operaciones';
    $scope.guardarOperacion = function (empresa) {
        localStorage.setItem('ultima_operacion', empresa);
        console.log('Operación guardada:', empresa);
        $window.location.href = 'PagoServicioCT.html#!/?id='+$scope.id;
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
        mp: 0,
        ti: 0,
        pm: 0,
        ag: 0,
        ce: "",
        ace: 0
    };

    $http.get('https://localhost:7282/api/HistorialServicio/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.saldoRestante;
            $scope.id2 = response.data.iD_cliente;
            $scope.Monto = response.data.monto;
            $scope.Folio = response.data.folio;
            $scope.fechaActual = response.data.fecha;
            $scope.referencia=response.data.referencia;

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
        $scope.redirigir = function (url) {
            $window.location.href = url+'#!/?id='+$scope.id2; 
        };
}]);
