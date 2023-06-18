const mongoose = require ("mongoose");
const donorRecSchema = new mongoose.Schema ({

    FullName : {
        type: String,
        required : true
   
    },
   
    Email : {
       type: String,
       required : true,
   },

   Contact : {
    type: String,
    required : true,
    },

    Gender : {
        type: String,
        required : true,
        },

    City : {
    type: String,
    required : true,
    },

    Area : {
    type: String,
    required : true,
    },

    BloodGroup : {
    type: String,
    required : true,
    },

    BloodQuantity : {
    type: String,
    required : true,
    },


    MedicalHistory : {
    type: String,
    required : true,
    },

    PickAndDrop : {
    type: String,
    required : true,
    },

    Status: {
        type: String,
        default:'Active'
    }
,
    
    Justifying: {
        type: String,
        default:"Unjustified"
    }

})

const DonorRec = new mongoose.model("DonorRec", donorRecSchema);
    module.exports = DonorRec;