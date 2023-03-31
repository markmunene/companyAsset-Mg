const sql = require("./db.js")

const departments = function (departments) {
    this.id = departments.id,
        this.name = departments.name,
        this.description = departments.description
        
       
}
// register
departments.create = async (newdepartments, result) => {
   
    sql.query("INSERT INTO departments SET ?",newdepartments, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        console.log("created departments: ", { id: res.insertId, ...newdepartments });
        result(null, { id: res.insertId, ...newdepartments });
    })
}



// search by id
departments.findById = (id, result) => {
    sql.query(`SELECT * FROM departments WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found departments: ", res[0]);
          result(null, res[0]);
          return;
        }
    
        // not found departments with the id
        result({ kind: "not_found" }, null);
      });
}

// fetch all departments
departments.getAlldepartments = (result) => {
    let query = "SELECT * FROM departments";

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("departments: ", res);
      result(null, res);
    });
}
// update
departments.updatedepartmentsById = (id,updateddepartments, result) => {
    sql.query(
        "UPDATE departments SET name = ?, description = ? WHERE id = ?",
        [updateddepartments.name, updateddepartments.description,  id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found updateddepartments with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated departments: ", { id: id, ...updateddepartments });
          result(null, { id: id, ...updateddepartments });
        }
      );
}

// delete
departments.deleteById = (id, result) => {
    sql.query("DELETE FROM departments WHERE id = ?", id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          // not found departments with the id
          result({ kind: "not_found" }, null);
          return;
        }
    
        console.log("deleted departments with id: ", id);
        result(null, res);
      });
}
module.exports = departments;