const express = require('express'),
    router = express.Router(),
    path = require('path');

router.get('/hello', (req, res, next) => {
    res.render('./sample/hello.html');
    // res.sendFile(path.join(__dirname+'/about.html'));
});

module.exports = router;