const mongoose = require('mongoose');


const PhoneStoreSchema = mongoose.Schema({
    Title: String,
    FirstName: String,
    Surname: String,
    mobile: Number,
    Email: String,
    AddressLine1:String,
    AddressLine2:String,
    Town:String,
    County:String,
    EIRCODE:String
},{
    timestamps:true
});
module.exports= mongoose.model('PhoneStore',PhoneStoreSchema);