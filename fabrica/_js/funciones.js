var rutaApi = "http://138.197.7.205:3000/api/";

function ajaxGet(url, callback) {
	$.get(url).done(function(data){
		callback(data);
	});
}

function ajaxPost(url, datos, callback) {
	$.post(url, datos).done(function(data){ callback(data); });
}

function ajaxPut(url, datos, callback) {
	$.ajax({
		url: url,
		data: datos,
		type: 'PUT',
		success: function(response) {
			//callback(data);
		}
	}).done(function(data){ callback(data); });
}

function ajaxDelete(url, callback) {
	$.ajax({
		url: url,
		type: 'DELETE',
		success: function(response) {
			//callback(data);
		}
	}).done(function(data){ callback(data); });
}