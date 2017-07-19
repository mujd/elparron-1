var programacion = {
	nombre: "programacion",
	paginaInicial: "programacion.html",
	listar: function() {
		cma_ajaxGet(rutaURL + "/" + this.nombre, this.desplegar);
	},
	desplegar: function(oData) {
		var tabla = cma_creaTabla(programacion.nombre);
		var oInfo = [];
		$(oData).each(function() {
			var oItem = [this.id, this.tipo, this.sabor, this.personas, this.total, cma_CreaBotonesEdicion(programacion.nombre, this.id)];
			tabla.row.add(oItem);
		});
		tabla.draw();
	},
	inicializaPaneles: function() {

	}
}
