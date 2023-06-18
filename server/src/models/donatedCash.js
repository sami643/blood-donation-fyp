const mongoose = require("mongoose");
const DonatedCashSchema = new mongoose.Schema({
    
    Account: {
             type: String
    },
         
            
           Amount: {
             type: String
    },
           
   

    method: {
        type: String
    }



})



const donatedCash = new mongoose.model( "cashManagement", DonatedCashSchema)
module.exports = donatedCash;