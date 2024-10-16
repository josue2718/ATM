angular.module('myApp', [])
.controller('retiro', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.retirar = function (valor) {
        $scope.id = $location.search().id;
        $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
            .then(function (response) {
                $scope.Saldo = response.data.saldoTarjeta;
                var valorRetirado = valor; 
                $scope.limite = response.data.limTrans;
                $scope.cliente = {
                    iD_cliente: 0,
                    nombre: "",
                    numTarjeta: 0,
                    nip: 0,
                    correo: "",
                    saldoTarjeta: $scope.Saldo - valorRetirado, // Usar valorRetirado
                    tipoTarjeta: "",
                    limTrans:$scope.limite-1,
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


                if ($scope.limite > 0) {
                    if ($scope.Saldo - valorRetirado > 0) {
                        // Realizar el retiro y las operaciones relacionadas
                        var cantidadBilletesMil = Math.floor(valorRetirado / 1000);
                        var valorRestante = valorRetirado % 1000;
                        var cantidadBilletesQuinientos = Math.floor(valorRestante / 500);
                        valorRestante = valorRestante % 500;
                        var cantidadBilletesDoscientos = Math.floor(valorRestante / 200);
                        valorRestante = valorRestante % 200;
                        var cantidadBilletesCien = Math.floor(valorRestante / 100);
                        valorRestante = valorRestante % 100;
                        var cantidadBilletesCincuenta = Math.floor(valorRestante / 50);
                        valorRestante = valorRestante % 50;
                        var cantidadBilletesVeinte = Math.floor(valorRestante / 20);
                        
                        var mensaje = "Cantidad de billetes entregados:\n" +
                            "Billetes de $1000: " + cantidadBilletesMil + "\n" +
                            "Billetes de $500: " + cantidadBilletesQuinientos + "\n" +
                            "Billetes de $200: " + cantidadBilletesDoscientos + "\n" +
                            "Billetes de $100: " + cantidadBilletesCien + "\n" +
                            "Billetes de $50: " + cantidadBilletesCincuenta + "\n" +
                            "Billetes de $20: " + cantidadBilletesVeinte;
                        
                        alert(mensaje);

                        // Realizar la actualización de datos y el registro en el historial de transacciones
                        $http.put('https://localhost:7282/api/Clientes/Actualizar/' + $scope.id, $scope.cliente)
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
                                console.log(fechaFormateada); // Ejemplo de salida con milisegundos: "2024-04-13T17:50:02.380"
                                
                                var folio = fechaActual.getTime();
        
                                var historialTransac = {
                                    iD_cliente: $scope.id,
                                    tipoTransaccion: "Retiro",
                                    monto: valorRetirado, // Usar valorRetirado
                                    saldoRestante: $scope.Saldo - valorRetirado,
                                    folio: folio,
                                    fecha: fechaFormateada
                                };
        
                                $http.post('https://localhost:7282/api/HistorialTransacs', historialTransac)
                                    .then(function(response) {
                                        console.log('Historial de transacción creado:', response.data);
                                        $scope.id2=response.data.iD_Historial 
                                       
                                        $window.location.href = 'ConfirmacionTransaccion.html#!/?id='+$scope.id2;
                                    }) 
                                    .catch(function(error) {
                                        console.error('Error al crear el historial de transacción:', error);
                                    });
                                
                                   
                            })
                            .catch(function(error) {
                                console.error('Error al actualizar los datos:', error);
                                
                            });
                    } else {
                        alert('No Tiene El Saldo Suficiente');
                    }
                } else {
                    alert('Limite de Transacciones Acabado');
                }
            })
            .catch(function (error) {
                console.error('Error al cargar el nombre:', error);
                alert('Error al cargar el nombre')
            });   
    };



    $scope.redirigir = function (url) {
        $scope.id= $location.search().id;
        $http.put('https://localhost:7282/api/Clientes/Actualizar/'+$scope.id, $scope.cliente)
        .then(function(response) {
            console.log('Datos actualizados correctamente:', response.data);
            
        })
        .catch(function(error) {
            console.error('Error al actualizar los datos:', error);
            
        });
       $window.location.href = url+$scope.id; 
    };

    $scope.retirar2 = function () {
            $scope.id = $location.search().id;
            $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
                .then(function(response) {
                    $scope.Saldo = response.data.saldoTarjeta;
                    $scope.limite=response.data.limTrans
                    var valorRetirado = $scope.monto; // Obtener el valor retirado nuevamente
    
                    $scope.cliente = {
                        iD_cliente: 0,
                        nombre: "",
                        numTarjeta: 0,
                        nip: 0,
                        correo: "",
                        saldoTarjeta: $scope.Saldo - valorRetirado, // Usar valorRetirado
                        tipoTarjeta: "",
                        limTrans:$scope.limite-1,
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
                    if($scope.limite > 0)
                    {
                        if ($scope.Saldo - valorRetirado > 0) {

                            var valorRetirado = $scope.monto;
                            var cantidadBilletesMil = Math.floor(valorRetirado / 1000);
                            var valorRestante = valorRetirado % 1000;
                            var cantidadBilletesQuinientos = Math.floor(valorRestante / 500);
                            valorRestante = valorRestante % 500;
                            var cantidadBilletesDoscientos = Math.floor(valorRestante / 200);
                            valorRestante = valorRestante % 200;
                            var cantidadBilletesCien = Math.floor(valorRestante / 100);
                            valorRestante = valorRestante % 100;
                            var cantidadBilletesCincuenta = Math.floor(valorRestante / 50);
                            valorRestante = valorRestante % 50;
                            var cantidadBilletesVeinte = Math.floor(valorRestante / 20);
                        
                            var mensaje = "Cantidad de billetes entregados:\n" +
                                "Billetes de $1000: " + cantidadBilletesMil + "\n" +
                                "Billetes de $500: " + cantidadBilletesQuinientos + "\n" +
                                "Billetes de $200: " + cantidadBilletesDoscientos + "\n" +
                                "Billetes de $100: " + cantidadBilletesCien + "\n" +
                                "Billetes de $50: " + cantidadBilletesCincuenta + "\n" +
                                "Billetes de $20: " + cantidadBilletesVeinte;
                        
                            alert(mensaje);
                        $http.put('https://localhost:7282/api/Clientes/Actualizar/' + $scope.id, $scope.cliente)
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
                                console.log(fechaFormateada); // Ejemplo de salida con milisegundos: "2024-04-13T17:50:02.380"
                                
                                var folio = fechaActual.getTime();
        
                                var historialTransac = {
                                    iD_Historial: 0,
                                    iD_cliente: $scope.id,
                                    tipoTransaccion: "Retiro",
                                    monto: valorRetirado, // Usar valorRetirado
                                    saldoRestante: $scope.Saldo - valorRetirado,
                                    folio: folio,
                                    fecha: fechaFormateada
                                };
        
                                $http.post('https://localhost:7282/api/HistorialTransacs', historialTransac)
                                .then(function(response) {
                                    console.log('Historial de transacción creado:', response.data);
                                    $scope.id2=response.data.iD_Historial 
                                   
                                    $window.location.href = 'ConfirmacionTransaccion.html#!/?id='+$scope.id2;
                                }) 
                                .catch(function(error) {
                                    console.error('Error al crear el historial de transacción:', error);
                                });
                            })
                            .catch(function(error) {
                                
                                
                            });
                        } else {
                         alert('No Tiene El Saldo Suficiente');
                        }
                    }
                    else
                    {
                        alert('Limite de Transacciones Acabado')
                    }
                })
                .catch(function(error) {
                    console.error('Error al cargar el nombre:', error);
                    alert('Error al cargar el nombre')
                });
        
                };
    

        }])
    
.controller('Saldo', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
   
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
        ap:0
    };

    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Saldo=response.data.saldoTarjeta
        })
        .catch(function(error) {
            console.error('Error al cargar el nombre:', error);
            alert('Error al cargar el nombre')
        });
}])

.controller('Historial', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
   
    $scope.id= $location.search().id;


    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Saldo=response.data.saldoTarjeta
        })
        .catch(function(error) {
            console.error('Error al cargar el nombre:', error);
            alert('Error al cargar el nombre')
        });
}]);