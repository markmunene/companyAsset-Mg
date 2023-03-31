const router = require('express').Router();

const userModel = require('../models/users.model');
const assetModel = require('../models/asset.model.js');
const categoryModel = require("../models/categories.model.js");
const tranferModel = require("../models/transferHistory.model.js");
const {LocalStorage} = require("node-localstorage");

var localStorage = new LocalStorage('./scratch'); 
let user = localStorage.getItem("user");
user = JSON.parse(user);

// view routes
router.get('/', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    resp.render('CreateCategory', {user});
});
router.get('/AllCategories', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    categoryModel.getAllcategories((err, data) => {
        if (err) {
            console.log(err);
        } else {
            resp.render('AllCategories', { Categories: data, message: req.session.message, status: 200,user });
           
            req.session.message = undefined;
           
        }
    })
});
router.post('/updateCategoryform', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    categoryModel.findById(req.body.id, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            resp.render("UpdateCategory", { category: data,user })
        }
    });
});

router.post("/update", (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    categoryModel.updatecategoriesById(req.body.id, new categoryModel(req.body), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            req.session.message = "Category Updated";

            return resp.redirect("/categories/AllCategories")
        }
    })
});

router.post("/create", (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    categoryModel.create(new categoryModel(req.body), (err, data) => {
        if (err) {
            resp.render("CreateCategory", { message: "error in creating category", status: 200,user });
            
        }
        else {
            req.session.message = "Category Created";
            return resp.redirect("/categories/AllCategories")

        }
    })
});

// delete Categories
router.post('/deleteCategories', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
   
    categoryModel.deleteById(req.body.id,  (err, data) => {
        if (err) {
            console.log(err);
        } else {
            req.session.message = "Category deleted";
            
            return resp.redirect('/categories/AllCategories')
        }
     })
});

module.exports = router;
