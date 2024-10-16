angular.module('myApp', [])
.controller('credito', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id= $location.search().id;
    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.saldoTarjeta;
            $scope.Tarjeta = response.data.numTarjeta;
            $scope.Aduedo=response.data.adeuTarjeta;
        })
        .catch(function(error) {
            console.error('Error al cargar el nombre:', error);
            alert('Error al cargar el nombre');
        });

    $scope.redirigir = function (url) {
        $window.location.href = url+'#!/?id='+$scope.id; 
    };

    $scope.id = $location.search().id;
    $scope.Abono = function () {
        $scope.id = $location.search().id;
        $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
            .then(function(response) {
                $scope.Saldo = response.data.adeuTarjeta;
                $scope.limite=response.data.limTrans
                var valorRetirado = $scope.monto; 

                $scope.cliente = {
                    iD_cliente: 0,
                    nombre: "",
                    numTarjeta: 0,
                    nip: 0,
                    correo: "",
                    saldoTarjeta: 0,
                    tipoTarjeta: "",
                    limTrans:0,
                    adeuTarjeta: $scope.Saldo - valorRetirado,
                    limiteTarjeta: 0,
                    adeuHipoteca: 0,
                    adeuCarro: 0,
                    mesesAdeudo: 0,
                    interesAnual: 0,
                    ce: "",
                    ace: 0,
                    ap:0
                };
                if($scope.Saldo>=valorRetirado)
                {
                    $http.put('https://localhost:7282/api/Clientes/ActualizarAduedoTarjeta/' + $scope.id, $scope.cliente)
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
            
                    var historialPago = {
                        iD_PagosCredito: 0,
                        iD_cliente: $scope.id,
                        monto: valorRetirado,
                        tipo: "Pago Tarjeta",
                        pago: "Abono",
                        saldoRestante:$scope.Saldo - valorRetirado,
                        folio:folio,
                        fecha:fechaFormateada
                    };
            
                    $http.post('https://localhost:7282/api/HistorialCreditoPagos', historialPago)
                        .then(function(response) {
                            console.log('Historial de transacción creado:', response.data);
                            $scope.id2 = response.data.iD_PagosCredito;
                            $window.location.href = 'ConfirmacionPagotarjeta.html#!/?id=' + $scope.id2;
                        })
                        .catch(function(error) {
                            console.error('Error al crear el historial de transacción:', error);
                        });
                })
                .catch(function(error) {
                    console.error('Error al actualizar el saldo y adeudo de la tarjeta:', error);
                });
                }
                else
                {
                    alert('No Tiene Adeudo')
                }
                
            })
            .catch(function(error) {
                console.error('Error al cargar el nombre:', error);
                alert('Error al cargar el nombre')
            });
    }



    $scope.Total = function () {
        $scope.id = $location.search().id;
        $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
            .then(function(response) {
                $scope.Saldo = response.data.adeuTarjeta;
                $scope.limite=response.data.limTrans
                var valorRetirado = $scope.monto; 

                $scope.cliente = {
                    iD_cliente: 0,
                    nombre: "",
                    numTarjeta: 0,
                    nip: 0,
                    correo: "",
                    saldoTarjeta: 0,
                    tipoTarjeta: "",
                    limTrans:0,
                    adeuTarjeta: $scope.Saldo - valorRetirado,
                    limiteTarjeta: 0,
                    adeuHipoteca: 0,
                    adeuCarro: 0,
                    mesesAdeudo: 0,
                    interesAnual: 0,
                    ce: "",
                    ace: 0,
                    ap:0,
                };
                if($scope.Saldo>=valorRetirado)
                {
                    if($scope.Saldo<=valorRetirado)
                    {
                        $http.put('https://localhost:7282/api/Clientes/ActualizarAduedoTarjeta/' + $scope.id, $scope.cliente)
                    .then(function(response) {
                        console.log('Datos actualizados correctamente:', response.data);
                        var fechaActual = new Date();
                    
                        var dia = fechaActual.getDate().toString().padStart(2, '0');
                        var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); 
                        var año = fechaActual.getFullYear();
                        var hora = fechaActual.getHours().toString().padStart(2, '0');
                        var minuto = fechaActual.getMinutes().toString().padStart(2, '0');
                        var segundo = fechaActual.getSeconds().toString().padStart(2, '0');
                        
                    
                        var fechaFormateada = `${año}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
                        
                        console.log(fechaFormateada); 
                        var folio = fechaActual.getTime();
                        var historialPago = {
                            iD_PagosCredito: 0,
                            iD_cliente: $scope.id,
                            monto: valorRetirado,
                            tipo: "Pago Tarjeta",
                            pago: "Abono",
                            saldoRestante:$scope.Saldo - valorRetirado,
                            folio:folio,
                            fecha:fechaFormateada
                        };
                
                        $http.post('https://localhost:7282/api/HistorialCreditoPagos', historialPago)
                            .then(function(response) {
                                console.log('Historial de transacción creado:', response.data);
                                $scope.id2 = response.data.iD_PagosCredito;
                                $window.location.href = 'ConfirmacionPagotarjeta.html#!/?id=' + $scope.id2;
                            })
                            .catch(function(error) {
                                console.error('Error al crear el historial de transacción:', error);
                            });
                    })
                    .catch(function(error) {
                        console.error('Error al actualizar el saldo y adeudo de la tarjeta:', error);
                    });
                    }
                    else
                    {
                        alert('no a ingresado la cantidad correcta')
                    }
                }
                else
                {
                        alert('No Tiene Adeudo')
                }
            })
            
            .catch(function(error) {
                console.error('Error al cargar el nombre:', error);
                alert('Error al cargar el nombre')
            });
    
    }
}])

.controller('hipoteca', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id= $location.search().id;
    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.adeuHipoteca;
            $scope.Tarjeta = response.data.numTarjeta;
            $scope.meses = response.data.mesesAdeudo;
            $scope.interes = response.data.interesAnual;
    
            var adeudo = $scope.Saldo;
            var meses = $scope.meses;
            var interesAnual = $scope.interes/100;
            var iva = 0.16; // Supongamos que el IVA es 16%
    
            var interesMensual = adeudo * interesAnual / meses;
            var adeudoMensual = adeudo / meses;
            var ivaMensual = (adeudo * iva) / meses;
            $scope.mensualidad = interesMensual + adeudoMensual + ivaMensual;
        })
        .catch(function(error) {
            console.error('Error al cargar el nombre:', error);
            alert('Error al cargar el nombre');
        });

    $scope.redirigir = function (url) {
        $window.location.href = url+'#!/?id='+$scope.id; 
    };

    $scope.id = $location.search().id;
    $scope.Abono = function () {
        $scope.id = $location.search().id;
        $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
            .then(function(response) {
                $scope.Saldo = response.data.adeuHipoteca;
                var valorRetirado = $scope.monto; 

                $scope.cliente = {
                    iD_cliente: 0,
                    nombre: "",
                    numTarjeta: 0,
                    nip: 0,
                    correo: "",
                    saldoTarjeta: 0,
                    tipoTarjeta: "",
                    limTrans:0,
                    adeuTarjeta: 0,
                    limiteTarjeta: 0,
                    adeuHipoteca: $scope.Saldo - valorRetirado,
                    adeuCarro: 0,
                    mesesAdeudo: 0,
                    interesAnual: 0,
                    ce: "",
                    ace: 0,
                    ap:0
                };
                if($scope.Saldo>=valorRetirado)
                {
                    $http.put('https://localhost:7282/api/Clientes/ActualizarHipoteca/' + $scope.id, $scope.cliente)
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
            
                    var historialPago = {
                        iD_PagosCredito: 0,
                        iD_cliente: $scope.id,
                        monto: valorRetirado,
                        tipo: "Hipoteca",
                        pago: "Abono a capital",
                        saldoRestante:$scope.Saldo - valorRetirado,
                        folio:folio,
                        fecha:fechaFormateada
                    };
            
                    $http.post('https://localhost:7282/api/HistorialCreditoPagos', historialPago)
                        .then(function(response) {
                            console.log('Historial de transacción creado:', response.data);
                            $scope.id2 = response.data.iD_PagosCredito;
                            $window.location.href = 'ConfirmacionPagotarjeta.html#!/?id=' + $scope.id2;
                        })
                        .catch(function(error) {
                            console.error('Error al crear el historial de transacción:', error);
                        });
                })
                .catch(function(error) {
                    console.error('Error al actualizar el saldo y adeudo de la tarjeta:', error);
                });
                }
                else
                {
                    alert('No Tiene Adeudo')
                }
                
            })
            .catch(function(error) {
                console.error('Error al cargar el nombre:', error);
                alert('Error al cargar el nombre')
            });
    }



    $scope.Mensual = function () {
        $scope.id = $location.search().id;
        $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
            .then(function(response) {
                $scope.Saldo = response.data.adeuHipoteca;
                var valorRetirado = $scope.monto; 

                $scope.cliente = {
                    iD_cliente: 0,
                    nombre: "",
                    numTarjeta: 0,
                    nip: 0,
                    correo: "",
                    saldoTarjeta: 0,
                    tipoTarjeta: "",
                    limTrans:0,
                    adeuTarjeta: 0,
                    limiteTarjeta: 0,
                    adeuHipoteca: $scope.Saldo - valorRetirado,
                    adeuCarro: 0,
                    mesesAdeudo: 0,
                    interesAnual: 0,
                    ce: "",
                    ace: 0,
                    tic:0,
                    ap:0,
                };
                $scope.calcularMensualidad = function(adeudo, meses) {
                    var interesAnual = 0.14; // 14% de interés anual
                    var iva = 0.16; // 16% de IVA
                    var interesMensual = (adeudo * interesAnual) / meses;
                    var adeudoMensual = adeudo / meses;
                    var ivaMensual = (adeudo * iva) / meses;
                    var mensualidad = interesMensual + adeudoMensual + ivaMensual;
                    return mensualidad;
                    
                };
                if($scope.Saldo>=valorRetirado)
                {
                    if($scope.mensualidad<=valorRetirado)
                    {
                        $http.put('https://localhost:7282/api/Clientes/ActualizarHipoteca/' + $scope.id, $scope.cliente)
                        .then(function(response) {
                        console.log('Datos actualizados correctamente:', response.data);
                        var fechaActual = new Date();
                    
                        var dia = fechaActual.getDate().toString().padStart(2, '0');
                        var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); 
                        var año = fechaActual.getFullYear();
                        var hora = fechaActual.getHours().toString().padStart(2, '0');
                        var minuto = fechaActual.getMinutes().toString().padStart(2, '0');
                        var segundo = fechaActual.getSeconds().toString().padStart(2, '0');
                        
                    
                        var fechaFormateada = `${año}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
                        
                        console.log(fechaFormateada); 
                        var folio = fechaActual.getTime();
                        var historialPago = {
                            iD_PagosCredito: 0,
                            iD_cliente: $scope.id,
                            monto: valorRetirado,
                            tipo: "Hipoteca",
                            pago: "Mensual",
                            saldoRestante:$scope.Saldo - valorRetirado,
                            folio:folio,
                            fecha:fechaFormateada
                        };
                
                        $http.post('https://localhost:7282/api/HistorialCreditoPagos', historialPago)
                            .then(function(response) {
                                console.log('Historial de transacción creado:', response.data);
                                $scope.id2 = response.data.iD_PagosCredito;
                                $window.location.href = 'ConfirmacionPagotarjeta.html#!/?id=' + $scope.id2;
                            })
                            .catch(function(error) {
                                console.error('Error al crear el historial de transacción:', error);
                            });
                    })
                    .catch(function(error) {
                        console.error('Error al actualizar el saldo y adeudo de la tarjeta:', error);
                    });
                    }
                    else
                    {
                        alert('no a ingresado la cantidad correcta')
                    }
                }
                else
                {
                        alert('No Tiene Adeudo')
                }
                
            })
            .catch(function(error) {
                console.error('Error al cargar el nombre:', error);
                alert('Error al cargar el nombre')
            });
    
    }
}])

.controller('Carro', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.id= $location.search().id;
    $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.adeuCarro;
            $scope.Tarjeta = response.data.numTarjeta;
            $scope.meses = response.data.mesesAdeudo;
            $scope.interes = response.data.interesAnual;
    
            var adeudo = $scope.Saldo;
            var meses = $scope.meses;
            var interesAnual = $scope.interes/100;
            var iva = 0.16; // Supongamos que el IVA es 16%
    
            var interesMensual = adeudo * interesAnual / meses;
            var adeudoMensual = adeudo / meses;
            var ivaMensual = (adeudo * iva) / meses;
            $scope.mensualidad = interesMensual + adeudoMensual + ivaMensual;
        })
        .catch(function(error) {
            console.error('Error al cargar el nombre:', error);
            alert('Error al cargar el nombre');
        });

    $scope.redirigir = function (url) {
        $window.location.href = url+'#!/?id='+$scope.id; 
    };

    $scope.id = $location.search().id;
    $scope.Abono = function () {
        $scope.id = $location.search().id;
        $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
            .then(function(response) {
                $scope.Saldo = response.data.adeuCarro;
                var valorRetirado = $scope.monto; 

                $scope.cliente = {
                    iD_cliente: 0,
                    nombre: "",
                    numTarjeta: 0,
                    nip: 0,
                    correo: "",
                    saldoTarjeta: 0,
                    tipoTarjeta: "",
                    limTrans:0,
                    adeuTarjeta: 0,
                    limiteTarjeta: 0,
                    adeuHipoteca: 0,
                    adeuCarro: $scope.Saldo - valorRetirado,
                    mesesAdeudo: 0,
                    interesAnual: 0,
                    ce: "",
                    ace: 0,
                    ap:0
                };
                if($scope.Saldo>=valorRetirado)
                {
                    $http.put('https://localhost:7282/api/Clientes/ActualizarAdeucarro/' + $scope.id, $scope.cliente)
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
            
                    var historialPago = {
                        iD_PagosCredito: 0,
                        iD_cliente: $scope.id,
                        monto: valorRetirado,
                        tipo: "Credito Carro",
                        pago: "Abono a capital",
                        saldoRestante:$scope.Saldo - valorRetirado,
                        folio:folio,
                        fecha:fechaFormateada
                    };
            
                    $http.post('https://localhost:7282/api/HistorialCreditoPagos', historialPago)
                        .then(function(response) {
                            console.log('Historial de transacción creado:', response.data);
                            $scope.id2 = response.data.iD_PagosCredito;
                            $window.location.href = 'ConfirmacionPagotarjeta.html#!/?id=' + $scope.id2;
                        })
                        .catch(function(error) {
                            console.error('Error al crear el historial de transacción:', error);
                        });
                })
                .catch(function(error) {
                    console.error('Error al actualizar el saldo y adeudo de la tarjeta:', error);
                });
                }
                else
                {
                    alert('No Tiene Adeudo')
                }
                
            })
            .catch(function(error) {
                console.error('Error al cargar el nombre:', error);
                alert('Error al cargar el nombre')
            });
    }



    $scope.Mensual = function () {
        $scope.id = $location.search().id;
        $http.get('https://localhost:7282/api/Clientes/BuscarPorID/' + $scope.id)
            .then(function(response) {
                $scope.Saldo = response.data.adeuCarro;
                var valorRetirado = $scope.monto; 

                $scope.cliente = {
                    iD_cliente: 0,
                    nombre: "",
                    numTarjeta: 0,
                    nip: 0,
                    correo: "",
                    saldoTarjeta: 0,
                    tipoTarjeta: "",
                    limTrans:0,
                    adeuTarjeta: 0,
                    limiteTarjeta: 0,
                    adeuHipoteca: 0,
                    adeuCarro: $scope.Saldo - valorRetirado,
                    mesesAdeudo: 0,
                    interesAnual: 0,
                    ce: "",
                    ace: 0,
                    tic:0,
                    ap:0,
                };
                $scope.calcularMensualidad = function(adeudo, meses) {
                    var interesAnual = 0.14; // 14% de interés anual
                    var iva = 0.16; // 16% de IVA
                    var interesMensual = (adeudo * interesAnual) / meses;
                    var adeudoMensual = adeudo / meses;
                    var ivaMensual = (adeudo * iva) / meses;
                    var mensualidad = interesMensual + adeudoMensual + ivaMensual;
                    return mensualidad;
                    
                };
                if($scope.Saldo>=valorRetirado)
                {
                    if($scope.mensualidad<=valorRetirado)
                    {
                        $http.put('https://localhost:7282/api/Clientes/ActualizarAdeucarro/' + $scope.id, $scope.cliente)
                        .then(function(response) {
                        console.log('Datos actualizados correctamente:', response.data);
                        var fechaActual = new Date();
                    
                        var dia = fechaActual.getDate().toString().padStart(2, '0');
                        var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); 
                        var año = fechaActual.getFullYear();
                        var hora = fechaActual.getHours().toString().padStart(2, '0');
                        var minuto = fechaActual.getMinutes().toString().padStart(2, '0');
                        var segundo = fechaActual.getSeconds().toString().padStart(2, '0');
                        
                    
                        var fechaFormateada = `${año}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
                        
                        console.log(fechaFormateada); 
                        var folio = fechaActual.getTime();
                        var historialPago = {
                            iD_PagosCredito: 0,
                            iD_cliente: $scope.id,
                            monto: valorRetirado,
                            tipo: "Credito Carro",
                            pago: "Mensual",
                            saldoRestante:$scope.Saldo - valorRetirado,
                            folio:folio,
                            fecha:fechaFormateada
                        };
                
                        $http.post('https://localhost:7282/api/HistorialCreditoPagos', historialPago)
                            .then(function(response) {
                                console.log('Historial de transacción creado:', response.data);
                                $scope.id2 = response.data.iD_PagosCredito;
                                $window.location.href = 'ConfirmacionPagotarjeta.html#!/?id=' + $scope.id2;
                            })
                            .catch(function(error) {
                                console.error('Error al crear el historial de transacción:', error);
                            });
                    })
                    .catch(function(error) {
                        console.error('Error al actualizar el saldo y adeudo de la tarjeta:', error);
                    });
                    }
                    else
                    {
                        alert('no a ingresado la cantidad correcta')
                    }
                }
                else
                {
                        alert('No Tiene Adeudo')
                }
                
            })
            .catch(function(error) {
                console.error('Error al cargar el nombre:', error);
                alert('Error al cargar el nombre')
            });
    
    }
}])


.controller('ticket', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
 
    $scope.id = $location.search().id;
    $http.get('https://localhost:7282/api/HistorialCreditoPagos/' + $scope.id)
        .then(function(response) {
            $scope.Saldo = response.data.saldoRestante;
            $scope.id2 = response.data.iD_cliente;
            $scope.Tipo = response.data.tipo;
            $scope.Tipo2 = response.data.pago;
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
}]) 
