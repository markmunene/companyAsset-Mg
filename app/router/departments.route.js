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
router.get('/', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    resp.render('CreateDepartments', {user});
});

router.get('/AllDepartments', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);

    departmentModel.getAlldepartments((err, data) => {
        if (err) {
            console.log(err);
        } else {
            resp.render('AllDepartments', { Departments: data, message: req.session.message, status: 200, user });
            
            req.session.message = undefined;
            
        }
    })
});

router.post("/update", (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    departmentModel.updatedepartmentsById(req.body.id, new departmentModel(req.body), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            req.session.message = "Department updated";
            return resp.redirect("/department/AllDepartments")
        }
    })
});

router.post('/updateDepartmentform', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    departmentModel.findById(req.body.id, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        resp.render("UpdateDepartment", {Department:data, user})
    }
})
});
router.post("/create", (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    departmentModel.create(new departmentModel(req.body), (err, data) => {
        if (err) {
            resp.render("CreateDepartments", { message: "error in creating Department", status: 200, user });
        }
        else {
            req.session.message = "Department Created";
            return resp.redirect("/department/AllDepartments")
        }
    })
});

// delete Departments
router.post('/deleteDepartments', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
   
    categoryModel.deleteById(req.body.id,  (err, data) => {
        if (err) {
            console.log(err);
        } else {

            req.session.message = "Department deleted";
            
            return resp.redirect('/Departments/AllDepartments')
        }
     })
});

module.exports = router;
