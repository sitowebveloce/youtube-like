// Require
const {
    google
} = require('googleapis');
// Youtube key authentication
const yt = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_KEY
});
// GET ALL VIDEOS
exports.getVideos = async (req, res, next) => {
    try {
        // Vars init
        let next = '';
        let prev = '';
        let total = 0;
        let perPage = 0;
        let q = 'pop'; // QUERY STRING
        // Search parameters
        const ytRes = await yt.search.list({
            part: 'snippet',
            maxResults: 12, // MAX RESULTS
            type: 'video',
            order: 'viewCount',
            q: q, // query to search
        });
        if (ytRes) {
            // Show Results
            // Define Channels
            let channels = ytRes.data.items;
            // If channels is empty
            if (channels.length === 0) {
                // console.log('No channel found.');
                // Return Response False 
                return res.render('index.ejs', {
                    success: false,
                    next,
                    prev,
                    total,
                    perPage,
                    q,
                    data: []
                });
            }

            // Define next and prev navigation
            if (ytRes.data.nextPageToken) {
                next = ytRes.data.nextPageToken;
            }
            if (ytRes.data.prevPageToken) {
                prev = ytRes.data.prevPageToken;
            };
            // Define total per page results
            total = ytRes.data.pageInfo.totalResults;
            perPage = ytRes.data.pageInfo.resultsPerPage;
            // Return Response 
            return res.render('index.ejs', {
                success: true,
                next,
                prev,
                total,
                perPage,
                q,
                data: channels
            });
        }

    } catch (error) {
        if (error) throw error;
    }
}

// POST SEARCH VIDEOS
exports.searchVideos = async (req, res, next) => {
    try {
        // Vars init
        let next = '';
        let prev = '';
        let total = 0;
        let perPage = 0;
        let q = '';
        // Destructuring search key
        const {
            search
        } = req.body;
        // query is = to search key
        q = search;
        // Set search parameters
        const ytRes = await yt.search.list({
            part: 'snippet',
            maxResults: 12,
            type: 'video',
            order: 'viewCount',
            q: q // query to search
            // pageToken: next 
        });
        // If results
        if (ytRes) {
            // Show Results
            // Define Channels
            let channels = ytRes.data.items;
            // If channels is empty return array empty
            if (channels.length === 0) {
                // console.log('No channel found.');
                // responde
                // Return Response 
                return res.render('index.ejs', {
                    success: false,
                    next,
                    prev,
                    total,
                    perPage,
                    q,
                    data: []
                });
            } else {
                // If results is no empty
                //channels.map(y => {
                // Crate link
                //console.log(`https://www.youtube.com/watch?v=${y.id.videoId}`)

                // Define Pagination next and prev
                if (ytRes.data.nextPageToken) {
                    next = ytRes.data.nextPageToken;
                }
                if (ytRes.data.prevPageToken) {
                    prev = ytRes.data.prevPageToken;
                }
                // Define Total per page results
                total = ytRes.data.pageInfo.totalResults;
                perPage = ytRes.data.pageInfo.resultsPerPage;
                // });
                // Return Response 
                return res.render('index.ejs', {
                    success: true,
                    next,
                    prev,
                    total,
                    perPage,
                    q,
                    data: channels
                });
            }
        }
    } catch (error) {
        if (error) throw error;
    }
}

// GET NAVIGATION
exports.navVideos = async (req, res, next) => {
    try {
        // Vars init
        let next = '';
        let prev = '';
        let total = 0;
        let perPage = 0;
        let pageCode = req.params.id;
        let q = req.params.q;
        // console.log(pageCode);
        // console.log(q);
        // Search parameters
        const ytRes = await yt.search.list({
            part: 'snippet',
            maxResults: 12,
            type: 'video',
            order: 'viewCount',
            q: q, // query to search
            pageToken: pageCode
        });
        if (ytRes) {
            // Show Results define channels
            let channels = ytRes.data.items;
            if (channels.length === 0) {
                // console.log('No channel found.');
                // Return Response 
                return res.render('index.ejs', {
                    success: false,
                    next: '',
                    prev: '',
                    total: 0,
                    perPage: 0,
                    data: []
                });
            } else {
                // Loop
                //channels.map(y => {
                // Crate link
                //console.log(`https://www.youtube.com/watch?v=${y.id.videoId}`)
                // });

                // Pagination
                if (ytRes.data.nextPageToken) {
                    next = ytRes.data.nextPageToken;
                }
                if (ytRes.data.prevPageToken) {
                    prev = ytRes.data.prevPageToken;
                };
                // Total results
                total = ytRes.data.pageInfo.totalResults;
                perPage = ytRes.data.pageInfo.resultsPerPage;

                // Return Response 
                return res.render('index.ejs', {
                    success: true,
                    next,
                    prev,
                    total,
                    q,
                    perPage,
                    data: channels
                });
            }
        }
    } catch (error) {
        if (error) throw error;
    }
};