import express from 'express'
import {
  RebootNightmare
} from './nightmare.js'
import fs from 'fs'

const app = express()

app.use('/reboot/:ipport', async (req, res, next) => {
  let serversList = []

  const ipPort = req.params.ipport
  const regIpPort = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):\d{1,5}\b/

  if (ipPort.match(regIpPort)) {
    const servers = await fs.promises.readFile('servers.txt')

    serversList = servers.toString().split('\n')
    const rebootServer = serversList.filter(s => {
      if (s.includes(ipPort+":")) return s
    })

    if (rebootServer.length >= 1) {
      const serverObj = rebootServer[0].split(':')

      try {
        await RebootNightmare(serverObj[0],serverObj[1],serverObj[2], serverObj[3], serverObj[4]).then(rebootRes => {        
          if (rebootRes === undefined) {
            res.send(`${ipPort}: Reboot OK.`)
          }
        })
      } catch (error) {
        res.send(error)
      }
    }else res.send('[ip:port] not found.')
  } else res.send('Invalid [ip:port] value.')


  next()
})
app.use('*', (_, res) => {
  res.sendStatus(404)
})
app.listen(3030, () => {
  console.log(`http://localhost:3030`)
})