const mongoose = require ('mongoose');
// DB Connection
mongoose.connect('mongodb://localhost:27017/bloodDonationDB').then(() => console.log("The database is connected Successfully")).catch(err =>console.error('Failed to connect the databse',err));
