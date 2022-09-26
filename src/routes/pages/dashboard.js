const router = require("express").Router()
const ensureToken = require("../../controlers/token/ensureToken")
const jwt = require("jsonwebtoken")
const User = require("../../models/user/user-model")
const Journal = require("../../models/user/journal-model")
const Watchlist = require("../../models/user/watchlist-model")

router.get('/dashboard/:id', ensureToken, async(req, res)=> {
   try {

    jwt.verify(req.token, 'my_screte_code', function(err, data) {
        if(err) {
            res.sendStatus(403)
        }else {

            User.findById({_id : req.params.id}).then((data)=> {
                const {password, createdAt, ...others} = data._doc
                res.json({
                    "payload": {
                        others
                    },
                      "responseCode": "string",
                      "code": 0,
                      "description": "string",
                      "errors": [
                        "string"
                      ],
                      "hasErrors": false
                })
            }).catch((err)=> {
                res.json({
                    "payload": "User not found",
                      "responseCode": "User not found",
                      "code": 404,
                      "description": "User not found",
                      "errors": [
                        "User with the particular id not found"
                      ],
                      "hasErrors": true
                })
            })
        }
    })

   }catch (error) {
    res.json({
        "payload": "Unresole error occure",
          "responseCode": "Unresolve error occur",
          "code": 1,
          "description": "Unresolve error occur",
          "errors": [
            "Unresolve error occur"
          ],
          "hasErrors": true
    })
   }
})

router.get("/dashboard-data/:id", ensureToken, async(req, res)=> {
  try {

    jwt.verify(req.token, 'my_screte_code', function(err, data) {
      if(err) {
          res.sendStatus(403)
      }else {

        User.find({_id : req.params.id}).then(async (data)=> {
          if(data) {
            const journal =  await Journal.find({user_id : req.params.id})

            // var profit = journal.filter((items)=> {
            //   if(items.profit_loss.toLocaleLowerCase() === "profit") {
            //     return items
            //   }
            // })

            // watchlist data 

            const watchlist = await Watchlist.find({user_id : req.params.id, isActive : true})

            let profit = []

            journal.forEach((item)=> {
              if(item.profit_loss === "profit") {
                profit.push(item)
              }
            })

            percentageProfit = Math.floor((profit.length/journal.length) * 100)
            
            res.json({
              "payload": {
                  "journalcount" : journal.length,
                  "profitInPercent" : percentageProfit,
                  "watchList" : watchlist.length
              },
                "responseCode": "string",
                "code": 0,
                "description": "string",
                "errors": [
                  "string"
                ],
                "hasErrors": false
          })

          }

        }).catch((err)=> {
          res.json({
            "payload": "User not found",
              "responseCode": "User not found",
              "code": 404,
              "description": "User not found",
              "errors": [
                err,
                "User with the particular id not found"
              ],
              "hasErrors": true
        })
        })

      }

    })
  }catch (error) {
    res.json({
      "payload": "Unresole error occure",
        "responseCode": "Unresolve error occur",
        "code": 1,
        "description": "Unresolve error occur",
        "errors": [
          error,
          "Unresolve error occur"
        ],
        "hasErrors": true
  })
  }
})

module.exports = router