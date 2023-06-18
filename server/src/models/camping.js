const mongoose = require ("mongoose");
const campRecSchema = new mongoose.Schema ({


  Title : {
        type: String,
        required : true
    },

    Vanue : {
        type: String,
        required : true
    },

    Date : {
        type: String,
        required : true
    },

    Time : {
        type: String,
        required : true
    },

    Organizers : {
        type: String,
        required : true
    }, 
       OrgId : {
        type: String,
       
    },
    ArrangedBy: {
        type:String
    },

})

const Camp = new mongoose.model ("Camp", campRecSchema);
module.exports = Camp;


