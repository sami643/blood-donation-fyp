const mongoose = require ("mongoose");
const { required } = require("nodemon/lib/config");
const RecipentRecSchema = new mongoose.Schema ({

    FullName : {
        type: String,
        required : true
   
    },
   
    Email_1 : {
       type: String,
      required : true,
    //   unique: true,
     
   },

 Contact_1 : {
   type: String,
  required : true,
   //   unique : true

   },


    City : {
    type: String,
    required : true
    },

    Area : {
    type: String,
    required : true,
    },

    BloodGroup: {
    type: String,
    required : true,
    },

    RequiredBloodQ : {
    type: String,
    required : true,
    },


    PatientAge : {
    type: String,
  
    },

    PatientGender : {
    type: String,

    },

    PatientDisease : {
    type: String,
  
    },

    Status : {
        type: String,
        default: "Active"
    },

        Justifying: {
        type: String,
        default:"Unjustified"
    }
})


const RecipentRec = new mongoose.model("RecipentRec", RecipentRecSchema);
    module.exports = RecipentRec;