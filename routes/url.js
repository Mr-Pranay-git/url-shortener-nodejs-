const express = require('express');
const {handleGenerateNewShortURL,
    handleGetAnalytics
} = require("../controller/url")
const router = express.Router();

router.post("/", handleGenerateNewShortURL);  //  http://localhost:8000    /url /

router.get('/analytics/:shortId',handleGetAnalytics)
module.exports = router;
