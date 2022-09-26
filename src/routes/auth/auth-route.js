const router = require("express").Router()
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer')
const sendVerificationMail = require("../../controlers/mailer/verificationMail")
require('dotenv').config()
// require("../../middlewares/verification-mail")

// import user model
const User = require("../../models/user/user-model")

router.post("/create-new-user", async(req, res)=> {
    try {

       User.findOne({email : req.body.email}).then((data)=> {
        if(data) {
            res.json({
                "payload": "Email Already Exist",
                "totalCount": 0,
                "responseCode": "Bad Request",
                "code": 0,
                "description": "Email Already Exist",
                "errors": [
                  ""
                ],
                "hasErrors": true
              })

            console.log("email already exist")
        }else {

            proceedUserReg()
        }
       })

        async function proceedUserReg() {
        const salt =  await bcrypt.genSalt(10)
            const hashedPassword =  await bcrypt.hash(req.body.password, salt)
    
            const newUser = await new User({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : hashedPassword
              })
              
              const user = req.body
              let information 
            sendVerificationMail(user, info=> {
                console.log(`Message has been sent successfilly  and the id is ${info.messageId} `)
                information = info
              })
              const saveUser =  await newUser.save()
              
              res.status(200).json(
                  {
                      "payload": "Registration Successfull",
                      "responseCode": "user created successfully",
                      "code": 0,
                      "description": "Registration successfull, check your mail to verify your account",
                      "errors": [
                        ""
                      ],
                      "hasErrors": false
                    }
              )
       }
       
    }catch (err) {
        res.status(400).json(
            {
                "payload": "Unresolved error occur while creating account",
                "responseCode": "unknown error",
                "code": 1,
                "description": "Unresolved error occure while creating account",
                "errors": [
                  "Unresolved error occure while creating account"
                ],
                "hasErrors": true
              }
        )
    }
})



router.get('/all', async(req, res)=>{
    const allData = await User.find().select("firstname lastname email phone avatar")
    res.json({
        "totalCount" : allData.length,
        "payload": [allData]
    })
})




module.exports = router