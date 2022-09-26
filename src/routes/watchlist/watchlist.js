const router = require("express").Router()
const ensureToken = require("../../controlers/token/ensureToken")
const jwt = require("jsonwebtoken")
const User = require("../../models/user/user-model")
const Strategy = require("../../models/user/strategy")
const Watchlist = require("../../models/user/watchlist-model")

// adding to watch list market 
router.post("/create-watchlist", ensureToken, async(req, res)=> {
    try {
        await jwt.verify(req.token, 'my_screte_code', async function(err, data){
            
            if(err) {
                res.sendStatus(403)
            }else {
              await User.findById({_id : req.body.user_id }).then( async(response)=> {
                if(response) {
                  await Strategy.findById({_id:req.body.strategy}).then( async(result)=> {

                    if(result) {
                      const watchlist =  await new Watchlist({
                        user_id : req.body.user_id,
                        currency_pair : req.body.currency_pair,
                        timeframe : req.body.timeframe,
                        strategy : result.strategy_name,
                        market_condition : req.body.market_condition,
                        high : req.body.high,
                        low : req.body.low,
                        entry_price : req.body.entry_price,
                        description : req.body.description,
                      })
    
                      const saveWatchlist = await watchlist.save()
                      res.status(200).json(
                        {
                            "payload": "Watchlist created successfully",
                            "responseCode": "Watchlist created successfully",
                            "code": 0,
                            "description": "Watchlist created successfully",
                            "errors": [
                              ""
                            ],
                            "hasErrors": false
                          }
                    ) 
                    }

                  }).catch((error)=> {

                  }) 
                            }
              }).catch((error)=> {
                res.json({
                  "payload": error,
                    "responseCode": "string",
                    "code": 1,
                    "description": "User with the Id not found",
                    "errors": [
                      error,
                      "User with the id not found"
                    ],
                    "hasErrors": true
              })              })
                
            }
        })
    }catch(error) {
        res.json({
            "payload": error,
              "responseCode": "string",
              "code": 1,
              "description": "Unresolve error occur",
              "errors": [
                "Unresolve error"
              ],
              "hasErrors": true
        })
    } 
})

router.get("/get-watchlist/:id", ensureToken, async (req, res) => {
  try {
    jwt.verify(req.token, "my_screte_code", async function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        await User.findById({ _id: req.params.id })
          .then(async (response) => {
            if (response) {
              const userWatchlist = await Watchlist.find({
                user_id: req.params.id,
              });
              res.json({
                payload: userWatchlist,
                totalCount: userWatchlist.length,
                responseCode: "string",
                code: 0,
                description: "Fetched successfully",
                errors: [""],
                hasErrors: false,
              });
            }
          })
          .catch((error) => {
            res.json({
              payload: error,
              responseCode: "string",
              code: 1,
              description: "User with the Id not found",
              errors: [error, "User with the id not found"],
              hasErrors: true,
            });
          });
      }
    });
  } catch (err) {
    res.json({
      payload: error,
      responseCode: "string",
      code: 1,
      description: "Unresolve error occur",
      errors: ["Unresolve error"],
      hasErrors: true,
    });
  }
});

module.exports = router 