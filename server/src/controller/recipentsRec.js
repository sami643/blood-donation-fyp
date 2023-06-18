const res = require("express/lib/response");
const RecipentRec = require("../models/recipentsRec");
const User = require("../models/users");
const donorRec = require("../models/donorRec");
const translate = require('translate-google-api');


// creating new record of recipent.
exports.newrecipentRec = async (req, res) => {
   console.log("new recipent is called");

   const { Name, email, contact, city, area, bloodGroup, bloodQuantity, patientAge, patientGender, patientDisease, status1, Post } = req.body;


          // Checking the Users Email whether its exist or not.
     const check =await RecipentRec.findOne({Email_1: email})
   if (check) {
      return res.status(201).json({ message: "You already Have one donation Request post! " });
   }

   const newRecipent = new RecipentRec({
      FullName: Name,
      Email_1: email,
      Contact_1: contact,
      City: city,
      Area: area,
      BloodGroup: bloodGroup,
      RequiredBloodQ: bloodQuantity,
      PatientAge: patientAge,
      PatientGender : patientGender,
      PatientDisease: patientDisease,
      //   Status : status1
   })

    
   // SAVEING NEW recipent TO DATABASE
   newRecipent.save()
      .then(result => {
         res.status(201).json({ message: "New recipent record created", newRecipent: result });
      }).catch(err => {
         console.log(err);
      })
   // }).catch(err=>{
   //    console.log(err);
   //      })
   //  })

}

 
   // Getting recipents record
   exports.getrecipentRec = (req, res) => {
      // console.log("Get methoed has been called");

      RecipentRec.find({Justifying:'Unjustified'}).then(result => {

         res.status(201).json({ message: "Data of the camps", recipents: result });
      })
   }




        //getting record for editing by user itselft
   exports.getrecipentsRecordsFOrEditing= (req, res) => {
      // console.log("Get methoed has been called");

      const {Id} = req.body

      RecipentRec.findOne({Email_1:Id}).then(result => {

       return  res.status(201).json({ message: "Data of the camps", recipent: result });
      })
   }


      // Getting recipents record for aditing.   // Getting recipents record
   exports.getrecipentRecfordonorediting = (req, res) => {
      // console.log("Get methoed has been called");

      RecipentRec.find().then(result => {

         res.status(201).json({ message: "Data of the camps", recipents: result });
      })
   }

   exports.getrecipentRec = (req, res) => {
      // console.log("Get methoed has been called");

      RecipentRec.find({Justifying:'Unjustified'}).then(result => {

         res.status(201).json({ message: "Data of the camps", recipents: result });
      })
   }



   // Repients record updation.
   exports.updaterecipentRec = (req, res, next) => {
      console.log("recipent record updation API is called");
      const name2 = req.body.Name;
      const email2 = req.body.email;
      const contact2 = req.body.contact;
      const city2 = req.body.city;
      const area2 = req.body.area;
      const bloodGroup2 = req.body.bloodGroup;
      const requiredBloodQ2 = req.body.bloodQuantity;
      const patientAge2 = req.body.patientAge;
      const patientGender2 = req.body.patientGender;
      const patientDisease2 = req.body.patientDisease;
      const status2 = req.body.status;
      const id2 = req.body.Id
       const stutus2 = req.body.status

      RecipentRec.findOne({ _id: id2 }).then(recipent1 => {
         if (!recipent1) {
            return err;
         }
         recipent1.FullName = name2;
         recipent1.Email_1 = email2;
         recipent1.Contact_1 = contact2;
         recipent1.City = city2;
         recipent1.Area = area2;
         recipent1.BloodGroup = bloodGroup2;
         recipent1.RequiredBloodQ = requiredBloodQ2;
         recipent1.PatientAge = patientAge2;
         recipent1.PatientGender = patientGender2;
         recipent1.PatientDisease = patientDisease2;
         recipent1.Status = status2;
         recipent1._id = id2;


         return recipent1.save()
      }).then(result => {
         res.status(201).json({ message: "Record Successfully Updated", recipent: result });
      }).catch(err => {
         console.log(err);
      })

      
   }


   // Deleting Recipent Record
   exports.deleterecipentRec = (req, res, next) => {
      console.log("Deleting the recipent record is called");
     
   
      const id = req.body.id;
      // compare with database Id
      RecipentRec.findOne({ _id: id }).then(recipent1 => {
         if (!recipent1) {
            return err;
         }
         return recipent1.deleteOne()
      }).then(result => {
         res.status(201).json({ message: "The Recipent Record deleted saccesfully" });
      }).catch(
         err => {
            console.log(err);
         })
    
   }


   //  Getting active recipents records
   exports.activeRecipentRec = (req, res, next) => {
      console.log("active recipent record is called");
    const {status, area, city, bloodGroup} = req.body;
      console.log("active donors is called");
      RecipentRec.find({ Status: status, 
         BloodGroup: bloodGroup,
         City: city, Area: area
      }).then(activeRecipents => {
         res.status(201).json({ message: "Active donors list", activeRecipents: activeRecipents })
      })
}
   


   //  Getting active recipents records
exports.activeRecipentRecs = (req, res, next) => {
   console.log("active recipent record is called");
   const { status } = req.body;
   
   RecipentRec.find({ Status: "Active" }).then(activeRecipents => {
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



   


//  THis is used for justification of the Recipents
exports.justification = (req, res, next) => {
   const justify1 = req.body.justify;
   const id1 = req.body.id
   RecipentRec.findOne({ _id: id1 }).then(recipent1 => {
      if (!recipent1) {
         return err;
      }
      recipent1.Justifying = justify1;
      return recipent1.save()
   }).then(result1 => {
      res.status(201).json({ message: "Donor Infomation Updated sucessfully", recipent: result1 });
   }).catch(err => {
      console.log(err); 
   });

}
  

async function ps_translation(activeDonors) {
   let ps_donors = [];

   for (let i = 0; i < activeDonors.length; i++) {
      temp_name = 1
      temp_city = 2
      temp_gender = 3
      temp_disease = 4
      temp_area = 5

      temp_email = activeDonors[i].Email_1
      temp_contact = activeDonors[i].Contact_1
      temp_blood = activeDonors[i].BloodGroup
      temp_quantity = activeDonors[i].RequiredBloodQ
      temp_age = activeDonors[i].PatientAge

      // temp_name = await translate(activeDonors[i].FullName, {
      //    tld: "com",
      //    to: "ps"
      // });
      // temp_city = await translate(activeDonors[i].City, {
      //    tld: "com",
      //    to: "ps"
      // });
      // temp_gender = await translate(activeDonors[i].PatientGender, {
      //    tld: "com",
      //    to: "ps"
      // });
      // temp_disease = await translate(activeDonors[i].PatientDisease, {
      //    tld: "com",
      //    to: "ps"
      // });
      // temp_area = await translate(activeDonors[i].Area, {
      //    tld: "com",
      //    to: "ps"
      // });

      ps_donors.push({
         FullName: temp_name,
         City: temp_city,
         Area: temp_area,
         PatientGender: temp_gender,
         PatientDisease: temp_disease,
         BloodGroup: temp_blood,
         RequiredBloodQ: temp_quantity,
         PatientAge: temp_age,
         Email_1: temp_email,
         Contact_1: temp_contact
      })
   }

   return ps_donors;
}


async function de_translation(activeDonors) {
   let de_donors = [];

   for (let i = 0; i < activeDonors.length; i++) {
      temp_name = 1
      temp_city = 2
      temp_gender = 3
      temp_disease = 4
      temp_area = 5

      temp_email = activeDonors[i].Email_1
      temp_contact = activeDonors[i].Contact_1
      temp_blood = activeDonors[i].BloodGroup
      temp_quantity = activeDonors[i].RequiredBloodQ
      temp_age = activeDonors[i].PatientAge

      // temp_name = await translate(activeDonors[i].FullName, {
      //    tld: "com",
      //    to: "de"
      // });
      // temp_city = await translate(activeDonors[i].City, {
      //    tld: "com",
      //    to: "de"
      // });
      // temp_gender = await translate(activeDonors[i].PatientGender, {
      //    tld: "com",
      //    to: "de"
      // });
      // temp_disease = await translate(activeDonors[i].PatientDisease, {
      //    tld: "com",
      //    to: "de"
      // });
      // temp_area = await translate(activeDonors[i].Area, {
      //    tld: "com",
      //    to: "de"
      // });

      de_donors.push({
         FullName: temp_name,
         City: temp_city,
         Area: temp_area,
         PatientGender: temp_gender,
         PatientDisease: temp_disease,
         BloodGroup: temp_blood,
         RequiredBloodQ: temp_quantity,
         PatientAge: temp_age,
         Email_1: temp_email,
         Contact_1: temp_contact
      })
   }

   return de_donors;
}

// Donor calling this in search button
exports.donorSearchingForRecipents = (req, res, next) => {
   console.log("DOnor searching for recipents is called")


   const { status, city, bloodGroup, area } = req.body;

   console.log("frontend data:", req.body)

   // 000
   if (bloodGroup === 'default' && city === 'default' && area === 'default') {

      RecipentRec.find({ Status: status }).then(async activedonors => {
         const ps_donors = await ps_translation(activedonors);
         const de_donors = await de_translation(activedonors);
         return res.status(201).json({ message: "Recipents lists", activeDonors: activedonors, ps_donors: ps_donors, de_donors: de_donors })
      }), error => {
         cosnole.log(error);
         return res.status(201).json({
            message: "No results found",
         })
      }
   }
   // 001
   else if (bloodGroup == 'default' && city == 'default') {

      RecipentRec.find({ Status: status, Area: area }).then(async activedonors => {
         const ps_donors = await ps_translation(activedonors);
         const de_donors = await de_translation(activedonors);
         return res.status(201).json({ message: "Recipents lists", activeDonors: activedonors, ps_donors: ps_donors, de_donors: de_donors })
      })
   }
   // 010
   else if (bloodGroup == 'default' && area == 'default') {

      RecipentRec.find({ Status: status, City: city }).then(async activedonors => {
         const ps_donors = await ps_translation(activedonors);
         const de_donors = await de_translation(activedonors);
         return res.status(201).json({ message: "Recipents lists", activeDonors: activedonors, ps_donors: ps_donors, de_donors: de_donors })
      })
   }
   // 011
   else if (bloodGroup == 'default') {

      RecipentRec.find({ Status: status, Area: area, City: city }).then(async activedonors => {
         const ps_donors = await ps_translation(activedonors);
         const de_donors = await de_translation(activedonors);
         return res.status(201).json({ message: "Recipents lists", activeDonors: activedonors, ps_donors: ps_donors, de_donors: de_donors })
      })
   }


   // 100 
   else if (area === 'default' && city == 'default') {

      RecipentRec.find({ Status: status, BloodGroup: bloodGroup }).then(async activedonors => {
         const ps_donors = await ps_translation(activedonors);
         const de_donors = await de_translation(activedonors);
         return res.status(201).json({ message: "Recipents lists", activeDonors: activedonors, ps_donors: ps_donors, de_donors: de_donors })
      })
   }
   // 101 
   else if (city === 'default') {

      RecipentRec.find({ Status: status, BloodGroup: bloodGroup, Area: area }).then(async activedonors => {
         const ps_donors = await ps_translation(activedonors);
         const de_donors = await de_translation(activedonors);
         return res.status(201).json({ message: "Recipents lists", activeDonors: activedonors, ps_donors: ps_donors, de_donors: de_donors })
      })
   }
   // 110
   else if (area === 'default') {

      RecipentRec.find({ Status: status, BloodGroup: bloodGroup, City: city }).then(async activedonors => {
         const ps_donors = await ps_translation(activedonors);
         const de_donors = await de_translation(activedonors);
         return res.status(201).json({ message: "Recipents lists", activeDonors: activedonors, ps_donors: ps_donors, de_donors: de_donors })
      })
   }
   // 111
   else {

      RecipentRec.find({ Status: status, Area: area, City: city, BloodGroup: bloodGroup }).then(async activedonors => {
         const ps_donors = await ps_translation(activedonors);
         const de_donors = await de_translation(activedonors);
         return res.status(201).json({ message: "Recipents lists", activeDonors: activedonors, ps_donors: ps_donors, de_donors: de_donors })
      })
   }

}


exports.GettingActiveStatus = (req, res) => {
   const { id } = req.body
   RecipentRec.findOne({ Email_1: id }).then(result1 => {
      res.send({ message: "Revipent Current status Record", activeStatus: result1 });
   }).catch(err => {
         console.log(err);
      });


}