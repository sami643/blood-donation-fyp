const mongoose = require ("mongoose")
const feedbackSchema = new mongoose.Schema({

    userName : {
        type: String,
        required: true
    
   
    },

    Feedback : {
        type: String,
        required: true
   
    },
})


const feedbacks = new mongoose.model("feedbacks", feedbackSchema)
module.exports = feedbacks;