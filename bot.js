require('dotenv').config();

const { ChatClient } = require("dank-twitch-irc"),

{ channel} = require('./settings.json');

let client = new ChatClient({
    username: "mldsbt", 
    password: "oauth:lbdqs19etp8ytexgoz8se0bhzoy4up", 

    rateLimits: "verifiedBot",
    connection: {
        type: "websocket",
        secure: true,
    },
    rateLimits: {
      highPrivmsgLimits: 100,
      lowPrivmsgLimits: 20,
    },
    maxChannelCountPerConnection: 100, 
    connectionRateLimits: {
      parallelConnections: 50, 
      releaseTime: 1000, 
    },
    requestMembershipCapability: true, 
    installDefaultMixins: false,
    ignoreUnhandledPromiseRejections: true, 
  });


  client.connect()
 
  client.joinAll(channel)
    console.log(channel)
    console.log("connected")
    console.log()

    const got = import('got');

    const runTime = new Date().toString()
    
    const humanizeDuration = require("humanize-duration");
    
    const roomStateTracker = new RoomStateTracker()
 
 
    let counter = 0;

 
client.on("PRIVMSG", async (msg, self) => {
 
    const prefix = "~";
    const args = msg.messageText.slice(1).split(' ')
    const command = args.shift().toLowerCase();
    const size = args[1]
    const size2 = args[0]
    let isMod = msg.isMod;
    let isBroadcaster = msg.channelName === msg.senderUsername;


    if (msg.messageText.startsWith(prefix)) { 
 
           
        

    if (command === "xd") {
        client.say(msg.channelName, `forsen`)
    }

    if (command === "ping") {
        const getUptime = new Date().getTime() - Date.parse(runTime)
        const botUptime = humanizeDuration(getUptime, { round: true })
    
        client.ping(channel).then(function (data) {
            console.log(data);
        
        
            client.say(msg.channelName, `FeelsDankMan 🏓 Pong! Latency is ${Math.floor(Math.round(data * 1000))}ms | Bot Uptime: ${botUptime} | RAM: ${Math.round(process.memoryUsage().rss / 1024 / 1024)}mb | Channels: ${Object.keys(client.Twitch.roomStateTracker.channelStates).length}`)
        })
    }

}});
