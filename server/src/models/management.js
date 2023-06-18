const mongoose = require ("mongoose");
const managementSchema = new mongoose.Schema({


    // BloodInfo : {
    //     type: Object,
    //     required : true,
    //     },

    WhatIsBlood: {
        type: Object,
    },

    WhyDonateBlood:
    {
        type: String,
    },
    
    
    JazzCash: {
        type: Number,
    },
    EasyPaisa: {
        type: Number,
    },
    
    AboutUsTitle: {
        type: String,
    },

    AboutUsDescription: {
        type: String,
    },
        
    ContactUs: {
        type: Number,
    },
    
    ABoutUS:
    {
        type: String,
    },

    Title: {
        type: String
    }
        
        
})


const Management = new mongoose.model( "Management", managementSchema)
module.exports = Management;
