const res = require("express/lib/response");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const requests = require("../models/request");
const organizations = require("../models/organization");
const admins = require("../models/adminUser")
const superadmins = require("../models/superAdmin");
const UserVerification = require("../models/userverification");
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport')

 
//  Verify email address acount
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'blooddonationgroup0@gmail.com',
      pass: 'cacxdywvutmpmviq'
    }
});





// Sign up
exports.signup = async(req, res, next) =>{
  console.log("Signup called");
  const { fullname, email, password, role, date1, reqType } = req.body;
  if (req.body.role === 'user') {
          // Checking the Users Email whether its exist or not.
     const check =await users.findOne({Email: email})
     if(check){
       return res.status(201).json({ message: "User already existed please try another email address" });  
    }
    
    const user = new users({
      fullName: fullname,
      Email: email,
      Password: password,
      Role: role,
      Verified: false,
    });

    user.save()
      .then(result => {
        sendVerificationEmail(result, res);
      })
 
  }

  if (req.body.role === 'admin') {
    // Checking if the admin request already exist or not.
       const checkreq =await requests.findOne({Email: email})
     if(checkreq){
       return res.status(201).json({ message: "request already sent using this email please wait for approval" });   
    }


    const adminSignUpReq = new requests({
       Date: date1,
      FullName: fullname,
      Email: email,
      Password: password,
      Role: role,
      ReqType: reqType,
    });
  
      adminSignUpReq.save()
        .then(result => {
          console.log(result);
        res.status(201).json({ message: "Admin signUp request sent please wait for apporval!", adminReq: result });
      }).catch(err => {
        console.log(err);
      })
    console.log("admin sign up req sent!")
  }
};


const sendVerificationEmail = async ({ _id, Email }, res) => {

  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    //mail options
    const mailOptions = {
      from: "blooddonationgroup0@gmail.com",
      to: Email,
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete your registration!</p><p>This code will <b>expire in 1 hour</b>.</b>`,
    };

    const newUserVerification = await new UserVerification({
      userId: _id,
      otp: otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    // save otp in database
    await newUserVerification.save();
    // console.log("sending email");
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
    console.log("mail sent\ncheck your email!!!");
    res.json({
      status: "PENDING",
      message: "Verification otp email sent",
      data: {
        userId: _id,
        Email,
      },
    });

  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};



// Otp verifying
exports.verifyOTP = async (req, res) => {
  try {
    let {userId, otp} = req.body;

    console.log(req.body);
    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      const userVerificationRecords = await UserVerification.find({
        userId,
      });

      if (userVerificationRecords.length <= 0) {
        // no record found
        throw new Error(
          "Account doesn't exist or has been verified already. Please sign up or log in"
        );
      } else {
        // user otp record exists
        const { expiresAt } = userVerificationRecords[0];

        if (expiresAt < Date.now()) {
          // user otp record has expired
          await UserVerification.deleteMany({ userId });
          throw new Error("Code has expired. Please request again");
        } else {
          validOTP = userVerificationRecords[0].otp;

          if (validOTP != otp) {
            // supplied otp is wrong
            throw new Error("Invalid code passed. Enter correct code.");
          } else {
            // success
            await users.updateOne({ _id: userId }, { Verified: true });
            await UserVerification.deleteMany({ userId });

            res.json({
              status: "VERIFIED",
              message: "User email verified successfully.",
            });
          }
        }
      }
    }

  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};


exports.resendOTP = async (req, res) => {
  try {
    let { userId, email } = req.body;
    console.log("email:",email);
    if (!userId || !email) {
      throw Error("Empty user details are not allowed");
    } else {
      // delete exisiting record and resend
      await UserVerification.deleteMany({ userId });
      sendVerificationEmail({ _id: userId, Email: email }, res);
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};




//  Forgot password 
exports.forgotPassword = async (req, res) => {
  const Email = req.body.email;
  const userRecord = await users.findOne({Email: Email, });
  if (!userRecord) {
    return res.status(201).json({message:'This email address is not register please enter correct email address!'})
  }
   const _id = userRecord._id.toString();


  sendVerificationEmail({ _id, Email }, res);
};

exports.passwordChange = (req, res) => {
  const new_password = req.body.new_password;
  const userId = req.body.id;

  console.log("id:", userId);
  console.log("new_password:", new_password);
  
  users.findOne({ _id: userId }).then(person => {
    // Updating password
    person.Password = new_password;
    return person.save()
  }).then(result => {
    console.log(result);
    res.status(201).json({ message: "password Updated", user: result });
  })
    .catch(err => {
      console.log(err);
    })

};







exports.SignIn= async (req, res) => {

  if (req.body.role === 'user') {
    console.log(' user singIn called');

    const jwtkey = "thisisjwtkey";
    const { email, password, } = req.body;
    if (!email || !password)
      return res
        .status(201)
        .json({ message: "please provide email & password!" });
   
    const user = await users.findOne({ Email: email });
    if (!user)
      return res.status(201)
        .json({ message: "wrong email or password!" });
    
     if (user.Verified != "true") {
       return res.status(201)
        .json({ message: "Your Account is not verified! (Check your Email for OTP)" });
    }


 
    if (user.Password === password) {
      const token = jwt.sign(
        {
          userID: user._id,
          email: user.Email,
          role: user.Role,
          name: user.fullName,
        
        },
        jwtkey
      );
      console.log("Token: ", token);
      res.status(201).json({ message: "Success", token });
    }
    else {
      res.status(201).json({ message: "wrong email or password!" });
    }
  }

  else if (req.body.role === "organization") {
    console.log('org singIn called');

    const jwtkey = "thisisjwtkey";
    const { email, password, } = req.body;
    if (!email || !password)
      return res
        .status(201)
        .json({ message: "please provide email & password!" });
   
    const user = await organizations.findOne({ Email: email });
    if (!user)
      return res.status(201)
        .json({ message: "wrong email or password!" });

 
    if (user.Password === password) {
      const token = jwt.sign(
        {
          userID: user._id,
          email: user.Email,
          role: user.Role,
          name: user.OrgName,
        },
        jwtkey
      );
      console.log("Token: ", token);
      res.status(201).json({ message: "Success", token });
    }
    else {
      res.status(201).json({ message: "wrong email or password!" });
    }
  }
    
    
// Admin and super admin
  else if(req.body.role== 'admin') {
    console.log('admin called');

    const jwtkey = "thisisjwtkey";
    const { email, password, } = req.body;
    if (!email || !password)
      return res
        .status(201)
        .json({ message: "please provide email & password!" });
   
    const user = await admins.findOne({ Email: email });
    if (!user) {
      return res.status(201)
        .json({ message: "wrong email or password!" });
    }
      
    if (user.Password === password) {
      const token = jwt.sign(
        {
          userID: user._id,
          email: user.Email,
          role: user.Role,
          name: user.fullName
        },
        jwtkey
      );
      console.log("Token: ", token);
      res.status(201).json({ message: "Success", token });
      
    }else {
      return res.status(201).json({ message: "wrong email or password!" });
    }
   
  }

  //  super admin
  else if(req.body.role== 'superAdmin') {
    console.log('super called');

    const jwtkey = "thisisjwtkey";
    const { email, password, } = req.body;
    if (!email || !password)
      return res
        .status(201)
        .json({ message: "please provide email & password!" });
   
    const user = await superadmins.findOne({ Email: email });
    if (!user) {
      return res.status(201)
        .json({ message: "wrong email or password!" });
    }
      
    if (user.Password === password) {
      const token = jwt.sign(
        {
          userID: user._id,
          email: user.Email,
          role: user.Role,
          name: user.fullName
        },
        jwtkey
      );
      console.log("Token: ", token);
      res.status(201).json({ message: "Success", token });
      
    }else {
      return res.status(201).json({ message: "wrong email or password!" });
    }
   
  }
  };







// --------------------------------------------------------------------------------------
// Update Pasword--------------------------------
exports.userUpdate = (req, res, next) => {
  const old_password = req.body.old_password;
  const new_password = req.body.new_password;
  const Role = req.body.role;
  const userId = req.body.id;
  console.log(req.body);

  if (Role === 'user') {
    // Finding the specific user.

    users.findOne({ _id: userId }).then(person => {
   
      if (old_password != person.Password) {
        return res.status(201).json({ message: "old password incorrect" });
      }
      // Updating password
      person.Password = new_password;
      return person.save()
    }).then(result => {
      console.log(result);
      res.status(201).json({ message: "password Updated", user: result });
    })
      .catch(err => {
        console.log(err);
      })
  }


   else if (Role === 'admin') {
    // Finding the specific user.
 
    admins.findOne({ _id: userId }).then(person => {
      // Checking that whether old password  correct or not
      if (old_password != person.Password) {
        return res.status(201).json({ message: "old password incorrect" });
      }
      // Updating password
      person.Password = new_password;
      return person.save()
    }).then(result => {
      console.log(result);
      res.status(201).json({ message: "password Updated", user: result });
    

    })
      .catch(err => {
        console.log(err);
      })
  }



   else if (Role === 'organization') {
    // Finding the specific user.
    organizations.findOne({ _id: userId }).then(person => {
      // Checking that whether old password  correct or not
      if (old_password != person.Password) {
        return res.status(201).json({ message: "old password incorrect" });
      }
      // Updating password
      person.Password = new_password;
      return person.save()
    }).then(result => {
      console.log(result);
      res.status(201).json({ message: "password Updated", user: result });
    

    })
      .catch(err => {
        console.log(err);
      })
  }


  else if (Role === 'superAdmin') {
    // Finding the specific user.
   
    superadmins.findOne({ _id: userId }).then(person => {
      // Checking that whether old password  correct or not
         console.log("personsPassowrd is :", person.Password)
      if (old_password != person.Password) {
        return res.status(201).json({ message: "old password incorrect" });
      }
      // Updating password
      person.Password = new_password;
      return person.save()
    }).then(result => {
      console.log(result);
      res.status(201).json({ message: "password Updated", user: result });
    

    })
      .catch(err => {
        console.log(err);
      })
  }
}
// ----------------------------------------------------------------------------



//************************************************admin portion */
// Getting all Requests
exports.getadminlist = (req, res) =>
{

  admins.find({ Role: 'admin' }).then(result=>{
        res.status(201).json({message: "all admins", Admin: result})
    })
}



// remove EXISTING Admin.
exports.removeAdmin = (req , res)=>{
  // console.log("remove admin is called");
  const id = req.body.id

  admins.findOne({_id: id}).then(admin=>{
      if(!admin){
        return err;
      }
      return admin.deleteOne()
    }).then(result=>{
      console.log(result);
      res.status(201).json({message:" admin has been removed"});
    }).catch(err=>{
      console.log(err);
    });

}





exports.userUpdate1 = ( req, res) => {
  console.log("Superadmin is called");

  const { Email, Password, Role, Name } = req.body
  

  const superadmin = new superadmins ({

    fullName:Name,
    Email,
    Password,
    Role,

  })

  superadmin.save().then(result => {
    res.status(201).json({ message:"superadmin created", result:result });
  })

}