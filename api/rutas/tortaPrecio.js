mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    // Listar
    router.get("/tortaPrecio", function(req, res){
        connection.query("SELECT * FROM tortaPrecio ORDER BY id", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Buscar
    router.get("/tortaPrecio/:id", function(req, res){
        connection.query("SELECT * FROM tortaPrecio WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Buscar por Detalle GENERAL
    router.get("/tortaPrecio/general", function(req, res){
        connection.query("SELECT * FROM tortaPrecio ORDER BY id", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });


// Buscar por Detalle GENERAL
    router.get("/tortaPrecio/listado", function(req, res){
        connection.query("SELECT PT.id, TOR.id AS torta_id, MT.masaTipo_nombre TAM.id AS Tamano_id, TAM.num AS tamano_num, TAM.personas AS tamano_personas, PRE.id AS precio_id, PRE.precio AS precio_precio FROM torta TOR INNER JOIN masaTipo MT ON TOR.masaTipo_id = MT.id INNER JOIN tortaPrecio PT ON TOR.id = PT.torta_id INNER JOIN tamano TAM ON TAM.id = PT.tamano_id INNER JOIN precio PRE ON PRE.id = PT.precio_id ORDER BY PT.id", function(err, rows) {
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Insertar
    router.post("/tortaPrecio", function(req, res){
        connection.query("INSERT INTO tortaPrecio(torta_id, tamano_id, precio_id) VALUES('" + req.body.torta_id + "', '" + req.body.tamano_id + "', '" + req.body.precio_id + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Precio-Torta registrado");
            }
        });
    });

    // Modificar
    router.put("/tortaPrecio/:id", function(req, res){
        connection.query("UPDATE tortaPrecio SET torta_id = " + req.body.torta_id + ", tamano_id = " + req.body.tamano_id + ", precio_id = " + req.body.precio_id + "  WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Precio-Torta modificado");
            }
        });
    });

    // Eliminar
    router.delete("/tortaPrecio/:id", function(req, res){
        connection.query("DELETE FROM tortaPrecio WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Precio-Torta eliminado");
            }
        });
    });

}
module.exports = REST_ROUTER;