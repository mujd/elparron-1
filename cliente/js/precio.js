var precio = {
	nombre: "precio",
	paginaInicial: "precio.html",	
	listar: function() {
		//ajaxGet(rutaURL + "/precio");
	}
}

function precioSerializar() {
	var datos = {
		"id": $("#txtID").val(),
		"precio": $("#txtPrecio").val()
	}
	return datos;
}

function precioLlenaTabla(oData) {
	$("#tabPrecio tbody").remove();
	$(oData).each(function() {
		$("#tabPrecio").append("<tbody><tr style='cursor:pointer' onclick='precioEditar(this);'><td>" + this.id + "</td><td>" + this.precio + "</td></tr></tbody>");
	});
}

function precioLimpiar(precioTipo) {
	$("#txtID").val("");
	if(precioTipo) {
		$("#txtPrecio").val("");
		$("#txtPrecio").focus();
	}
}

function precioAgregar() {
	precioLimpiar(true);
}

function precioListar() {
	ajaxGet(rutaURL + "/precio", precioLlenaTabla);
}

function precioEditar(oFila) {
	$("#txtID").val($(oFila).find("td")[0].innerHTML);
	$("#txtPrecio").val($(oFila).find("td")[1].innerHTML);
}

function precioRegistrar() {
	var datos = precioSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxPut(rutaURL + "/precio/" + datos.id, datos, precioListar);
	} else {
		ajaxPost(rutaURL + "/precio", datos, precioListar);
	}
	precioAgregar();
}

function precioEliminar() {
	var datos = precioSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxDelete(rutaURL + "/precio/" + datos.id, precioListar);
		precioAgregar();
	}
}

function precioCargar() {
	$("#cma-layout").load("precio.html", function() {
		precioListar();
		precioLimpiar(true);
		$("#btnNuevoPrecio").click(function() { precioAgregar(); });
		$("#btnRegistrarPrecio").click(function() { precioRegistrar(); });
		$("#btnEliminarPrecio").click(function() {  
				precioEliminar();
				$('#modalEliminarPrecio').modal('toggle'); 
		});	
	});
}

