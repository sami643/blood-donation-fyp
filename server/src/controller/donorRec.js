const req = require("express/lib/request");
const { status } = require("express/lib/response");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const donorRec = require("../models/donorRec");
const RecipentRec = require('../models/recipentsRec');

// Creating New donor Record
exports.newDonorRec = async (req, res) => {
    console.log("DonorRecord is called ");
    const {Name, email, contact, gender,city,
      area, bloodGroup, bloodQuantity, medicalHistory, pickAndDrop, status1 } = req.body;
   
   
          // Checking the Users Email whether its exist or not.
     const check =await donorRec.findOne({Email: email})
   if (check) {
      return res.status(201).json({ message: "You have one donation post! Only one donation post at a time is possible" });
   }
    const newDonor = new donorRec({
        FullName: Name,
        Email: email,
        Contact: contact,
        Gender: gender,
        City: city,
        Area: area,
        BloodGroup : bloodGroup,
        BloodQuantity : bloodQuantity,
        MedicalHistory : medicalHistory,
        PickAndDrop : pickAndDrop,
       Status: status1,
  
        
   });

// SAVEING NEW donor TO DATABASE
   newDonor.save()
   .then(result => {
      res.status(201).json({message: "Donation post created", newDonor: result});
   }).catch(err => {
    console.log(err);
   })  
}


// UPDATING DONATION RECORD
exports.updateDonorRec = (req, res, next) => 
{
      
         const contact1 = req.body.contact;
         const gender1 = req.body.gender;
         const city1 = req.body.city;
         const area1 = req.body.area;
         const bloodGroup1 = req.body.bloodgroup;
         const bloodQuantity1 = req.body.bloodQuantity;
         const medicalHistory1 = req.body.medicalHistory;
         const pickAndDrop1 = req.body.pickdrop;
   const id1 = req.body.Id
   const status1 = req.body.status
      
         donorRec.findOne({_id: id1}).then(donor1=>{
            if (!donor1) {
             return
             }
            donor1.Contact = contact1;
            donor1.Gender = gender1;
            donor1.City = city1;
            donor1.Area = area1;
            donor1.BloodGroup = bloodGroup1;
            donor1.BloodQuantity = bloodQuantity1;
            donor1.MedicalHistory = medicalHistory1;
            donor1.PickAndDrop = pickAndDrop1;
            donor1.Status = status1
   
            donor1.save()
   }).then(result1 => {
     
  res.status(201).json({message:"Record Successfully Updated", donor : result1})
   }).catch(err=>{
      console.log(err);
   });
}


// Fetching the New donor  UnJustified
exports.getDonorRec = (req, res, next) => {
   // console.log("get donor route is called");
   donorRec.find({ Justifying:'Unjustified'}).then(result=>{
       res.status(201).json({message: "Donors Record", donors: result});
   })
} 


// Fetching the Donors for users
exports.getSpecificDonorRec =(req, res, next) => {
   const {Id} = req.body
    console.log("get donor route is called");
    donorRec.findOne({ Email:Id}).then(result=>{
       res.status(201).json({message: "Donor Record", donor: result});
   })
} 

//  Deleting donors Record
exports.deleteDonorRec = (req, res, next) => {
   console.log("Deleting the donor record is called");
   const id = req.body.id;
   // compare with database Id
   donorRec.findOne({_id: id}).then(donor1=>{
   
   return donor1.deleteOne()
   }).then( result => {
      res.status(201).json({message: "The donor has been deleted saccesfully"});
   }).catch((err)=> { console.log("Error occured", err);
         })
   };





   //  Getting active recipents records
exports.activeDonorsappearInSearchOption = (req, res, next) => {
   console.log("active recipent record is called");
   const { status } = req.body;
   donorRec.find({ Status: "Active" }).then(activeRecipents => {
     const UniqueCities = uniqueCity(activeRecipents, true);
      const uniqueAreas = uniqueCity(activeRecipents, false);
       console.log(UniqueCities);
       console.log(uniqueAreas);
     
     // console.log(UniqueCities);
      res.status(201).json({ message: "Active donors list", activeRecipents: activeRecipents, uniqueRegion: UniqueCities, UniqueArea: uniqueAreas });
   })


}

// It is used to display only unique cities and areas in the search option.
function uniqueCity(duplicateCity, k ) {
   var check = k;
   const length = duplicateCity.length;
   var final = [{
      
   }];
    var test = true;
   var counter = 0;
   const tempArray = [];
   for (let k = 0; k < length; k++) {
      if (check) {
         tempArray[k] = duplicateCity[k].City;
         final[counter] = tempArray[0];
      }
      else {
         tempArray[k] = duplicateCity[k].Area;
         final[counter] = tempArray[0];
      }
   }
  
   
     

   for (let i = 1; i < length; i++) {
      for (let j = 0; j < final.length; j++) {
         if (tempArray[i] === final[j]) {
            test = false;
            break;
         }
      }
      if (test) {
         counter++;
         final[counter] = tempArray[i];
      }
      test = true;

     
   }
 
   return final;
}












   // Recipent calling this for search button.
exports.searchResultforRecipents = (req, res, next) => {

   const { status, city, bloodGroup, area } = req.body;

   console.log("frontend data:", req.body)

   // 000
   if (bloodGroup === 'default' && city === 'default' && area === 'default') {
         console.log("active donors is called//");
         donorRec.find({ Status: status }).then(activedonors => {
            return res.status(201).json({ message: "Active Recipents lists...", ActiveRecipetnts: activedonors })
         })  
   }
   // 001
          else if (bloodGroup== 'default' && city == 'default' ) {
         console.log("active donors is called");
         donorRec.find({ Status: status, Area:area }).then(activedonors => {
            return res.status(201).json({ message: "Active Recipents lists", ActiveRecipetnts: activedonors })
         })     
   }
   // 010
      else if (bloodGroup== 'default' && area == 'default' ) {
         console.log("active donors is called");
         donorRec.find({ Status: status, City:city }).then(activedonors => {
            return res.status(201).json({ message: "Active Recipents lists", ActiveRecipetnts: activedonors })
         })     
   }
         // 011
         else if (bloodGroup== 'default') {
              console.log("active donors is called");
              donorRec.find({Status:status, Area: area, City: city}).then(activedonors => {
                 return res.status(201).json({ message: "Active Recipents lists", ActiveRecipetnts: activedonors })
              })
   }
      
   
         // 100 
         else if (area=== 'default' && city =='default') {
              console.log("active donors is called");
      donorRec.find({ Status: status, BloodGroup: bloodGroup}).then(activedonors => {
                 return res.status(201).json({ message: "Active Recipents lists", ActiveRecipetnts: activedonors })
              })
   }
         // 101 
         else if (city ==='default') {
              console.log("active donors is called");
      donorRec.find({ Status: status, BloodGroup: bloodGroup, Area:area}).then(activedonors => {
                 return res.status(201).json({ message: "Active Recipents lists", ActiveRecipetnts: activedonors })
              })
   }
                    // 110
         else if (area ==='default') {
              console.log("active donors is called");
      donorRec.find({ Status: status, BloodGroup: bloodGroup, City:city}).then(activedonors => {
                 return res.status(201).json({ message: "Active Recipents lists", ActiveRecipetnts: activedonors })
              })
   }  
      // 111
       else  {
              console.log("active donors is called");
              donorRec.find({Status: status,  Area: area,  City:city  , BloodGroup:bloodGroup}).then(activedonors => {
                 return res.status(201).json({ message: "Active Recipents lists", ActiveRecipetnts: activedonors })
              })
   }     
   
} 


//  THis is used for justification of the Donors
exports.justification = (req, res, next) => {
   const justify1 = req.body.justify;
   const id1 = req.body.id 
   donorRec.findOne({ _id: id1 }).then(donor1 => {
      if (!donor1) {
         return err;
      }
      donor1.Justifying = justify1;
      return donor1.save()
   }).then(result1 => {
      res.status(201).json({ message: "Donor Infomation Updated sucessfully", donor: result1 });
   }).catch(err => {
      console.log(err);
   });

}







exports.GettingActiveStatus = (req, res) => {
   const { id } = req.body
   donorRec.findOne({ Email: id }).then(result1 => {
     return res.send({ message: "Donors Record", activeStatus: result1 });
   }).catch(err => {
         console.log(err);
      });
}




