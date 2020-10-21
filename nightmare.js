import Nightmare from 'nightmare'

export const RebootNightmare = (ip, port, user, pass, rebootPage) => {
  let nightmareResult

  const proxyNightmare = Nightmare({
    show: false,
    switches: {
      'proxy-server': `${ip}:${port}`,
      'ignore-certificate-errors': true
    }
  })

    nightmareResult = proxyNightmare
      .authentication(user, pass) // ... and authenticate here before `goto`
      .goto(`http://${rebootPage}/html/reboot.html`)
      .evaluate(() => {
        document.querySelector('#reboot_apply_button').click()
      })
      .wait(1000)
      .evaluate(() => {
        document.querySelector('#pop_confirm').click()
      })
      .wait(10000)
      .end()
      .then((result) => { // This will log the Proxy's IP
      console.log('nightmare end');
        return result
      })
      
      
  return nightmareResult
}