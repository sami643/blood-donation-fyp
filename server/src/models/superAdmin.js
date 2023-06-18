const mongoose = require ("mongoose");
const superAdminSchema = new mongoose.Schema ({


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

const superAdmin = new mongoose.model ("superadmin", superAdminSchema);
module.exports = superAdmin             