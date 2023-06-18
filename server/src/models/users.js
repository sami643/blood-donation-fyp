const mongoose = require ("mongoose");
const bcrypt = require("bcrypt");
const signUpSchema = new mongoose.Schema ({

 fullName : {
     type: String,
     required : true
 },

 Email : {
    type: String,
    required : true,
},

 Password : {
   type: String,
    required : true },



Role : {
   type: String,
      // required : true,
    default: 'User'
  },

  Post :{
    type: Object,
  },

  
  Verified: {
   type:String,
 }

})


// // Incrypt and compare password-------------------------------------------
// //hashing the Password using hash method
// signUpSchema.pre("save", function (next) {
//   const user = this;
//   if (!user.isModified("Password")) return next();
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next();
//     bcrypt.hash(user.Password, salt, (err, hash) => {
//       if (err) return next(err);
//       user.Password = hash;
//       user.rePassword = hash;
//       next();
//     });
//   });
// });

// //Comaring the Password with the one which is hashed
// signUpSchema.methods.comparePassword = function (candidatePassword) {
//   const user = this;
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(candidatePassword, user.Password, (err, isMatch) => {
//       if (err) return reject(err);
//       if (!isMatch) return reject(err);
//       resolve(true);
//     });
//   });
// };
// ---------------------------------------------------------------------------


// We need to create a collection now.
const User = new mongoose.model("User", signUpSchema);
module.exports = User;