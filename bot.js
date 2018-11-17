const Discord = require('discord.js');
const bot = new Discord.Client({});
  const figlet = require('figlet');

bot.on('ready', () => {
  console.log('Serving fake server.');
});

bot.on('error', console.error);

bot.on('message', async msg => {
  const prefix = '.';
  let msgArgs = msg.content.split(" ");
  let args = msgArgs.slice(1);
  let command = ((msgArgs)[0]).replace(prefix, '');

  if (command == 'ban') {
    msg.mentions.members.first().ban('Being a dickhead', 7);
  }


  if (command == 'fancy') {
    const parsed = bot.utils.parseArgs(args, ['l', 'f:']);

        bot.utils.textUpload(figlet.fontsSync().join('\n')).then(({ url }) => {
            if (!url) {
                return msg.error('Failed to upload fonts list!');
            }

            msg.edit({
                embed: bot.utils.embed('Available Fonts', `A list of available fonts can be found [here](${url}).`)
            }).then(m => m.delete(5000));
        });
        return;
    }

    if (parsed.leftover.length < 1) {
        throw 'You must provide some text to render!';
    }

    const options = {};

    if (parsed.options.f) {
        options.font = parsed.options.f;
    }

    msg.delete();

    const input = parsed.leftover.join(' ');
    msg.channel.send(`\`\`\`\n${figlet.textSync(input, options)}\n\`\`\``);
}

  if (command == 'mc') {
    msg.channel.send(`We have \`**${msg.guild.members.filter(m => !m.user.bot).size}**\` members!!`);
  }

  if (command == 'bc') {
    msg.channel.send('We have some residents who were being dickheads. We have ' + msg.guild.bans.size + ' dickheads.');
  }


});

bot.login(process.env.BOT_TOKEN)
