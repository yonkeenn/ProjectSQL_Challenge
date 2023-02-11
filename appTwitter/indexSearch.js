console.log(":::This the starting point for this project:::")
const fs = require('fs');
var fetch = require('node-fetch');
 
// Call API Twitter:
// Search/recent endpoint:
// -----------------------
//const api_url = 'https://api.twitter.com/2/tweets/search/recent?query=-is%3Aretweet%20has%3Ageo%20(from%3ANWSNHC%20OR%20from%3ANHC_Atlantic%20OR%20from%3ANWSHouston%20OR%20from%3ANWSSanAntonio%20OR%20from%3AUSGS_TexasRain%20OR%20from%3AUSGS_TexasFlood%20OR%20from%3AJeffLindner1)';
//const api_url = "https://api.twitter.com/2/tweets/counts/recent";
//const api_url = "https://api2.binance.com/api/v3/ticker/24hr";
//const api_url = 'https://api.twitter.com/2/tweets/search/recent?query=from:twitterdev';
//const api_url = 'https://api.twitter.com/2/tweets?ids=1212092628029698048&tweet.fields=attachments,author_id,context_annotations,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,text,withheld&expansions=referenced_tweets.id';
//const api_url = 'https://api.twitter.com/2/tweets/search/recent';
//const api_url = 'https://api.twitter.com/2/tweets/search/recent?query=from:twitterdev&tweet.fields=public_metrics';
  
let enviroments = {
    consumer_key:         'wjt04n7xmXFl0uEUs9HhDr36y',
    consumer_secret:      'MYx7fwmqg5ZmjKEGey3eOycxCfaUQ6bS3Byte0GscST3hHY2XF',
    access_token:         '2701401562-xYEQJqyLA4EjXjzsKpDa19z98akfAZGpGgW8AKn',
    access_token_secret:  'yWMiUoj82l3yimOpUOpzo7sd88gc9JbzpBCdnLUTognMw',
    Bearer_Token: 'AAAAAAAAAAAAAAAAAAAAALO5lgEAAAAAAsvBLqrmwTES6LVIUxrcjVSLKrQ%3DQgRgvx2BGEwjUOEApVvdpndYbWViKsEAGbzENV2FVCF3v745Qx'
};

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
            "authorization": `Bearer ${enviroments.Bearer_Token}`}
    };

    // Storing response
    const response = await fetch(api_url, optionsGet);
    //const response = await fetch(api_url);
    const data = await response.json();
    const jdata = JSON.stringify(data);
    console.log(data);

   //fs.writeFile("test.json", jdata, function(err) {
   //if (err) {
   //    console.log(err);
   //}
   //});
};

//console.log(`Bearer ${config.Bearer_Token}`);
// getapi();