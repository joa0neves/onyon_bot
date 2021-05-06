/*const https=require('https')
const fs = require('fs');


const userList = getViewerList();

//let data = JSON.stringify(userList,null,2);
//console.log(JSON.stringify(userList,null,2))
//fs.writeFileSync('JSON/test.json', userList);

console.log(userList);








function getViewerList(){
    https.get('https://tmi.twitch.tv/group/user/hutch/chatters', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        fs.writeFileSync('JSON/test.json', JSON.parse(data).chatters); //JSON.parse(data).chatters
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}*/

const fs = require('fs');

const reg=new RegExp("\n","g")

var data = fs.readFileSync('Txt/facts2.txt', 'utf8').toString();



const factsData = data.split(reg);

let i =450;
let rawdata = fs.readFileSync('JSON/facts.json');
let facts = JSON.parse(rawdata);

for (var j = 0; j<factsData.length;j++){
    facts[`${i}`]=factsData[j];
    i++;
}

;

let data2 = JSON.stringify(facts,null,2);
fs.writeFileSync(`JSON/facts.json`, data2);





