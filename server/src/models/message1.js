const mongoose = require("mongoose");
const message1Schema = new mongoose.Schema({
    
  
    SenderId: {
        type: String,
    },
    
    ConversationId: {
        type: String,
    },
  
    Text: {
        type: String,
    },
     
},

    { timestamps: true }
)



const message1 = new mongoose.model( "message1", message1Schema)
module.exports = message1;