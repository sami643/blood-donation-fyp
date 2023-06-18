const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require("../src/db/connections");
app.use(bodyParser.json());
app.get(express.json());


const authRoutes = require('./routes/auth');
const campRoutes = require('./routes/camping')
const feedbackRoutes = require('./routes/feedbacks');
const donorRoutes = require('./routes/donorRec');
const recipentRoutes = require('./routes/recipentsRec');
 const orgRoutes = require('./routes/org');
const managmentRoutes = require ('./routes/management');
const ReqRoutes = require('./routes/request');
const donatedCashRoutes = require('./routes/donatedCash');
const message1Routes = require('./routes/message1');
const conversation1Routes = require('./routes/conversation1');

// this is a middleware
 app.use('/api/auth', authRoutes);
 

// Camping middleware
 app.use('/api/camping', campRoutes);

 // Feedbacks middleware
 app.use('/api/feedbacks', feedbackRoutes);
 

// donationRec middleWare
app.use('/api/donorRec', donorRoutes);

// Recipent Rec middleware
app.use('/api/recipents',recipentRoutes);

//Organization middleware
 app.use('/api/org',orgRoutes);

// amanagement middleware
app.use('/api/management',managmentRoutes);

// Handling request middleware
app.use('/api/requests', ReqRoutes);

app.use('/api/donatedCash', donatedCashRoutes);

// app.use('/api/users-conversation', conversationRoutes);

app.use('/api/user-messages', message1Routes);

app.use('/api/conversation1', conversation1Routes);

const PORT = process.env.PORT|| 3007;
app.listen(PORT, console.log(`Server Started on port ${PORT}`));