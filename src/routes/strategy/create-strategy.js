const router = require("express").Router()
const ensureToken = require("../../controlers/token/ensureToken")
const jwt = require("jsonwebtoken")
const User = require("../../models/user/user-model")
const Strategy = require("../../models/user/strategy")
// const checkForUndefined = require("../../controlers/journal/journal-validator")

router.post("/create-strategy", ensureToken, async(req, res)=> {
    try {
        await jwt.verify(req.token, 'my_screte_code', async function(err, data){
            
            if(err) {
                res.sendStatus(403)
            }else {
              await User.findById({_id : req.body.user_id }).then( async(response)=> {
                if(response) {
                  const strategy =  await new Strategy({
                    user_id : req.body.user_id,
                    strategy_name : req.body. strategy_name,
                    description : req.body.description,
                  })

                  const saveStrategy = await strategy.save()
                  res.status(200).json(
                    {
                        "payload": "Strategy created Successfull",
                        "responseCode": "Strategy create successfully",
                        "code": 0,
                        "description": "Strategy created successfully",
                        "errors": [
                          ""
                        ],
                        "hasErrors": false
                      }
                )  
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

router.get('/getStrategy/strategy/:id', ensureToken, async(req, res)=> {
    try {
   
     jwt.verify(req.token, 'my_screte_code', async function(err, data){
       if(err) {
         res.sendStatus(403)
       } else {
        const userStrategy = await Strategy.find({_id : req.params.id})
                 res.json({
                   "payload": userStrategy,
                     "totalCount" : userStrategy.length,
                     "responseCode": "string",
                     "code": 0,
                     "description": "Fetched successfully",
                     "errors": [
                       ""
                     ],
                     "hasErrors": false
               })
       }
     })
   
    }catch(err) {
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

router.get('/getstrategy/:id', ensureToken, async(req, res)=> {
  try {
 
   jwt.verify(req.token, 'my_screte_code', async function(err, data){
     if(err) {
       res.sendStatus(403)
     } else {
       await User.findById({_id : req.params.id}).then( async (response)=> {
           if(response) {
               const userStrategy = await Strategy.find({user_id : req.params.id})
               res.json({
                 "payload": userStrategy,
                   "totalCount" : userStrategy.length,
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
 
  }catch(err) {
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


router.get('/getstrategy/:user_id/:strategy_id', ensureToken, async(req, res)=> {
    try {
          jwt.verify(req.token, 'my_screte_code', async function(err, data){
            if(err) {
              res.sendStatus(403)
            }else {
  
              await Strategy.find({_id : req.params.strategy_id, user_id : req.params.user_id}).then((data)=> {
  
                if(data) {
                  res.json({
                    "payload": data,
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