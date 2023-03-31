const router = require('express').Router();

const userModel = require('../models/users.model');
const assetModel = require('../models/asset.model.js');
const categoryModel = require("../models/categories.model.js");
const tranferModel = require("../models/transferHistory.model.js");
const { route } = require('./users.route');
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const { LocalStorage } = require("node-localstorage");

var localStorage = new LocalStorage('./scratch'); 

let user = localStorage.getItem("user");
user = JSON.parse(user);

// view routes
router.get('/createAsset', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    categoryModel.getAllcategories((err, data) => {
        if (err) {
            resp.render('createAsset', {message: "error in fetching categories", status:400,user});
        } else {
            resp.render('createAsset', {categories: data, user});
        }
    })
});
router.post("/CreateAsset", (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    assetModel.create(new assetModel(req.body), (err, data) => {
        if (err) {
            resp.render("CreateAsset", { message: "Failed to create An Asset", status: 500 , categories: [],user});
        }
        else {
            req.session.message = "Asset Created";
            
            return resp.redirect('/asset/AllAssets')
        }
    })
});
router.post("/updateAssetForm", (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    // assetModel.updateassetById(req.body.id, new assetModel(req.body) , (err, data) => {
    assetModel.findById(req.body.id, (err,data)=>{
        if (err) {
            resp.render("UpdateAsset", { message: "Failed to get An Asset", status: 500 , Asset: [], user});
        }
        else {
            categoryModel.getAllcategories((err, data2) => {
                if (err) {
                   console.log("data", err);
                } else {
                    resp.render("UpdateAsset", { Asset: data, categories:data2,user });
                }
            })
        }
            
    })
});

router.get('/AllAssets', async (req, resp) => {
   
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
 
   await assetModel.getAllasset((err, data) => {
        let totalValue = data.reduce((prev, items) => {
            return Number(prev) + Number(items.cost);
        },0)
        if (err) {
            resp.render("AllAssets", { message: "Failed to load Assets", status: 500,user });
        }
        else {
            categoryModel.getAllcategories((err, data2) => {
                // console.log(data2);
                if (err) {
                    resp.render("AllAssets", { message: "Failed to load categories", status: 500,user });
                }

                else {
                    
                    resp.render("AllAssets", { message: req.session.message, status: 200, Assets: data, categories: data2, totalValue, user: user });
                   req.session.destroy()

                    
                }
                
            })
            
        }
      
    })
});
router.post('/updateAsset', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    // console.log(req.body);
    assetModel.updateassetById(req.body.id, new assetModel(req.body), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            req.session.message = "Asset Updated";
            return resp.redirect('/asset/AllAssets')
        }
     })
});

// search asset
router.post('/searchAsset', (req, resp) => {
   
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
  
    assetModel.searchByName(req.body.name, (err, data) => {
        let totalValue = data.reduce((prev, items) => {
            return Number(prev) + Number(items.cost);
        },0)
        if (err) {
            console.log(err);
        } else {
            categoryModel.getAllcategories((err, data2) => {
                // console.log(data2);
                if (err) {
                    resp.render("AllAssets", { message: "Failed to load categories", status: 500,user });
                }

                else  resp.render("AllAssets", { message: "Assset created", status: 200, Assets:data, categories:data2,totalValue,user });
            })
        }
    });
})

// generate pdf report
router.get("/generateReport", (req, res) => {
    let dateNow = new Date().toDateString();

  
    assetModel.getAllasset((err, dat) => {
        if (err) {
            console.log(err);
        } else {

            let totalValue = dat.reduce((prev, items) => {
                return Number(prev) + Number(items.cost);
            }, 0)
            ejs.renderFile(path.join(__dirname, '../../views/', "Asset-template.ejs"), { Assets: dat, totalValue: totalValue, dateNow }, (err, data) => {
                if (err) {
                    res.send(`erro ni noma ${err}`);
                } else {
                    let options = {
                        "height": "11.25in",
                        "width": "8.5in",
                        "header": {
                            "height": "20mm"
                        },
                        "footer": {
                            "height": "20mm",
                        },
                    };
                    pdf.create(data, options).toFile(`AssetReport${dateNow}.pdf`, function (err, data) {
                        if (err) {
                            res.send(err);
                        } else {
                            req.session.message = "Report Generated";
                            return res.redirect('/asset/AllAssets')

                            
                        }
                    });
                }
            });
            
        }
    })
});

// delete asset
router.post('/deleteAsset', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
   
    assetModel.deleteById(req.body.id,  (err, data) => {
        if (err) {
            console.log(err);
        } else {
            req.session.message = "Asset Deleted";
            
            return resp.redirect('/asset/AllAssets')
        }
     })
});



module.exports = router;
