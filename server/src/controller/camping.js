
const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const camps = require("../models/camping");
const requests = require("../models/request")



// CREATING NEW CAMPS
exports.newCamp = (req, res, next) =>{
          console.log("New camp is called");

  const { title, venue, date, time, organizers, } = req.body;
    const camp = new camps({
        Title: title,
        Vanue: venue,
        Date: date,
        Time: time,
      Organizers: organizers
        
   });


// SAVEING NEW CAMPS TO DATABASE
   camp.save()
   .then(result => {
      res.status(201).json({message: "New camp created", camp: result});
   }).catch(err => {
    console.log(err);
   })  
}





//FETCHING DATA FROM DB AND DISPLAY THAT for Admin home Users and super admin.
exports.existingCamps= (req, res, next) =>{
    camps.find().then(result=>{
     
        res.status(201).json({message: "Data of the camps", campss: result});
})
};



// Approved Camp
exports.existingCampsOrg= (req, res, next) =>{
  console.log('hello this is Camping');
  const { orgId } = req.body
  console.log("THis is ID",orgId)

  camps.find({OrgId: orgId }).then(result=>{
       console.log("camps",result)
    res.status(201).json({ message: "Data of the camps", campss: result });  
  })
};





// UPDATING CAMPS INFO
exports.updateCamp =  (req , res)=> { 
    const camp_info = req.body.title;
    const venue = req.body.venue;
    const date = req.body.date;
    const time = req.body.time;
    const organizers = req.body.organizers;
    const id = req.body.Id

    camps.findOne({_id: id}).then(camp1=>{
        if(!camp1){
          return;
        }
        camp1.Title = camp_info;
        camp1.Vanue = venue;
        camp1.Date = date;
        camp1.Time = time;
        camp1.Organizers = organizers;
        return camp1.save()
      }).then(result=>{
        console.log(result);
        res.status(201).json({message:"Success", user: result});
      }).catch(err=>{
        console.log(err);
      })
}


exports.updateCampByOrg = (req, res) => {
  console.log("camp update is called");

  const title = req.body.title;
  const venue = req.body.venue;
  const date = req.body.date;
  const time = req.body.time;
  const organizers = req.body.organizers;
  const id = req.body.Id
  const orgId = req.body.orgId
  const reqType = req.body.reqType
  const arrangedBy= req.body.arrangedBy




         const Req = new requests({
      Body: { title, venue, time, date, organizers, },
      OrgId:orgId,
           ReqType: reqType,
           Status: "Updated By Orgranization",
           ArrangedBy:arrangedBy,
   });

  Req.save().then(result => {
          return res.status(201).json({message:"Success", UpadatedByOrg: result})
         })
  

  camps.findOne({ _id: id }).then(camp1 => {
    if (!camp1) {
      return;
    }
    return camp1.deleteOne()   
  }).then(Req1 => {
    console.log("camp deleted from camps table");
  }).catch(err => {
    console.log("Error Occured", err)
  }
  )
}
      
      
      
      
      




// UPDATING CAMPS INFO
exports.getSpecificCamp =  (req , res)=> { 
  const id = req.body.Id

    camps.findOne({_id: id}).then(camp1=>{
      }).then(camp1=>{
        res.status(201).json({message:" Getting Camp", Camp: camp1});
      }).catch(err=>{
        console.log(err);
      })
}





   // Fetiching the camp for editing 
exports.getSpecificCamp = async (req, res, next) => {
  const id = req.body.Id
 console.log("this is Camp",id)
const campRe = await camps.findOne({ _id:id }).then(result=>{
        res.status(201).json({message: "Success", Camp: result});
}) 
};




// DELETING EXISTING CAMP.
exports.deletCamp = (req , res)=>{
  // console.log("Delete camp is called");
  const id = req.body.id

  camps.findOne({_id: id}).then(camp1=>{
      if(!camp1){
        return err;
      }

      return camp1.deleteOne()
    }).then(result=>{
      console.log(result);
      res.status(201).json({message:" Camp has been deleted"});
    }).catch(err=>{
      console.log(err);
    });

}
    
   
  





 

