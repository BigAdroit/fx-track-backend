const router = require("express").Router()
const User = require("../../models/user/user-model")

router.get("/emailVerification/:userEmail", (req, res)=> {
    User.findOne({email : req.params.userEmail}).then( async (data)=> {
        if(data) {
            if(data.isVerified === false) {
                await  User.updateOne({email : req.params.userEmail}, {$set:{ isVerified : true }})
                 res.sendFile(__dirname + "/dist/index.html")
            }else {
                res.send("Link has been used by you ")
            }
            
        }else {
            res.send("Invalid Link Please confirm it you")
        }
    })

})


module.exports = router