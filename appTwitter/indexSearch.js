console.log(":::This the starting point for this project:::");
const fetch = require('node-fetch');
require('dotenv').config();


// Call API Twitter:
// Search/recent endpoint:
// -----------------------

const endpoint = 'https://api.twitter.com/2/tweets/search/recent';
const queryParams = {
    'query': 'from:nytimes',
    'max':  100,
    'tweet.fields': 'attachments,author_id,context_annotations,created_at,conversation_id,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,text,withheld',
    'expansions': 'author_id&user.fields=description'
};

const api_url =`${endpoint}?query=${queryParams.query}&max_results=${queryParams.max}&tweet.fields=${queryParams['tweet.fields']}&expansions=${queryParams.expansions}`;
//console.log(api_url);

async function getapi() {

    const optionsGet = {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${process.env.Bearer_Token}`}
    };

    // Storing response
    const response = await fetch(api_url, optionsGet);
    //const response = await fetch(api_url);
    const data = await response.json();
    const jdata = JSON.stringify(data);
    console.log(data);

};

getapi();
