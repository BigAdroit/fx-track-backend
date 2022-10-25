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

                    let loss = []
                    let long = []
                    let short = []
                    let longProfit = []
                    let longLoss = []
                    let shortProfit = []
                    let shortLoss = []

            // var profit = journal.filter((items)=> {
            //   if(items.profit_loss.toLocaleLowerCase() === "profit") {
            //     return items
            //   }
            // })

            // watchlist data 

            //  getting consecutive winning and losses in the journal;
            let arr = [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0]
            let arr_0 = []
            let arr_1 = []
            let test_arr_0 = []
            let test_arr_1 = []
            
            for (let i = 0; i < journal.length; i++) {
                if(journal[i].profit_loss === "profit"){
                    arr_1.push(test_arr_1.length)
                    test_arr_1 = []
                    test_arr_0.push(i)
                }
                if(journal[i].profit_loss === "loss"){
                    arr_0.push(test_arr_0.length)
                    test_arr_0 = []
                    test_arr_1.push(i)
                }
            }
            console.log(arr_1)
            console.log('Array of 1', arr_1.filter(a => a>0))
            console.log('Array of 0', arr_0.filter(a => a>0))
            // End of getting consecutive wining and losses in the journal;
              
            
            
            strArray = []
            // Currency Pair Analysis 
            journal.forEach((item)=> {
              strArray.push(item.currency_pair)
            })

            let currencyList = [...new Set(strArray)]

            let currencyPairList = []
            for(i= 0; i<currencyList.length; i++) {
              // console.log(currencyList[i])
              currencyPairList[i] = (journal.filter((item)=> {
                if(item.currency_pair === currencyList[i])  {
                  return item
                }
              })).length     
            }
            // end of curency Pair Analysis


            //  Start of Trading Session Monthly Analysis 
                    
            strSession = []

            
            journal.forEach((item)=> {
              strSession.push(item.trading_session)
            })

            let tradingSessionList = [...new Set(strSession)]
            // console.log(tradingSessionList)

            let tradingSessionValues =[]
            for(i= 0; i<tradingSessionList.length; i++) {
              // console.log(tradingSessionList[i])
              tradingSessionValues[i] = (
                journal.filter((item)=> {
                if(item.trading_session === tradingSessionList[i])  {
                  return item
                }
              })).length     
            }

            // console.log(tradingSessionValues)
            // End of Trading Session Monthly Analysis

            // Start of strategy performance  monthly analysis 

            strStrategy = []

            journal.forEach((item)=> {
              strStrategy.push(item.strategy)
            })

            let strategyList = [...new Set(strStrategy)]
            // console.log(strategyList)

            let strategyValues =[]
            for(i= 0; i<strategyList.length; i++) {
              // console.log(strategyList[i])
              strategyValues[i] = (journal.filter((item)=> {
                if(item.strategy === strategyList[i])  {
                  return item
                }
              })).length     
            }

            // console.log(strategyValues)
            // End of Strategy perfomance monthly analysis

            // Start of Timeframe Monthly Analysis
                    
            strTimeframe = []

            journal.forEach((item)=> {
              strTimeframe.push(item.timeframe)
            })

            let timeframeList = [...new Set(strTimeframe)]
            // console.log(timeframeList)

            let timeframeValues =[]
            for(i= 0; i<timeframeList.length; i++) {
              // console.log(timeframeList[i])
              timeframeValues[i] = (journal.filter((item)=> {
                if(item.timeframe === timeframeList[i])  {
                  return item
                }
              })).length     
            }


            // End of Timeframe Monthly Analysis

            const watchlist = await Watchlist.find({user_id : req.params.id, isActive : true})
            let profit = []

            journal.forEach((item)=> {
              if(item.profit_loss === "profit") {
                profit.push(item)
              }else if(item.profit_loss === "loss") {
                loss.push(item)
              }
            })

            journal.forEach((item)=> {
                if(item.position_type.toLocaleLowerCase() === "long") {
                  long.push(item)
                }else if(item.position_type.toLocaleLowerCase() === "short") {
                  short.push(item)
                }
              })

              // long trade  analysis
              long.forEach((item)=> {
                if(item.profit_loss.toLocaleLowerCase() ==="profit") {
                    longProfit.push(item)
                }else if(item.profit_loss.toLocaleLowerCase() === "loss") {
                    longLoss.push(item)
                }
              })

              //short Trade analysis
              short.forEach((item)=> {
                if(item.profit_loss.toLocaleLowerCase() ==="profit") {
                    shortProfit.push(item)
                }else if(item.profit_loss.toLocaleLowerCase() === "loss") {
                    shortLoss.push(item)
                }
              })


            // journal.forEach((item)=> {
            //   if(item.profit_loss === "profit") {
            //     profit.push(item)
            //   }
            // })

            percentageProfit = Math.floor((profit.length/journal.length) * 100)
            
            res.json({
              "payload": {
                  "journalcount" : journal.length,
                  "profitInPercent" : percentageProfit,
                  "watchList" : watchlist.length,
                  "lossCount": loss.length,
                            "loss" : loss,
                            "profit" : profit,
                            "profitCount" : profit.length,
                            "shortCount" : short.length,
                            "shortTrades" : short,
                            "longTrades" : long,
                            "longCount" : long.length,
                            "longProfitCount" : longProfit.length,
                            "longLossCount" : longLoss.length,
                            "shortProfitCount" : shortProfit.length,
                            "shortLossCount" : shortLoss.length,
                            "currencyPairs" : currencyList,
                            "currencyPairTradeCount" : currencyPairList,
                            "tradingSessions" : tradingSessionList,
                            "tradingSessionValues" : tradingSessionValues,
                            "strategies": strategyList,
                            "strategyValues": strategyValues,
                            "timeframes" : timeframeList,
                            "timeframeValues" : timeframeValues
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