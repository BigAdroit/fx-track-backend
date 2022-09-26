const router = require("express").Router()
const User = require("../../models/user/user-model")
const Journal = require("../../models/user/journal-model")
const XLSX = require("xlsx")
const jwt = require("jsonwebtoken")
const ensureToken = require("../../controlers/token/ensureToken")


router.get('/user-excelsheet/user/:id', ensureToken, async(req, res)=> {
    try {

        jwt.verify(req.token, 'my_screte_code', async function(err, data) {
            if(err) {
                res.sendStatus(403)
            }else {
                    // res.send("hello")
                await User.findById({_id : req.params.id}).then(async (response)=> {
                    if(response) {
                        // res.send("how far")
                       
                       await Journal.find({user_id : req.params.user_id}).then(async (data)=> {
                        // res.send("hello")
                        if(data) {
                            
                            convertJsontoSheet(data)
                        }else {
                            res.send("Data not found")
                        }
                            // res.send("seyilo")
                        }).catch((err)=> {
                            res.json({
                                "error" : err
                            })
                        })
                    }

                }).catch((error)=> {
                    res.send(error)
                })
            }
        })

    }catch(error) {
        res.send(error)
    }
} )

const convertJsontoSheet=(data)=> {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, worksheet, "journal")

    // buffer
    XLSX.write(workBook, {bookType:'xlsx', type:"buffer"})

    // binary
    XLSX.write(workBook, {bookType: 'xlsx', type:"binary"})
    XLSX.writeFile(workBook, "studentData")
}

module.exports = router