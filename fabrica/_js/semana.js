function semanaDesplegarTortas(oData) {

	var htmlFila = "";	
	$(oData).each(function(){
		htmlFila = htmlFila + `
			<tr class='item'>
				<td>` + this.masaTipo_nombre + (this.masaSabor_nombre != `Blanco` && this.masaSabor_nombre != `Nuez` ? ` ` + this.masaSabor_nombre : ``) + ` ` + this.sabor_nombre + `</td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_1'></td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_2'></td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_3'></td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_4'></td>
				<td id='tdTotal_` + this.id + `'></td>
			</tr>`;
	});
	
	$("#tabTorta").append(htmlFila);
	$("#tabTorta").append(`
		<tr>
			<td>Total</td>
			<td id='tdTotal06'></td>
			<td id='tdTotal12'></td>
			<td id='tdTotal18'></td>
			<td id='tdTotal24'></td>
			<td id='tdTotalGlobal'></td>
		</tr>`);

	semanaTotaliza(oData);
	$("input").blur(function(){
		semanaTotaliza();
	});
	$("input").focus(function() {
		$(this).select();
	});
	$("#icoMenu").click(function() {
		$("#divMenu").slideToggle("fast");
	});
	$("#divMenu ul li").click(function() {
		switch($(this).attr("id")) {
			case "divMenuItemNew":
				semanaNuevo();
				break;
			case "divMenuItemReg":
				semanaRegistrar();
				break;
		}
		$("#divMenu").css("display", "none");
	})
	$("input[type='radio']").click(function() {
		semanaBuscar();
	});

}

function semanaBuscar() {
	if($("input[type='radio']:checked").length == 2) {	
		var dia = $($("input[type='radio']:checked")[0]).attr("id").split("_")[1];
		var sucursal_id = $($("input[type='radio']:checked")[1]).attr("id").split("_")[1];
		ajaxGet(rutaApi + "semana/" + dia + "/" + sucursal_id, semanaDesplegarDias);
	}
}

function semanaDesplegarDias(oData) {
	var item;
	semanaNuevo(true);
	for(var x = 0; x < oData[0].detalle.length; x++) {
		item = oData[0].detalle[x];
		$("#txtCantidad_" + item.torta_id + "_" + item.tamano_id).val(item.cantidad);
	}
	semanaTotaliza();
}

function semanaTotaliza() {
	
	var sumaFila = 0;
	var suma06 = 0;
	var suma12 = 0;
	var suma18 = 0;
	var suma24 = 0;
	var sumaTotal = 0;
	var col = 0;

	try {

		var fila;
		$("#tabTorta .item").each(function() {
			sumaFila = 0;
			col = 0;
			fila = $(this);
			fila.find("input").each(function() {
				sumaFila = sumaFila + parseInt($(this).val());
				sumaTotal = sumaTotal + parseInt($(this).val());
				switch(col) {
					case 0:
						suma06 = suma06 + parseInt($(this).val());
						break;
					case 1:
						suma12 = suma12 + parseInt($(this).val());
						break;
					case 2:
						suma18 = suma18 + parseInt($(this).val());
						break;
					case 3:
						suma24 = suma24 + parseInt($(this).val());
						fila.find("td")[5].innerHTML = sumaFila;
						break;
				}
				col++;
			});
			sumaFila++;
		});
		$("#tdTotal06").html(suma06);
		$("#tdTotal12").html(suma12);
		$("#tdTotal18").html(suma18);
		$("#tdTotal24").html(suma24);
		$("#tdTotalGlobal").html(sumaTotal);

	} catch(e)
	 {
		alert(e);
	}

}

function semanaNuevo(tipo) {

	$("td[id^=tdTotal_]").html("0");

	$("#tdTotal06").html("0");
	$("#tdTotal12").html("0");
	$("#tdTotal18").html("0");
	$("#tdTotal24").html("0");
	$("#tdTotalGlobal").html("0");

	$("input[type='text']").val("0");
	if(!tipo) {
		$("input[type='radio']").prop("checked", false);
	}

}

function semanaRegistrar() {
	if(semanaValidar()) {
		var oData = semanaSerlializar();
		ajaxPost(rutaApi + "semana", oData, alert("Datos registrados"));
	}
}

function semanaValidar() {
	var msg = "";
	if($("input[type='radio']:checked").length < 2) {
		msg = msg + "\n* Debe seleccionar día de la semana y sucursal";
	}
	if($("#tdTotalGlobal").html() == "0") {
		msg = msg + "\n* Debe ingresar cantidad de tortas";
	}
	if(msg != "") {
		alert("No puede registrar programación semanal debido a que:\n" + msg);
		return false;
	} else {
		return true;
	}
}

function semanaSerlializar() {

	var dia = parseInt($($("input[type='radio']:checked")[0]).attr("id").split("_")[1]);
	var sucursal_id = parseInt($($("input[type='radio']:checked")[1]).attr("id").split("_")[1]);

	var data = {
		"dia": dia,
		"sucursal_id": sucursal_id,
		"detalle": []
	}

	$("#tabTorta").find("input[type='text']").each(function() {
		item = {
			"torta_id": $(this).attr("id").split("_")[1],
			"tamano_id": $(this).attr("id").split("_")[2],
			"cantidad": $(this).val()
		}
		data.detalle.push(item);
	});
	return data;

}

$(document).ready(function() {
	ajaxGet(rutaApi + "torta", semanaDesplegarTortas);
});
