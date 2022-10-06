const mongoose = require('mongoose');


const PhoneStoreSchema = mongoose.Schema({
    Manufacturer:String,
    Model:String,
    Price:String
},{
    timestamps:true
});
module.exports= mongoose.model('PhoneStore2',PhoneStoreSchema);