const res = require("express/lib/response");
const cashManagement = require("../models/donatedCash");



// DOTATED CASH RECARDS USING JAZZCASH 
exports. easyPaisaCashRecord = (req, res, next) =>{
    console.log("easy paisa Called");
  const { account, amount, method } = req.body; 
   
     const cashdonor = new cashManagement({
         Account: account,
         Amount: amount,
        method,
    });

   
    cashdonor.save()
.then(result => {
   res.status(201).json({message: "cash donors list", cashDonors: result});
}).catch(err => {
 console.log(err);
}) 
}




// DOTATED CASH RECARDS USING JAZZCASH 
exports. jazzCashRecord = (req, res, next) =>{
    console.log("Jazz Cash post called");
    const { account, amount, method } = req.body; 
    

     const cashdonor1 = new cashManagement({
         Account: account,
         Amount: amount,
         method,

     });
    cashdonor1.save()
.then(result => {
   res.status(201).json({message: "cash donors list", cashDonors: result});
}).catch(err => {
    console.log(err);
    
}) 
}




// Getting all jazz  and easy p accounts
exports.gettingCashRecord = (req, res) =>
{
  cashManagement.find().then(result=>{
        res.status(201).json({message: "Jazzcash Donors", JazzC: result})
    })
}


// DELETING cash donors record.
exports.deletecashRecord = (req , res)=>{
  // console.log("cash donor record is called");
  const id = req.body.id

  cashManagement.findOne({_id: id}).then(donor=>{
     
      return donor.deleteOne()
    }).then(result=>{
      console.log(result);
      res.status(201).json({message:" cash donor record deleted"});
    }).catch(err=>{
      console.log(err);
    });

}
    