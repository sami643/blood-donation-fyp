const mongoose = require ("mongoose");
const requestSchema = new mongoose.Schema({


    Date: {
        type: Date,
       
    
    },

    Body: {
        
        type: Object,
       
    },

    ReqType: {
        type: String,
    },


    Email: {
        type: String,
       
    },

     
    FullName: {
        type: String,
        
    },


     
    Password: {
        type: String,
      
    },


     
    Role: {
        type: String,
       
    },

    OrgName: {
        type: String
    },

    Contact: {
        type: Number
    },
      
    City: {
        type: String
    },
        
    Area: {
        type: String
    },

    OrgName: {
        type: String
    },
        
    OrgId: {
        type:String
    },

    Status: {
           type: String,
    },
    
    ArrangedBy:{
        type: String
    },
          




    

})

const request = new mongoose.model ("request", requestSchema);
module.exports = request;