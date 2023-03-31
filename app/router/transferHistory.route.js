const router = require('express').Router();

const userModel = require('../models/users.model');
const assetModel = require('../models/asset.model.js');
const categoryModel = require("../models/categories.model.js");
const tranferModel = require("../models/transferHistory.model.js");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const {LocalStorage} = require("node-localstorage");
const assetRequest = require('../models/assetRequest.model');

var localStorage = new LocalStorage('./scratch'); 

let user = localStorage.getItem("user");
user = JSON.parse(user);


// view routes
router.get('/form', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
  
    assetModel.getAllasset((err, data) => {
        if (err) {
            resp.render("TransferHistoryForm", { message: "Failed to create a transfer", status: 500 , Assets: [],Users:[], user});
        }
        else {
            userModel.getAllUsers((err, data2) => { 
                if (err) {
                    console.log("error ", err);
                } else {
                    
                    resp.render("TransferHistoryForm", { Assets: data, Users: data2, user:user, message:req.session.message  });
                    req.session.message = undefined;
                }

            })
        }
    })
   
});

router.get('/AllTransfers', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    tranferModel.getAlltransferhistory((err, data) => {
        if (err) {
            resp.render("AllTransfers", { message: "Failed to load Assets", status: 500, user });
        }
        else {
           assetModel.getAllasset((err, data2) => {
                // console.log(data2);
                if (err) {
                    resp.render("AllTransfers", { message: "Failed to load data", status: 500, user });
                }

                else {
                    if (err) {
                        console.log(err);
                    } else {
                        userModel.getAllUsers((err, users) => {
                            if (err) {
                               console.log(err);
                            } else {
                                
                                resp.render("AllTransfers", { message: req.session.message, status: 200, Transfers:data, Assets:data2, Users:users, user });
                                req.session.message = undefined;
                            }
                        })
                    }
                }
            })
            
        }
      
    })
});

// generate pdf report
router.get("/generateReport", (req, res) => {
    let dateNow = new Date().toLocaleDateString();
    tranferModel.getAlltransferhistory((err, data) => {
        if (err) {
            console.log(err);
         }
         else {
            assetModel.getAllasset((err, data2) => {
                 // console.log(data2);
                 if (err) {
                    console.log(err);
                 }
 
                 else {
                     if (err) {
                         console.log(err);
                     } else {
                         userModel.getAllUsers((err, users) => {
                             if (err) {
                                console.log(err);
                             } else {
    
                                 ejs.renderFile(path.join(__dirname, '../../views/', "Transfer-template.ejs"), {Transfers: data, Assets: data2, Users: users, dateNow }, (err, data) => {
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
                                         pdf.create(data, options).toFile(`AllTransfers-Report${dateNow}.pdf`, function (err, data) {
                                             if (err) {
                                                 res.send(err);
                                             } else {
                                                req.session.message = "Report Generated successfully!!";
                                                 
                                                 res.redirect("/assetRequest/AllAssetsRequest")
                                             }
                                         });
                                     }
                                 });
                             }
                         })
                     }
                 }
             })
             
         }
  })

})

// create a transfer
router.post("/newTransfer", (req, resp) => {
  
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (req.body.requestStatus !== "Approved") {
        assetModel.findById(req.body.assetId, (err, data) => {
            if (err) {
                console.log(err);
                
            } else {
                let newFrequency = Number(data.issueFrequency) + Number(req.body.quantity);
                let newQuantity = Number(data.quantity) - Number(req.body.quantity);
                
                if (newQuantity > 0) {
                    assetModel.updateassetIssueFreqeuncy(req.body.assetId, { issueFrequency: newFrequency, quantity: newQuantity.toString() }, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    
                } else {
                    req.session.message = "Insufficient asset remaining (" + data.quantity +") to complete the transfer! ";
                    return resp.redirect("/assetRequest/AllAssetsRequest");
                    
                }
            }
        });
        tranferModel.create(new tranferModel(req.body), (err, data) => {
            if (err) {
                resp.render("TransferHistoryForm", { message: "Failed to create a transfer"+err, status: 500 , Assets: [],Users:[],user});
            console.log(err);
            }
            else {
                if (req.body.requestId  ) {
                    assetRequest.updateassetRequestStatusById(req.body.requestId, new assetRequest({ requestStatus: 'Approved' }), (err, data) => {
                        
                    })
                    
                }
            req.session.message = "Transfer made successfully!!";
            resp.redirect("/assetRequest/AllAssetsRequest");
    
               
                
            }
        })
        
    } else {
        req.session.message = "Request is AlReady Approved!!";

          return resp.redirect("/assetRequest/AllAssetsRequest");
    }
});

// delete transfer
router.post('/deleteTransfer', (req, resp) => {
    let user = localStorage.getItem("user");
user = JSON.parse(user);
    // console.log(req.body);
    tranferModel.deleteById(req.body.id,  (err, data) => {
        if (err) {
            console.log(err);
        } else {
req.session.message = "Transfer deleted";
            
            return resp.redirect('/transfer/AllTransfers' )
        }
     })
});
module.exports = router;
