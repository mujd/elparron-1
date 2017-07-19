var tortaPrecio = {
	nombre: "tortaPrecio",
	paginaInicial: "tortaPrecio.html",	
	listar: function() {
		//ajaxGet(rutaURL + "/tortaPrecio");
	}
}

function tortaPrecioSerializar() {
	var datos = {
		"id": $("#txtID").val(),
		"torta_id": $("#cmbTortaPT").val(),
		"tamano_id": $("#cmbTamanoPT").val(),
		"precio_id": $("#cmbPrecioPT").val()
	}
	return datos;
}

function tortaPrecioLlenaTabla(oData) {
	$("#tabTortaPrecio tbody").remove();
	$(oData).each(function() {
		$("#tabTortaPrecio").append("<tbody><tr style='cursor:pointer' onclick='tortaPrecioEditar(this);'><td>" + this.id + "</td><td>" + this.torta_id + "</td><td>" + this.tamano_id + "</td><td>" + this.precio_id + "</td></tr></tbody>");
	});
}

function tortaPrecioDesplegarTorta(oData) {
	$("#cmbTortaPT option").remove();
	$("#cmbTortaPT").append("<option value=''>:: Seleccione Torta ::</option>");
	$(oData).each(function() {
		$("#cmbTortaPT").append("<option value='" + this.id + "'>" + this.masaTipo_nombre + "" + " " + "" + this.masaSabor_nombre + "" + " " + "" + this.sabor_nombre + "</option>");
	});
}

function tortaPrecioDesplegarTamano(oData) {
	$("#cmbTamanoPT option").remove();
	$("#cmbTamanoPT").append("<option value=''>:: Seleccione Tamaño ::</option>");
	$(oData).each(function() {
		$("#cmbTamanoPT").append("<option value='" + this.id + "'>" + "(" + "" + this.num+ "" + ") - " + "" + this.personas + "" + " Personas" + "</option>");
	});
}

function tortaPrecioDesplegarPrecio(oData) {
	$("#cmbPrecioPT option").remove();
	$("#cmbPrecioPT").append("<option value=''>:: Seleccione Precio ::</option>");
	$(oData).each(function() {
		$("#cmbPrecioPT").append("<option value='" + this.id + "'>" + this.precio + "</option>");
	});
}

function tortaPrecioLimpiar(tortaPrecioTipo) {
	$("#cmbPrecioPT").val("");
	$("#cmbTamanoPT").val("");
	$("#txtID").val("");
	ajaxGet(rutaURL + "/torta", tortaPrecioDesplegarTorta);
	ajaxGet(rutaURL + "/tamano", tortaPrecioDesplegarTamano);
	ajaxGet(rutaURL + "/precio", tortaPrecioDesplegarPrecio);
	if(tortaPrecioTipo) {
		$("#cmbTortaPT").val("");
		$("#cmbTortaPT").focus();
	}
}

function tortaPrecioAgregar() {
	tortaPrecioLimpiar(true);
}

function tortaPrecioListar() {
	ajaxGet(rutaURL + "/tortaPrecio", tortaPrecioLlenaTabla);
}

function tortaPrecioEditar(oFila) {
	$("#txtID").val($(oFila).find("td")[0].innerHTML);
	$("#cmbTortaPT").val($(oFila).find("td")[1].innerHTML);
	$("#cmbTamanoPT").val($(oFila).find("td")[2].innerHTML);
	$("#cmbPrecioPT").val($(oFila).find("td")[3].innerHTML);
}

function tortaPrecioRegistrar() {
	var datos = tortaPrecioSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxPut(rutaURL + "/tortaPrecio/" + datos.id, datos, tortaPrecioListar);
	} else {
		ajaxPost(rutaURL + "/tortaPrecio", datos, tortaPrecioListar);
	}
	tortaPrecioAgregar();
}

function tortaPrecioEliminar() {
	var datos = tortaPrecioSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxDelete(rutaURL + "/tortaPrecio/" + datos.id, tortaPrecioListar);
		tortaPrecioAgregar();
	}
}

function tortaPrecioValidaTextos(){
	if($("#txtNum").val() != 0 && $("#txtPersonas").val() != 0){
		tortaPrecioRegistrar(); 
		$("#divTortaPrecioError").toggle(function(){ $("#divTortaPrecioError").append("");	});
	}else{
		$("#divTortaPrecioError").append("<div class='alert alert-danger' role='alert'>*¡¡Por favor ingrese numero y personas!!*</div>");
		}
	}

function tortaPrecioCargar() {
	$("#cma-layout").load("tortaPrecio.html", function() {
		tortaPrecioListar();
		tortaPrecioLimpiar(true);
		$("#btnNuevoTortaPrecio").click(function() { tortaPrecioAgregar(); });
		//$("#btnRegistrarTortaPrecio").click(function() { tortaPrecioRegistrar(); });
		$("#btnRegistrarTortaPrecio").click(function() { 
			tortaPrecioValidaTextos();	
		});
		$("#btnEliminarTortaPrecio").click(function() {  
			tortaPrecioEliminar();
			$('#modalEliminarTortaPrecio').modal('toggle'); 
		});	
	});
}