//  import packages need in the application 
const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()


const router = require("express").Router()

// importing router from the routes folders
const authRoute = require("./src/routes/auth/auth-route")
const verificationRoute = require("./src/routes/auth/email-verification")
const passwordReset = require("./src/routes/auth/forgot-password")
const loginRoute = require("./src/routes/auth/login")
const dashboard = require("./src/routes/pages/dashboard")
const journalRoute = require("./src/routes/journal/createjournal")
const chartRoute = require("./src/routes/journal/journalchart")
const exportJournal = require("./src/routes/journal/export-journal")
const strategyRoute = require("./src/routes/strategy/create-strategy")
const watchListRoute = require("./src/routes/watchlist/watchlist")
const profileRoute = require("./src/routes/profile/profile")

// MIDDLEWARES IN THE APLLICATION 
const app = express()

//  express json middleware 
app.use(express.json())

//  cors middleware to alllow all origin 
app.use(cors())

// using the router imported 
app.use('/auth', authRoute)
app.use('/auth', verificationRoute)
app.use('/auth', passwordReset)
app.use('/auth', loginRoute)
app.use('/fx-journal', dashboard)
app.use('/fx-journal', journalRoute, chartRoute, exportJournal )
app.use("/fx-journal/strategy/", strategyRoute)
app.use("/fx-journal/watchlist", watchListRoute)
app.use("/fx-journal/edit-profile", profileRoute)



app.get("/test", async(req, res)=> {
    res.sendFile(__dirname + "/index.html")
})

//  MONGOOSE CONNECTION TO DATABASE 

// connecting to mongooose database
const uri = process.env.MONGODB_CONNECTION_STRING;
const url = "mongodb://localhost:27017/fxJournal"


mongoose.Promise = global.Promise

mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> {
        console.log("database connected")
    })

// LISTENING TO PPORT 3000
app.listen(3000, ()=> {
    console.log("Connection successfull")
})