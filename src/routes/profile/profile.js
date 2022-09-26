const router = require("express").Router()
const ensureToken = require("../../controlers/token/ensureToken")
const jwt = require("jsonwebtoken")
const User = require("../../models/user/user-model")
const Journal = require("../../models/user/journal-model")
const Watchlist = require("../../models/user/watchlist-model")
const cloudinary = require("../../middlewares/cloudinary")
const upload = require("../../middlewares/upload")

router.put("/phone/:id", ensureToken, async (req, res) => {
    try {
      await jwt.verify(req.token, "my_screte_code", async function (err, data) {
        if (err) {
          res.sendStatus(403);
        } else {
            await User.findById({_id: req.params.id}).then(async(response)=> {

               if(response) {

                const phone = await User.updateOne({_id:req.params.id}, {$set:{phone : req.body.phone}})

                res.json({
                    payload: "Phone updated successfully",
                    responseCode: "string",
                    code: 0,
                    description: "Phone updated successfully",
                    errors: ["Phone updated successfully"],
                    hasErrors: false,
                });

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
      });
    } catch (error) {
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

router.put("/address/:id", ensureToken, async (req, res) => {
    try {
      await jwt.verify(req.token, "my_screte_code", async function (err, data) {
        if (err) {
          res.sendStatus(403);
        } else {
            await User.findById({_id: req.params.id}).then(async(response)=> {

               if(response) {

                const phone = await User.updateOne({_id:req.params.id}, {$set:{address : req.body.address}})

                res.json({
                    payload: "Address updated successfully",
                    responseCode: "string",
                    code: 0,
                    description: "Address updated successfully",
                    errors: ["Address updated successfully"],
                    hasErrors: false,
                });

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
      });
    } catch (error) {
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

router.put("/d-o-b/:id", ensureToken, async (req, res) => {
    try {
      await jwt.verify(req.token, "my_screte_code", async function (err, data) {
        if (err) {
          res.sendStatus(403);
        } else {
            await User.findById({_id: req.params.id}).then(async(response)=> {

               if(response) {

                const phone = await User.updateOne({_id:req.params.id}, {$set:{birthdate : req.body.birthdate}})

                res.json({
                    payload: "Date of birth updated successfully",
                    responseCode: "string",
                    code: 0,
                    description: "Date of birth updated successfully",
                    errors: ["Date of birth updated successfully"],
                    hasErrors: false,
                });

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
      });
    } catch (error) {
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

router.put("/name/:id", ensureToken, async (req, res) => {
  try {
    await jwt.verify(req.token, "my_screte_code", async function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
          await User.findById({_id: req.params.id}).then(async(response)=> {

             if(response) {

              const phone = await User.updateOne({_id:req.params.id}, {$set:{firstname : req.body.firstname, lastname : req.body.lastname}})

              res.json({
                  payload: "Name updated successfully",
                  responseCode: "string",
                  code: 0,
                  description: "Name updated successfully",
                  errors: ["Name updated successfully"],
                  hasErrors: false,
              });

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
    });
  } catch (error) {
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

router.put("/upload/:id", ensureToken, upload.single('profileImage'), async (req, res) => {
  try {
    await jwt.verify(req.token, "my_screte_code", async function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
          await User.findById({_id: req.params.id}).then(async(response)=> {

             if(response) {

              const result = await cloudinary.uploader.upload(req.file.path)
              const phone = await User.updateOne({_id:req.params.id}, {$set:{avatar : result.secure_url, cloudinary_id : result.public_id}})

              res.json({
                  payload: "Profile uploaded successfully",
                  responseCode: "string",
                  code: 0,
                  description: "Profile uploaded successfully",
                  errors: ["Profile uploaded successfully"],
                  hasErrors: false,
              });

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
    });
  } catch (error) {
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