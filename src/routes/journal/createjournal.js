const router = require("express").Router();
const ensureToken = require("../../controlers/token/ensureToken");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/user-model");
const Journal = require("../../models/user/journal-model");
const Strategy = require("../../models/user/strategy");
// const checkForUndefined = require("../../controlers/journal/journal-validator")

router.post("/create-journal", ensureToken, async (req, res) => {
  try {
    await jwt.verify(req.token, "my_screte_code", async function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        await User.findById({ _id: req.body.user_id })
          .then(async (response) => {
            if (response) {
              await Strategy.findById({ _id: req.body.strategy })
                .then(async (result) => {
                  if (result) {
                    const journal = await new Journal({
                      user_id: req.body.user_id,
                      currency_pair: req.body.currency_pair,
                      trade_date_time: req.body.trade_date_time,
                      profit_loss: req.body.profit_loss,
                      position_type: req.body.position_type,
                      lot_size: req.body.lot_size,
                      strategy: result.strategy_name,
                      timeframe: req.body.timeframe,
                      trading_session : req.body.trading_session,
                      entry_price: req.body.entry_price,
                      exit_price: req.body.exit_price,
                      stop_loss: req.body.stop_loss,
                      take_profit: req.body.take_profit,
                      risk_reward: req.body.risk_reward,
                      trade_setup: req.body.trade_setup,
                      comment: req.body.comment,
                    });

                    const saveJournal = await journal.save();
                    res.status(200).json({
                      payload: "Journal Added  Successfull",
                      responseCode: "Journal added successfully",
                      code: 0,
                      description: "You have sccessfully add to your journal",
                      errors: [""],
                      hasErrors: false,
                    });
                  }
                })
                .catch((error) => {
                  res.json({
                    payload: error,
                    responseCode: "string",
                    code: 1,
                    description: "Strategy not found, please register your strategy",
                    errors: [error, "Strategy not found, please register your strategy"],
                    hasErrors: true,
                  });
                });
            }
          })
          .catch((error) => {
            res.json({
              payload: error,
              responseCode: "string",
              code: 1,
              description: "User with the Id not found",
              errors: [error, "User with the id not found"],
              hasErrors: true,
            });
          });
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

router.get("/all/:id", async (req, res) => {
  const journal = await Journal.find();
  const userJournal = await Journal.find({ user_id: req.params.id });
  userJournal.forEach((item) => {
    let month = new Date(item.trade_date_time);
    console.log(month.getFullYear());
  });
  res.json({
    data: journal,
    user: userJournal,
  });
});

router.get("/getjournal/:id", ensureToken, async (req, res) => {
  try {
    jwt.verify(req.token, "my_screte_code", async function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        await User.findById({ _id: req.params.id })
          .then(async (response) => {
            if (response) {
              const userJournal = await Journal.find({
                user_id: req.params.id,
               
              }).sort({$natural : -1});
              res.json({
                payload: userJournal,
                totalCount: userJournal.length,
                responseCode: "string",
                code: 0,
                description: "Fetched successfully",
                errors: [""],
                hasErrors: false,
              });
            }
          })
          .catch((error) => {
            res.json({
              payload: error,
              responseCode: "string",
              code: 1,
              description: "User with the Id not found",
              errors: [error, "User with the id not found"],
              hasErrors: true,
            });
          });
      }
    });
  } catch (err) {
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

router.get(
  "/getjournal/:user_id/:journal_id",
  ensureToken,
  async (req, res) => {
    try {
      jwt.verify(req.token, "my_screte_code", async function (err, data) {
        if (err) {
          res.sendStatus(403);
        } else {
          await Journal.find({
            _id: req.params.journal_id,
            user_id: req.params.user_id,
          })
            .then((data) => {
              if (data) {
                res.json({
                  payload: data,
                  responseCode: "string",
                  code: 0,
                  description: "Fetched successfully",
                  errors: [""],
                  hasErrors: false,
                });
              }
            })
            .catch((error) => {
              res.json({
                payload: error,
                responseCode: "string",
                code: 1,
                description: "User with the Id not found",
                errors: [error, "User with the id not found"],
                hasErrors: true,
              });
            });
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
  }
);

module.exports = router;
