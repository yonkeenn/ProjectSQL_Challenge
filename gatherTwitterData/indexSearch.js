console.log(":::This the starting point for this project:::");
const fetch = require('node-fetch');
require('dotenv').config();


// Call API Twitter:
// search/recent endpoint:
// -----------------------

const endpoint = 'https://api.twitter.com/2/tweets/search/recent';
const queryParams = {
    'query': '("heat pump" OR "heat pumps") lang:en -is:retweet',
    'tweet.fields': 'author_id,context_annotations,created_at,entities,id,lang,public_metrics,source,text',
    'expansions': 'author_id&user.fields=description',
    'max':  10
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
    try {
        const response = await fetch(api_url, optionsGet);
        const response_json = await response.json();
        const dataJson = JSON.stringify(response_json);
        //console.log(Object.keys(response_json));
        //console.log(response_json['data'][5]);
        //console.log(response_json['includes']['users'][0]);
        //console.log(response_json['meta']);
        for (let key in response_json){
            if (key == 'data'){
                console.log(Object.keys(response_json[key]['0']));
            }
            
        };
    } catch(e) {
        console.log(e);
        throw e;
    };

    
};  


getapi();
