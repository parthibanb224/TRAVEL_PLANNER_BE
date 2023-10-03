const mongoose = require('mongoose');
const {Schema} = mongoose;

const TripsSchema = new Schema({
    userName : {type:String},
    title : {type:String},
    location : {type:String},
    date : {type:String},
    description : {type:String},
    image : {type:String},
})

module.exports = mongoose.model("Trips",TripsSchema);