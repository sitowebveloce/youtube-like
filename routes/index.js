// Guide https://github.com/googleapis/google-api-nodejs-client/blob/master/samples/youtube/search.js#L24
// Require
const express = require('express');
const router = express.Router();
// Import controllers routes 
const {
    getVideos,
    searchVideos,
    navVideos
} = require('../controllers/index');

// ROUTES
router.get('/', getVideos) // GET ALL VIDEOS
    .post('/', searchVideos) // POST SEARCH VIDEOS
    .get('/page/:q/:id/', navVideos); //  NEXT OR PREV PAGE ROUTE

// Export 
module.exports = router;