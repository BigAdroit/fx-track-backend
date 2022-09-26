const mongoose = require("mongoose")

const strategySchema = new mongoose.Schema({
    user_id : {
        type: String,
        required : true
    },
    strategy_name : {
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
}, 
{ timestamps : true}
)


module.exports = mongoose.model('Strategy', strategySchema)