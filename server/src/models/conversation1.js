const mongoose = require("mongoose");
const conversation1Schema = new mongoose.Schema({
    
  Member: {
            type:Array
  },

UserName: {
  type : Array
}

},
  
  { timestamps: true }
)

const conversation1 = new mongoose.model( "conversation1", conversation1Schema)

module.exports = conversation1;