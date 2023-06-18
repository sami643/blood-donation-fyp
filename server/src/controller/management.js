const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const Management = require("../models/management");
const translate = require('translate-google-api');

// Update blood Info
exports.updatebloodInfo = (req, res, next) => {
  console.log("Update blood info is called")
  const { infoDescription, id, title } = req.body;
  console.log(req.body.infoDescription)
  const infoDescription1 = req.body.infoDescription;
  const id1 = req.body.id;
  const title1 = req.body.title

  Management.findOne({ _id: id1 }).then(bloodinfo => {
    bloodinfo.AboutUsDescription = infoDescription1;
    bloodinfo.Title = title1;
    bloodinfo._id = id1;
    return bloodinfo.save()
  }).then(result1 => {
    res.status(201).json({ message: "Success", bloodIformation: result1 });
  }).catch(err => {
    console.log(err);
  });
}





//Updating Contact Us number
exports.contactUs = (req, res, next) => {
  console.log("posting contact is called")
  const { contact, id } = req.body

  const Contact1 = req.body.contact;
  const id1 = req.body.id;



  Management.findOne({ _id: id1 }).then(contactNo => {
    if (!contactNo) {
      return err;
    }

    contactNo.ContactUs = Contact1;
    return contactNo.save()
  }).then(result1 => {
    res.status(201).json({ message: "Success", ContactNo: result1 });
  }).catch(err => {
    console.log(err);
  });
}


// Update jazzcash account
exports.jazzCashNo = (req, res, next) => {

  console.log("Update Jazz called");
  const { id, jazzCash } = req.body;

  const jazzCash1 = req.body.jazzCash;
  const id1 = req.body.id;

  Management.findOne({ _id: id1 }).then(cashNo => {
    if (!cashNo) {
      return err;
    }
    cashNo.JazzCash = jazzCash1;
    cashNo._id = id1;
    return cashNo.save()
  }).then(result1 => {


    res.status(201).json({ message: "Success1", jazzNo: result1 });
  }).catch(err => {
    console.log(err);
  });
}



// Update EasyPaisa
exports.EasyPaisaUpdate = (req, res, next) => {

  console.log("Update cashAccount numbers is called");
  const { id, easyPaisa } = req.body;

  const easyPaisa1 = req.body.easyPaisa;
  const id1 = req.body.id;

  Management.findOne({ _id: id1 }).then(cashNo => {
    if (!cashNo) {
      return err;
    }

    cashNo.EasyPaisa = easyPaisa1;
    cashNo._id = id1;
    return cashNo.save()
  }).then(result1 => {

    res.status(201).json({ message: "Success2", cashNo: result1 });
  }).catch(err => {
    console.log(err);
  });
}




// Update contact Us Number
exports.updateContctUs = (req, res, next) => {
  console.log("Update Contact Us Number is called");
  const { contact, id } = req.body;

  const contactUs1 = req.body.contact;
  const id1 = req.body.id;


  Management.findOne({ _id: id1 }).then(contactUsNo => {
    if (!contactUsNo) {
      return err;
    }
    contactUsNo.ContactUs = contactUs1;
    //  contactUsNo._id = id1;
    return contactUsNo.save()
  }).then(result1 => {


    res.status(201).json({ message: "Success", contactUs: result1 });
  }).catch(err => {
    console.log(err);
  });
}




// ABout Us 
exports.updateAboutUs = (req, res, next) => {
  console.log("Update about us is called");
  const { title, description, aboutUs } = req.body;
  const aboutUsTitle1 = req.body.title;
  const aboutUsDescription1 = req.body.description;
  const Status = req.body.aboutUs;
  Management.findOne({ ABoutUS: Status }).then(aboutus1 => {

    aboutus1.AboutUsTitle = aboutUsTitle1;
    aboutus1.AboutUsDescription = aboutUsDescription1;
    aboutus1.AboutUs = Status;

    return aboutus1.save()
  }).then(result2 => {

    res.status(201).json({ message: "Success", aboutus1: result2 });
  }).catch(err => {
    console.log(err);

  });
}


async function ps_translation(result) {

   temp_t = 1;
   temp_desc = 1;

  // temp_t = await translate(result.AboutUsTitle, {
  //   tld: "com",
  //   to: "ps"
  // });

  // temp_desc = await translate(result.AboutUsDescription, {
  //   tld: "com",
  //   to: "ps"
  // });

  return ({
    AboutUsTitle: temp_t,
    AboutUsDescription: temp_desc
  });
}

async function de_translation(result) {

  temp_t = 1;
  temp_desc = 1;

//  temp_t = await translate(result.AboutUsTitle, {
//    tld: "com",
//    to: "de"
//  });

//  temp_desc = await translate(result.AboutUsDescription, {
//    tld: "com",
//    to: "de"
//  });

 return ({
   AboutUsTitle: temp_t,
   AboutUsDescription: temp_desc
 });
}

//  Getting about Us
exports.getAboutUs = (req, res, next) => {
  Management.findOne({ ABoutUS: 'true' }).then(async result => {
    const ps = await ps_translation(result);
    const de = await de_translation(result);
    res.status(201).json({ message: "", aboutus: result, ps_trans: ps, de_trans: de });
  }).catch(err => {
    console.log("errorOccured", err);
  })
}




//  Getting JazzCash number
// 623dfcb7fc9f1b2b12c0f9cf
exports.getJazzCashNo = (req, res, next) => {
  Management.findOne({ _id: '623dfcb7fc9f1b2b12c0f9cf' }).then(result => {
    res.status(201).json({ message: "this is jazz cash number", JazzCashNo: result });
  }).catch(err => {
    console.log("errorOccured", err);
  })
}


//  Getting Easy Paisa number
// 62641ceaf12f786b3737e7ff
exports.getWEasyPNo = (req, res, next) => {
  Management.findOne({ _id: '62641ceaf12f786b3737e7ff' }).then(result => {
    res.status(201).json({ message: "this is EasyPaisa number", EasyPaisa: result });
  }).catch(err => {
    console.log("errorOccured", err);
  })
}



//  Getting Easy Paisa number
// 623e046efc9f1b2b12c0f9d0
exports.getContactUsNo = (req, res, next) => {
  Management.findOne({ _id: '623e046efc9f1b2b12c0f9d0' }).then(result => {
    res.status(201).json({ message: "this is Contact number", ContactUs: result });
  }).catch(err => {
    console.log("errorOccured", err);
  })
}



//  Getting blood info
// 623deccbfc9f1b2b12c0f9ce
exports.gettingBloodInfo = (req, res, next) => {
  console.log("blood info is called");
  Management.findOne({ _id: '623deccbfc9f1b2b12c0f9ce' }).then(result => {
    res.status(201).json({ message: "Blood Info", BloodInfo: result });
  }).catch(err => {
    console.log("errorOccured", err);
  })
}







