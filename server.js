const express = require("express");

const cors = require("cors");
const usersRoute = require("./app/router/users.route.js");
const assetRoute = require("./app/router/Asset.Route.js");
const tranferHistoryRoute = require("./app/router/transferHistory.route.js");
const categoriesRoute = require("./app/router/category.Route.js");
const departmentRoute = require("./app/router/departments.route.js");
const assetRequestRoute = require("./app/router/assetRequest.route.js");

const path = require('path');
const oneDay = 1000 * 60 * 60 * 24;
const sessions = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieParser());
app.use(sessions({
  name:'user',
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { 
    secure: false, 
    maxAge: oneDay 
  },
  rolling:true,
  maxAge: 20000000,
  resave: true 
}));
// app.use(express.json()); 


app.use(express.urlencoded({ extended: false })); 
app.set('view engine', 'ejs');

app.use('/',usersRoute);
app.use('/transfer', tranferHistoryRoute);
app.use('/categories', categoriesRoute);
app.use('/department', departmentRoute);

app.use('/asset', assetRoute);
app.use('/assetRequest', assetRequestRoute);



    
// set port, listen for requests
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});