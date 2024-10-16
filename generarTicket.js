var datos = {
  numTarjeta: "1234 5678 9012 3456",
  referencia: "REF123456",
  monto: "$100.00",
  fechaPago: obtenerFechaActual(), // Obtener la fecha actual
  folio: "FOL123",
  deudaRestante: "$50.00"
};

function obtenerFechaActual() {
  var fecha = new Date();
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
  var año = fecha.getFullYear();

  // Formatear el día y el mes a dos dígitos si es necesario
  if (dia < 10) {
    dia = '0' + dia;
  }
  if (mes < 10) {
    mes = '0' + mes;
  }

  return dia + '/' + mes + '/' + año;
}

function mostrarTicket(datos) {
  document.getElementById("numTarjeta").textContent = datos.numTarjeta;
  document.getElementById("referencia").textContent = datos.referencia;
  document.getElementById("monto").textContent = datos.monto;
  document.getElementById("fechaPago").textContent = datos.fechaPago;
  document.getElementById("folio").textContent = datos.folio;
  document.getElementById("deudaRestante").textContent = datos.deudaRestante;
}

mostrarTicket(datos);