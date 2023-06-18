const res = require("express/lib/response");
const conversation1 = require("../models/conversation1");
const conversation1s = require("../models/conversation1");



exports.NewCovnversation =(req, res) =>{
// This is check is used to avoid the duplicate conversation creation
    const { senderId, receiverId, senderName, receiverName } = req.body
    console.log(senderId, receiverId,"heeloo")
    conversation1s.find().then(result => {
        const outerLength = result.length;
        for (let i = 0; i < outerLength; i++) {
            if (result[i].Member[0] === senderId && result[i].Member[1] === receiverId) {
                console.log("inner if")
                return res.status(201).json({ message: "connection already exist!" })
            }
         }
         console.log("outer");
        const conversation1 = new conversation1s({
            Member: [senderId, receiverId],
            UserName: [senderName, receiverName]
        })
        conversation1.save().then(result => {
            return res.status(201).json({ message: 'new conversation start', newConversation: result })
        }).catch(err => {
            res.status(500).json({ message: "error occured", err });
        })
    }  
     ) 
}





exports.getConversation = (req, res) => {
    console.log("getting con is called");
    const {senderId} = req.body
    conversation1s.find({Member: {$in:[senderId]}}).then(result=>{
        return res.status(201).json({ message: 'conversation got', wantedConveration: result });
    })
}




// ReciverName
exports.getConversation = (req, res) => {
    console.log("getting con is called");
    const {senderId} = req.body


    conversation1s.find({ Member: { $in: [senderId] } }).then(result => {
    //   console.log("reciverN name", result);
        return res.status(201).json({ message: 'conversation got', wantedConveration: result });
    })
}



