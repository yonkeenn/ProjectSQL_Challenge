console.log(":::This the starting point for this project:::")
const fs = require('fs');
var fetch = require('node-fetch');
 

// Filtered stream endpoint:
// -----------------------
// 1. First add/delete rule with POST
// 2. Query data using the endpoint search/stream with GET

let enviroments = {
    consumer_key:         'wjt04n7xmXFl0uEUs9HhDr36y',
    consumer_secret:      'MYx7fwmqg5ZmjKEGey3eOycxCfaUQ6bS3Byte0GscST3hHY2XF',
    access_token:         '2701401562-xYEQJqyLA4EjXjzsKpDa19z98akfAZGpGgW8AKn',
    access_token_secret:  'yWMiUoj82l3yimOpUOpzo7sd88gc9JbzpBCdnLUTognMw',
    Bearer_Token: 'AAAAAAAAAAAAAAAAAAAAALO5lgEAAAAAAsvBLqrmwTES6LVIUxrcjVSLKrQ%3DQgRgvx2BGEwjUOEApVvdpndYbWViKsEAGbzENV2FVCF3v745Qx'
};

const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
const streamURL = 'https://api.twitter.com/2/tweets/search/stream';
 
// Edit rules as desired below
const rules = [{
    'value': 'dog has:images -is:retweet',
    'tag': 'dog pictures'
},
{
    'value': 'cat has:images -grumpy',
    'tag': 'cat pictures'
},
{
    'value': 'from:yonkeenn'
    //'tag': 'GoThere'
},

];

const optionsGet = {
    method: 'GET',
    headers: {
        "authorization": `Bearer ${enviroments.Bearer_Token}`}
};

const newRules = {
    "add": [
        {"value": "cat has:media", "tag": "cats with media"},
        {"value": "cat has:media -grumpy", "tag": "happy cats with media"},
        {"value": "meme", "tag": "funny things"},
        {"value": "meme has:images"}
      ]
};

const deleteRules = {
    "delete": {
        "ids": [
          "1623917042708500480"
        ]
      }
};

const optionsPost = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${enviroments.Bearer_Token}`}
    //body: JSON.stringify(dataPost)
};
// Functions
// JS version:
async function getAllRules(){
    try {
        const response = await fetch(rulesURL, optionsGet);
        const data = await response.json();
        //const jdata = JSON.stringify(data); Not used because js not find as object
        //console.log("Status Response: ", response.statusMessage, response.statusCode) --> Pending to update parameters
        //console.log(data);
        return data;
    } catch(error){
        console.log("Error: ", error);
    };
    
};

async function deleteAllRules(rules) {
    //console.log(rules["data"]);
    //console.log(Array.isArray(rules.data));
    if (!Array.isArray(rules.data)) {
        return null;
    }

    const ids = rules.data.map(rule => rule.id);

    const data = {
        "delete": {
            "ids": ids
        }
    }
    console.log("ids to be removed: ", data);

    const optionsPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${enviroments.Bearer_Token}`},
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(rulesURL, optionsPost);
        const data = await response.json();
        //const jdata = JSON.stringify(data);
        //console.log("Status Response: ", response.statusMessage, response.statusCode)
        //console.log(jdata);
        console.log("Rules's been removed!!!");
        return data;
    } catch(e){
        console.log("Error: ", error);
    };
    
};

async function setRules() {

    const data = {
        "add": rules
    }

    const optionsPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${enviroments.Bearer_Token}`},
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(rulesURL, optionsPost);
        const data = await response.json();
        //const jdata = JSON.stringify(data);
        //console.log("Status Response: ", response.statusMessage, response.statusCode)
        console.log(data);
        console.log("Rules are created!!!")
        return data;
    } catch(error){
        console.log("Error: ", error);
    };
};

async function streamConnect(retryAttempt) {
    
    const optionsGet = {
        method: 'GET',
        headers: {
            "User-Agent": "v2FilterStreamJS",
            "authorization": `Bearer ${enviroments.Bearer_Token}`},
        timeout: 20000
    };

    try {
        const response = await fetch(streamURL, optionsGet);
        const data = await response.json();
        //const jdata = JSON.stringify(data);
        //console.log("Status Response: ", response.statusMessage, response.statusCode)
        console.log(data);
        retryAttempt = 0;
        if (data.detail === "This stream is currently at the maximum allowed connection limit.") {
            console.log(data.detail)
            process.exit(1)
        } else {
            // Keep alive signal received. Do nothing.
            console.log("New Data Entry....")
            return data;
        }        
    } catch(error){
        console.log("Error Found: ", error);
        if (error === 'FetchError: Response timeout while trying to fetch https://api.twitter.com/2/tweets/search/stream (over 5000ms)') {
            console.log(error.code);
            //process.exit(1);
            // This reconnection logic will attempt to reconnect when a disconnection is detected.
            // To avoid rate limits, this logic implements exponential backoff, so the wait time
            // will increase if the client cannot reconnect to the stream. 
            setTimeout(() => {
                console.warn("A connection error occurred. Reconnecting...")
                streamConnect(++retryAttempt);
            }, 2 ** retryAttempt)
        } else {
            console.log(error.code);
            process.exit(1);
        }
    };

};

(async () => {
    let currentRules;

    try {
        // Gets the complete list of rules currently applied to the stream
        currentRules = await getAllRules();
        // console.log(currentRules);
        // Delete all rules. Comment the line below if you want to keep your existing rules.
        await deleteAllRules(currentRules);

        // Add rules to the stream. Comment the line below if you don't want to add new rules.
        await setRules();

    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    // Listen to the stream.
    streamConnect(0);
})();