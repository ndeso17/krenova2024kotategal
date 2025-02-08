const express = require("express");
const router = express.Router();

const contollerLogin = require("../Controllers/Auth/login");
router.post("/login", contollerLogin);
const controllerRegister = require("../Controllers/Auth/register");
router.post("/register", controllerRegister);
const controllerVerifikasiOperator = require("../Controllers/Auth/verifikasiOperator");
router.get("/verifyoperator", controllerVerifikasiOperator);

module.exports = router;
