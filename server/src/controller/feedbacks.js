const res = require("express/lib/response");
const feedbacks = require("../models/feedbacks");
;


//  Storing feedbacks
exports.PostFeedbacks = (req, res) => {
    console.log("feedback is called");
    const {name, feedback} = req.body;




    const newFeedback = new feedbacks({
        userName: name,
        Feedback  : feedback
})



newFeedback.save()
.then(result => {
   res.status(201).json({message: "Feedback sent", feedback: result});
}).catch(err => {
 console.log(err);
}) 
}

// Getting feedbacks
exports.feedbacks= (req, res )=>{
    feedbacks.find().then(result=>{
        res.status(201).json({message:"Feedbacks", feedback: result});
    })
}