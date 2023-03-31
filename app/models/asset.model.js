const sql = require("./db.js")

const asset = function (asset) {
    this.id = asset.id,
        this.name = asset.name,
        this.quantity = asset.quantity,
        this.serialNumber = asset.serialNumber,
        this.cost = asset.cost,
        this.datePurchased = asset.datePurchased,
        this.issueFrequency = asset.issueFrequency,
        this.status = asset.status,
        this.categoryId = asset.categoryId
}


// register
asset.create = async (newasset, result) => {
   
    sql.query("INSERT INTO asset SET ?",newasset, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        console.log("created asset: ", { id: res.insertId, ...newasset });
        result(null, { id: res.insertId, ...newasset });
    })
}



// search by id
asset.findById = (id, result) => {
    sql.query(`SELECT * FROM asset WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found asset: ", res[0]);
          result(null, res[0]);
          return;
        }
    
        // not found asset with the id
        result({ kind: "not_found" }, null);
      });
}

// fetch all
asset.getAllasset = (result) => {
    let query = "SELECT * FROM asset";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      result(null, res);
    });
}
// update
asset.updateassetById = (id, updatedasset, result) => {

    sql.query(
        "UPDATE asset SET name = ?,quantity = ?,serialNumber = ?,cost = ?,datePurchased = ?,status = ?,issueFrequency = ?,categoryId = ? WHERE id = ?",
      [updatedasset.name,
        updatedasset.quantity,
        updatedasset.serialNumber,
        updatedasset.cost,
        updatedasset.datePurchased,
        updatedasset.status,
        updatedasset.issueFrequency,
        updatedasset.categoryId,
        id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          if (res.affectedRows == 0) {
            // not found updatedasset with the id
            result({ kind: "not_found" }, null);
            return;
          }
          result(null, { id: id, ...updatedasset });
        }
      );
}
// update asset frequency

asset.updateassetIssueFreqeuncy = (id, updatedasset, result) => {

  sql.query(
      "UPDATE asset SET issueFrequency = ?, quantity =? WHERE id = ?",
    [
      updatedasset.issueFrequency,updatedasset.quantity,
      id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found updatedasset with the id
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, { id: id, ...updatedasset });
      }
    );
}

// delete
asset.deleteById = (id, result) => {
    sql.query("DELETE FROM asset WHERE id = ?", id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          // not found asset with the id
          result({ kind: "not_found" }, null);
          return;
        }
    
        result(null, res);
      });
}

// search by name
asset.searchByName = (name, result) => {
  sql.query(`SELECT * FROM asset WHERE name like '%${name}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found users with the id
    result({ kind: "not_found" }, null);
  });
}

module.exports = asset;