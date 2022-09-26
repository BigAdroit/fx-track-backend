
async function checkForUndefined( req, res, data ) {
    
 if((req.body.user_id !== undefined  ) || 
    (req.body.currency_pair !== undefined ) ||
    (req.body.trade_date_time !== undefined ) ||
    (req.body.position_type !== undefined ) ||
    (req.body.lot_size !== undefined ) ||
    (req.body.entry_price !== undefined ) ||
    (req.body.exit_price !== undefined ) ||
    (req.body.stop_loss !== undefined ) ||
    (req.body.take_profit !== undefined ) ||
    (req.body.risk_reward !== undefined) ||
    (req.body.trade_setup !== undefined ) 

 ) {
    // console.log("somethinhs is wright")
    res.json({"working" : "Am working fine"})
 }else {
    // res.send("everything is right")
    console.log("eyah")
 }
}

module.exports = checkForUndefined