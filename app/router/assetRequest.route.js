const router = require('express').Router();

const userModel = require('../models/users.model');
const assetModel = require('../models/asset.model.js');
const categoryModel = require("../models/categories.model.js");
const tranferModel = require("../models/transferHistory.model.js");
const AssetRequestModel = require("../models/assetRequest.model.js");
// const { route } = require('./users.route');
const {LocalStorage} = require("node-localstorage");

var localStorage = new LocalStorage('./scratch'); 

let user = localStorage.getItem("user");
user = JSON.parse(user);

// view routes
router.post('/', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
  console.log(req.body.id);
    assetModel.findById(req.body.id,(err, data2) => {
        // console.log(data2);
        if (err) {
            resp.render("CreateAssetRequest", { message: "Failed to load Assets", status: 500,Users:[], user  });
        }

        else {
            userModel.getAllUsers((err, data3) => {
                if (err) {
                    console.log(err);
                } else {
                    resp.render("CreateAssetRequest", { Assets:data2, Users:data3, user });
                }
            })
        }
    })
 
});

router.get('/AllAssetsRequest', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    AssetRequestModel.getAllassetRequest((err, data) => {
       
        if (err) {
            resp.render("AllAssetRequest", { message: "Failed to load Assets", status: 500,user });
        }
        else {
            assetModel.getAllasset((err, data2) => {
                // console.log(data2);
                if (err) {
                    resp.render("AllAssetRequest", { message: "Failed to load Assets", status: 500,user });
                }

                else {
                    resp.render("AllAssetRequest", { Assets: data2, Requests: data,message: req.session.message, status: 200,user   });
                    req.session.destroy();

                    
                }
            })
            
        }
      
    })
});
router.post('/updateRequest', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    // console.log(req.body);
    
   AssetRequestModel.updateassetRequestById(req.body.id, new AssetRequestModel(req.body), (err, data) => {
        if (err) {
            console.log(err);
        } else {
req.session.message = "Request  Updated";
            
            return resp.redirect('/asset/AllAssets')
        }
     })
});

router.post("/create", (req, resp) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(Number(req.body.AssetQuantity) , Number(req.body.quantity), "gratestttttttttttttttttt");
    if (Number(req.body.AssetQuantity) > Number(req.body.quantity) ) {
        AssetRequestModel.create(new AssetRequestModel(req.body), (err, data) => {
            if (err) {
                resp.render("CreateAssetRequest", { message: "error in creating requests", status: 200 ,user});
                
            }
            else {
                req.session.message = "Request  Created";
                            
                return resp.redirect('/asset/AllAssets');
             }
        })
    } else {
        req.session.message = "The requested Asset Quantity is unavailable for now!!"; 
        return resp.redirect('/asset/AllAssets');
        
    }
   
});

router.post("/find", (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
   
    AssetRequestModel.findById(req.body.id, (err, data) => {
        if (err) {
            resp.render("UpdateAssetRequestForm", { message: "error in getting requests", status: 200,user });
        }
        else resp.render("UpdateAssetRequestForm", { Request:data,user  });
    })
});


// assetRequest
// delete assetRequest
router.post('/delete', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
   
    AssetRequestModel.deleteById(req.body.id,  (err, data) => {
        if (err) {
            console.log(err);
        } else {
            req.session.message = "Request  Deleted";
            
            return resp.redirect('/assetRequest/AllAssetsRequest')
        }
     })
});

module.exports = router;
