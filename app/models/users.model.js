const sql = require("./db.js")
const bcrypt = require('bcryptjs');

const user = function (user) {
  this.id = user.id,
    this.firstname = user.firstname,
    this.secondname = user.secondname,
        this.username = user.username,
        this.password = user.password,
        this.role = user.role,
        this.departmentId = user.departmentId,
    this.phone = user.phone
  
}
// register
user.create = async (newUser, result) => {

    const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, salt);
    sql.query("INSERT INTO users SET ?", {...newUser, password: hashPassword}, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
    
        result(null, { id: res.insertId, ...newUser });
    })
}
// login

user.login = async (userauth, result) => {
    
    sql.query(`SELECT * FROM users WHERE username = ?`,userauth.username, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
            
            const user = res[0];

          if (user && bcrypt.compareSync(userauth.password, user.password)) {
            
            result(null, user);             
            }
          else {
                result({ kind: "not_found" }, null);
            }
          return;
        }
    
        // not found users with the id
        result({ kind: "not_found" }, null);
      });
  
}


// search by id
user.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          result(null, res[0]);
          return;
        }
    
        // not found users with the id
        result({ kind: "not_found" }, null);
      });
}

// fetch all
user.getAllUsers = (result) => {
    let query = "SELECT * FROM users";

  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      result(null, res);
    });
}
// fetch all departments
user.getDepartments = (result) => {
  let query = "SELECT * FROM users";


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
}
// update
user.updateUserById = async (id, updatedUser, result) => {
  
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(updatedUser.password, salt);
    sql.query(
        "UPDATE users SET firstname = ?, secondname = ?, username = ?, role = ?, departmentId = ?, phone = ? , password = ? WHERE id = ?",
      [
        updatedUser.firstname,
        updatedUser.secondname,
        updatedUser.username,
        updatedUser.role,
        updatedUser.departmentId,
        updatedUser.phone,
        hashPassword,
        id
      ],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found updatedUser with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          result(null, { id: id, ...updatedUser });
        }
      );
}
user.searchByName = (username, result) => {
  sql.query(`SELECT * FROM users WHERE username like '%${username}%'`, (err, res) => {
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

// delete
user.deleteById = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          // not found user with the id
          result({ kind: "not_found" }, null);
          return;
        }
    
        result(null, res);
      });
}
module.exports = user;