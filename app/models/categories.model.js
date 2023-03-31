const sql = require("./db.js")

const categories = function (categories) {
        this.id = categories.id,
        this.name = categories.name,
        this.description = categories.description
}
// register
categories.create = async (newcategories, result) => {
   
    sql.query("INSERT INTO categories SET ?",newcategories, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        result(null, { id: res.insertId, ...newcategories });
    })
}



// search by id
categories.findById = (id, result) => {
    sql.query(`SELECT * FROM categories WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found categories: ", res[0]);
          result(null, res[0]);
          return;
        }
    
        // not found categories with the id
        result({ kind: "not_found" }, null);
      });
}

// fetch all categories
categories.getAllcategories = (result) => {
    let query = "SELECT * FROM categories";

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
categories.updatecategoriesById = (id,updatedcategories, result) => {
    sql.query(
        "UPDATE categories SET name = ?, description = ? WHERE id = ?",
        [updatedcategories.name, updatedcategories.description, id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found updatedcategories with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          result(null, { id: id, ...updatedcategories });
        }
      );
}

// delete
categories.deleteById = (id, result) => {
    sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          // not found categories with the id
          result({ kind: "not_found" }, null);
          return;
        }
    
        result(null, res);
      });
}
module.exports = categories;