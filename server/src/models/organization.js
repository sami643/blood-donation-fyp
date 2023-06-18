const mongoose = require ("mongoose");
const organizationSchema = new mongoose.Schema ({


    OrgName : {
        type: String,
        required : true
    }, 

    Email : {
        type: String,
        required : true
    }, 


    Contact : {
        type: Number,
        required : true
    }, 


    City : {
        type: String,
        required : true
    }, 



    Area : {
        type: String,
        required : true
    }, 

    Password : {
        type: String,
        required : true
    }, 


    ConfirmPassword : {
        type: String,
      
    }, 


    Role : {
        type: String,
        required : true,
        default: "organization"
    }, 

})

const organization = new mongoose.model ("organization", organizationSchema);
module.exports = organization;

