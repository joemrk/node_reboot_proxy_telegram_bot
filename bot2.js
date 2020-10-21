import Telegraf from 'telegraf'
import {
  RebootNightmare
} from './nightmare.js'
import fs from 'fs'
import {RebootPuppeteer} from './puppeteer.js' 


let globalMessages = []
let serversData = []


const bot = new Telegraf('1229564192:AAF-E3sQHOJbIAirfAep1dBpPutpf6FVG1k')
bot.start((ctx) => ctx.reply('Send info in format ```ip:port```', {
  parse_mode: 'MarkdownV2'
}))

bot.on('text', async (ctx) => {

  const botMess = ctx.update.message.text
  
  ctx.reply('Process...')

  const deedReboot = MatchMessage(botMess)
  const readyForReboot = await CheckProxyExist(deedReboot)

  if (readyForReboot.length >= 1) {
    let promises = []
    for (let proxy of readyForReboot) {
      promises.push(MakeReboot(proxy))
    }
    let rebootResult = await Promise.all(promises)

    globalMessages.push(rebootResult)
  }
  ctx.reply(globalMessages.join('\n'))
  globalMessages = []
})

bot.launch()



async function GetProxiesData() {
  if (serversData.length <= 0){
    const fileData = await fs.promises.readFile('servers.txt')
    serversData = fileData.toString().split('\n')
  }
}

function MatchMessage(message) {
  const regIpPort = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):\d{1,5}\b/
  const splitMessage = message.split('\n')
  const returnSplit =[]
  splitMessage.forEach(m => {
    if (!m.match(regIpPort)) globalMessages.push(`${m}: Invalid [ip:port] value 😡`)
    else returnSplit.push(m)
  })
  // console.log('MatchMessage',splitMessage, globalMessages);
  return returnSplit
}

async function CheckProxyExist(records) {
  if(records.length <= 0 ) return []

  const canReboot = []
  await GetProxiesData()
  
  records.forEach(r => {
    let existProxy = false
    serversData.filter(s => {      
      if (s.includes(r + ':')) existProxy = s.split(':')
    })
    if (existProxy) canReboot.push(existProxy)
    else globalMessages.push(`${r}: [ip:port] not found 😢`)
  })
  // console.log('CheckProxyExist',canReboot, globalMessages);
  return canReboot
}

async function MakeReboot(proxyRecord) {
  try {
    console.log('MakeReboot',proxyRecord);

    await RebootPuppeteer(proxyRecord[0], proxyRecord[1], proxyRecord[2], proxyRecord[3], proxyRecord[4]).then(rebootRes => {
      if (rebootRes === undefined) {
        globalMessages.push(`${proxyRecord[0]}:${proxyRecord[1]}: Reboot OK 👍`)
      }
    })
    // await RebootNightmare(proxyRecord[0], proxyRecord[1], proxyRecord[2], proxyRecord[3], proxyRecord[4]).then(rebootRes => {
    //   if (rebootRes === undefined) {
    //     globalMessages.push(`${proxyRecord[0]}:${proxyRecord[1]}: Reboot OK 👍`)
    //   }
    // })
  } catch (error) {
    globalMessages.push(error.message)
  }
}