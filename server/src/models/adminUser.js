const mongoose = require ("mongoose");
const adminSchema = new mongoose.Schema ({


    fullName : {
        type: String,
        required : true
    },

    Email : {
        type: String,
        required : true, 
        unique : true
    },

    Password : {
        type: String,
        required : true
    },

 

    Role : {
        type: String,
        required : true
    }, 

})

const Admin = new mongoose.model ("Admin", adminSchema);
module.exports = Admin;