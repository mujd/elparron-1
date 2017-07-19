var pedidoEspecial = {
	nombre: "pedidoEspecial",
	paginaInicial: "pedidoEspecial.html",
	listar: function() {
	}
}
function pedidoEspecialSerializar(){
	
	// var forma = $('.CheckboxForma:checked').map(function() {return this.value;}).get().join(', ');
	var diet = $('.CheckboxDiet:checked').val();

	var datetime= $("#datePedido").val();
	var date=datetime.split('/')[2].split(' ')[0] + "-" + datetime.split('/')[1] + "-" + datetime.split('/')[0] + " " + datetime.split('/')[2].split(' ')[1] + ":00";
	var datos = {
		"torta_id": $("#txtTorta").val(),
		"solicitante": $("#txtSolicitante").val(),
		"telefono": $("#txtTelefono").val(),
		"tamano_id": [],
		"precio": $("#txtPrecios").val(),
		"fechaEntrega": date,
		"sucursalRetiro": $("#cmbSucursalRetiro").val(),
		"caracteristicas": $("#txtCaracteristicas").val(),
		"mensaje": $("#txtMensaje").val(),
		"abono": $("#txtAbono").val(),
		"forma": forma,
		"diet": diet
	}
	$("#ulTamano").find("input[name=personas]:checked").each(function () {
		datos.tamano_id.push($(this).attr("id"));
	});
	return datos;
}

// function forma{
// 		if(var forma = $('.CheckboxForma:checked').val();)
// 	}
function desplegarTipoMasaEsp(oData){
	$("#cmbTipoMasa option").remove();
	$("#cmbTipoMasa").append("<option value=''>:: Tipo Masa ::</option>");
	$(oData).each(function(){
		$("#cmbTipoMasa").append("<option value='" + this.id + "'>" + this.nombre + "</option>")
	});
}

function desplegarTamañoEsp(oData){
	$("#raTamano option").remove();
	$("#raTamano").append("<option value=''>:: Seleccion Sabor Torta ::</option>");
	$(oData).each(function(){
		$("#raTamano").append("<option value='" + this.id + "'>" + this.nombre + "</option>")
	});
}

function desplegarSucursalRetiroEsp(oData){
	$("#cmbSucursalRetiro option").remove();
	$("#cmbSucursalRetiro").append("<option value=''>:: Sucursal de Retiro ::</option>");
	$(oData).each(function(){
		$("#cmbSucursalRetiro").append("<option value='" + this.id + "'>" + this.nombre + "</option>")
	});
}

function pedidoLimpiarEsp(pedidoTipo){
	$("#cmbSucursalRetiro").val("");
	$("#cmbSaborMasa").val("");
	$("#cmbSabor").val("");
	$("#cmbTipoMasa").val("");
	$("#ulTamano").val("");
	$("#txtPrecios").val("");
	$("#txtTelefono").val("");
	$("#datePedido").val("");
	ajaxGet(rutaURL + "/masaTipo", this.desplegarTipoMasaEsp);
	ajaxGet(rutaURL + "/sucursal", this.desplegarSucursalRetiroEsp);
	if(pedidoTipo){
		$("#txtSolicitante").val("");
		$("#txtSolicitante").focus();
	}

}

function pedidoAgregarEsp() {
	pedidoLimpiarEsp(true);

}

function pedidoEditarEsp(oFila) {
	$("#txtID").val($(oFila).find("td")[0].innerHTML);
	$("#cmbTipoMasa").val($($(oFila).find("td")[1]).find("input")[0].value);
	$("#cmbSaborMasa").val($($(oFila).find("td")[2]).find("input")[0].value);
	$("#cmbSabor").val($($(oFila).find("td")[3]).find("input")[0].value);
}

function pedidoRegistrarEsp() {
	var datos = pedidoEspecialSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxPut(rutaURL + "/pedidoEspecial/" + datos.id, datos);
	} else {
		alert(JSON.stringify(datos));
		ajaxPost(rutaURL + "/pedidoEspecial", datos);
	}
	pedidoAgregarEsp();
}

function pedidoCargarFechaYHoraEsp(){
	$('#datePedido').datetimepicker({
		locale: 'es',
		sideBySide: true,
		showClose: true,
		showClear: true,
		showTodayButton: true,
		toolbarPlacement: 'bottom',
		tooltips: {
			today: 'Ir al día de hoy',
			clear: 'Limpiar fecha y hora seleccionada',
			close: 'Cerrar calendario',
			selectMonth: 'Seleccionar Mes',
			prevMonth: 'Mes anterior',
			nextMonth: 'Mes siguiente',
			selectYear: 'Seleccionar año',
			prevYear: 'Año Anterior',
			nextYear: 'Año siguiente',
			selectDecade: 'Seleccionar decada',
			prevDecade: 'Decada anterior',
			nextDecade: 'Decada siguiente',
			prevCentury: 'Siglo anterior',
			nextCentury: 'Siglo siguiente'
		}
	});
}

function pedidoCargarEsp(){
	$("#cma-layout").load("pedido.html", function(){
		$("#btnNuevoPedido").click(function() {
			pedidoAgregarEsp();
		});
		$("#btnRegistrarPedido").click(function() {
			pedidoRegistrarEsp();
			// validaCmbTorta();
			// validaFecha();
			// validaCmbSucursal();
			// validaRadio();

		});
		$("#cmbSabor").click(function(){
			obtenerTortaIdEsp();
		}).blur(function(){
			obtenerTortaIdEsp();
		}).focus(function(){
			obtenerTortaIdEsp();
		});
		$("#cmbTipoMasa").click(function(){ masaTipoMasaSaborMostrarEsp(); }).blur(function(){ masaTipoMasaSaborMostrarEsp(); });
		$("#cmbSaborMasa").click(function(){ masaTipoMasaSaborSaborMostrarEsp(); }).blur(function(){ masaTipoMasaSaborSaborMostrarEsp(); });
		$("#ulTamano").click(function(){ obtenerPrecioTortaEsp(); }).blur(function(){ obtenerPrecioTortaEsp(); }).focus(function(){ obtenerPrecioTortaEsp();	});
		$("#ulPrecio").append("<li><input class='form-control' type='text' value='' readonly></li>");
		pedidoTamanoMostrarEsp();
		pedidoLimpiarEsp(true);
	});
}

/* Cargar Tamaños */

function pedidoTamanoMostrarEsp() { // Solicita a la API los tamañoss (todas)
	ajaxGet(rutaURL + "/tamano", pedidoTamanoDesplegarEsp);
}

function pedidoTamanoDesplegarEsp(oData) { // Despliega los tamaños solicitadas a la API
	$("#ulTamano li").remove();
	$(oData).each(function() {
		
			$("#ulTamano").append("<label class='radio-inline'><li class='listado-li'><input type='radio' name='personas' id='" + this.id + "' value='" + this.id + "'>&nbsp;" + this.personas + " Personas</li></label>");
			// ACA EN VEZ DE ID ERA VALUE CORRECION: tuve que agregar el atributo value para que sirviera
		
	});
}

/* obtener torta id*/

function obtenerTortaIdEsp() { // Solicita a la API la id de la torta
	ajaxGet(rutaURL + "/torta/" + $("#cmbTipoMasa").val() + "/" + $("#cmbSaborMasa").val() + "/" + $("#cmbSabor").val(), desplegarTortaIdEsp);
	// obtenerPrecioTortaEsp();
}

function desplegarTortaIdEsp(oData) { // Despliega la id de la torta
$("#ulTorta li").remove();
	$(oData).each(function() {
			$("#ulTorta").append("<li ><input id='txtTorta' type='text' value='" + this.id + "'></li>");
	});

}

/* Masa sabor por masa tipo */

function masaTipoMasaSaborMostrarEsp() { // Solicita a la API los sabores de masa (todas)
	ajaxGet(rutaURL + "/tipoMasa/saborMasa/" + $("#cmbTipoMasa").val(), masasaborDesplegarEspEsp);
}

function masasaborDesplegarEspEsp(oData) { // Despliega el sabor de la masa solicitadas a la API
	$("#cmbSaborMasa option").remove();
	$("#cmbSaborMasa").append("<option value=''>:: Seleccione Sabor de la Masa ::</option>");
	$(oData).each(function() {
		$("#cmbSaborMasa").append("<option value='" + this.id + "'>" + this.nombre + "</option>")
	});
}

/* Conseguir SABOR por Masa Sabor y Masa Tipo */

function masaTipoMasaSaborSaborMostrarEsp() { // Solicita a la API los sabores de masa (todas)
	ajaxGet(rutaURL + "/masaSabor/sabor/" + $("#cmbTipoMasa").val() + "/" + $("#cmbSaborMasa").val(), saborDesplegarEsp);
}

function saborDesplegarEsp(oData) { // Despliega el sabor de la masa solicitadas a la API
	$("#cmbSabor option").remove();
	$("#cmbSabor").append("<option value=''>:: Seleccione Sabor de la Torta ::</option>");
	$(oData).each(function() {
		$("#cmbSabor").append("<option value='" + this.id + "'>" + this.nombre + "</option>")
	});
}

/* desplegar Precio */

function obtenerPrecioTortaEsp() { // Solicita a la API la id de la torta
	var tamano = $("#ulTamano input[name=personas]:checked").val();
	ajaxGet(rutaURL + "/torta/precio/" + $("#cmbTipoMasa").val() + "/" + $("#cmbSaborMasa").val() + "/" + $("#cmbSabor").val() + "/" + tamano, desplegarPrecioTortaEsp);
}

function desplegarPrecioTortaEsp(oData) { // Despliega la id de la torta
$("#ulPrecio li").remove();
	$(oData).each(function() {
			$("#ulPrecio").append("<li><input id='txtPrecios' class='form-control' type='text' value='" + this.precio + "' readonly></li>");
	});
}



/* VALIDACIONES */
// function validaCamposPedidoEsp() {
// 	var msg = "";
// 	if ($('#txtSolicitante').val().trim() === "" || $('#txtTelefono').val().trim() === "") {
// 		msg = msg + "\n* Debe colocar su nombre y telefono";
// 	}
// 	if ($('#datePedido').val().trim() === "") {
// 		msg = msg + "\n* Debe seleccionar una fecha de retiro";
// 	}
// 	if ($('#cmbTipoMasa').val().trim() === '' || $('#cmbSaborMasa').val().trim() === '' || $('#cmbSabor').val().trim() === '') {
// 		msg = msg + "\n* Debe seleccionar los ingredientes de la torta";
// 	}
// 	if ($('#cmbSucursalRetiro').val().trim() === '') {
// 		msg = msg + "\n* Debe seleccionar una Sucursal de retiro";
// 	}
// 	if (!($("#ulTamano input[name=personas]").is(':checked'))) {
// 		msg = msg + "\n* Debe seleccionar el tamaño de la torta";
// 	}
// 	if (msg != "") {
// 		var message = 'El siguiente error ocurrio debido a que:' + msg;
// 		$('#alertModal').find('.modal-body p').text(message);
// 		$('#alertModal').modal('show')
// 		return false;
// 	} else {
// 		pedidoRegistrarEsp();
// 	}
// }
function validaTelefono(e) {
	tecla = (document.all) ? e.keyCode : e.which;

	//Tecla de retroceso para borrar, siempre la permite
	if (tecla == 8) {
		return true;
	}

	// Patron de entrada, en este caso solo acepta numeros
	patron = /[0-9]/;
	tecla_final = String.fromCharCode(tecla);
	return patron.test(tecla_final);
}