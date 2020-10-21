# node_reboot_proxy_telegram_bot


make reboot proxy modem

main functionality from lib ```nightmare``` 


```express``` for web version

```telegraf``` fro telegram bot 

---


added functionality for run on ubuntu
```puppeteer ``` another lib for do actions in browser

for work need to install additoinal libs on server

```bash
sudo apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
if have error like (Failed to launch the browser process! [path] error while loading shared libraries: libgbm.so.1: cannot open shared object file: No such file or directory) - need install this lib separately
```bash
sudo apt-get update
sudo apt-get install -y libgbm-dev
```
