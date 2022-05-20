require('dotenv').config()
const got = require('got')
const { ChatClient, ClientError } = require('dank-twitch-irc'),
	{ channel } = require('./settings.json')
const humanizeDuration = require('humanize-duration')

let client = new ChatClient({
	username: 'mldsbt',
	password: '',

	rateLimits: 'verifiedBot',
	connection: {
		type: 'websocket',
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
})

client.connect()

client.joinAll(channel)
console.log(channel)
console.log('connected')

const runTime = new Date().toString()

let counter = 0

client.on('PRIVMSG', async (msg, self) => {
	const prefix = '~'
	const args = msg.messageText.slice(1).split(' ')
	const command = args.shift().toLowerCase()
	const size = args[1]
	const size2 = args[0]
	let isMod = msg.isMod
	let isBroadcaster = msg.channelName === msg.senderUsername

	if (msg.messageText.startsWith(prefix)) {
		if (command === 'xd') {
			client.say(msg.channelName, `forsen`)
		}

		if (command === 'ping') {
			const getUptime = new Date().getTime() - Date.parse(runTime)
			const botUptime = humanizeDuration(getUptime, { round: true })

			const delay = await getPingDelay()

			client.say(
				msg.channelName,
				`FeelsDankMan 🏓 Pong! Latency is ${delay}ms | Bot Uptime: ${botUptime} | RAM: ${Math.round(
					process.memoryUsage().rss / 1024 / 1024
				)}mb | Channels: ${Object.keys(client.joinedChannels).length}`
			)
		}
	}
})

async function getPingDelay() {
	const before = Date.now()
	await client.ping()
	const after = Date.now()
	return after - before
}
