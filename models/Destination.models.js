const mongoose = require('mongoose');
const {Schema} = mongoose;

const DestinationSchema = new Schema({
    userName : {type:String},
    name : {type:String},
    vicinity : {type:String},
    rating : {type:String},
    place_id : {type:String},
    imageURL : {type:String},
})

module.exports = mongoose.model("Destination",DestinationSchema);