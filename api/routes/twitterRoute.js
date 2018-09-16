const express = require('express');
const router = express.Router();
const TwitterPackage = require('twitter');

const secret = require('../../secret');
const quotes = require('../util/quotes');
const validate = require('../util/validate');

const Twitter = new TwitterPackage(secret);

router.post('/', (req, res, next) => {
    let tweetBody;
    
    if(validate.isEmpty(req.body)) {
        // request body is empty
        tweetBody = quotes[Math.floor(Math.random() * 5)];
    } else { 
        if(validate.isValidTweet(req.body.message)) {
            tweetBody = req.body.message;
        } else {
            // invalid value in tweet message
            res.status(500).json({
                error: {
                    message: "Value missing for message in body"
                }
            });
            return;
        }
    }
    
    Twitter.post('/statuses/update', {status: tweetBody})
    .then((tweet, resp)=>{
            res.status(200).json({
                tweet: tweet.text
            });
    })
    .catch((err)=>{
        if(err){
            res.status(500).json({
                error: {
                    message: err[0].message
                }
            })
        }
    });
});

router.get('/search', (req, res, next) => {

    if(validate.isEmpty(req.query)){
        res.status(500).json({
           error: {
            message: "No query parameter found",
            usage: "/search?q="
         }
        });
        return;
    }

    if(!validate.isValidTweet(req.query.q)){
        res.status(500).json({
            error: {
             message: "Query parameter empty"
          }
         });
         return;
    }

    // limiting the searc result count to 5
    let params = {
        q: "#"+req.query.q,
        lang: 'en',
        count: 5
    }

    Twitter.get('/search/tweets', params)
    .then((tweet, resp)=>{

        // construct an array of tweets
        let tweets = [];
        tweet.statuses.forEach((ele)=> {
            let obj = new Object({
                "id":ele.id_str,
                "tweet":ele.text
            });
            tweets.push(obj);
        });

        res.status(200).json({
            'length':tweets.length,
            'tweets':tweets
        });
    })
    .catch((err)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
    })
});


module.exports = router;
