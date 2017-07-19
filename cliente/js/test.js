var test = {
	nombre: "test",
	paginaInicial: "test.html",
	listar: function() {
		cma_ajaxGet(rutaURL + "/" + this.nombre, this.desplegar);
	},
	desplegar: function(oData) {
		var tabla = cma_creaTabla(test.nombre);
		var oInfo = [];
		$(oData).each(function() {
			var oItem = [this.id, this.tipo, this.sabor, this.personas, this.total, cma_CreaBotonesEdicion(test.nombre, this.id)];
			tabla.row.add(oItem);
		});
		tabla.draw();
	},
	inicializaPaneles: function() {

	}
}

function formatoFecha(oFecha) {
	var fecha = oFecha.val();
	return fecha.split("/")[2] + "-" + fecha.split("/")[1] + "-" + fecha.split("/")[0];
}

function formatoFecha(oFecha){
	// La fecha en el texto dice dd/mm/yyy --> La convertiremos a formato yyymmdd
	var fecha = $("#datePedido").val().split("/")[2] + "-" + $("#datePedido").val().split("/")[1] + "-" + $("#datePedido").val().split("/")[0]  + " " + $("#datePedido").val().split(":")[3] + $("#datePedido").val().split(":")[4];
}
