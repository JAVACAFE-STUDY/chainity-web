const express = require('express'),
    router = express.Router(),
    path = require('path');

router.get('/', (req, res, next) => {
    res.render('./demo/index.html');
    // res.sendFile(path.join(__dirname+'/about.html'));
});

module.exports = router;