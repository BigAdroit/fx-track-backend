const mongoose = require("mongoose")

const journalSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required : true
    },
    currency_pair : {
        type: String,
        required : true
    },
    trade_date_time : {
        type : String,
        required : true,
    },
    profit_loss : {
        type:String,
        required : true
    },
    strategy: {
        type:String,
        required: true,
    },
    timeframe : {
        type: String,
        required : true
    },
    trading_session: {
        type: String,
        required : true
    },
    position_type : {
        type : String,
        reqiured : true 
    },
    lot_size : {
        type : Number,
        required : true
    },
    entry_price : {
        type : Number,
        required : true
    },
    exit_price : {
        type : Number,
        required : true
    },
    stop_loss : {
        type : Number,
        required : true
    },
    take_profit : {
        type : Number,
        required : true
    },
    risk_reward : {
        type : String,
        required : true
    },
    trade_setup : {
        type : String,
        required : true
    },
    comment : {
        type : String,
    },
    isRemove: {
        type : Boolean,
        default : false
    }
})


module.exports = mongoose.model('Journal', journalSchema)