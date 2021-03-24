const tmi = require('tmi.js');
const fs = require('fs');
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
      'themrsark'
    ]
  };

const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);


client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if(commandName.includes("hates onions") || commandName.includes("hates onion")){
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
    }
    else if(commandName.includes("onyon_bot")){
        client.say(target, `Das me`);
        console.log(`* Executed ${commandName} command`);
    }
    else if(commandName==='!stats'){
        const res = getStats(target);
        client.say(target,res);
        console.log(`* Executed ${commandName} command`);
    }
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
    else if(commandName.substring(0,4)==='!pat'){
        const user = commandName.split(" ");
        if(user.length ===2){
            client.say(target,`There , there ${user[1]} `);
            console.log(`* Executed ${commandName} command`);
        }
        
    }
    else {
        console.log(`<${target}> : ${context['display-name']}: ${msg}`);
    }

    

    findEmote(target,msg);

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

/*function getStats(channel){
    let rawdata = fs.readFileSync('JSON/Emotes.json');
    let res = JSON.parse(rawdata)[channel];
    //console.log(Object.keys(res).length);
    let top = {};
    for(var e in res){
        if(Object.keys(top).length<3){
            top[e]=res[e];
        } else{
            for(var i in top){
                if(res[e]>top)
            }
        }
    }
    for (let i = 0; i < 3; i++){
        for(var e in res){ 
            
        }
    }

    return JSON.stringify(res).replace(/[}{]/g,"")
    
}*/