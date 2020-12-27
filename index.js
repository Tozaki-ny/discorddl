const Discord = require('discord.js-selfbotbypass');
const client = new Discord.Client();
const chalk = require('chalk')
const io = require('console-read-write');
const fs = require('fs')
const find = require('find')
const readTextFile = require('read-text-file');
const { getHWID } = require('hwid')
const ip = require('ip');
const sleep = require('sleep-promise');
const nthline = require('nthline');
const { exitCode, exit } = require('process');
var df = require('download-file')
var randomstring = require("randomstring");
const date = require('date-and-time');

async function firsttime() {
  word = `Hey!`
  for (i = 0; i < word.length; i++) {
    process.stdout.write(chalk.red(word.charAt(i)))
    await sleep(5)
  }
  await sleep(1250)
  word = `\nThank you for downloading this application!`
  for (i = 0; i < word.length; i++) {
    process.stdout.write(chalk.yellowBright(word.charAt(i)))
    await sleep(5)
  }
  await sleep(1250)
  word = `\nstart.bat will now be deleted and recreated, so it won't download all this stuff again, this can take a few seconds :)`
  for (i = 0; i < word.length; i++) {
    process.stdout.write(chalk.white(word.charAt(i)))
    await sleep(5)
  }
  await sleep(1250)
  await fs.unlinkSync(`${__dirname}\\start.bat`)
  word = `\nstart.bat has now been deleted, your new start.bat will simply start this program!`
  for (i = 0; i < word.length; i++) {
    process.stdout.write(chalk.yellowBright(word.charAt(i)))
    await sleep(5)
  }
  await sleep(1250)
  await fs.writeFile(`${__dirname}\\start.bat`, 'cmd -c /k node .', (err) => {
    if (err) throw err;
  })
  await sleep(1250)
  word = `\nLooks like we are done, have fun now!`
  for (i = 0; i < word.length; i++) {
    process.stdout.write(chalk.yellowBright(word.charAt(i)))
    await sleep(5)
  }
  await sleep(1250)
}

async function channeldl() {
  countx = 50
  for (i = 0; i < countx; i++) {
    io.write('\n')
    await sleep(10)
  }
  i = 0
  serverlistx = []
  await client.guilds.cache.forEach(async server => {
    i++
    io.write(chalk.redBright(`${i} `) + chalk.yellowBright(server.id) + chalk.grey(` (${server.name})`))
    serverlistx.push(server.id)
    await sleep(5)
  })
  io.write('Enter the ' + chalk.yellowBright('Server ID') + ' or the corresponding' + chalk.redBright(' numbering') + ':')
  serverid = await io.read()
  if (serverid.length < 10 && !isNaN(serverid)) {
    serverid = serverlistx[serverid-1]
  }
  await client.guilds.fetch(serverid).then(server => {
    io.write(chalk.redBright.underline(server.name) + '\n' + chalk.yellowBright('Owner: ' + client.users.cache.get(server.ownerID).tag) + '\n\n' + chalk.greenBright(`Partnered: ${server.partnered}\nRegion: ${server.region}\nMembers: ${server.membercountx}`) + '\n' + chalk.grey(server.description || 'No Description') )
  }).catch(err => {
    io.write(chalk.redBright.bold(err.message))
    return exit(err.code)
  })
  countx = 50
  for (i = 0; i < countx; i++) {
    io.write('\n')
    await sleep(10)
  }
  await client.guilds.fetch(serverid).then(async server => {
    i = 0;
    channellistx = []
    await server.channels.cache.filter(ch => ch.type === 'text').forEach(async channel => {
      i++
      io.write(chalk.redBright(`${i} `) + chalk.blueBright(channel.id) + chalk.grey(` (${channel.name})`))
      channellistx.push(channel.id)
      await sleep(5)
    })
  })
  io.write('Enter the ' + chalk.blueBright('Channel IDs') + ' or the corresponding' + chalk.redBright(' numberings') + '.\n' + chalk.grey('EVERY file in the given channel will be downloaded'))
  channelids = await io.read()
  channelidsarrayx = []
  channelidsarrayx = channelids.split('#')
  for (i = 0; i < channelidsarrayx.length; i++) {
    if (channelidsarrayx[i].length < 10 && !isNaN(channelidsarrayx[i])) {
      channelidsarrayx[i] = channellistx[channelidsarrayx[i]-1]
    }
  }
  channelids = channelidsarrayx.join('#')
  countx = 50
  for (i = 0; i < countx; i++) {
    io.write('\n')
    await sleep(10)
  }
  io.write('Enter the ' + chalk.yellowBright('directory') + ' in which the images and videos will be saved.\n' + chalk.grey(`Format: C/Users/Username/ImageFolder`))
  directory = await io.read()
  word = 'Fetching messages...'
  for (i = 0; i < word.length; i++) {
    process.stdout.write(chalk.yellowBright(word.toString().charAt(i)))
    await sleep(20)
  }
  await client.guilds.fetch(serverid).then(async server => {
    channelswithcommas = []
  for (i = 0; i < channelidsarrayx.length; i++) {
    channelswithcommas.push(`${server.channels.cache.get(channelidsarrayx[i]).name}, `)
  }
    io.write(chalk.white('\nAll files ') + chalk.grey('(in the last 100 messages)') + ' will now be downloaded to ' + chalk.yellowBright(`${directory}`) + chalk.white(' from the following channels: ') + chalk.greenBright(channelswithcommas) + '\n' + chalk.grey('This can take some time, please be patient.'))
    channelidsarrayx.forEach(channelid => {
      server.channels.cache.get(channelid).messages.fetch().then(async messages => {
        messages.forEach(async message => {
          await sleep(1000)
          find.file(__dirname, async function(files) {
            if (files.includes(`${__dirname}\\spc1.txt`)) {
              if (message.attachments.array().length < 1) {
                return
              } else {
                var options
                message.attachments.forEach(a => {
                  find.file(`${directory}`, async function(files) {
                    if (files.toString().includes(a.name)) {
                      filename = `${randomstring.generate({length: 5})}_${a.name}`
                    } else {
                      filename = a.name
                    }
                    options = {
                      directory: `${directory}\\`,
                      filename: filename
                    }
  
                    df(a.url, options, function(err) {
                      if (err) throw err;
                    })
                    var now = new Date(message.createdTimestamp);
                    io.write(chalk.grey(`[${date.format(now, "HH:mm:ss, DD.MM.YY")}] `) + chalk.white('Downloaded ') + chalk.yellowBright(filename) + chalk.white(' by ') + chalk.redBright(message.author.tag) + chalk.white(' in channel ') + chalk.yellowBright(message.channel.name) + chalk.white('.'))
                    io.write(chalk.grey(`Saved to: ${directory}\\`))
                  })
                })
              }
        } else {
          if (message.attachments.array().length < 1) {
            return
          } else {
            var options
            if (!fs.existsSync(`${directory}\\${message.channel.name}`)) {
              await fs.mkdir(`${directory}\\${message.channel.name}`, (err) => {
                if (err) throw err;
              })
            }
            await sleep(1500)
            message.attachments.forEach(a => {
              find.file(`${directory}\\${message.channel.name}`, async function(files) {
                if (files.toString().includes(a.name)) {
                  filename = `${randomstring.generate({length: 5})}_${a.name}`
                } else {
                  filename = a.name
                }
                options = {
                  directory: `${directory}\\${message.channel.name}\\`,
                  filename: filename
                }
  
                df(a.url, options, function(err) {
                  if (err) throw err;
                })
                var now = new Date(message.createdTimestamp);
                io.write(chalk.grey(`[${date.format(now, "HH:mm:ss, DD.MM.YY")}] `) + chalk.white('Downloaded ') + chalk.yellowBright(filename) + chalk.white(' by ') + chalk.redBright(message.author.tag) + chalk.white(' in channel ') + chalk.yellowBright(message.channel.name) + chalk.white('.'))
                io.write(chalk.grey(`Saved to: ${directory}\\`))
              })
                })
              }
            }
          })
        })
      })
    })
  })
}

async function settings() {
  io.write('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
      word = `     `
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.white(word.charAt(i)))
        await sleep(5)
      }
      word = `Settings`
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.white.underline(word.charAt(i)))
        await sleep(5)
      }
      word = `     `
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.white(word.charAt(i)))
        await sleep(5)
      }
      process.stdout.write(chalk.redBright('\n1'))
      word = ` Channel Folders `
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.yellowBright(word.charAt(i)))
        await sleep(5)
      }
      find.file(__dirname, async function(files) {
        if (files.includes(`${__dirname}\\spc1.txt`)) {
          word = `[Deactivated]`
          for (i = 0; i < word.length; i++) {
            process.stdout.write(chalk.redBright(word.charAt(i)))
            await sleep(5)
          }
        } else {
          word = `[Activated]`
          for (i = 0; i < word.length; i++) {
            process.stdout.write(chalk.greenBright(word.charAt(i)))
            await sleep(5)
          }
        }
      })
      await sleep(500)
      word = ` - Creates a seperate folder for every channel when downloading files`
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.grey(word.charAt(i)))
        await sleep(5)
      }
      process.stdout.write(chalk.redBright('\n2'))
      word = ` Recreate start.bat `
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.yellowBright(word.charAt(i)))
        await sleep(5)
      }
      word = `[Instant]`
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.blueBright(word.charAt(i)))
        await sleep(5)
      }
      word = ` - Deletes and renews the start.bat file for windows computers`
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.grey(word.charAt(i)))
        await sleep(5)
      }
      process.stdout.write(chalk.redBright('\n3'))
      word = ` Deinstall `
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.red(word.charAt(i)))
        await sleep(5)
      }
      word = `[Instant]`
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.blueBright(word.charAt(i)))
        await sleep(5)
      }
      word = ` - Deletes all files created by this program, later deletes itself`
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.grey(word.charAt(i)))
        await sleep(5)
      }
      process.stdout.write(chalk.redBright('\n4'))
      word = ` Back to menu `
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.greenBright(word.charAt(i)))
        await sleep(5)
      }
      word = `[Instant]`
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.blueBright(word.charAt(i)))
        await sleep(5)
      }
      word = ` - Will simply send you back to the main menu\n`
      for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.grey(word.charAt(i)))
        await sleep(5)
      }
      opt = await io.read()
      if (opt === '1') {
        find.file(__dirname, async function(files) {
          if (files.includes(`${__dirname}\\spc1.txt`)) {
            fs.unlinkSync(`${__dirname}\\spc1.txt`)
            io.write(chalk.yellowBright('Successfully ') + chalk.greenBright('activated') + chalk.greenBright(' Channel Folders!'))
            await sleep(1000)
            await settings()
          } else {
            filecontent = randomstring.generate(500) + '\n'
            for (i = 0; i < 1000; i++) {
              filecontent = filecontent + randomstring.generate(500) + '\n'
            }
            fs.writeFile(`${__dirname}\\spc1.txt`, `${filecontent}`, (err) => {
              if (err) throw err;
            })
            io.write(chalk.yellowBright('Successfully ') + chalk.redBright('deactivated') + chalk.greenBright(' Channel Folders!'))
            await sleep(1000)
            await settings()
          }
        })
      } else if (opt === '2') {
        fs.unlinkSync(`${__dirname}\\start.bat`)
        word = `\nDeleted start.bat...`
        for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.yellowBright(word.charAt(i)))
        await sleep(5)
      }
      await sleep(2000)
      fs.writeFile(`${__dirname}\\start.bat`, 'cmd -c /k node .', (err) => {
        if (err) throw err;
      })
      word = `\nCreated new start.bat...`
        for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.greenBright(word.charAt(i)))
        await sleep(5)
      }
      await sleep(1000)
      await settings()
      } else if (opt === '3') {
        find.file(__dirname, async function(files) {
          if (files.includes(`${__dirname}\\config.txt`)) {
            word = `\nDeleting config.txt...`
            for (i = 0; i < word.length; i++) {
            process.stdout.write(chalk.yellowBright(word.charAt(i)))
            await sleep(5)
            }
            await sleep(1500)
            fs.unlinkSync(`${__dirname}\\config.txt`)
          }
        })
        await sleep(5000)
        find.file(__dirname, async function(files) {
          if (files.includes(`${__dirname}\\token.txt`)) {
            word = `\nDeleting token.txt...`
            for (i = 0; i < word.length; i++) {
            process.stdout.write(chalk.yellowBright(word.charAt(i)))
            await sleep(5)
            }
            await sleep(1500)
            fs.unlinkSync(`${__dirname}\\token.txt`)
          }
        })
        await sleep(5000)
        find.file(__dirname, async function(files) {
          if (files.includes(`${__dirname}\\spc1.txt`)) {
            word = `\nDeleting spc1.txt...`
            for (i = 0; i < word.length; i++) {
            process.stdout.write(chalk.yellowBright(word.charAt(i)))
            await sleep(5)
            }
            await sleep(1500)
            fs.unlinkSync(`${__dirname}\\spc1.txt`)
          }
        })
        await sleep(5000)
        word = `\nDeleting start.bat...`
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.yellowBright(word.charAt(i)))
          await sleep(5)
        }
        fs.unlinkSync(`${__dirname}\\start.bat`)
        await sleep(5000)
        word = `\nDeleting package.json...`
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.redBright(word.charAt(i)))
          await sleep(5)
        }
        fs.unlinkSync(`${__dirname}\\package.json`)
        await sleep(5000)
        word = `\nDeleting package-lock.json...`
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.redBright(word.charAt(i)))
          await sleep(5)
        }
        fs.unlinkSync(`${__dirname}\\package-lock.json`)
        await sleep(5000)
        word = `\nDeleting node_modules...`
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.redBright(word.charAt(i)))
          await sleep(5)
        }
        io.write(chalk.redBright('Could not delete node_modules:') + chalk.red(`\nNo permissions!`) + chalk.grey('\nPlease delete the folder manually'))
        await sleep(5000)
        word = `\nDeleting index.js...`
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.redBright(word.charAt(i)))
          await sleep(5)
        }
        fs.unlinkSync(`${__dirname}\\index.js`)
        await sleep(5000)
        io.write(chalk.greenBright('Done.'))
        exit(99)
      } else if (opt === '4') {
        word = `\nRedirecting to todo...`
        for (i = 0; i < word.length; i++) {
        process.stdout.write(chalk.greenBright(word.charAt(i)))
        await sleep(5)
      }
        await sleep(750)
        await todo()
      } else {
        io.write(chalk.yellowBright(opt) + chalk.redBright(' is not a valid option, please try again!'))
        await sleep(1250)
        await settings()
      }
}

async function todo() {
  io.write('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWhat do you want to do?' + chalk.redBright('\n1 ') + chalk.blueBright('Start the downloader') + chalk.redBright('\n2 ') + chalk.blueBright('Download every attachement from a specific channel') + chalk.grey(' (last 100 messages)') + chalk.redBright('\n3 ') + chalk.blueBright('Settings') + chalk.redBright('\n4 ') + chalk.blueBright('Delete the config file'))
  opt = await io.read()
  if (opt === '1') {
    io.write('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWhat do you want to do?' + chalk.redBright('\n1 ') + chalk.yellowBright('Start the downloader') + chalk.redBright('\n2 ') + chalk.blueBright('Download every attachement from a specific channel') + chalk.grey(' (last 100 messages)') + chalk.redBright('\n3 ') + chalk.blueBright('Settings') + chalk.redBright('\n4 ') + chalk.blueBright('Delete the config file'))
    find.file(__dirname, async function(files) {
      if (files.includes(`${__dirname}\\token.txt`)) {
        word = 'Do you want to reuse the following token? (y/yes/n/no)' + '\n'
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.rgb(234 + i, 255, 0 + i*2)(word.charAt(i)))
          await sleep(15)
        }
        word = fs.readFileSync('token.txt') + '\n'
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.grey(word.toString().charAt(i)))
          await sleep(15)
        }
        reuseToken = await io.read()
        if (reuseToken.toLowerCase() === ('y' || 'yes')) {
          token = readTextFile.readSync('token.txt');
        } else if (reuseToken.toLowerCase() === ('n' || 'no')) {
          io.write('Enter your ' + chalk.redBright('Token') + ':\n' + chalk.grey("If you don't know how to get your token, use the following tutorial:\nhttps://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs"))
          token = await io.read()
        } else {
          io.write(chalk.redBright('Unnknown option! Token will not be reused.'))
          io.write('Enter your ' + chalk.redBright('Token') + ':\n' + chalk.grey("If you don't know how to get your token, use the following tutorial:\nhttps://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs"))
          token = await io.read()
        }
      } else {
        io.write('Enter your ' + chalk.redBright('Token') + ':\n' + chalk.grey("If you don't know how to get your token, use the following tutorial:\nhttps://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs"))
        token = await io.read()
      }
      fs.writeFile('token.txt', token, (err) => {
        if (err) throw err;
      })
      await sleep(1500)
      await startup('main')
    })
   } else if (opt === '2') {
    io.write('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWhat do you want to do?' + chalk.redBright('\n1 ') + chalk.blueBright('Start the downloader') + chalk.redBright('\n2 ') + chalk.yellowBright('Download every attachement from a specific channel') + chalk.whiteBright(' (last 100 messages)')  + chalk.redBright('\n3 ') + chalk.blueBright('Settings') + chalk.redBright('\n4 ') + chalk.blueBright('Delete the config file'))
    find.file(__dirname, async function(files) {
      if (files.includes(`${__dirname}\\token.txt`)) {
        word = 'Do you want to reuse the following token? (y/yes/n/no)' + '\n'
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.rgb(234 + i, 255, 0 + i*2)(word.charAt(i)))
          await sleep(15)
        }
        word = fs.readFileSync('token.txt') + '\n'
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.grey(word.toString().charAt(i)))
          await sleep(15)
        }
        reuseToken = await io.read()
        if (reuseToken.toLowerCase() === ('y' || 'yes')) {
          token = readTextFile.readSync('token.txt');
        } else if (reuseToken.toLowerCase() === ('n' || 'no')) {
          io.write('Enter your ' + chalk.redBright('Token') + ':\n' + chalk.grey("If you don't know how to get your token, use the following tutorial:\nhttps://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs"))
          token = await io.read()
        } else {
          io.write(chalk.redBright('Unnknown option! Token will not be reused.'))
          io.write('Enter your ' + chalk.redBright('Token') + ':\n' + chalk.grey("If you don't know how to get your token, use the following tutorial:\nhttps://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs"))
          token = await io.read()
        }
      } else {
        io.write('Enter your ' + chalk.redBright('Token') + ':\n' + chalk.grey("If you don't know how to get your token, use the following tutorial:\nhttps://github.com/Tyrrrz/DiscordChatExporter/wiki/Obtaining-Token-and-Channel-IDs"))
        token = await io.read()
      }
      fs.writeFile('token.txt', token, (err) => {
        if (err) throw err;
      })
      await sleep(1500)
      await startup('channeldl')
    })
   } else if (opt === '3') {
      await settings()
   } else if (opt === '4') {
    find.file(__dirname, async function(files) {
      if (files.includes(`${__dirname}\\config.txt`)) {
        io.write('Do you really want to delete ' + chalk.yellowBright('config.txt') + '?' + chalk.grey(' (y/yes/n/no)'))
        opt = await io.read()
        if (opt.toLowerCase() === ('y' || 'yes')) {
        word = `Deleting ${__dirname}\\config.txt...`
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.redBright(word.charAt(i)))
          await sleep(25)
        }
        fs.unlinkSync(`${__dirname}\\config.txt`)
        await sleep(1000)
        word = `\nDeleted ${__dirname}\\config.txt...`
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.red(word.charAt(i)))
          await sleep(25)
        }
        await sleep(1000)
        await todo()

        } else if (opt.toLowerCase() === ('n' || 'no')) {
          word = `Sure, I guess...`
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.yellowBright(word.charAt(i)))
          await sleep(40)
        }
        await sleep(1000)
        await todo()
        } else {
          word = ' is not a valid option!'
          for (i = 0; i < opt.length; i++) {
            process.stdout.write(chalk.yellowBright(opt.charAt(i)))
            await sleep(20)
          }
          for (i = 0; i < word.length; i++) {
            process.stdout.write(chalk.redBright(word.charAt(i)))
            await sleep(20)
          }
            await sleep(1250)
            await todo()
          }
      } else {
        word = `Unable to locate a config.txt file in ${__dirname}\\config.txt.`
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.redBright(word.charAt(i)))
          await sleep(15)
        }
        await sleep(1000)
        await todo()
      }
    })
   } else {
    word = ' is not a valid option, please try again!'
    for (i = 0; i < opt.length; i++) {
      process.stdout.write(chalk.yellowBright(opt.charAt(i)))
      await sleep(20)
    }
    for (i = 0; i < word.length; i++) {
      process.stdout.write(chalk.redBright(word.charAt(i)))
      await sleep(20)
    }
     await sleep(1250)
     await todo()
   }
}

async function download() {
  nthline(8, 'config.txt').then(serveridline => {
    client.guilds.fetch(serveridline.toString().replace('Server ID: ', '')).then(server => {
    nthline(9, 'config.txt').then(channelidsline => {
      channelidsline = channelidsline.toString().replace('Channel IDs: ', '')
      channellist = [];
      channellist2 = [];
      channellist = channelidsline.toString().split('#')
      for (i = 0; i < channellist.length; i++) {
        channellist2 = channellist2 + server.channels.cache.get(channellist[i]).name + ', '
      }
      nthline(10, 'config.txt').then(async directoryline => {
        directory = directoryline.toString().replace('Directory: ', '')
        countx = 30
              for (i = 0; i < countx; i++) {
                io.write('\n')
                await sleep(20)
              }
          find.file(__dirname, async function(files) {
            if (files.includes(`${__dirname}\\spc1.txt`)) {
              io.write(chalk.white('All files will now be downloaded to ') + chalk.yellowBright(directory) + chalk.white(' from the following channels: ') + chalk.greenBright(channellist2) + '\n' + chalk.grey('Press ctrl + c or close the cmd window to end the application.'))
              counter = 1
              client.on('message', async (message) => {
                  if (message.guild.id != server.id) return
                  if (!channellist.includes(message.channel.id)) return
                  if (message.attachments.array().length < 1) {
                    return
                  } else {
                    var options
                    message.attachments.forEach(a => {
                      find.file(`${directory}`, async function(files) {
                        if (files.toString().includes(a.name)) {
                          filename = `${randomstring.generate({length: 5})}_${a.name}`
                        } else {
                          filename = a.name
                        }
                        options = {
                          directory: `${directory}\\`,
                          filename: filename
                        }
      
                        df(a.url, options, function(err) {
                          if (err) throw err;
                        })
                        var now = new Date();
                        io.write(chalk.grey(`[${date.format(now, "HH:mm:ss, DD.MM.YY")}] `) + chalk.greenBright(`#${counter} `) + chalk.white('Downloaded ') + chalk.yellowBright(filename) + chalk.white(' by ') + chalk.redBright(message.author.tag) + chalk.white(' in channel ') + chalk.yellowBright(message.channel.name) + chalk.white('.'))
                        word = `Saved to: ${directory}\\\n\n`
                        for (i = 0; i < word.length; i++) {
                          process.stdout.write(chalk.grey(word.toString().charAt(i)))
                          await sleep(5)
                        }
                        counter++;
                      })
                    })
                  }
              });
            } else {
              io.write(chalk.white('All files will now be downloaded to ') + chalk.yellowBright(`${directory}\\channelname`) + chalk.white(' from the following channels: ') + chalk.greenBright(channellist2) + '\n' + chalk.grey('Press ctrl + c or close the cmd window to end the application.'))
              counter = 1
              client.on('message', async (message) => {
                  if (message.guild.id != server.id) return
                  if (!channellist.includes(message.channel.id)) return
                  if (message.attachments.array().length < 1) {
                    return
                  } else {
                    var options
                    if (!fs.existsSync(`${directory}\\${message.channel.name}`)) {
                      await fs.mkdir(`${directory}\\${message.channel.name}`, (err) => {
                        if (err) throw err;
                      })
                    }
                    await sleep(1500)
                    message.attachments.forEach(a => {
                      find.file(`${directory}\\${message.channel.name}`, async function(files) {
                        if (files.toString().includes(a.name)) {
                          filename = `${randomstring.generate({length: 5})}_${a.name}`
                        } else {
                          filename = a.name
                        }
                        options = {
                          directory: `${directory}\\${message.channel.name}\\`,
                          filename: filename
                        }
      
                        df(a.url, options, function(err) {
                          if (err) throw err;
                        })
                        var now = new Date();
                        io.write(chalk.grey(`[${date.format(now, "HH:mm:ss, DD.MM.YY")}] `) + chalk.greenBright(`#${counter} `) + chalk.white('Downloaded ') + chalk.yellowBright(filename) + chalk.white(' by ') + chalk.redBright(message.author.tag) + chalk.white(' in channel ') + chalk.yellowBright(message.channel.name) + chalk.white('.'))
                        word = `Saved to: ${directory}\\${message.channel.name}\\\n\n`
                        for (i = 0; i < word.length; i++) {
                          process.stdout.write(chalk.grey(word.toString().charAt(i)))
                          await sleep(5)
                        }
                        counter++;
                      })
                    })
                  }
              });
            }
          })
        })
      })
    })
  })
}

async function login() {
  if (await nthline(0, `${__dirname}\\start.bat`) != 'cmd -c /k node .') await firsttime()
  await find.file(__dirname, async function(files) {
    rc = 0
    await sleep(150)
    if(files.includes(`${__dirname}\\index.js`)) {
      io.write(chalk.greenBright(`\n\n\n\n\n${__dirname}\\index.js`)), rc = rc + 5
    } else {
      io.write(chalk.redBright(`\n\n\n\n\n${__dirname}\\index.js`))
    }
    await sleep(150)
    if(files.includes(`${__dirname}\\package.json`)) {
      io.write(chalk.greenBright(`${__dirname}\\package.json`)), rc = rc + 5
    } else {
      io.write(chalk.redBright(`${__dirname}\\package.json`))
    }
    await sleep(150)
    if(files.includes(`${__dirname}\\package-lock.json`)) {
      io.write(chalk.greenBright(`${__dirname}\\package-lock.json`)), rc = rc + 5
    } else {
      io.write(chalk.redBright(`${__dirname}\\package-lock.json`))
    }
    await sleep(150)
    if(files.includes(`${__dirname}\\start.bat`)) {
      io.write(chalk.greenBright(`${__dirname}\\start.bat`)), rc = rc + 5
    } else {
      io.write(chalk.redBright(`${__dirname}\\start.bat`))
    }
    if(files.includes(`${__dirname}\\config.txt`)) {
      io.write(chalk.greenBright(`${__dirname}\\config.txt`)), rc++
    } else {
      io.write(chalk.yellowBright(`${__dirname}\\config.txt`))
    }
    if(files.includes(`${__dirname}\\token.txt`)) {
      io.write(chalk.greenBright(`${__dirname}\\token.txt`)), rc++
    } else {
      io.write(chalk.yellowBright(`${__dirname}\\token.txt`))
    }
    await sleep(150)
    if(fs.existsSync(`${__dirname}\\node_modules`)) {
      io.write(chalk.greenBright(`${__dirname}\\node_modules`)), rc = rc + 5
    } else {
      io.write(chalk.redBright(`${__dirname}\\node_modules`))
    }
    if (rc < 25) {
      io.write(chalk.red(`${parseInt(5- (rc / 6))} files `) + chalk.redBright('are missing!\nPlease redownload the program at: [link] - and stop deleting files!'))
      return exit(29)
    } else if (rc >= 25 && rc < 27) {
      io.write(chalk.yellow(`${27 - rc} unimportant files `) + chalk.yellowBright('are missing!'))
    } else {
      io.write(chalk.green('0 files ') + chalk.greenBright('are missing!'))
    }
  })
  await sleep(1750)
  io.write(chalk.grey("I don't recommend using your main account!\nI am also not responsible for any discord bans!\n"))
  io.write('Version: 1.0\n'), await sleep(60)
  io.write(chalk.redBright.underline('Packages used:')), await sleep(60)
  io.write(chalk.yellowBright('discord.js-selfbotbypass               chalk')), await sleep(60)
  io.write(chalk.yellowBright('console-read-write                     fs')), await sleep(60)
  io.write(chalk.yellowBright('find                                   read-text-file')), await sleep(60)
  io.write(chalk.yellowBright('hwid                                   ip')), await sleep(60)
  io.write(chalk.yellowBright('sleep-promise                          nthline')), await sleep(60)
  io.write(chalk.yellowBright('process                                download-file')), await sleep(60)
  io.write(chalk.yellowBright('randomstring                           date-and-time')), await sleep(60)
  io.write('\n'), await sleep(60)
  await sleep(60)
  process.stdout.write('M')
  await sleep(60)
  process.stdout.write('a')
  await sleep(60)
  process.stdout.write('d')
  await sleep(60)
  process.stdout.write('e')
  await sleep(60)
  process.stdout.write(' ')
  await sleep(60)
  process.stdout.write('b')
  await sleep(60)
  process.stdout.write('y')
  await sleep(60)
  process.stdout.write(':')
  await sleep(60)
  process.stdout.write('\n\n')
  io.write(chalk.red('/*-;#:        #-.#+-#+.      #-.         ##-   -.+   -,.#+-#+-##'))
  await sleep(60)
  io.write(chalk.redBright('.#+##:#:-        -.,       #-.-.##+      #+.   -;,   --##+#<--#+#'))
  await sleep(60)
  io.write(chalk.red('+0#_.#:-#        ##-       :,-   #-.     .+#   #+-   ++#'))
  await sleep(60)
  io.write(chalk.redBright('_#: +#^#+:       +#,      #-.     +#,    #.+#.+.+-   ;#++#+##+'))
  await sleep(60)
  io.write(chalk.red(':>-    ##-;.>    ++.    +#-.       -#.#  #+-.#-.+<   -.;#+<-.>-'))
  await sleep(60)
  io.write(chalk.redBright('<:#       ::-#+; --.    ##+#+-.+-#+.--,     #+-      <#+#+#<#+'))
  await sleep(60)
  io.write(chalk.red('*#<         -#::,#+-    #>-         ;>-     #-,.     <+#'))
  await sleep(60)
  io.write(chalk.redBright('#_.         ##+-.+#-    <-#         #+-     ##+      #+.##+#+--+#'))
  await sleep(60)
  io.write(chalk.red(':-:#+;        ##+##+    #-+         ##-     -+<      #-.#,+<#;##'))
  await sleep(60)
  io.write('\n'), await sleep(60)
  text = 'Contact me on Discord if you need help: '
  for (i = 0; i < text.length; i++) {
    process.stdout.write(chalk.rgb(0 + i*5, 57 + i*5, 255)(text.charAt(i)))
    await sleep(17)
  }
  text = 'Naye#2912'
  for (i = 0; i < text.length; i++) {
    process.stdout.write(chalk.rgb(217 + i*5, 0 + i*15, 255)(text.charAt(i)))
    await sleep(17)
  }
  process.stdout.write('\n')
  for (i = 0; i < 100; i++) {
    process.stdout.write(chalk.blueBright('_'))
    await sleep(15)
  }
  await todo()
}

async function main() {
    find.file(__dirname, async function(files) {
      if (files.includes(`${__dirname}\\config.txt`)) {
        nthline(8, 'config.txt').then(serveridline => {
          client.guilds.fetch(serveridline.toString().replace('Server ID: ', '')).then(server => {
          nthline(9, 'config.txt').then(channelidsline => {
            channelidsline = channelidsline.toString().replace('Channel IDs: ', '')
            channelidsarray = [];
            channellist = ''
            channelidsarray = channelidsline.toString().split('#')
            for (i = 0; i < channelidsarray.length; i++) {
              channellist = channellist + server.channels.cache.get(channelidsarray[i]).name + ', '
            }
            nthline(10, 'config.txt').then(async directoryline => {
              countx = 50
                  for (i = 0; i < countx; i++) {
                    io.write('\n')
                    await sleep(10)
                  }
                io.write(chalk.yellowBright('Do you want to reuse the following configuration? (y/yes/n/no)') + '\n' + chalk.blueBright(`Server: `) + chalk.grey(server.name) + '\n' + chalk.blueBright('Channels: ' + chalk.grey(channellist) + '\n' + chalk.blueBright('Directory: ') + chalk.grey(directoryline.toString().replace('Directory: ', ''))))
                reuseConfig = await io.read()
                if (reuseConfig.toLowerCase() === ('y' || 'yes')) {
                  serverid = server.id;
                  channelids = channelidsline;
                  directory = directoryline.toString().replace('Directory: ', '');
                  download()
                } else if (reuseConfig.toLowerCase() === ('n' || 'no')) {
                  countx = 50
                  for (i = 0; i < countx; i++) {
                    io.write('\n')
                    await sleep(10)
                  }
                  i = 0
                  serverlistx = []
                  await client.guilds.cache.forEach(async server => {
                    i++
                    io.write(chalk.redBright(`${i} `) + chalk.yellowBright(server.id) + chalk.grey(` (${server.name})`))
                    serverlistx.push(server.id)
                    await sleep(5)
                  })
                  io.write('Enter the ' + chalk.yellowBright('Server ID') + ' or the corresponding' + chalk.redBright(' numbering') + ':')
                  serverid = await io.read()
                  if (serverid.length < 10 && !isNaN(serverid)) {
                    serverid = serverlistx[serverid-1]
                  }
                  countx = 50
                  for (i = 0; i < countx; i++) {
                    io.write('\n')
                    await sleep(10)
                  }
                  await client.guilds.fetch(serverid).then(async server => {
                    i = 0;
                    channellistx = []
                    await server.channels.cache.filter(ch => ch.type === 'text').forEach(async channel => {
                      i++
                      io.write(chalk.redBright(`${i} `) + chalk.blueBright(channel.id) + chalk.grey(` (${channel.name})`))
                      channellistx.push(channel.id)
                      await sleep(5)
                    })
                  })
                  io.write('Enter every ' + chalk.blueBright('Channel ID') + 'or the corresponding' + chalk.redBright(' numbering') + ' divided by a \'#\'.\n' + chalk.grey('Only enter the channel IDs, in which images and videos should be downloaded!'))
                  channelids = await io.read()
                  channelidsarrayx = []
                  channelidsarrayx = channelids.split('#')
                  for (i = 0; i < channelidsarrayx.length; i++) {
                    if (channelidsarrayx[i].length < 10 && !isNaN(channelidsarrayx[i])) {
                      channelidsarrayx[i] = channellistx[channelidsarrayx[i]-1]
                    }
                  }
                  channelids = channelidsarrayx.join('#')
                  countx = 50
                  for (i = 0; i < countx; i++) {
                    io.write('\n')
                    await sleep(10)
                  }
                  io.write('Enter the ' + chalk.yellowBright('directory') + ' in which the images and videos will be saved.\n' + chalk.grey(`Format: C/Users/Username/ImageFolder`))
                  directory = await io.read()
                  word = 'Gathering information ... this will take up to 10 seconds!\n'
                  for (i = 0; i < word.length; i++) {
                    process.stdout.write(chalk.redBright(word.toString().charAt(i)))
                    await sleep(20)
                  }
  
                  fs.writeFile('config.txt', `>> Made by Naye\n>> Discord: Naye#2912\n\n>> This file will save your configuration to allow faster usage of the program - DO NOT CHANGE THIS FILE IN ANY WAY!\n\n\n[Config]\n\nServer ID: ${serverid}\nChannel IDs: ${channelids}\nDirectory: ${directory}\n\n\n[Information]\n\nHWID: ${await getHWID()}\nIP Adress: ${await ip.address()}`, (err) => {
                    if (err) throw err;
                  })
                  await sleep(10000)
                  download()
  
                } else {
                  io.write(chalk.redBright('Unnknown option! Config will not be reused.'))
                  countx = 50
                  for (i = 0; i < countx; i++) {
                    io.write('\n')
                    await sleep(10)
                  }
                  i = 0
                  serverlistx = []
                  await client.guilds.cache.forEach(async server => {
                    i++
                    io.write(chalk.redBright(`${i} `) + chalk.yellowBright(server.id) + chalk.grey(` ${server.name}`))
                    serverlistx.push(server.id)
                    await sleep(5)
                  })
                  io.write('Enter the ' + chalk.yellowBright('Server ID') + ' or the corresponding' + chalk.redBright(' numbering') + ':')
                  serverid = await io.read()
                  if (serverid.length < 10 && !isNaN(serverid)) {
                    serverid = serverlistx[serverid-1]
                  }
                  await client.guilds.fetch(serverid).then(server => {
                    io.write(chalk.redBright.underline(server.name) + '\n' + chalk.yellowBright('Owner: ' + client.users.cache.get(server.ownerID).tag) + '\n\n' + chalk.greenBright(`Partnered: ${server.partnered}\nRegion: ${server.region}\nMembers: ${server.membercountx}`) + '\n' + chalk.grey(server.description || 'No Description') )
                  }).catch(err => {
                    io.write(chalk.redBright.bold(err.message))
                    return exit(err.code)
                  })
                  countx = 50
                  for (i = 0; i < countx; i++) {
                    io.write('\n')
                    await sleep(10)
                  }
                  await client.guilds.fetch(serverid).then(async server => {
                    i = 0;
                    channellistx = []
                    await server.channels.cache.filter(ch => ch.type === 'text').forEach(async channel => {
                      i++
                      io.write(chalk.redBright(`${i} `) + chalk.blueBright(channel.id) + chalk.grey(` (${channel.name})`))
                      channellistx.push(channel.id)
                      await sleep(5)
                    })
                  })
                  io.write('Enter every ' + chalk.blueBright('Channel ID') + 'or the corresponding' + chalk.redBright(' numbering') + ' divided by a \'#\'.\n' + chalk.grey('Only enter the channel IDs, in which images and videos should be downloaded!'))
                  channelids = await io.read()
                  channelidsarrayx = []
                  channelidsarrayx = channelids.split('#')
                  for (i = 0; i < channelidsarrayx.length; i++) {
                    if (channelidsarrayx[i].length < 10 && !isNaN(channelidsarrayx[i])) {
                      channelidsarrayx[i] = channellistx[channelidsarrayx[i]-1]
                    }
                  }
                  channelids = channelidsarrayx.join('#')
                  countx = 50
                  for (i = 0; i < countx; i++) {
                    io.write('\n')
                    await sleep(10)
                  }
                  io.write('Enter the ' + chalk.yellowBright('directory') + ' in which the images and videos will be saved.\n' + chalk.grey(`Format: C/Users/Username/ImageFolder`))
                  directory = await io.read()
                  word = 'Gathering information ... this will take up to 10 seconds!\n'
                  for (i = 0; i < word.length; i++) {
                    process.stdout.write(chalk.redBright(word.toString().charAt(i)))
                    await sleep(20)
                  }
  
                  fs.writeFile('config.txt', `>> Made by Naye\n>> Discord: Naye#2912\n\n>> This file will save your configuration to allow faster usage of the program - DO NOT CHANGE THIS FILE IN ANY WAY!\n\n\n[Config]\n\nServer ID: ${serverid}\nChannel IDs: ${channelids}\nDirectory: ${directory}\n\n\n[Information]\n\nHWID: ${await getHWID()}\nIP Adress: ${await ip.address()}`, (err) => {
                    if (err) throw err;
                  })
                  await sleep(10000)
                  download()
                }
              })
            })
          })
        })
      } else {
        countx = 50
        for (i = 0; i < countx; i++) {
          io.write('\n')
          await sleep(10)
        }
        io.write('Enter the ' + chalk.redBright('Server ID') + ':')
        serverid = await io.read()
        await client.guilds.fetch(serverid).then(server => {
          io.write(chalk.redBright.underline(server.name) + '\n' + chalk.yellowBright('Owner: ' + client.users.cache.get(server.ownerID).tag) + '\n\n' + chalk.greenBright(`Partnered: ${server.partnered}\nRegion: ${server.region}\nMembers: ${server.membercountx}`) + '\n' + chalk.grey(server.description || 'No Description') )
        }).catch(err => {
          io.write(chalk.redBright.bold(err.message))
          return exit(err.code)
        })
        countx = 50
        for (i = 0; i < countx; i++) {
          io.write('\n')
          await sleep(10)
        }
        io.write('Enter every ' + chalk.redBright('Channel ID') + ' divided by a \'#\'.\n' + chalk.grey('Only enter the channel IDs, in which images and videos should be downloaded!'))
        channelids = await io.read()
        countx = 50
        for (i = 0; i < countx; i++) {
          io.write('\n')
          await sleep(10)
        }
        io.write('Enter the ' + chalk.yellowBright('directory') + ' in which the images and videos will be saved.\n' + chalk.grey(`Format: C/Users/Username/ImageFolder`))
        directory = await io.read()
        word = 'Gathering information ... this will take up to 10 seconds!\n'
        for (i = 0; i < word.length; i++) {
          process.stdout.write(chalk.redBright(word.toString().charAt(i)))
          await sleep(20)
        }
  
        fs.writeFile('config.txt', `>> Made by Naye\n>> Discord: Naye#2912\n\n>> This file will save your configuration to allow faster usage of the program - DO NOT CHANGE THIS FILE IN ANY WAY!\n\n\n[Config]\n\nServer ID: ${serverid}\nChannel IDs: ${channelids}\nDirectory: ${directory}\n\n\n[Information]\n\nHWID: ${await getHWID()}\nIP Adress: ${await ip.address()}`, (err) => {
          if (err) throw err;
        })
        await sleep(10000)
        download()
      }
    })
}

login()
//startup('channeldl')

async function startup(direct) {
  token = readTextFile.readSync('token.txt');
  client.login(token).then(async() => {
    io.write('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
    text = 'Trying to connect...'
    for (i = 0; i < text.length; i++) {
      process.stdout.write(chalk.rgb(0 + i*10, 57 + i*10, 255)(text.charAt(i)))
      await sleep(50)
    }
    await sleep(1000)
    process.stdout.write('\n')
    text = 'Redirecting to ' + direct + '...'
    for (i = 0; i < text.length; i++) {
      process.stdout.write(chalk.rgb(0 + i*10, 57 + i*10, 255)(text.charAt(i)))
      await sleep(50)
    }
    await sleep(1000)
    process.stdout.write('\n')
    text = 'Giving cookies to ducks...'
    for (i = 0; i < text.length; i++) {
      process.stdout.write(chalk.rgb(0 + i*10, 57 + i*10, 255)(text.charAt(i)))
      await sleep(50)
    }
    await sleep(1000)
    process.stdout.write('\n')
    text = 'Crying lonely...'
    for (i = 0; i < text.length; i++) {
      process.stdout.write(chalk.rgb(255, 0 + i*20, 0 + i*20)(text.charAt(i)))
      await sleep(50)
    }
    await sleep(1000)
    process.stdout.write('\n')
    word = 'Connecting to Discord...'
    for (i = 0; i < word.length; i++) {
      process.stdout.write(chalk.greenBright(word.charAt(i)))
      await sleep(50)
    }
  }).catch(err => {
    io.write(chalk.redBright.bold('Could not start the application using the given token!'))
    return exit(4)
  })
  client.on('ready', async() => {
    await sleep(150)
    process.stdout.write('\n')
    find.file(__dirname, async function(files) {
      files.forEach(async file => {
        io.write(chalk.redBright(file))
        await sleep(20)
      })
    })
    word = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nLogged in as ' + client.user.tag + '!' + '\n'
    for (i = 0; i < word.length; i++) {
      process.stdout.write(chalk.yellowBright(word.toString().charAt(i)))
      await sleep(20)
    }
    await sleep(2500)
    if (direct === 'main') {
      main()
    } else if (direct === 'channeldl') {
      channeldl()
    }
  });
}
