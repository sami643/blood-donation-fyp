const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const organizations = require("../models/organization");
const requests = require("../models/request");




// Organization SignUp
exports.OrgSingUp = (req, res, next) => {
    console.log("organozation signup is called");
 
    const {orgName, email, contact, city, area, password, confirmPassword, Role, ReqType} = req.body;

    // const check = organizations.findOne({Email: email})
    // if(check){
    //    res.status(400).json({message: "User already existed please try another email address"});
    // }

    const org = new requests({
        OrgName: orgName,
        Email: email,
        Contact: contact,
        City: city,
        Area: area,
        Password: password,
      Role,
      ReqType
   });

   org.save()
.then(result => {
  res.status(201).json({message: "Orgazniation Registeration Request Sent to Admin", Organization: result});
}).catch(err => {
console.log(err);
}) 
};

