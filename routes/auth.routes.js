const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");

// LOGIN
router.post("/login", authCtrl.login);

module.exports = router;
