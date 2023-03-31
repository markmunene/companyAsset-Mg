const sql = require("./db.js")

const assetRequest = function (assetRequest) {
    this.id = assetRequest.id,
        this.assetId = assetRequest.assetId,
        this.username = assetRequest.username,
        this.userId = assetRequest.userId,
        this.quantity = assetRequest.quantity,
        this.requestStatus = assetRequest.requestStatus     
}


// register
assetRequest.create = async (newassetRequest, result) => {
   
    sql.query("INSERT INTO assetrequest SET ?",newassetRequest, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        result(null, { id: res.insertId, ...newassetRequest });
    })
}



// search by id
assetRequest.findById = (id, result) => {
    sql.query(`SELECT * FROM assetrequest WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          result(null, res[0]);
          return;
        }
    
        // not found assetRequest with the id
        result({ kind: "not_found" }, null);
      });
}

// fetch all assetRequest
assetRequest.getAllassetRequest = (result) => {
    let query = "SELECT * FROM assetrequest";

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


assetRequest.updateassetRequestById = (id,updatedassetRequest, result) => {
    sql.query(
        "UPDATE assetrequest SET assetId = ?, username = ?, userId = ? quantity = ? requestStatus = ? WHERE id = ?",
        [updatedassetRequest.assetId,
            updatedassetRequest.username,
            updatedassetRequest.userId,
            updatedassetRequest.quantity,
            updatedassetRequest.requestStatus,
            id
        ],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found updatedassetRequest with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          result(null, { id: id, ...updatedassetRequest });
        }
      );
}

assetRequest.updateassetRequestStatusById = (id,updatedassetRequest, result) => {
  sql.query(
      "UPDATE assetrequest SET  requestStatus = ? WHERE id = ?",
      [
          updatedassetRequest.requestStatus,
          id
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found updatedassetRequest with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        result(null, { id: id, ...updatedassetRequest });
      }
    );
}

// delete
assetRequest.deleteById = (id, result) => {
    sql.query("DELETE FROM assetrequest WHERE id = ?", id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          // not found assetRequest with the id
          result({ kind: "not_found" }, null);
          return;
        }
    
        result(null, res);
      });
}
module.exports = assetRequest;