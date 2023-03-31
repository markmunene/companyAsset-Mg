const sql = require("./db.js")

const transferhistory = function (transferhistory) {
    this.id = transferhistory.id,
        this.tranferBy = transferhistory.tranferBy,
        this.transferTo = transferhistory.transferTo,
        this.quantity = transferhistory.quantity,
       
        this.assetId = transferhistory.assetId,
        this.location = transferhistory.location,
        this.status = transferhistory.status,
        this.dateIssued = transferhistory.dateIssued
}
// register
transferhistory.create = async (newtransferhistory, result) => {
    
    sql.query("INSERT INTO transferhistory SET ?", newtransferhistory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        console.log("created transferhistory: ", { id: res.insertId, ...newtransferhistory });
        result(null, { id: res.insertId, ...newtransferhistory });
    })
}



// search by id
transferhistory.findById = (id, result) => {
    sql.query(`SELECT * FROM transferhistory WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found transferhistory: ", res[0]);
          result(null, res[0]);
          return;
        }
    
        // not found transferhistory with the id
        result({ kind: "not_found" }, null);
      });
}

// fetch all
transferhistory.getAlltransferhistory = (result) => {
    let query = "SELECT * FROM transferhistory";

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("transferhistory: ", res);
      result(null, res);
    });
}
// update
transferhistory.updatetransferhistoryById = (id,updatedtransferhistory, result) => {
    sql.query(
        "UPDATE transferhistory SET title = ?, description = ?, published = ? WHERE id = ?",
        [updatedtransferhistory.title, updatedtransferhistory.description, updatedtransferhistory.published, id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found updatedtransferhistory with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated transferhistory: ", { id: id, ...updatedtransferhistory });
          result(null, { id: id, ...updatedtransferhistory });
        }
      );
}

// delete
transferhistory.deleteById = (id, result) => {
    sql.query("DELETE FROM transferhistory WHERE id = ?", id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          // not found transferhistory with the id
          result({ kind: "not_found" }, null);
          return;
        }
    
        console.log("deleted transferhistory with id: ", id);
        result(null, res);
      });
}

module.exports = transferhistory;