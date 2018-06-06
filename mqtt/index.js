const mosca = require('mosca')
const mqtt = require('mqtt')
const Auth = require('./auth')

const { dbUrl: url } = require('../config/db')
const { localIP: IP, port, clientId } = require('../config/mqtt')

const Server = new mosca.Server({
	port,
	host: IP,
	backend: {
		type: 'mongo',
		url,
		pubsubCollection: 'mqtt',
		mongo: {}
	},
	persistence: {
		factory: mosca.persistence.Mongo,
		url
	},
	http: {
		bundle: true
	}
})

Server.on('ready', async () => {
	Server.authenticate = Auth.authenticate
	Server.authorizePublish = Auth.authorizePublish
	Server.authorizeSubscribe = Auth.authorizeSubscribe

	console.log('MQTT 服务器开启成功！1883 端口')
})

Server.on('clientConnected', client => {
	console.log('客户端连接: ', client.id)
})

Server.on('subscribed', (topic, client) => {
	console.log(`客户端订阅信息: ${topic}`)
})

Server.on('published', (packet, client) => {
	console.log(`客户端推送信息: ${packet.payload}`)
})

Server.on('clientDisconnecting', client => {
	console.log(`客户端正在断开连接: ${client}`)
})

Server.on('clientDisconnected', client => {
	console.log(`客户端已经断开连接: ${client}`)
})

Server.on('unsubscribed', (topic, client) => {
	console.log(`客户端取消订阅信息: ${client} 主题: ${topic}`)
})