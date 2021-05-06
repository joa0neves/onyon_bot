const tmi = require('tmi.js');
const fs = require('fs');
const fetch = require("node-fetch");
//const language = require('@google-cloud/language');
require("dotenv").config();

// Define configuration options
const opts = {
    identity: {
      username: 'onyon_bot',
      password: process.env.OAUTH_TOKEN
    },
    channels: [
      'umlaut_a',
      'hutch',
      'spiral3y3s',
      'j15y9rkp',
      'themrsark',
      'trexcapades'
    ]
  };

const client = new tmi.client(opts);

const fileName = `${genFileName()}-UserData.json`;

if(!fs.existsSync(`JSON/${fileName}`)) {
    fs.writeFileSync(`JSON/${fileName}`, "{}");
}



//const googleClient = new language.LanguageServiceClient();

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);


client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    if(context['display-name'] === 'j15y9rkp' && target==='#umlaut_a'){
        let rawdata = fs.readFileSync(`JSON/${fileName}`);
        let userData = JSON.parse(rawdata);
        if(!userData["#umlaut_a"].hasOwnProperty('j15y9rkp') && target==="#umlaut_a"){
            client.say(target,'!itsyaboyj15');
        }

    }

    // If the command is known, let's execute it
    if(commandName.includes("hates onions") || commandName.includes("hates onion") || commandName.includes("hate onions") || commandName.includes("hate onion")){
        client.say(target, `Who the fuck hates onyons? Is it you ${context['display-name']}? I'll have you know that I know some mean fucking onyons! They will you make cry so hard you pee your pants from how are they will make you cry! No joke! You'll beg for some regular ass onyons when you meet these onyons. THEY WILL FUCK YOU UP!`);
        console.log(`* Executed ${commandName} command`);
    }
    else if (/*commandName === 'onion'*/ commandName.includes("onion")) {
        client.say(target, `onyon, you rube!`);
        console.log(`* Executed onyon command`);
    } 
    else if(commandName==='!creator'){
        client.say(target, `My Creator is @Spiral3y3s`);
        console.log(`* Executed ${commandName} command`);
    }
    else if(commandName==='!hungry'){
        client.say(target, `There you go ${context['display-name']} : DoritosChip DoritosChip DoritosChip DoritosChip `);
        console.log(`* Executed ${commandName} command`);
    }
    else if(commandName==='!j15'){
        client.say(target, `Sub to J15!`);
        console.log(`* Executed ${commandName} command`);
    }
    else if(commandName==='!plot'){
        client.say(target, `Wouldn't it be funny if Spiral3y3s used me to get an account with VIP without having to spend Fake Internet Points umlautHmm`);
        console.log(`* Executed ${commandName} command`);
    }
    else if(commandName==='!becute'){
        client.say(target, `peepoShy`);
        console.log(`* Executed ${commandName} command`);
    }else if(commandName==='!topChatter'){
        client.say(target, `${getTopChatter(target,fileName)}`);
        console.log(`* Executed ${commandName} command`);
    }
    else if(commandName.includes("onyon_bot")){
        client.say(target, `Das me`);
        console.log(`* Executed ${commandName} command`);
    }
    /*else if(commandName==='!stats'){
        const res = getStats(target);
        client.say(target,res);
        console.log(`* Executed ${commandName} command`);
    }*/
    else if(commandName.substring(0,5)==='!stat'){
        const em = commandName.split(" ");
        if(em.length ===2){
            const number = getStat(target,em[1]);
            if(number==="not found"){
                client.say(target,`Can't find ${em[1]}`);
            } else{
                client.say(target,`${em[1]} has been used ${number} times during my lifespan`);
            }
            console.log(`* Executed ${commandName} command`);
        }
        
    }
    else if(commandName.substring(0,5)==='!info'){
        const em = commandName.split(" ");
        if(em.length ===2){
            if(em[1].substring(0,1)==='@'){
                em[1]=em[1].substring(1);
            }
            const info = getInfo(target,em[1],fileName);
            if(info==="not found"){
                client.say(target,`I haven't met ${em[1]} yet`);
            } else{
                client.say(target,info);
            }
            console.log(`* Executed ${commandName} command`);
        }else{
            let info = getInfo(target,context['display-name'],fileName).replace(context['display-name'],`you, ${context['display-name']}`);
            info=info.replace("Their","Your");
            client.say(target,info);
        }
        
    }
    else if(commandName.substring(0,4)==='!pat'){
        const user = commandName.split(" ");
        if(user.length ===2){
            client.say(target,`There , there ${user[1]} `);
            console.log(`* Executed ${commandName} command`);
        }
        
    }
    else if(commandName === '!fact'){
        client.say(target,`${getFact()}`);
    }
    else if(commandName.substring(0,6)==='!score'){
        const em = commandName.split(" ");
        if(em.length === 3){
            if(em[1].substring(0,1)==='@'){
                em[1]=em[1].substring(1);
            }
            if(em[1]!=context['display-name'] && parseInt(em[2])>=1 && parseInt(em[2])<=5){
                const score = calculateScore(target,em[1],parseInt(em[2]));
                if(score==="not found"){
                    client.say(target,`${em[1]} needs to participate in chat to be part of the score system`);
                }
                console.log(`* Executed ${commandName} command`);
            }else{
                client.say(target,"You can't score yourself. Scores must be between 1 and 5. Looking at you Tam.")
            }
            
        } 
    }
    else {
        const rawDate = new Date();
        console.log(`${rawDate.getHours()}:${rawDate.getMinutes()} || <${target}> : ${context['display-name']} : ${msg}`);
    }

    findEmote(target,msg);
    collectMessageData(target,context['display-name'],commandName,fileName);

}

function getFact(){
    num = `${Math.floor(Math.random() * 1452)}`;
    let rawdata = fs.readFileSync('JSON/facts.json');
    let facts = JSON.parse(rawdata); 
    return facts[num];
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function emoteCounter(channel,emote,num){
    let rawdata = fs.readFileSync('JSON/Emotes.json');
    let emotes = JSON.parse(rawdata);

    emotes[channel][emote]=emotes[channel][emote] + num;

    let data = JSON.stringify(emotes,null,2);
    fs.writeFileSync('JSON/Emotes.json', data);
}

function findEmote(channel,msg){
    let rawdata = fs.readFileSync('JSON/Emotes.json');
    let emotes = JSON.parse(rawdata);
    for(var e in emotes[channel]){
        if(msg.includes(e)){
            const reg = new RegExp(e,"g");
            emoteCounter(channel,e,msg.match(reg).length);
        }
    }
    return "not found"
}

function getStat(channel,emote){
    let rawdata = fs.readFileSync('JSON/Emotes.json');
    let emotes = JSON.parse(rawdata);
    if(emotes[channel].hasOwnProperty(emote)){
        return emotes[channel][emote];
    }else{
        return "not found";
    }
    
}

function collectMessageData(channel,user,msg,fileName){
    let rawdata = fs.readFileSync(`JSON/${fileName}`);
    let userData = JSON.parse(rawdata);
    const wordCount = msg.split(" ").length;

    if(!userData.hasOwnProperty(channel)){
        userData[channel]={};
        userData[channel][user]={"nMsg":1,"avgWordCount" : wordCount};
    }else if(!userData[channel].hasOwnProperty(user)){
        userData[channel][user]={"nMsg":1,"avgWordCount" : wordCount};
    }else{
        userData[channel][user]["avgWordCount"] = ((userData[channel][user]["nMsg"]*userData[channel][user]["avgWordCount"]) + wordCount)/(userData[channel][user]["nMsg"] + 1);
        userData[channel][user]["nMsg"] += 1;
    }
    let data = JSON.stringify(userData,null,2);
    fs.writeFileSync(`JSON/${fileName}`, data);
}

function getInfo(channel,user,fileName){
    let rawdata = fs.readFileSync(`JSON/${fileName}`);
    let userData = JSON.parse(rawdata);
    let rawdata2 = fs.readFileSync('JSON/UserScore.json');
    let userScore = JSON.parse(rawdata2);
    if(userData[channel].hasOwnProperty(user) && userScore[channel].hasOwnProperty(user)){
        return `I have seen ${userData[channel][user]["nMsg"]} messages from ${user}. With an average of ${Math.round(userData[channel][user]["avgWordCount"])} words per message. Their current score is ${userScore[channel][user]["score"]}`;
    }else if(userData[channel].hasOwnProperty(user) && !userScore[channel].hasOwnProperty(user)){
        return `I have seen ${userData[channel][user]["nMsg"]} messages from ${user}. With an average of ${Math.round(userData[channel][user]["avgWordCount"])} words per message. This user doesn't have a score yet`;
    }else{
        return "not found";
    }
}

function calculateScore(channel,user,score){
    let rawdata = fs.readFileSync('JSON/UserScore.json');
    let userScore = JSON.parse(rawdata);
    let rawdata2 = fs.readFileSync('JSON/UserData.json');
    let userData = JSON.parse(rawdata2);
    if(userData[channel].hasOwnProperty(user)){
        if (!userScore.hasOwnProperty(channel)){
            userScore[channel]={};
            userScore[channel][user]={"nScores" : 1, "score" : score}
        }else if(!userScore[channel].hasOwnProperty(user)){
            userScore[channel][user]={"nScores" : 1, "score" : score};
        }else{
            userScore[channel][user]["score"] = roundToTwo(((userScore[channel][user]["nScores"]*userScore[channel][user]["score"]) + score)/(userScore[channel][user]["nScores"] + 1));
            userScore[channel][user]["nScores"] += 1;
        }
        let data = JSON.stringify(userScore,null,2);
        fs.writeFileSync('JSON/UserScore.json', data);
    }else{
        return "notFound"
    }
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function getTopChatter(channel,fileName){
    let rawdata = fs.readFileSync(`JSON/${fileName}`);
    let userData = JSON.parse(rawdata);
    const chatters = userData[channel];
    let topChatter='';
    for(var i in chatters){
        if(topChatter === ''){
            topChatter=i;
        }else{
            if(chatters[i]["nMsg"]*chatters[i]["avgWordCount"]>=chatters[topChatter]["nMsg"]*chatters[topChatter]["avgWordCount"]){
                topChatter=i;
            }
        } 
    }
    return `The current top chatter is ${topChatter} with ${chatters[topChatter]["nMsg"]} messages.`;
}

function genFileName(){
    const rawDate = new Date();
    let month = "";
    switch(rawDate.getMonth().toString()){
        case "0":{
            month="Jan";
            break;
        }
        case "1":{
            month="Fev";
            break;
        }    
        case "2":{
            month="Mar";
            break;
        }
        case "3":{
            month="Apr";
            break;
        }
        case "4":{
            month="May";
            break;
        }
        case "5":{
            month="Jun";
            break;
        }
        case "6":{
            month="Jul";
            break;
        }
        case "7":{
            month="Aug";
            break;
        }
        case "8":{
            month="Sep";
            break;
        }
        case "9":{
            month="Oct";
            break;
        }
        case "10":{
            month="Nov";
            break;
        }
        case "11":{
            month="Dec";
            break;
        }
        default:{
            month="time's wack"
        }
    }
    return `${month}-${rawDate.getDate()}-${rawDate.getFullYear()}`;
}

function getUserList(){
    
}