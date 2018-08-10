var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/topActiveUsers', db.getTopActiveUsers);
//router.get('/users', db.getUser);

module.exports = router;
