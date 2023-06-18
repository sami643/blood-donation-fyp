const res = require("express/lib/response");
const message1 = require("../models/message1");





// posting messages
exports.postMessages = (req, res) => {

    const {conversationId, senderId, text} = req.body
    console.log("Message part is called");

    const newMessage = new message1({
        Text: text,
        ConversationId: conversationId,
        SenderId: senderId
    })


    newMessage.save().then(result => {

        // console.log("restfasdsd:", result)
        
        return res.status(201).json({message:"text Sent!",      Message: result})
    }).catch(err =>{
        console.log("error occured", err)

    })
}


exports.getMessages = (req, res) => {

    const { senderId, conversationId, text } = req.body

    message1.find({ ConversationId: conversationId }).then(result =>
      { 
      return res.status(201).json({message:"All The message for specific Conversation!", Message: result})
        })
        
    
        
  
}   