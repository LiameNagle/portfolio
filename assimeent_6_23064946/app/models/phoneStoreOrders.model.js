const mongoose = require('mongoose');


const PhoneStoreSchema = mongoose.Schema({
    Name:String,
    Phone:String
},{
    timestamps:true
});
module.exports= mongoose.model('PhoneStoreorder',PhoneStoreSchema);