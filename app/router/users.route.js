const router = require('express').Router();

const userModel = require('../models/users.model');
const assetModel = require('../models/asset.model.js');
const categoryModel = require("../models/categories.model.js");
const departmentModel = require("../models/department.model.js");
const tranferModel = require("../models/transferHistory.model.js");
const {LocalStorage} = require("node-localstorage");

var localStorage = new LocalStorage('./scratch'); 

let user = localStorage.getItem("user");
user = JSON.parse(user);


// view routes
router.get('/login', (req, resp) => {
    
    resp.render('Login');
});
router.get('/Register', (req, resp) => {
  
    departmentModel.getAlldepartments((err, data) => {
    if (err) {
        console.log("error");
    } else {
        resp.render('Register', {departments:data});
        
    }
})
});
router.post('/RegisterUser', (req, resp) => {
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    if (password != confirmPassword) {
        resp.render("Register", {message:"passwords do not match", status:400});
        return
    } 
    userModel.create(new userModel(req.body), (err, data) => {
        if (err)
            resp.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        else {
            // console.log(data);
            // localStorage.setItem("user", JSON.stringify(data));
            resp.redirect("Login")
        }
    });
});

// login route
router.post('/login', (req, resp) => {
    localStorage.clear();
    // console.log(req.session.role);
    userModel.login(new userModel(req.body), (err, data) => {
        if (err)
        {
            req.session.userId = null;
            req.session.name = null; ;    
            req.session.email = null;
            req.session.phoneNumber = null;
            req.session.role = null;
            resp.render("Login", {message:"incorrect details try again", status:400});
      }
        else {
            // console.log(data);
            localStorage.setItem("user", JSON.stringify(data))
            req.session.id = data.id;
            req.session.name = data.firstname  + data.secondname;
            
                req.session.username = data.username;
                req.session.phone = data.phone ? data.phone : '0912345678';
            req.session.role = data.role; 
            req.session.message = "Login successful";
            
          return   resp.redirect("/asset/AllAssets")
    }
    })
})


router.post('/updateUsersform', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
        userModel.findById(req.body.id, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                departmentModel.getAlldepartments((err, dat) => {
                    if (err) {
                        console.log(err);
                    } else {
                    
                        resp.render("UpdateUser", { User: data, departments: dat, user });
                    }
                })
            }
    })
});
router.post('/updateUsers', (req, resp) => {
    
       userModel.updateUserById(req.body.id, new userModel(req.body), (err, data) => {
        if (err) {
            console.log(err);
        } else {
req.session.message = "User Updated";

            resp.redirect("/allUsers")
        }
    })
});

router.post('/searchUser', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
   
    userModel.searchByName(req.body.username, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("data received", data);
            return resp.render("AllUsers", { Users: data, user });
        }
    });
});

router.get('/allUsers', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
   userModel.getAllUsers((err, data) => {
        if (err) {
            resp.render("AllUsers", { message: "Failed to load Users", status: 500, user });
        }
        else {
            resp.render("AllUsers", { Users: data, message: req.session.message, status: 200, user });
req.session.message = undefined;
            
        }
      
    })
});

// delete asset
router.post('/deleteUser', (req, resp) => {
   
    userModel.deleteById(req.body.id,  (err, data) => {
        if (err) {
            console.log(err);
        } else {
req.session.message = "User Deleted";

            
            return resp.redirect('/allUsers', )
        }
     })
});
module.exports = router;
