const router = require("express").Router()
const jwt = require("jsonwebtoken")
const ensureToken = require("../../controlers/token/ensureToken")
const User = require("../../models/user/user-model")
const Journal = require("../../models/user/journal-model")

router.get('/lineChart/:id', ensureToken, async (req, res)=> {
    try {
        jwt.verify(req.token, 'my_screte_code', async function(err, data){
            if(err) {
              res.sendStatus(403)
            } else {
              await User.findById({_id : req.params.id}).then( async (response)=> {
                  if(response) {

                    //Using profit analysis 

                    let profit = []
                    let loss = []

                    
                    //  getting user journal base on the id 
                    const userJournal = await Journal.find({user_id : req.params.id})
                    // looping through to get the months and other value 

                    userJournal.forEach((item)=> {
                      if(item.profit_loss === "profit") {
                        profit.push(item)
                      }else if(item.profit_loss === "loss") {
                        loss.push(item)
                      }
                    })

                        //  January
                        const jan = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const month = date.getMonth()
                            if(month === 0 ) {
                                return items
                            }    
                        })
                        const feb = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const month = date.getMonth()
                            if(month === 1 ) {
                                return items
                            }    
                        })
                        const march = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const month = date.getMonth()
                            if(month === 2 ) {
                                return items
                            }    
                        })
                        const april = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const monthJanuary = date.getMonth()
                            if(monthJanuary === 3 ) {
                                return items
                            }    
                        })
                        const may = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const monthJanuary = date.getMonth()
                            if(monthJanuary === 4 ) {
                                return items
                            }    
                        })
                        const june = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const monthJanuary = date.getMonth()
                            if(monthJanuary === 5 ) {
                                return items
                            }    
                        })
                        const july = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const monthJanuary = date.getMonth()
                            if(monthJanuary === 6 ) {
                                return items
                            }    
                        })
                        const august = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const monthJanuary = date.getMonth()
                            if(monthJanuary === 7 ) {
                                return items
                            }    
                        })
                        const sept = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const monthJanuary = date.getMonth()
                            if(monthJanuary === 8 ) {
                                return items
                            }    
                        })
                        const oct = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const monthJanuary = date.getMonth()
                            if(monthJanuary === 9 ) {
                                return items
                            }    
                        })
                        const nov = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const monthJanuary = date.getMonth()
                            if(monthJanuary ===  10) {
                                return items
                            }    
                        })
                        const dec = await userJournal.filter((items)=> {
                            const date  = new Date(items.trade_date_time)
                            const monthJanuary = date.getMonth()
                            if(monthJanuary === 11 ) {
                                return items
                            }    
                        })

                        arrayOfMonths = ["jan", "feb", "march", "april", "may", "june", "july", "august", "sept", "oct", "nov", "dec"]
                        tradesPermonth =  [jan.length, feb.length, march.length, april.length, may.length, june.length, july.length, august.length, sept.length, oct.length, nov.length, dec.length]

                      res.json({
                        "payload": {
                            months : arrayOfMonths,
                            value : tradesPermonth,
                            loss: loss.length,
                            profit : profit.length
                        },
                          "totalCount" : userJournal.length,
                          "responseCode": "string",
                          "code": 0,
                          "description": "Fetched successfully",
                          "errors": [
                            ""
                          ],
                          "hasErrors": false
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
              })  
              })
            }
          })
    }catch (error) {
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



router.get("/monthlyAnalysis/:id/:month" , ensureToken, async(req, res)=> {
    try {
        jwt.verify(req.token, 'my_screte_code', async function(err, data){
            if(err) {
              res.sendStatus(403)
            } else {
              await User.findById({_id : req.params.id}).then( async (response)=> {
                  if(response) {

                    //Using profit analysis 

                    let profit = []
                    let loss = []
                    let long = []
                    let short = []
                    let longProfit = []
                    let longLoss = []
                    let shortProfit = []
                    let shortLoss = []

                    
                    
                    
                    let strArray = [];
                    //  getting user journal base on the id 
                    const userJournal = await Journal.find({user_id : req.params.id})
                    // looping through to get the months and other value 

                   
                    // let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
                    // console.log(findDuplicates(strArray)) // All duplicates
                    // console.log([...new Set(findDuplicates(strArray))]) // Unique duplicates
                    //geeting currency pair 
                    //  January
                    const  getMonth = Number(req.params.month)
                    const dataMonth = await userJournal.filter((items)=> {
                        const date  = new Date(items.trade_date_time)
                        const month = date.getMonth()
                        if(month === getMonth) {
                            return items
                        }    
                    })

                    dataMonth.forEach((item)=> {
                      strArray.push(item.currency_pair)
                    })

                    // Currency Pair for monthly Analysis

                    
                    let currencyList = [...new Set(strArray)]

                    let currencyPairList = []
                    for(i= 0; i<currencyList.length; i++) {
                      // console.log(currencyList[i])
                      currencyPairList[i] = (dataMonth.filter((item)=> {
                        if(item.currency_pair === currencyList[i])  {
                          return item
                        }
                      })).length     
                    }

                    // console.log(currencyPairList)
                    // console.log(currencyPair)

                    //  End Of currency pair montly analysis

                    //  Start of Trading Session Monthly Analysis 
                    
                    strSession = []

                    dataMonth.forEach((item)=> {
                      strSession.push(item.trading_session)
                    })

                    let tradingSessionList = [...new Set(strSession)]
                    // console.log(tradingSessionList)

                    let tradingSessionValues =[]
                    for(i= 0; i<tradingSessionList.length; i++) {
                      // console.log(tradingSessionList[i])
                      tradingSessionValues[i] = (dataMonth.filter((item)=> {
                        if(item.trading_session === tradingSessionList[i])  {
                          return item
                        }
                      })).length     
                    }

                    // console.log(tradingSessionValues)
                    // End of Trading Session Monthly Analysis

                    // Start of strategy performance  monthly analysis 

                    strStrategy = []

                    dataMonth.forEach((item)=> {
                      strStrategy.push(item.strategy)
                    })

                    let strategyList = [...new Set(strStrategy)]
                    // console.log(strategyList)

                    let strategyValues =[]
                    for(i= 0; i<strategyList.length; i++) {
                      // console.log(strategyList[i])
                      strategyValues[i] = (dataMonth.filter((item)=> {
                        if(item.strategy === strategyList[i])  {
                          return item
                        }
                      })).length     
                    }

                    // console.log(strategyValues)
                    // End of Strategy perfomance monthly analysis

                    // Start of Timeframe Monthly Analysis
                    
                    strTimeframe = []

                    dataMonth.forEach((item)=> {
                      strTimeframe.push(item.timeframe)
                    })

                    let timeframeList = [...new Set(strTimeframe)]
                    // console.log(timeframeList)

                    let timeframeValues =[]
                    for(i= 0; i<timeframeList.length; i++) {
                      // console.log(timeframeList[i])
                      timeframeValues[i] = (dataMonth.filter((item)=> {
                        if(item.timeframe === timeframeList[i])  {
                          return item
                        }
                      })).length     
                    }


                    // End of Timeframe Monthly Analysis


                    dataMonth.forEach((item)=> {
                      if(item.profit_loss === "profit") {
                        profit.push(item)
                      }else if(item.profit_loss === "loss") {
                        loss.push(item)
                      }
                    })

                    dataMonth.forEach((item)=> {
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
                   
                        
                      res.json({
                        "payload": {
                            "months" : dataMonth,
                            // value : tradesPermonth,
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
                          "totalCount" : dataMonth.length,
                          "responseCode": "string",
                          "code": 0,
                          "description": "Fetched successfully",
                          "errors": [
                            ""
                          ],
                          "hasErrors": false
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
              })  
              })
            }
          })

    }catch (error) {
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

module.exports = router