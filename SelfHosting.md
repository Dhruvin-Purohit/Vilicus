# Self Hosting

## Creating a bot
1. Go to [Discord Develper Portal](https://discord.com/developers "Discord Developer Portal") and sign in
2. [Create a New Apllication](https://discord.com/developers/applications "Create a new Application")
3. **Create a bot** in that application (also enable both the intents)
4. Copy the bot's *token* (this is meant to be kept secret at all times)

## Inviting the bot
1. Create an invite link using **OAuth2 URL Generator**
2. Paste that link in your browser and invite the bot!

## Requirements
* [Node JS v14.5.1 or higher](https://nodejs.org/download "Node JS")

## Optional Requirements
1. [Visual Studio Code](https://code.visualstudio.com/Download "VS Code")
2. [Git](https://git-scm.com/downloads "Git")

## Installing Dependencies
* Run `npm i` or `npm install` to install node-dependencies

## Setting up config.json
* Rename `example-config.json` --> `config.json`
* fill out the values given there

## How to get api keys
1. [Brawl Stars](https://developer.brawlstars.com/ "Official Brawl Stars API") (keep the IP as 128.128.128.128)
2. [Clash Royale](https://developer.clashroyale.com/ "Official Royale API") (keep the IP as 128.128.128.128)
3. [Clash of Clans](https://developer.clashofclans.com/ "Official Clash of Clans API") (keep the IP as 128.128.128.128)

* **Note:** You will need to keep the IP Adress as 128.128.128.128 for the bot to function properly

## Starting the bot
* Run `npm run start` to start the bot!
