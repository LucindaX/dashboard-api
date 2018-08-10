var express = require('express');
var router = express.Router();

var api = require('../api');

router.get('/topActiveUsers', api.getTopActiveUsers);
//router.get('/users', db.getUser);

module.exports = router;
