const router = require("express").Router()
const User = require("../../models/user/user-model")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const ensureToken = require("../../controlers/token/ensureToken")

router.post("/login", async(req, res)=> {
    // const email = req.body.email
    // const password = req.body.password

  try {
    User.findOne({email : req.body.email}).then(async (data)=> {

        if(data){
            const validatePass = await bycrpt.compare(req.body.password, data.password)
            const date = new Date()
            const { password, updateAt, createdAt, ...info } = data._doc
            info.date = new Date()
            const token = jwt.sign({info},"my_screte_code" )
            if(validatePass) {
                res.status(200).json({
                    "payload": token,
                    "responseCode": "Youve successfully login",
                    "code": 0,
                    "description": "Login Successfull",
                    "errors": [
                        ""
                    ],
                    "hasErrors": false
                })
            }else {
                res.json({
                    "payload": "incorrect login details",
                    "responseCode": "",
                    "code": 0,
                    "description": "incorrect login details",
                    "errors": [
                        ""
                    ],
                    "hasErrors": true
                })
            }
        }else {
            res.json({
                "payload": "user not found",
                "responseCode": " ",
                "code": 0,
                "description": "user not found",
                "errors": [
                    ""
                ],
                "hasErrors": true
            })
        }
    })

  } catch(error) {

  }
})

router.get('/protected', ensureToken, async(req, res)=> {
    jwt.verify(req.token, 'my_screte_code', function(err, data) {
        if(err) {
            res.sendStatus(403)
        }else {
            res.json({
                data : data
            })
        }
    })
})

module.exports = router