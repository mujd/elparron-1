mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    // Listar
    router.get("/pedidoEspecial", function(req, res){
        connection.query(`SELECT PED.id, TOR.id AS torta_id,
                          PED.solicitante AS solicitante,
                          PED.telefono AS telefono,
                          TAM.id AS tamano_id,
                          DATE_FORMAT(PED.fechaEntrega,'%d/%m/%Y') AS fechaEntrega,
                          PED.precio AS precio,
                          SUC.id AS sucursalRetiro
                          FROM pedidoEspecial PED
                          INNER JOIN torta TOR ON PED.torta_id = TOR.id
                          INNER JOIN tamano TAM ON PED.tamano_id = TAM.id
                          INNER JOIN sucursal SUC ON PED.sucursalRetiro = SUC.id
                          ORDER BY PED.id`, function(err, rows){
            if(err){
                res.json({"error": err});
                //console.log(err);
            }else{
                res.json(rows);
            }
        });
    });

    // Listar
    router.get("/pedidoEspecial/:id", function(req, res){
        connection.query(`
                SELECT NET.id, 
                TOR.id AS torta_id, 
                NET.solicitante AS solicitante, 
                NET.telefono AS telefono, 
                DATE_FORMAT(NET.fechaEntrega,'%d/%m/%Y') AS fechaEntrega, 
                NET.precio AS precio 
                FROM pedidoEspecial NET 
                INNER JOIN torta TOR ON NET.torta_id = TOR.id 
                WHERE NET.id = ` + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Insertar
    router.post("/pedidoEspecial", function(req, res){
        connection.query(`INSERT INTO pedidoEspecial(
                                      torta_id, 
                                      solicitante, 
                                      telefono, 
                                      tamano_id, 
                                      precio,
                                      fechaEntrega, 
                                      sucursalRetiro,
                                      caracteristicas,
                                      mensaje,
                                      abono,
                                      forma,
                                      diet
                                      ) 
                        VALUES(
                            ` + req.body.torta_id + `,
                            '` + req.body.solicitante + `',
                            '` + req.body.telefono + `',
                            '` + req.body.tamano_id + `',
                            '` + req.body.precio + `',
                            '` + req.body.fechaEntrega + `',
                            '` + req.body.sucursalRetiro + `',
                            '` + req.body.caracteristicas + `',
                            '` + req.body.mensaje + `',
                            '` + req.body.abono + `',
                            '` + req.body.forma + `',
                            '` + req.body.diet + `')`,
                            
                            function(err, rows) {
            if(err){
                res.json({"error": err});
                console.log(err);
            }else{
                res.json("pedido especial registrado");
            }
        });
    });

    // Modificar
    router.put("/pedidoEspecial/:id", function(req, res){
        connection.query("UPDATE pedidoEspecial SET torta_id = " + req.body.torta_id + ", solicitante = " + req.body.solicitante + ", telefono = " + req.body.telefono + ", fechaEntrega = " + req.body.fechaEntrega + ", precio = " + req.body.precio + " WHERE id = " + req.params.id, function(err, rows) {
            if(err){
                res.json({"error": err});
                console.log(err);
            }else{
                res.json("pedidoEspecial modificado");
            }
        });
    });

    // Eliminar
    router.delete("/pedidoEspecial/:id", function(req, res){
        connection.query("DELETE FROM pedidoEspecial WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("pedido especial eliminado");
            }
        });
    });

}
module.exports = REST_ROUTER;
