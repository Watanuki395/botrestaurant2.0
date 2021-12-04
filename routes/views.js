const { request } = require("express");
const express = require("express");
const router = express.Router();

router.get("/menu", async (req, res) => {
  return res.render('menu');
});

router.get("/inventarios", async (req, res) => {
  return res.render('sys_invent');
});

router.get("/rest", async (req, res) => {
  return res.render('sys_rest');
});

router.get("/factu", async (req, res) => {
  return res.render('sys_factu');
});

router.get("/educ", async (req, res) => {
  return res.render('sys_educ');
});

router.get("/sysemails", async (req, res) => {
  return res.render('sys_email');
});

router.get("/custm", async (req, res) => {
  return res.render('sys_custm');
});

router.get("/info", async (req, res) => {
  return res.render('req_info');
});
router.get("/cmpltd", async (req, res) => {
  return res.render('req_cmpltd');
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
