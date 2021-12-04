const { request } = require("express");
const express = require("express");
const router = express.Router();

router.get("/menu", async (req, res) => {
    return res.render('menu');
});

router.get("/breakfast", async (req, res) => {
    return res.render('breakfast');
});

router.get("/lunch", async (req, res) => {
    return res.render('lunch');
});

router.get("/diner", async (req, res) => {
    return res.render('diner');
});

router.get("/drinks", async (req, res) => {
    return res.render('drinks');
});

router.post("/set-info", async (req, res) => {

  var Fname = req.body.fname;
  var telNum = req.body.telNum;
  var Email = req.body.inputEmail3;
  var xDate = Date.now();
  var NumSeg = Date.now();
  var SupportReason = req.body.floatingTextarea != '' ? req.body.floatingTextarea : 'No hay notas de detalles.' ;

  await SendEmails.sendEmailInfo(Email, Fname, NumSeg, xDate, telNum,SupportReason);

  //console.log(req.body);
  //console.log(SupportReason);
  return res.redirect("/cmpltd");
  //await dff.dialogflowFulfillment(request, response);

});

module.exports = router;
