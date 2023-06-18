const express = require("express");
const res = require("express/lib/response");
const requests = require("../models/request");
const users = require("../models/users");
const Organizations = require("../models/organization");
const camps = require("../models/camping")
const admins = require('../models/adminUser')





// posting camping new request
exports.ReqPosting = (req, res) => {
   console.log("request router is called");
   const { date1, title, venue, date, time, organizers, reqType, orgId, arrangedBy } = req.body;
   

  
   const Req = new requests({
      Date: date1,
      Body: { title, venue, time, date, organizers, },
      OrgId:orgId,
      ReqType: reqType,
     ArrangedBy: arrangedBy,
      
   });
   Req.save()
   .then(result => {
      res.status(201).json({message: "Success", Request: result});
   })

}


   // Fetiching the camp requests
exports.getcampReq= async(req, res, next) =>{
 
const   campReq = await requests.find({ ReqType: 'campingReq' }).then(result=>{
       // console.log(result);
        res.status(201).json({message: "Success-1", camps: result});
}) 
};



   // Fetiching the adminSingUp requests
exports.adminSignUpReq= async(req, res, next) =>{
 
const   campReq = await requests.find({ ReqType: 'adminSignUp' }).then(result=>{
       // console.log(result);
        res.status(201).json({message: "Success", adminSingUpReq: result});
})
};
// ********************ENd of admin portion**************************


// Getting all Requests
exports.getReq = (req, res) =>
{
    console.log(" getting request is called");
    requests.find().then(result=>{
        res.status(201).json({message: "All Requests", Requests: result})
    })
}




// Fetching admin sign up request
exports.getAdminReq= async (req, res, next) =>{
 
const campReq = await requests.findOne({ ReqType:'AdminReq' }).then(result=>{
       // console.log(result);
        res.status(201).json({message: "Success-2", camps: result});
})
};


// Fetching org sign up request
exports.getOrgReq = async (req, res, next) => {
   

 
const campReq = await requests.find({ ReqType: 'OrgReq' }).then(result=>{
       // console.log(result);
       return res.status(201).json({message: "Success-3", OrgRequest: result});
})
};


// Deleting Request
 exports.deletingReq = (req, res)=>{
    console.log("deleting request is called");

     // Recieving the Id from postmon and save that in id
    const id = req.body.id;
    
   // compare with database Id
   requests.findOne({_id: id}).then(Request1=>{
      if(!Request1){
        return err;
      }
   return Request1.deleteOne()
   }).then( result => {
      res.status(201).json({message: "The Request has been deleted saccesfully"});
   }).catch(
         err=> { console.log(err);
         })
};
   




// Admin request approval
exports.ReqApproval = (req , res ) => {

   console.log("admin request is called ");

   // Destructuring the Object from fornt Body
   const { id, reqType } = req.body;

   // Finding that specific User and store its data into variables
   const adminrec = requests.findOne({ _id: id }).then(result => {
      const fullName1 = result.FullName;
      const email1 = result.Email;
      const password1 = result.Password;
      const role1 = result.Role;

      // Store New variables data into model variables
      const Requ = new admins({
         fullName: fullName1,
         Email: email1,
         Password: password1,
         Role: role1,
      });

      // Save the variable in user table
      Requ.save()
         .then(result => {

            // find that user in requests  table
            requests.findOne({ _id: id }).then(admin => {
               if (!admin) {
                  return err;
               }
               

            // Delete that user in request table.
               return admin.deleteOne()
            }).then(result => {
               res.status(201).json({ message: "Admin is Approved" });
            }).catch(err => {
               console.log(err);
            });
         })
      
   })
}
// ***************************************************************************** The End*******************************************



// ************************************************************Organization approval Request approval*******************
// Oraganization request approval
exports.OrgReqApproval = (req , res ) => {

   console.log("Organization sign Up request is called ");

   // Destructuring the Object from fornt Body
   const { id } = req.body;

   // Finding that specific Organization and store its data into variables
   const Orgrec = requests.findOne({ _id: id }).then(result => {
      const orgName2 = result.OrgName;
      const email2 = result.Email;
      const contact2 = result.Contact;
      const password2 = result.Password;
      const role2 = result.Role;
      const city2 = result.City;
      const area2 = result.Area

      // Store New variables data into model variables
      const Req = new Organizations({
         OrgName: orgName2,
         Email: email2,
         Contact: contact2,
         City: city2,
         Area: area2,
         Password: password2,
         Role: role2,

      });

      // Save the variable in user table
      Req.save()
         .then(result => {

            // find that Org in requests  table
            requests.findOne({ _id: id }).then(Org => {
               if (!Org) {
                  return err;
               }
               
            // Delete that Org record from request table.
               return Org.deleteOne()
            }).then(result => {
               res.status(201).json({ message: " Your sign Up request is Approved" });
            }).catch(err => {
               console.log(err);
            });
         })
      
   })
}
// ***************************************************************************** The End*******************************************


// ************************************************************ Camping Request approval*******************
// Camping request approval
exports.CampReqApproval = (req , res ) => {

   console.log("Camping request is called ");

 
   const { id } = req.body;
   const camprec = requests.findOne({ _id: id }).then(result => {
      const title3 = result.Body.title;
      const venue3 = result.Body.venue;
      const date3 = result.Body.date;
      const time3 = result.Body.time;
      const organizers3 = result.Body.organizers;
      const orgId = result.OrgId;
     

   
      // Store New variables data into model variables
      const Request = new camps({
         Title: title3,
         Vanue: venue3,
         Date: date3,
         Time: time3,
         Organizers: organizers3,
         OrgId: orgId
      });

      // Save the variable in camping table table
      Request.save()
         .then(result => {

            // find that Camp in requests  table
            requests.findOne({ _id: id }).then(Camp => {
               if (!Camp) {
                  return err;


               }
            // Delete that Org record from request table.
               return Camp.deleteOne()
            }).then(result => {
               res.status(201).json({ message: " Your Camp request is Approved" });
            }).catch(err => {
               console.log(err);
            });
         })
      
   })
}
// ***************************************************************************** The End*******************************************



// *****************************Super Admins  RequestsDecline button****************************************************************
// Admin request decline button

// *****************Note***** IF we could use Id for  decline button so we can use one API for all the three.
exports.requestDeclineB = (req, res) => {
   console.log("Requests decline button is called");

   const Id = req.body.id
   requests.findOne({ _id: Id }).then(request => {
      const reqType = request.ReqType

      if (reqType === 'adminSignUp') {
         res.status(201).json({ message: " admin Sign up request declined" });
      }
      if (reqType === 'OrgReq') {
         res.status(201).json({ message: " organization Sign up request declined" });
      }
      if (reqType === 'campingReq') {
         res.status(201).json({ message: " camping request declined" });
      }
      return request.deleteOne()
   }).catch(err => {
      console.log(err);
   });
}





      
 
     


















