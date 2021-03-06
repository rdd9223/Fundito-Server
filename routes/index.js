var express = require('express');
var router = express.Router();

require('./scheduler');
router.use('/auth', require('./auth'));
router.use('/storefund', require('./storefund'));
router.use('/mypage', require('./mypage'));
router.use('/storeInfo', require('./storeInfo'));
router.use('/funding', require('./funding'));
router.use('/notification', require('./notification'));
router.use('/friend', require('./friend'));

module.exports = router;
