const mongoose = require("mongoose")

const watchlistSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required : true
    },
    currency_pair : {
        type: String,
        required : true
    },
    market_condition : {
        type : String,
        required : true,
    },
    high : {
        type:Number,
        required : true
    },
    low: {
        type:Number,
        required: true,
    },
    timeframe : {
        type: String,
        required : true
    },
    strategy: {
        type: String,
        required : true
    },
    entry_price : {
        type : Number,
        reqiured : true 
    },
    description : {
        type : String,
        required : true
    },

    isActive: {
        type: Boolean,
        default : true
    }
},
{timestamps : true}
)


module.exports = mongoose.model('Watchlist', watchlistSchema)