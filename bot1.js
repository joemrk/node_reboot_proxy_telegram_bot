//proxyreboot
//proxy_reboot_bot
//Use this token to access the HTTP API: 1229564192:AAF-E3sQHOJbIAirfAep1dBpPutpf6FVG1k

import Telegraf from 'telegraf'
import {
  RebootNightmare
} from './nightmare.js'
import fs from 'fs'

const bot = new Telegraf('1229564192:AAF-E3sQHOJbIAirfAep1dBpPutpf6FVG1k')
bot.start((ctx) => ctx.reply('Send info in format ```ip:port```', {
  parse_mode: 'MarkdownV2'
}))

bot.on('text', async (ctx) => {
  let serversData = []
  const regIpPort = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):\d{1,5}\b/

  let serversList = []
  const botMess = ctx.update.message.text
  ctx.reply('Process...')

  if (botMess.match(regIpPort)) {
    serversData = await fs.promises.readFile('servers.txt')

    serversList = serversData.toString().split('\n')

    const rebootServer = serversList.filter(s => {
      if (s.includes(botMess + ":")) return s
    })

    if (rebootServer.length >= 1) {
      const serverObj = rebootServer[0].split(':')

      try {
        await RebootNightmare(serverObj[0], serverObj[1], serverObj[2], serverObj[3], serverObj[4]).then(rebootRes => {
          if (rebootRes === undefined) {
            ctx.reply(`${rebootServer}: Reboot OK 👍`)
          }
        })
      } catch (error) {
        ctx.reply(error.message)
      }
    } else ctx.reply(`${rebootServer}: [ip:port] not found 😢`)
  } else ctx.reply(`${botMess}: Invalid [ip:port] value 😡`)
})

bot.launch()
