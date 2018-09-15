/*
Functions to validate values
*/

const isEmpty = (obj) => {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

const isValidTweet = (tweetBody) => {
    if(tweetBody !== undefined && tweetBody !== null && tweetBody !== ""){
        return true;
    } 
    return false;
}

module.exports ={
    isEmpty, isValidTweet
}