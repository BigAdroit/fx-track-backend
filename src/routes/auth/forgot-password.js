const router = require("express").Router()
const User = require("../../models/user/user-model")
const bycrpt = require("bcrypt")
const nodemailer = require("nodemailer")
const sendVerificationMail = require("../../controlers/mailer/passwordResetMail")

router.post("/reset-password", async(req, res)=> {
    try {
        await User.findOne({email: req.body.email}).then( async (response)=> {
           if (response) {
                
                const code = Math.floor(Math.random()*100000)
                sendVerificationMail(response, info=> {
                    console.log(`Message has been sent successfilly  and the id is ${info.messageId} `)
                    information = info
                  }, code)
                 await User.findOneAndUpdate({email:req.body.email}, {$set:{passwordResetCode : code}})
                 res.status(200).json({
                    "payload": "Check ypur gmail for reset password code",
                    "responseCode": "Reset code sent successfully",
                    "code": 0,
                    "description": "code sent successfully",
                    "errors": [
                        ""
                    ],
                    "hasErrors": false
                })
            }else {
                res.json({
                    "payload": "User not found",
                    "responseCode": "User not found",
                    "code": 1,
                    "description": "Email dosen't exist",
                    "errors": [
                        "Ypu sending the wrong email address"
                    ],
                    "hasErrors": true
                })
            }
        })

    }catch (error) {
        res.json({
            "payload": "Unresolved error occur while fetching account",
            "responseCode": "unknown error",
            "code": 1,
            "description": "Unresolved error occure while creating account",
            "errors": [
                "Unresolved error occure while creating account"
            ],
            "hasErrors": true
        })
    }
})

router.post("/reset-password-verification-code", async(req, res)=> {
    try {
            await User.findOne({email: req.body.email, passwordResetCode:req.body.code}).then(async(response)=> {
                if(response) {

                    res.json({
                        "payload": "Correct reset password code",
                        "responseCode": "correct reset password code",
                        "code": 0,
                        "description": "Correct reset password code, change your password",
                        "errors": [
                            ""
                        ],
                        "hasErrors": false
                    })
                }else {
                    res.json({
                        "payload": "Incorrect code",
                        "responseCode": "User not found",
                        "code": 1,
                        "description": "Incorect Code",
                        "errors": [
                            "Ypu sending the wrong email address"
                        ],
                        "hasErrors": true
                    })
                }
            })
    }catch (error) {
        res.json({
            "payload": "Unresolved error occur while creating account",
            "responseCode": "unknown error",
            "code": 1,
            "description": "Unresolved error occure while creating account",
            "errors": [
                "Unresolved error occure while creating account"
            ],
            "hasErrors": true
        })
    }
})


router.post("/change-password", async(req, res)=> {
    try {

        const passsword = req.body.password
        const confrimPassword = req.body.confirmPassword

        const regularExpression =  new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$`);
        if(!regularExpression.test(passsword)) {
            res.send("Password must contain spacial character")
            
        }else {
            
                    if(passsword === confrimPassword) {
                        const salt = await bycrpt.genSalt(10)
                        const hashedPassword = await bycrpt.hash(req.body.password, salt)
                        
                        await User.findOneAndUpdate({email:req.body.email, id:req.body.id}, {$set: {password : hashedPassword}})
                        res.json({
                            "payload": "Password successfully changed",
                            "responseCode": "password successfully chnaged",
                            "code": 0,
                            "description": "Password successfully changed",
                            "errors": [
                                "Password successfully changed"
                            ],
                            "hasErrors": false
                        })
                    }else {
                        res.json({
                            "payload": "Password not match",
                            "responseCode": "Password not match",
                            "code": 1,
                            "description": "Password not match",
                            "errors": [
                                "Password not match"
                            ],
                            "hasErrors": true
                        })
                    }
        }
    }catch (error) {
        res.json({
            "payload": "Unresolved error occur while creating account",
            "responseCode": "unknown error",
            "code": 1,
            "description": error,
            "errors": [
                "Unresolved error occure while creating account"
            ],
            "hasErrors": true
        })
    }
})


module.exports = router